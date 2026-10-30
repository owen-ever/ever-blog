// Seeded mutation run for scripts/content-checks.ts.
// Usage: bun scripts/mutation.ts [seed] [count]. A new random seed is used when none is given.
// The same seed picks the same mutants. Any surviving mutant makes the run fail.
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const TARGET = 'scripts/content-checks.ts';
const TEST = 'scripts/content-checks.test.ts';
const PER_MUTANT_TIMEOUT_MS = 60_000;
const TOTAL_LIMIT_MS = 600_000;

type Mutant = { operator: string; offset: number; original: string; replacement: string };

const OPERATORS: [string, string, string][] = [
  ['drop-local-dev-ref', "'refs/heads/dev', ", ''],
  ['drop-head-ref', "refExists('HEAD', cwd) ? ['HEAD'] : []", '[]'],
  ['drop-dev-ref', 'if (dev) refs.push(dev);', ''],
  ['scan-all-refs', "...refs, '--'", "'--all', '--'"],
  ['scan-all-tags', '`--merged=${ref}`, ', ''],
  ['drop-commit-scan', '...historyCommitIssues(refs, cwd, names),', ''],
  ['drop-tag-scan', '...historyTagIssues(refs, cwd, names),', ''],
  ['drop-blob-scan', '...historyBlobIssues(refs, cwd, names),', ''],
  ['drop-history-in-cli', 'issues.push(...findHistoryIssues(names, cwd));', ''],
  ['drop-empty-ref-guard', 'if (refs.length === 0) return [];', ''],
  ['commit-body-offset', 'newline + 1', 'newline'],
  ['blob-size-offset', 'Number(size) + 1;', 'Number(size);'],
  ['flip-blob-type', "type !== 'blob'", "type === 'blob'"],
  ['flip-git-exit', '!== 0) throw', '=== 0) throw'],
  ['flip-greater-equal', '>= 3', '> 3'],
  ['line-offset', 'index + 1', 'index'],
  [
    'empty-return',
    'return issues;\n}\n\nexport function findPrivacyIssues',
    'return [];\n}\n\nexport function findPrivacyIssues',
  ],
  ['flip-length-check', 'issues.length > 0', 'issues.length > 1'],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function candidates(source: string): Mutant[] {
  const found: Mutant[] = [];
  for (const [operator, original, replacement] of OPERATORS) {
    for (let at = source.indexOf(original); at !== -1; at = source.indexOf(original, at + 1)) {
      found.push({ operator, offset: at, original, replacement });
    }
  }
  for (const match of source.matchAll(/^ {2}\{ id: '.*\n/gm)) {
    found.push({ operator: 'drop-rule-line', offset: match.index, original: match[0], replacement: '' });
  }
  return found;
}

const seed = process.argv[2] ? Number(process.argv[2]) : Math.floor(Math.random() * 2 ** 31);
const count = process.argv[3] ? Number(process.argv[3]) : 12;
const source = readFileSync(TARGET, 'utf8');
const random = mulberry32(seed);
const pool = candidates(source);
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(random() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}
const chosen = pool.slice(0, count);

const work = mkdtempSync(join(tmpdir(), 'ever-blog-mutation-'));
const started = Date.now();
const results: (Mutant & { id: number; status: string })[] = [];
function runTests(name: string, code: string) {
  const dir = join(work, name);
  mkdirSync(dir);
  writeFileSync(join(dir, 'content-checks.ts'), code);
  copyFileSync(TEST, join(dir, 'content-checks.test.ts'));
  return Bun.spawnSync(['bun', 'test', join(dir, 'content-checks.test.ts')], { timeout: PER_MUTANT_TIMEOUT_MS });
}

try {
  if (runTests('baseline', source).exitCode !== 0) {
    console.error('baseline tests fail on the unmutated copy; mutation run aborted');
    process.exit(2);
  }
  chosen.forEach((mutant, id) => {
    if (Date.now() - started > TOTAL_LIMIT_MS) {
      results.push({ id, ...mutant, status: 'skipped-time-limit' });
      return;
    }
    const mutated =
      source.slice(0, mutant.offset) + mutant.replacement + source.slice(mutant.offset + mutant.original.length);
    const run = runTests(String(id), mutated);
    const status = run.exitCode === 0 ? 'survived' : run.signalCode ? 'timeout' : 'killed';
    results.push({ id, ...mutant, status });
    console.log(`#${id} ${mutant.operator} @${mutant.offset}: ${status}`);
  });
} finally {
  rmSync(work, { recursive: true, force: true });
}

const survivors = results.filter(
  result => result.status === 'survived' || result.status === 'skipped-time-limit',
).length;
const report = { seed, target: TARGET, candidates: pool.length, results, survivors };
mkdirSync('.omo/evidence', { recursive: true });
const out = `.omo/evidence/mutation-${seed}.json`;
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(`seed=${seed} mutants=${results.length} survivors=${survivors} report=${out}`);
process.exit(survivors > 0 ? 1 : 0);
