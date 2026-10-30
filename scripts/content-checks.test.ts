import { describe, expect, test } from 'bun:test';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir, userInfo } from 'node:os';
import { join } from 'node:path';
import {
  PRIVACY_RULES,
  RESUME_PAGE,
  findForbiddenResumeKeywords,
  findHistoryIssues,
  findPrivacyIssues,
  localAccountNames,
  scanRefs,
} from './content-checks';

// Fixtures are assembled from pieces so this file never matches the scanner itself.
const fixtures: Record<string, string> = {
  'home-path': `cd ${'/'}${'Users'}/alice/project`,
  'windows-home-path': `C:${'\\'}Users${'\\'}alice${'\\'}repo`,
  'github-token': `token ${'gh'}p_${'a'.repeat(36)}`,
  'npm-token': `${'np'}m_${'B'.repeat(36)}`,
  'api-key': `${'s'}k-${'x'.repeat(24)}`,
  'aws-key': `${'AK'}IA${'ABCDEFGHIJKLMNOP'}`,
  'slack-token': `${'xo'}xb-${'1234567890'}-abc`,
  'private-key': `-----BEGIN ${'RSA PRIVATE'} KEY-----`,
  'secret-assignment': `${'pass'}word = "hunter22x"`,
  'private-ip': `${'192.'}168.0.10`,
  'internal-host': `ssh ${'nas'}.${'local'}`,
};

describe('privacy scanner', () => {
  test('[mutation-watch] every rule fires on its fixture and clean text passes', () => {
    expect(Object.keys(fixtures).sort()).toEqual(PRIVACY_RULES.map(rule => rule.id).sort());
    for (const [ruleId, text] of Object.entries(fixtures)) {
      expect(findPrivacyIssues(text, 'f.txt').map(issue => issue.rule)).toEqual([ruleId]);
    }
    const clean = 'const blog = "https://blog.owen.kr";\nmailto:me@owen.kr\nhttps://example.com/home/feed';
    expect(findPrivacyIssues(clean, 'f.ts')).toEqual([]);
  });

  test('[mutation-watch] reports rule, file and 1-based line for each issue', () => {
    const text = ['clean', fixtures['private-ip'], 'clean', `user bob here`, 'bobcat'].join('\n');
    expect(findPrivacyIssues(text, 'docs/a.md', ['bob', 'xy'])).toEqual([
      { rule: 'private-ip', file: 'docs/a.md', line: 2, match: fixtures['private-ip'] },
      { rule: 'local-account-name', file: 'docs/a.md', line: 4, match: 'bob' },
    ]);
  });

  test('home path segment inside a URL is not flagged', () => {
    expect(findPrivacyIssues('https://example.com/home/feed and /api/Users/list', 'f.ts')).toEqual([]);
  });

  test('tilde home paths are allowed', () => {
    expect(findPrivacyIssues('~/Developer/ever-blog/.omo/evidence', 'f.md')).toEqual([]);
  });

  test('local account name inside a longer word is not flagged', () => {
    expect(findPrivacyIssues('bobcat and bobby', 'f.md', ['bob'])).toEqual([]);
  });

  test('names shorter than three characters are ignored', () => {
    expect(findPrivacyIssues('ab cd', 'f.md', ['ab'])).toEqual([]);
  });

  test('dotted version numbers are not private IPs', () => {
    expect(findPrivacyIssues('"eslint-config-prettier": "^10.1.1"', 'package.json')).toEqual([]);
  });

  test('[mutation-watch] CLI fails on a single issue and passes a clean repository', () => {
    const repo = mkdtempSync(join(tmpdir(), 'ever-blog-content-check-'));
    try {
      Bun.spawnSync(['git', 'init', '-q'], { cwd: repo });
      mkdirSync(join(repo, 'src/app/resume'), { recursive: true });
      writeFileSync(join(repo, RESUME_PAGE), "const position = 'AI Engineer';\n");
      const cli = () => Bun.spawnSync(['bun', join(import.meta.dir, 'content-checks.ts')], { cwd: repo });

      expect(cli().exitCode).toBe(0);

      writeFileSync(join(repo, 'notes.md'), fixtures['internal-host']);
      const failed = cli();
      expect(failed.exitCode).toBe(1);
      expect(failed.stderr.toString()).toContain('notes.md:1 [internal-host]');
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });

  test('local account names include the current user', () => {
    expect(localAccountNames()).toContain(userInfo().username);
  });
});

// Temporary repository: main -> dev -> unit branch (checked out), plus an unrelated branch `other`.
function withRepo(body: (repo: string, git: (...args: string[]) => string) => void) {
  const repo = mkdtempSync(join(tmpdir(), 'ever-blog-scan-scope-'));
  const git = (...args: string[]) => {
    const config = ['user.name=t', 'user.email=t@example.com', 'commit.gpgsign=false', 'tag.gpgsign=false'];
    const result = Bun.spawnSync(['git', ...config.flatMap(c => ['-c', c]), ...args], { cwd: repo });
    if (result.exitCode !== 0) throw new Error(result.stderr.toString());
    return result.stdout.toString().trim();
  };
  try {
    git('init', '-q', '-b', 'main');
    mkdirSync(join(repo, 'src/app/resume'), { recursive: true });
    writeFileSync(join(repo, RESUME_PAGE), "const position = 'AI Engineer';\n");
    git('add', '.');
    git('commit', '-q', '--no-verify', '-m', 'init');
    git('branch', 'dev');
    git('checkout', '-q', '-b', 'other');
    writeFileSync(join(repo, 'leak.md'), fixtures['internal-host']);
    git('add', '.');
    git('commit', '-q', '--no-verify', '-m', `leak ${fixtures['private-ip']}`);
    git('tag', '-a', 'other-tag', '-m', fixtures['private-ip']);
    git('update-ref', 'refs/remotes/origin/feature', 'other');
    git('checkout', '-q', 'dev');
    git('checkout', '-q', '-b', 'fix/unit');
    body(repo, git);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
}

const cliIn = (repo: string) => Bun.spawnSync(['bun', join(import.meta.dir, 'content-checks.ts')], { cwd: repo });

describe('privacy scan scope (HEAD and dev only)', () => {
  test('[mutation-watch] issues on other local or remote-tracking branches and their tags do not fail', () => {
    withRepo(repo => {
      expect(findHistoryIssues([], repo)).toEqual([]);
      expect(cliIn(repo).exitCode).toBe(0);
    });
  });

  test('[mutation-watch] a file version reachable from dev fails even after it was deleted', () => {
    withRepo((repo, git) => {
      git('checkout', '-q', 'dev');
      writeFileSync(join(repo, 'notes.md'), fixtures['internal-host']);
      git('add', '.');
      git('commit', '-q', '--no-verify', '-m', 'add');
      git('rm', '-q', 'notes.md');
      git('commit', '-q', '--no-verify', '-m', 'remove');
      git('checkout', '-q', 'fix/unit');
      const issues = findHistoryIssues([], repo);
      expect(issues.map(issue => [issue.rule, issue.file.split(' @ ')[0], issue.line])).toEqual([
        ['internal-host', 'notes.md', 1],
      ]);
      const failed = cliIn(repo);
      expect(failed.exitCode).toBe(1);
      expect(failed.stderr.toString()).toContain('[internal-host]');
    });
  });

  test('[mutation-watch] a commit message on HEAD fails', () => {
    withRepo((repo, git) => {
      git('commit', '-q', '--no-verify', '--allow-empty', '-m', `title\n\nhost ${fixtures['private-ip']}`);
      const sha = git('rev-parse', 'HEAD');
      expect(findHistoryIssues([], repo)).toEqual([
        { rule: 'private-ip', file: `commit ${sha}`, line: 3, match: fixtures['private-ip'] },
      ]);
    });
  });

  test('an annotated tag reachable from HEAD fails', () => {
    withRepo((repo, git) => {
      git('tag', '-a', 'v9', '-m', `note ${fixtures['internal-host']}`);
      expect(findHistoryIssues([], repo).map(issue => [issue.rule, issue.file])).toEqual([['internal-host', 'tag v9']]);
    });
  });

  test('scan refs are HEAD and dev, with origin/dev as fallback', () => {
    withRepo((repo, git) => {
      expect(scanRefs(repo)).toEqual(['HEAD', 'refs/heads/dev']);
      git('update-ref', 'refs/remotes/origin/dev', 'dev');
      git('branch', '-q', '-D', 'dev');
      expect(scanRefs(repo)).toEqual(['HEAD', 'refs/remotes/origin/dev']);
    });
  });
});

describe('resume keyword check', () => {
  test('[mutation-watch] flags every spelling of the forbidden keyword and passes neutral text', () => {
    const variants = ['풀스택', '풀 스택', 'Full-stack', 'full stack', 'FULLSTACK', 'Full_Stack'];
    for (const variant of variants) {
      expect(findForbiddenResumeKeywords(`position: '${variant} Engineer'`, 'page.tsx')).toEqual([
        { rule: 'forbidden-resume-keyword', file: 'page.tsx', line: 1, match: variant },
      ]);
    }
    expect(findForbiddenResumeKeywords("position: 'AI Engineer'\nlabel: 'End-to-End Development'")).toEqual([]);
  });

  test('resume page contains no forbidden keyword', () => {
    expect(findForbiddenResumeKeywords(readFileSync(RESUME_PAGE, 'utf8'))).toEqual([]);
  });
});
