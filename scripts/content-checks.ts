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

function listRepoFiles(): string[] {
  const result = Bun.spawnSync(['git', 'ls-files', '--cached', '--others', '--exclude-standard', '-z']);
  if (result.exitCode !== 0) throw new Error(`git ls-files failed: ${result.stderr.toString()}`);
  return result.stdout.toString().split('\0').filter(Boolean);
}

function runCli() {
  const names = localAccountNames();
  const issues: Issue[] = [];
  for (const file of listRepoFiles()) {
    let text: string;
    try {
      text = readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    if (text.includes('\0')) continue;
    issues.push(...findPrivacyIssues(text, file, names));
  }
  issues.push(...findForbiddenResumeKeywords(readFileSync(RESUME_PAGE, 'utf8')));

  if (issues.length > 0) {
    for (const issue of issues) console.error(`${issue.file}:${issue.line} [${issue.rule}] ${issue.match}`);
    console.error(`content check failed: ${issues.length} issue(s)`);
    process.exit(1);
  }
  console.log('content check passed');
}

if (import.meta.main) runCli();
