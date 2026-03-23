'use client';
import { useEffect, useRef } from 'react';
import { LogEntry } from '@/lib/pipeline';

interface LogPanelProps {
  logs: LogEntry[];
  title: string;
  running: boolean;
}

const typeColors: Record<LogEntry['type'], string> = {
  run:  'text-[#3c3489]',
  ok:   'text-[#3b6d11]',
  warn: 'text-[#633806]',
  dim:  'text-[#888780]',
  err:  'text-[#791f1f]',
};

export default function LogPanel({ logs, title, running }: LogPanelProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-white border border-[#d3d1c7] border-opacity-50 rounded-lg overflow-hidden mb-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#e8e6e0] bg-[#faf9f7]">
        <div className="flex gap-[5px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#f09595]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#fac775]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#97c459]" />
        </div>
        {running && (
          <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-[#d3d1c7] border-t-[#534ab7] animate-spin ml-1" />
        )}
        <span className="text-[11px] text-[#888780] tracking-[0.3px] font-mono ml-1">{title}</span>
      </div>
      <div
        ref={bodyRef}
        className="p-3 px-4 min-h-[120px] max-h-[140px] overflow-y-auto"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#d3d1c7 transparent' }}
      >
        {logs.map((entry, i) => (
          <div
            key={i}
            className="flex gap-3 font-mono text-[11px] leading-relaxed animate-logslide"
          >
            <span className="text-[#b4b2a9] shrink-0">{entry.ts}</span>
            <span className={typeColors[entry.type]}>{entry.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
