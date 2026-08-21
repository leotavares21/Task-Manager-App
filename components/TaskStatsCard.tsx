interface TaskStatsCardProps {
  label: string;
  value: number;
  color: 'slate' | 'emerald' | 'amber';
}

const colorStyles = {
  slate: 'text-slate-200 border-slate-800 bg-slate-900',
  emerald: 'text-emerald-400 border-emerald-950/50 bg-emerald-950/20',
  amber: 'text-amber-400 border-amber-950/50 bg-amber-950/20',
};

export function TaskStatsCard({ label, value, color }: TaskStatsCardProps) {
  return (
    <div className={`p-4 rounded-xl border ${colorStyles[color]} flex flex-col justify-between transition-all hover:scale-[1.02]`}>
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-3xl font-bold mt-2">
        {value}
      </span>
    </div>
  );
}