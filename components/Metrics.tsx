'use client';

interface MetricsProps {
  tests: string;
  coverage: string;
  bundle: string;
  totalTime: string;
}

function MetricCard({ value, label, valueClass }: { value: string; label: string; valueClass: string }) {
  return (
    <div className="bg-white border border-[#d3d1c7] border-opacity-50 rounded-lg p-3 text-center transition-all hover:border-[#888780]">
      <div className={`text-lg font-medium leading-none mb-1 ${valueClass}`}>{value}</div>
      <div className="text-[10px] text-[#888780] uppercase tracking-[0.5px] font-mono">{label}</div>
    </div>
  );
}

export default function Metrics({ tests, coverage, bundle, totalTime }: MetricsProps) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      <MetricCard value={tests}     label="tests"      valueClass="text-[#3b6d11]" />
      <MetricCard value={coverage}  label="coverage"   valueClass="text-[#3c3489]" />
      <MetricCard value={bundle}    label="bundle"     valueClass="text-[#854f0b]" />
      <MetricCard value={totalTime} label="total time" valueClass="text-[#2c2c2a]" />
    </div>
  );
}
