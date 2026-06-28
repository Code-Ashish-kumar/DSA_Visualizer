export default function InfoCard({ label, value, color }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm border border-slate-100 text-center">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-sm font-bold font-mono ${color}`}>{value}</p>
    </div>
  );
}