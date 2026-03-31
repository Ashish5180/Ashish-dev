'use client';

import { useState, useRef, useCallback } from 'react';
import {
  STAGES,
  StageStatus,
  LogEntry,
  Environment,
  HistoryEntry,
  BranchCommit,
  BRANCHES,
  INITIAL_HISTORY,
  formatElapsed,
  delay,
} from '@/lib/pipeline';
import StageNode from './StageNode';
import LogPanel from './LogPanel';
import Metrics from './Metrics';
import EnvSelector from './EnvSelector';
import BranchSelector from './BranchSelector';
import { ToastContainer, Toast } from './Toast';
import HistoryPanel from './HistoryPanel';
import StageDrawer from './StageDrawer';

type PipelineState = 'idle' | 'running' | 'done' | 'failed';

interface RunMetrics {
  tests: string;
  coverage: string;
  bundle: string;
  totalTime: string;
}

function nowTs() {
  return new Date().toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

let toastCounter = 100;

export default function DeploymentPipeline() {
  const defaultCommit = BRANCHES['main'][0];

  const [pipelineState, setPipelineState] = useState<PipelineState>('idle');
  const [statuses, setStatuses] = useState<StageStatus[]>(STAGES.map(() => 'pending'));
  const [durations, setDurations] = useState<string[]>(STAGES.map(() => ''));
  const [stageLogs, setStageLogs] = useState<Record<number, LogEntry[]>>({});
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'dim', msg: 'ready — select environment and click run', ts: nowTs() },
  ]);
  const [logTitle, setLogTitle] = useState('ready');
  const [elapsed, setElapsed] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [runCount, setRunCount] = useState(1247);
  const [metrics, setMetrics] = useState<RunMetrics>({ tests: '—', coverage: '—', bundle: '—', totalTime: '—' });
  const [env, setEnv] = useState<Environment>('production');
  const [branch, setBranch] = useState('main');
  const [commit, setCommit] = useState<BranchCommit>(defaultCommit);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [showHistory, setShowHistory] = useState(false);
  const [drawerStage, setDrawerStage] = useState<number | null>(null);

  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const abortRef = useRef(false);

  function addToast(t: Omit<Toast, 'id'>) {
    const id = ++toastCounter;
    setToasts((prev) => [...prev, { ...t, id }]);
  }

  function dismissToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  function addStageLog(index: number, type: LogEntry['type'], msg: string) {
    const entry = { type, msg, ts: nowTs() };
    setStageLogs((prev) => ({ ...prev, [index]: [...(prev[index] ?? []), entry] }));
    setLogs((prev) => [...prev, entry]);
  }

  const updateStageStatus = useCallback((index: number, status: StageStatus) => {
    setStatuses((prev) => { const n = [...prev]; n[index] = status; return n; });
  }, []);

  const updateStageDuration = useCallback((index: number, dur: string) => {
    setDurations((prev) => { const n = [...prev]; n[index] = dur; return n; });
  }, []);

  function handleBranchSelect(b: string, c: BranchCommit) {
    setBranch(b);
    setCommit(c);
  }

  const runPipeline = useCallback(async () => {
    if (pipelineState === 'running') return;

    abortRef.current = false;
    const nextRun = runCount + 1;
    setPipelineState('running');
    setRunCount(nextRun);
    setStatuses(STAGES.map(() => 'pending'));
    setDurations(STAGES.map(() => ''));
    setStageLogs({});
    setLogs([{ type: 'dim', msg: `run #${nextRun} started — ${commit.hash} on ${branch}`, ts: nowTs() }]);
    setMetrics({ tests: '—', coverage: '—', bundle: '—', totalTime: '—' });
    setProgress(0);

    addToast({ type: 'info', title: 'Pipeline started', body: `${branch} · ${commit.hash} → ${env}` });

    startTimeRef.current = Date.now();
    tickRef.current = setInterval(() => {
      setElapsed(formatElapsed(Date.now() - startTimeRef.current));
    }, 500);

    for (let i = 0; i < STAGES.length; i++) {
      if (abortRef.current) break;

      const stage = STAGES[i];
      updateStageStatus(i, 'running');
      setLogTitle(`${stage.label} stage`);

      const t0 = Date.now();
      const perLog = (stage.dur / stage.logs.length) * 0.65;

      for (let l = 0; l < stage.logs.length; l++) {
        if (abortRef.current) break;
        await delay(perLog + Math.random() * 200);
        addStageLog(i, stage.logs[l][0], stage.logs[l][1]);
      }

      if (abortRef.current) break;
      await delay(stage.dur * 0.22);

      const dur = ((Date.now() - t0) / 1000).toFixed(1) + 's';
      updateStageStatus(i, 'success');
      updateStageDuration(i, dur);
      setProgress(Math.round(((i + 1) / STAGES.length) * 100));

      if (i === 3) setMetrics((m) => ({ ...m, tests: '214 / 214', coverage: '94.2%' }));
      if (i === 4) setMetrics((m) => ({ ...m, bundle: '342 kB' }));
    }

    if (!abortRef.current) {
      clearInterval(tickRef.current!);
      const totalStr = formatElapsed(Date.now() - startTimeRef.current);
      setMetrics((m) => ({ ...m, totalTime: totalStr }));
      setLogTitle('complete');
      setLogs((prev) => [...prev, { type: 'ok', msg: `pipeline complete · deployed to ${env}`, ts: nowTs() }]);
      setPipelineState('done');
      addToast({ type: 'success', title: 'Deployment successful', body: `${commit.hash} live on ${env} in ${totalStr}` });

      const newEntry: HistoryEntry = {
        id: nextRun,
        commit: commit.hash,
        message: commit.message,
        branch,
        env,
        status: 'success',
        duration: totalStr,
        triggeredBy: commit.author,
        timestamp: 'just now',
      };
      setHistory((prev) => [newEntry, ...prev]);
    }
  }, [pipelineState, runCount, branch, commit, env, updateStageStatus, updateStageDuration]);

  const reset = useCallback(() => {
    abortRef.current = true;
    clearInterval(tickRef.current!);
    setPipelineState('idle');
    setStatuses(STAGES.map(() => 'pending'));
    setDurations(STAGES.map(() => ''));
    setStageLogs({});
    setLogs([{ type: 'dim', msg: 'reset — ready to run', ts: nowTs() }]);
    setLogTitle('ready');
    setElapsed('0:00');
    setProgress(0);
    setMetrics({ tests: '—', coverage: '—', bundle: '—', totalTime: '—' });
  }, []);

  const doneCount = statuses.filter((s) => s === 'success').length;
  const isRunning = pipelineState === 'running';

  return (
    <>
      <div className="bg-neutral-50/40 backdrop-blur-sm rounded-2xl p-8 font-mono max-w-2xl mx-auto border border-neutral-200/50 relative">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>

        {/* Top bar */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#2c2c2a">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="text-[12px] font-medium text-[#2c2c2a] tracking-[0.2px]">myorg / awesome-app</span>
          <span className="text-[#d3d1c7] mx-0.5">—</span>
          <span className="text-[11px] text-[#888780]">run #{runCount}</span>
          <div className="ml-auto">
            <button
              onClick={() => setShowHistory((v) => !v)}
              className={`h-[24px] px-3 rounded border text-[10px] font-mono font-medium transition-all cursor-pointer
                ${showHistory
                  ? 'bg-[#eeedfe] border-[#534ab7] text-[#3c3489]'
                  : 'bg-white border-[#d3d1c7] text-[#888780] hover:border-[#888780] hover:text-[#2c2c2a]'
                }`}
            >
              history
            </button>
          </div>
        </div>

        {/* Branch + env selector */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <BranchSelector
            branch={branch}
            commit={commit}
            onSelect={handleBranchSelect}
            disabled={isRunning}
          />
          <span className="text-[#d3d1c7] text-[11px]">→</span>
          <EnvSelector value={env} onChange={setEnv} disabled={isRunning} />
          <span className="text-[11px] text-[#b4b2a9] truncate hidden sm:block flex-1">{commit.message}</span>
        </div>

        {/* Pipeline stages */}
        <div className="relative mb-6">
          <div className="absolute top-[26px] left-[26px] right-[26px] h-[2px] bg-[#e8e6e0] rounded-full z-0">
            <div
              className="h-full bg-[#2c2c2a] rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between relative z-10">
            {STAGES.map((stage, i) => (
              <div
                key={stage.id}
                onClick={() => statuses[i] !== 'pending' && setDrawerStage(i)}
                className={statuses[i] !== 'pending' ? 'cursor-pointer' : ''}
                title={statuses[i] !== 'pending' ? `View ${stage.label} logs` : ''}
              >
                <StageNode
                  id={stage.id}
                  label={stage.label}
                  status={statuses[i]}
                  duration={durations[i]}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[11px] text-[#b4b2a9] font-mono min-w-[40px]">{elapsed}</span>
          <div className="flex-1 h-[3px] bg-[#e8e6e0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2c2c2a] rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] text-[#888780] font-mono min-w-[32px] text-right">{progress}%</span>
        </div>

        {/* Log panel */}
        <LogPanel logs={logs} title={logTitle} running={isRunning} />

        {/* Metrics */}
        <Metrics
          tests={metrics.tests}
          coverage={metrics.coverage}
          bundle={metrics.bundle}
          totalTime={metrics.totalTime}
        />

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="h-[30px] px-4 rounded-md bg-[#2c2c2a] text-[#f7f6f3] text-[11px] font-medium font-mono tracking-[0.3px] border border-[#2c2c2a] cursor-pointer transition-all hover:bg-[#444441] hover:border-[#444441] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            run pipeline
          </button>
          <button
            onClick={reset}
            className="h-[30px] px-4 rounded-md bg-white text-[#2c2c2a] text-[11px] font-medium font-mono tracking-[0.3px] border border-[#b4b2a9] cursor-pointer transition-all hover:bg-[#f1efe8] hover:border-[#2c2c2a] active:scale-[0.98]"
          >
            reset
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex gap-[3px]">
              {STAGES.map((_, i) => (
                <div
                  key={i}
                  className={`w-[3px] h-3 rounded-full transition-all duration-300 ${statuses[i] === 'success'
                      ? 'bg-[#3b6d11]'
                      : statuses[i] === 'running'
                        ? 'bg-[#534ab7] animate-pulse'
                        : 'bg-[#d3d1c7]'
                    }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#888780] font-mono">
              {pipelineState === 'idle' ? 'idle'
                : pipelineState === 'running' ? `${doneCount}/${STAGES.length}`
                  : pipelineState === 'done' ? 'passed'
                    : 'failed'}
            </span>
          </div>
        </div>

        {/* History */}
        {showHistory && <HistoryPanel entries={history} />}
      </div>

      {/* Stage drawer */}
      <StageDrawer
        stageIndex={drawerStage}
        statuses={statuses}
        durations={durations}
        stageLogs={stageLogs}
        onClose={() => setDrawerStage(null)}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
