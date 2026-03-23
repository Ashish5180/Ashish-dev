'use client';
import { HistoryEntry, Environment, ENVIRONMENTS } from '@/lib/pipeline';

interface HistoryPanelProps {
  entries: HistoryEntry[];
}

function envStyle(env: Environment) {
  return ENVIRONMENTS.find((e) => e.id === env) ?? ENVIRONMENTS[0];
}

export default function HistoryPanel({ entries }: HistoryPanelProps) {
  return (
    <div className="mt-5 border border-[#d3d1c7] rounded-lg overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#faf9f7] border-b border-[#e8e6e0]">
        <span className="text-[11px] font-medium text-[#2c2c2a] font-mono tracking-[0.3px]">run history</span>
        <span className="text-[10px] text-[#b4b2a9] font-mono">{entries.length} runs</span>
      </div>
      <div>
        {entries.map((entry, i) => {
          const env = envStyle(entry.env);
          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 px-4 py-2.5 font-mono text-[11px] transition-colors hover:bg-[#faf9f7] ${
                i < entries.length - 1 ? 'border-b border-[#f1efe8]' : ''
              }`}
            >
              {/* Status dot */}
              <div
                className={`w-[7px] h-[7px] rounded-full shrink-0 ${
                  entry.status === 'success' ? 'bg-[#3b6d11]' : 'bg-[#a32d2d]'
                }`}
              />

              {/* Run number */}
              <span className="text-[#b4b2a9] w-[38px] shrink-0">#{entry.id}</span>

              {/* Commit + message */}
              <span className="text-[#534ab7] w-[54px] shrink-0">{entry.commit}</span>
              <span className="text-[#2c2c2a] flex-1 truncate">{entry.message}</span>

              {/* Branch */}
              <span className="text-[#888780] hidden md:block max-w-[120px] truncate shrink-0">{entry.branch}</span>

              {/* Env badge */}
              <span
                className="shrink-0 px-2 py-0.5 rounded text-[10px] font-medium"
                style={{ background: env.bg, color: env.color }}
              >
                {env.label}
              </span>

              {/* Duration */}
              <span className="text-[#b4b2a9] w-[32px] text-right shrink-0">{entry.duration}</span>

              {/* Triggered by */}
              <span className="text-[#888780] w-[56px] text-right shrink-0 truncate">{entry.triggeredBy}</span>

              {/* Timestamp */}
              <span className="text-[#b4b2a9] w-[68px] text-right shrink-0">{entry.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
