import { readFileSync } from 'node:fs';
import { homedir, userInfo } from 'node:os';

export type Issue = { rule: string; file: string; line: number; match: string };

type Rule = { id: string; pattern: RegExp };

export const PRIVACY_RULES: Rule[] = [
  { id: 'home-path', pattern: /(?<![\w./-])\/(?:Users|home)\/[A-Za-z0-9._-]+/ },
  { id: 'windows-home-path', pattern: /\b[A-Za-z]:\\Users\\[^\\\s]+/i },
  { id: 'github-token', pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{22,})\b/ },
  { id: 'npm-token', pattern: /\bnpm_[A-Za-z0-9]{36}\b/ },
  { id: 'api-key', pattern: /\bsk-(?:ant-)?[A-Za-z0-9_-]{20,}/ },
  { id: 'aws-key', pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: 'slack-token', pattern: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  { id: 'private-key', pattern: /-----BEGIN (?:[A-Z]+ )*PRIVATE KEY-----/ },
  {
    id: 'secret-assignment',
    pattern:
      /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token)\b["']?\s*[:=]\s*["'][^"'\s]{8,}["']/i,
  },
  {
    id: 'private-ip',
    pattern:
      /\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/,
  },
  { id: 'internal-host', pattern: /\b[a-z0-9-]+\.(?:local|internal|lan)\b/i },
];

export const FORBIDDEN_RESUME_KEYWORDS = /풀\s*스택|full[\s_-]*stack/i;

export const RESUME_PAGE = 'src/app/resume/page.tsx';

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function scanLines(text: string, file: string, rules: Rule[]): Issue[] {
  const issues: Issue[] = [];
  text.split('\n').forEach((lineText, index) => {
    for (const rule of rules) {
      const found = lineText.match(rule.pattern);
      if (found) issues.push({ rule: rule.id, file, line: index + 1, match: found[0] });
    }
  });
  return issues;
}

export function findPrivacyIssues(text: string, file: string, localNames: string[] = []): Issue[] {
  const nameRules = localNames
    .filter(name => name.length >= 3)
    .map(name => ({ id: 'local-account-name', pattern: new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i') }));
  return scanLines(text, file, [...PRIVACY_RULES, ...nameRules]);
}

export function findForbiddenResumeKeywords(text: string, file = RESUME_PAGE): Issue[] {
  return scanLines(text, file, [{ id: 'forbidden-resume-keyword', pattern: FORBIDDEN_RESUME_KEYWORDS }]);
}

export function localAccountNames(): string[] {
  const names = new Set<string>([userInfo().username]);
  const homeName = homedir().split(/[\\/]/).pop();
  if (homeName) names.add(homeName);
  return [...names];
}

function git(args: string[], cwd: string, stdin?: string): Buffer {
  const result = Bun.spawnSync(['git', ...args], { cwd, stdin: stdin === undefined ? undefined : Buffer.from(stdin) });
  if (result.exitCode !== 0) throw new Error(`git ${args[0]} failed: ${result.stderr.toString()}`);
  return result.stdout;
}

function refExists(ref: string, cwd: string): boolean {
  return Bun.spawnSync(['git', 'rev-parse', '--verify', '-q', `${ref}^{commit}`], { cwd }).exitCode === 0;
}

// Scan scope: only the current branch (HEAD) and dev. Other local and remote-tracking branches are never scanned.
export function scanRefs(cwd = process.cwd()): string[] {
  const refs = refExists('HEAD', cwd) ? ['HEAD'] : [];
  const dev = ['refs/heads/dev', 'refs/remotes/origin/dev'].find(ref => refExists(ref, cwd));
  if (dev) refs.push(dev);
  return refs;
}

function listRepoFiles(cwd: string): string[] {
  return git(['ls-files', '--cached', '--others', '--exclude-standard', '-z'], cwd)
    .toString()
    .split('\0')
    .filter(Boolean);
}

function historyCommitIssues(refs: string[], cwd: string, names: string[]): Issue[] {
  const log = git(['log', '-z', '--format=%H%n%B', ...refs, '--'], cwd).toString();
  return log
    .split('\0')
    .filter(Boolean)
    .flatMap(entry => {
      const newline = entry.indexOf('\n');
      return findPrivacyIssues(entry.slice(newline + 1), `commit ${entry.slice(0, newline)}`, names);
    });
}

function historyTagIssues(refs: string[], cwd: string, names: string[]): Issue[] {
  const tags = new Map<string, string>();
  for (const ref of refs) {
    const out = git(
      ['for-each-ref', `--merged=${ref}`, '--format=%(refname:short)%00%(contents)%1e', 'refs/tags'],
      cwd,
    );
    for (const entry of out.toString().split('\x1e')) {
      const [name, contents = ''] = entry.replace(/^\n/, '').split('\0');
      if (name) tags.set(name, `${name}\n${contents}`);
    }
  }
  return [...tags].flatMap(([name, text]) => findPrivacyIssues(text, `tag ${name}`, names));
}

function historyBlobIssues(refs: string[], cwd: string, names: string[]): Issue[] {
  const paths = new Map<string, string>();
  for (const line of git(['rev-list', '--objects', ...refs, '--'], cwd)
    .toString()
    .split('\n')) {
    const space = line.indexOf(' ');
    if (space > 0 && !paths.has(line.slice(0, space))) paths.set(line.slice(0, space), line.slice(space + 1));
  }
  if (paths.size === 0) return [];
  const out = git(['cat-file', '--batch'], cwd, [...paths.keys()].join('\n') + '\n');
  const issues: Issue[] = [];
  let offset = 0;
  while (offset < out.length) {
    const headerEnd = out.indexOf(10, offset);
    const [sha, type, size] = out.subarray(offset, headerEnd).toString().split(' ');
    const body = out.subarray(headerEnd + 1, headerEnd + 1 + Number(size));
    offset = headerEnd + 1 + Number(size) + 1;
    if (type !== 'blob' || body.includes(0)) continue;
    issues.push(...findPrivacyIssues(body.toString('utf8'), `${paths.get(sha)} @ ${sha.slice(0, 12)}`, names));
  }
  return issues;
}

// Commits, tags and every file version reachable from HEAD and dev.
export function findHistoryIssues(names: string[] = [], cwd = process.cwd()): Issue[] {
  const refs = scanRefs(cwd);
  if (refs.length === 0) return [];
  return [
    ...historyCommitIssues(refs, cwd, names),
    ...historyTagIssues(refs, cwd, names),
    ...historyBlobIssues(refs, cwd, names),
  ];
}

function runCli() {
  const cwd = process.cwd();
  const names = localAccountNames();
  const issues: Issue[] = [];
  for (const file of listRepoFiles(cwd)) {
    let text: string;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    if (text.includes('\0')) continue;
    issues.push(...findPrivacyIssues(text, file, names));
  }
  issues.push(...findHistoryIssues(names, cwd));
  issues.push(...findForbiddenResumeKeywords(readFileSync(RESUME_PAGE, 'utf8')));

  if (issues.length > 0) {
    for (const issue of issues) console.error(`${issue.file}:${issue.line} [${issue.rule}] ${issue.match}`);
    console.error(`content check failed: ${issues.length} issue(s)`);
    process.exit(1);
  }
  console.log('content check passed');
}

if (import.meta.main) runCli();
