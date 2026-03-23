'use client';
import { StageStatus } from '@/lib/pipeline';
import { STAGE_ICONS } from './StageIcons';

interface StageNodeProps {
  id: string;
  label: string;
  status: StageStatus;
  duration: string;
  index: number;
}

const nodeStyles: Record<StageStatus, string> = {
  pending: 'border-[#d3d1c7] bg-[#f7f6f3] opacity-40',
  running: 'border-[#534ab7] bg-[#eeedfe] animate-nodepulse',
  success: 'border-[#3b6d11] bg-[#eaf3de]',
  failed:  'border-[#a32d2d] bg-[#fcebeb]',
};

const iconColors: Record<StageStatus, string> = {
  pending: '#b4b2a9',
  running: '#3c3489',
  success: '#3b6d11',
  failed:  '#791f1f',
};

const dotStyles: Record<StageStatus, string> = {
  pending: 'bg-[#d3d1c7]',
  running: 'bg-[#534ab7] animate-dotring',
  success: 'bg-[#3b6d11]',
  failed:  'bg-[#a32d2d]',
};

export default function StageNode({ id, label, status, duration }: StageNodeProps) {
  const Icon = STAGE_ICONS[id];

  return (
    <div className="flex flex-col items-center gap-2 w-[52px]">
      <div
        className={`relative w-[52px] h-[52px] rounded-[10px] border-[1.5px] flex items-center justify-center transition-all duration-300 ${nodeStyles[status]}`}
        style={{ color: iconColors[status] }}
      >
        {Icon && <Icon />}
        <div
          className={`absolute -top-[5px] -right-[5px] w-3 h-3 rounded-full border-2 border-[#f7f6f3] ${dotStyles[status]}`}
        />
      </div>
      <span
        className={`text-[10px] font-medium tracking-[0.4px] uppercase text-center leading-tight transition-colors duration-300 ${
          status !== 'pending' ? 'text-[#2c2c2a]' : 'text-[#888780]'
        }`}
      >
        {label}
      </span>
      <span className="text-[10px] text-[#b4b2a9] font-mono min-h-[13px]">
        {status === 'success' ? duration : status === 'running' ? '…' : ''}
      </span>
    </div>
  );
}
