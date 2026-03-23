'use client';
import { useState } from 'react';
import { BRANCHES, BranchCommit } from '@/lib/pipeline';

interface BranchSelectorProps {
  branch: string;
  commit: BranchCommit;
  onSelect: (branch: string, commit: BranchCommit) => void;
  disabled?: boolean;
}

export default function BranchSelector({ branch, commit, onSelect, disabled }: BranchSelectorProps) {
  const [open, setOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(branch);

  function handleCommit(b: string, c: BranchCommit) {
    onSelect(b, c);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`flex items-center gap-2 h-[26px] px-3 rounded bg-white border border-[#d3d1c7] text-[11px] font-mono transition-all
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-[#888780]'}
          ${open ? 'border-[#534ab7]' : ''}
        `}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="#888780">
          <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25zM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" />
        </svg>
        <span className="text-[#534ab7] font-medium max-w-[120px] truncate">{branch}</span>
        <span className="text-[#b4b2a9]">{commit.hash.slice(0, 7)}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="#b4b2a9">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#b4b2a9" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-[30px] left-0 z-50 w-[340px] bg-white border border-[#d3d1c7] rounded-lg overflow-hidden shadow-sm">
          <div className="flex border-b border-[#e8e6e0]">
            {Object.keys(BRANCHES).map((b) => (
              <button
                key={b}
                onClick={() => setActiveBranch(b)}
                className={`flex-1 h-[30px] text-[10px] font-mono font-medium px-2 transition-colors truncate
                  ${activeBranch === b
                    ? 'text-[#2c2c2a] border-b-2 border-[#2c2c2a]'
                    : 'text-[#888780] hover:text-[#2c2c2a]'
                  }
                `}
              >
                {b}
              </button>
            ))}
          </div>
          <div>
            {BRANCHES[activeBranch].map((c) => (
              <button
                key={c.hash}
                onClick={() => handleCommit(activeBranch, c)}
                className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-[#f7f6f3] transition-colors text-left border-b border-[#f1efe8] last:border-0"
              >
                <span className="text-[10px] font-mono text-[#534ab7] mt-0.5 shrink-0">{c.hash}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#2c2c2a] font-mono truncate">{c.message}</p>
                  <p className="text-[10px] text-[#b4b2a9] font-mono mt-0.5">{c.author} · {c.ago}</p>
                </div>
                {branch === activeBranch && commit.hash === c.hash && (
                  <svg width="12" height="12" viewBox="0 0 12 12" className="mt-0.5 shrink-0" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
}
