import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const TARGET = 'scripts/content-checks.ts';
const TEST_FILE = 'content-checks.test.ts';
const WATCH_FILTER = 'mutation-watch';
const MAX_MUTANTS = Number(process.env.MUTATION_MAX ?? 10);
const MUTANT_TIMEOUT_MS = 60_000;
const TOTAL_TIMEOUT_MS = 5 * 60_000;

type Operator = { name: string; find: RegExp; replace: string };

const OPERATORS: Operator[] = [
  { name: 'flip-greater-equal', find: />= 3/g, replace: '> 3' },
  { name: 'flip-length-check', find: /length > 0/g, replace: 'length > 1' },
  { name: 'flip-strict-inequality', find: /!== 0/g, replace: '=== 0' },
  { name: 'line-offset', find: /index \+ 1/g, replace: 'index' },
  { name: 'drop-issue-push', find: /if \(found\) issues\.push/g, replace: 'if (!found) issues.push' },
  { name: 'empty-return', find: /return issues;/g, replace: 'return [];' },
  { name: 'drop-name-rules', find: /\.\.\.nameRules/g, replace: '' },
  { name: 'case-sensitive-keyword', find: /full\[\\s_-\]\*stack\/i/g, replace: 'full[\\s_-]*stack/' },
  { name: 'drop-korean-keyword', find: /풀\\s\*스택\|/g, replace: '' },
  { name: 'drop-rule-line', find: /^ {2}\{ id: '[a-z-]+', pattern: .*\},\n/gm, replace: '' },
  { name: 'drop-lookbehind', find: /\(\?<!\[\\w\.\/-\]\)/g, replace: '' },
  { name: 'drop-word-boundary', find: /`\\\\b\$\{escapeRegExp\(name\)\}\\\\b`/g, replace: '`${escapeRegExp(name)}`' },
];

type Mutant = { id: number; operator: string; offset: number; original: string; replacement: string };

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function enumerateMutants(source: string): Mutant[] {
  const mutants: Mutant[] = [];
  for (const operator of OPERATORS) {
    for (const match of source.matchAll(operator.find)) {
      mutants.push({
        id: mutants.length,
        operator: operator.name,
        offset: match.index ?? 0,
        original: match[0],
        replacement: match[0].replace(
          new RegExp(operator.find.source, operator.find.flags.replace('g', '')),
          operator.replace,
        ),
      });
    }
  }
  return mutants;
}

function pick<T>(items: T[], count: number, random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count).sort((a, b) => (a as Mutant).id - (b as Mutant).id);
}

async function runWatchTests(dir: string): Promise<'killed' | 'survived' | 'timeout'> {
  const child = Bun.spawn(['bun', 'test', join(dir, TEST_FILE), '-t', WATCH_FILTER], {
    cwd: process.cwd(),
    stdout: 'ignore',
    stderr: 'ignore',
    timeout: MUTANT_TIMEOUT_MS,
    killSignal: 'SIGKILL',
  });
  const code = await child.exited;
  if (child.signalCode) return 'timeout';
  return code === 0 ? 'survived' : 'killed';
}

const seed = process.argv[2] ? Number(process.argv[2]) : Math.floor(Math.random() * 2 ** 31);
const source = readFileSync(TARGET, 'utf8');
const all = enumerateMutants(source);
const selected = pick(all, Math.min(MAX_MUTANTS, all.length), mulberry32(seed));
const workDir = mkdtempSync(join(tmpdir(), 'ever-blog-mutation-'));
const startedAt = Date.now();
const results: (Mutant & { status: string })[] = [];

try {
  for (const mutant of selected) {
    if (Date.now() - startedAt > TOTAL_TIMEOUT_MS) {
      results.push({ ...mutant, status: 'skipped-time-limit' });
      continue;
    }
    const dir = join(workDir, `m${mutant.id}`);
    cpSync('scripts', dir, { recursive: true });
    const mutated =
      source.slice(0, mutant.offset) + mutant.replacement + source.slice(mutant.offset + mutant.original.length);
    writeFileSync(join(dir, 'content-checks.ts'), mutated);
    const status = await runWatchTests(dir);
    results.push({ ...mutant, status });
    console.log(`#${mutant.id} ${mutant.operator} @${mutant.offset}: ${status}`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

const survivors = results.filter(result => result.status !== 'killed');
const report = { seed, target: TARGET, candidates: all.length, results, survivors: survivors.length };
mkdirSync('.omo/evidence', { recursive: true });
const reportPath = `.omo/evidence/mutation-${seed}.json`;
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(
  `seed=${seed} candidates=${all.length} run=${results.length} survivors=${survivors.length} -> ${reportPath}`,
);
if (survivors.length > 0) process.exit(1);
