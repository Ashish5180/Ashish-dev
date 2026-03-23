export type StageStatus = 'pending' | 'running' | 'success' | 'failed';
export type Environment = 'development' | 'staging' | 'production';

export interface HistoryEntry {
  id: number;
  commit: string;
  message: string;
  branch: string;
  env: Environment;
  status: 'success' | 'failed';
  duration: string;
  triggeredBy: string;
  timestamp: string;
}

export interface BranchCommit {
  hash: string;
  message: string;
  author: string;
  ago: string;
}

export const BRANCHES: Record<string, BranchCommit[]> = {
  main: [
    { hash: 'a3f9d21', message: 'feat: add dark mode toggle & perf improvements', author: 'sarah.k', ago: '3m ago' },
    { hash: 'c12e8b4', message: 'fix: resolve hydration mismatch in layout', author: 'james.w', ago: '1h ago' },
    { hash: 'f90a3d7', message: 'chore: update dependencies to latest', author: 'bot', ago: '4h ago' },
  ],
  'feat/auth-redesign': [
    { hash: 'b7d2e91', message: 'feat: redesign login flow with magic links', author: 'priya.m', ago: '22m ago' },
    { hash: 'e3f1c08', message: 'wip: oauth provider integration', author: 'priya.m', ago: '2h ago' },
  ],
  'fix/perf-regression': [
    { hash: '91d4a2c', message: 'perf: lazy-load heavy chart components', author: 'tom.r', ago: '45m ago' },
  ],
};

export const ENVIRONMENTS: { id: Environment; label: string; color: string; bg: string }[] = [
  { id: 'development', label: 'dev',        color: '#085041', bg: '#e1f5ee' },
  { id: 'staging',     label: 'staging',    color: '#633806', bg: '#faeeda' },
  { id: 'production',  label: 'production', color: '#3c3489', bg: '#eeedfe' },
];

export const INITIAL_HISTORY: HistoryEntry[] = [
  { id: 1246, commit: 'c12e8b4', message: 'fix: resolve hydration mismatch in layout',       branch: 'main',              env: 'production',  status: 'success', duration: '3:41', triggeredBy: 'james.w',  timestamp: '14 min ago' },
  { id: 1245, commit: 'f90a3d7', message: 'chore: update dependencies to latest',             branch: 'main',              env: 'production',  status: 'success', duration: '3:28', triggeredBy: 'bot',      timestamp: '2 hr ago'   },
  { id: 1244, commit: 'e3f1c08', message: 'wip: oauth provider integration',                  branch: 'feat/auth-redesign', env: 'staging',     status: 'failed',  duration: '1:12', triggeredBy: 'priya.m', timestamp: '3 hr ago'   },
  { id: 1243, commit: '8a2b1d9', message: 'refactor: extract shared button component',        branch: 'main',              env: 'production',  status: 'success', duration: '3:55', triggeredBy: 'sarah.k',  timestamp: '5 hr ago'   },
  { id: 1242, commit: '3dc9e04', message: 'ci: add matrix testing for node 18 and 20',        branch: 'main',              env: 'staging',     status: 'success', duration: '4:10', triggeredBy: 'bot',      timestamp: '8 hr ago'   },
];

export interface LogEntry {
  type: 'run' | 'ok' | 'warn' | 'dim' | 'err';
  msg: string;
  ts: string;
}

export interface StageConfig {
  id: string;
  label: string;
  dur: number;
  logs: Array<[LogEntry['type'], string]>;
}

export const STAGES: StageConfig[] = [
  {
    id: 'checkout',
    label: 'checkout',
    dur: 2200,
    logs: [
      ['run', 'cloning repository myorg/awesome-app...'],
      ['ok',  'fetched 847 objects from origin'],
      ['ok',  'HEAD is now at a3f9d21'],
      ['dim', 'workspace initialized'],
    ],
  },
  {
    id: 'install',
    label: 'install',
    dur: 3100,
    logs: [
      ['run',  'npm ci --prefer-offline'],
      ['dim',  'cache hit: node_modules (98%)'],
      ['ok',   '1,423 packages installed in 2.8s'],
      ['warn', '2 moderate severity advisories found'],
    ],
  },
  {
    id: 'lint',
    label: 'lint',
    dur: 1600,
    logs: [
      ['run', 'eslint src/ --max-warnings=0'],
      ['ok',  'src/components — 0 errors, 0 warnings'],
      ['ok',  'src/utils — 0 errors, 0 warnings'],
      ['ok',  'eslint passed (142 files checked)'],
    ],
  },
  {
    id: 'test',
    label: 'test',
    dur: 4000,
    logs: [
      ['run', 'jest --coverage --ci'],
      ['dim', 'running 38 test suites...'],
      ['ok',  'tests: 214 passed, 214 total'],
      ['ok',  'coverage: 94.2% (threshold: 80%)'],
    ],
  },
  {
    id: 'build',
    label: 'build',
    dur: 3500,
    logs: [
      ['run', 'vite build --mode production'],
      ['dim', 'bundling 1,247 modules...'],
      ['ok',  'dist/assets/index.js   342.8 kB'],
      ['ok',  'gzip: 97.3 kB — build complete'],
    ],
  },
  {
    id: 'scan',
    label: 'scan',
    dur: 2400,
    logs: [
      ['run', 'trivy image --severity HIGH,CRITICAL myapp:a3f9d21'],
      ['dim', 'scanning 218 packages...'],
      ['ok',  'total: 0 (critical: 0, high: 0)'],
      ['ok',  'security scan passed'],
    ],
  },
  {
    id: 'deploy',
    label: 'deploy',
    dur: 3800,
    logs: [
      ['run', 'kubectl set image deploy/awesome-app app=myapp:a3f9d21'],
      ['dim', 'waiting for rollout to finish...'],
      ['dim', 'replicas: 3/3 updated, 3/3 ready'],
      ['ok',  'deployed to production (us-east-1, eu-west-1)'],
    ],
  },
];

export function formatElapsed(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
