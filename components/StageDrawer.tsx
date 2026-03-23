'use client';
import { useEffect, useRef } from 'react';
import { LogEntry, StageStatus, STAGES } from '@/lib/pipeline';

interface StageDrawerProps {
  stageIndex: number | null;
  statuses: StageStatus[];
  durations: string[];
  stageLogs: Record<number, LogEntry[]>;
  onClose: () => void;
}

const typeColors: Record<LogEntry['type'], string> = {
  run:  'text-[#3c3489]',
  ok:   'text-[#3b6d11]',
  warn: 'text-[#633806]',
  dim:  'text-[#888780]',
  err:  'text-[#791f1f]',
};

const statusLabel: Record<StageStatus, string> = {
  pending: 'pending',
  running: 'running',
  success: 'passed',
  failed:  'failed',
};

const statusColor: Record<StageStatus, string> = {
  pending: 'text-[#b4b2a9]',
  running: 'text-[#534ab7]',
  success: 'text-[#3b6d11]',
  failed:  'text-[#a32d2d]',
};

export default function StageDrawer({ stageIndex, statuses, durations, stageLogs, onClose }: StageDrawerProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const visible = stageIndex !== null;

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [stageLogs, stageIndex]);

  const stage = stageIndex !== null ? STAGES[stageIndex] : null;
  const status = stageIndex !== null ? statuses[stageIndex] : 'pending';
  const dur = stageIndex !== null ? durations[stageIndex] : '';
  const logs = stageIndex !== null ? (stageLogs[stageIndex] ?? []) : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/10 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-[380px] bg-[#faf9f7] border-l border-[#d3d1c7] flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: visible ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e8e6e0]">
          {stage && (
            <>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-[#2c2c2a] font-mono">{stage.label}</span>
                  <span className={`text-[10px] font-mono font-medium ${statusColor[status]}`}>
                    {statusLabel[status]}
                  </span>
                  {status === 'running' && (
                    <div className="w-[10px] h-[10px] rounded-full border-[1.5px] border-[#d3d1c7] border-t-[#534ab7] animate-spin" />
                  )}
                </div>
                <p className="text-[11px] text-[#888780] font-mono mt-0.5">
                  stage {(stageIndex ?? 0) + 1} of {STAGES.length}
                  {dur && ` · completed in ${dur}`}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#e8e6e0] transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2L2 10" stroke="#888780" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Stage steps overview */}
        <div className="px-5 py-3 border-b border-[#e8e6e0]">
          <div className="flex gap-1.5">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className={`flex-1 h-[3px] rounded-full transition-all duration-300 ${
                  i < (stageIndex ?? -1)
                    ? 'bg-[#3b6d11]'
                    : i === stageIndex
                    ? status === 'running' ? 'bg-[#534ab7] animate-pulse' : status === 'success' ? 'bg-[#3b6d11]' : 'bg-[#a32d2d]'
                    : 'bg-[#e8e6e0]'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-[#b4b2a9] font-mono">{STAGES[0].label}</span>
            <span className="text-[9px] text-[#b4b2a9] font-mono">{STAGES[STAGES.length - 1].label}</span>
          </div>
        </div>

        {/* Log output */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-5 py-2.5 border-b border-[#e8e6e0] flex items-center gap-2">
            <span className="text-[10px] text-[#888780] font-mono uppercase tracking-[0.4px]">output</span>
            <span className="text-[10px] text-[#b4b2a9] font-mono ml-auto">{logs.length} lines</span>
          </div>
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto px-5 py-3 font-mono text-[11px]"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#d3d1c7 transparent' }}
          >
            {logs.length === 0 && (
              <span className="text-[#b4b2a9]">no output yet</span>
            )}
            {logs.map((entry, i) => (
              <div key={i} className="flex gap-3 leading-relaxed">
                <span className="text-[#d3d1c7] shrink-0 select-none">{String(i + 1).padStart(2, ' ')}</span>
                <span className="text-[#b4b2a9] shrink-0">{entry.ts}</span>
                <span className={typeColors[entry.type]}>{entry.msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#e8e6e0] flex items-center justify-between">
          <button
            disabled={(stageIndex ?? 0) <= 0}
            onClick={() => stageIndex !== null && stageIndex > 0 && onClose()}
            className="text-[11px] font-mono text-[#888780] hover:text-[#2c2c2a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            prev stage
          </button>
          <span className="text-[10px] text-[#b4b2a9] font-mono">
            {stageIndex !== null ? stageIndex + 1 : '—'} / {STAGES.length}
          </span>
          <button
            disabled={(stageIndex ?? STAGES.length) >= STAGES.length - 1}
            onClick={onClose}
            className="text-[11px] font-mono text-[#888780] hover:text-[#2c2c2a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            next stage
          </button>
        </div>
      </div>
    </>
  );
}
