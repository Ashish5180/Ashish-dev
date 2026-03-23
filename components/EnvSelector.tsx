'use client';
import { Environment, ENVIRONMENTS } from '@/lib/pipeline';

interface EnvSelectorProps {
  value: Environment;
  onChange: (env: Environment) => void;
  disabled?: boolean;
}

export default function EnvSelector({ value, onChange, disabled }: EnvSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      {ENVIRONMENTS.map((env) => (
        <button
          key={env.id}
          onClick={() => !disabled && onChange(env.id)}
          disabled={disabled}
          className={`h-[24px] px-3 rounded text-[10px] font-medium font-mono tracking-[0.3px] border transition-all duration-150
            ${value === env.id
              ? 'border-transparent'
              : 'bg-white border-[#d3d1c7] text-[#888780] hover:border-[#888780] hover:text-[#2c2c2a]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.97]'}
          `}
          style={value === env.id ? { background: env.bg, color: env.color } : {}}
        >
          {env.label}
        </button>
      ))}
    </div>
  );
}
