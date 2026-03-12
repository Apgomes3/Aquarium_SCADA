import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldAlert, CheckCircle2, PowerOff } from 'lucide-react';

const initialInterlocks = [
  { id: 'IL-01', name: 'Skimmer Overflow Protection', condition: 'SKM Cup Level > 95%', action: 'Stop Skimmer Feed Pump', status: 'active', tank: 'TNK-02' },
  { id: 'IL-02', name: 'Chiller High Temp Cutoff', condition: 'Chiller Return > 28°C', action: 'Disable Chiller Compressor', status: 'active', tank: 'TNK-03' },
  { id: 'IL-03', name: 'Sump Low Level Protection', condition: 'Sump Level < 20%', action: 'Stop Main Circulation Pump', status: 'standby', tank: 'TNK-01' },
  { id: 'IL-04', name: 'Ozone Leak Prevention', condition: 'Ambient O3 > 0.1 ppm', action: 'Shutdown Ozone Generator', status: 'standby', tank: 'Global' },
  { id: 'IL-05', name: 'Filter Overpressure', condition: 'Filter dP > 1.5 bar', action: 'Bypass Filter Array', status: 'active', tank: 'TNK-03' },
];

export function Interlocks() {
  const [interlocks, setInterlocks] = useState(initialInterlocks);

  const toggleStatus = (id: string) => {
    setInterlocks(interlocks.map(il => {
      if (il.id === id) {
        // Cannot easily toggle active alarms without resolving underlying issue, but we simulate override
        const newStatus = il.status === 'bypassed' ? 'standby' : 'bypassed';
        return { ...il, status: newStatus };
      }
      return il;
    }));
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Safety Interlocks</h2>
          <p className="text-sm text-slate-500">Automated hardware protection logic and overrides.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-md text-sm font-medium hover:bg-rose-500/20 transition-colors flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Emergency Stop All
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d131c] border border-slate-800 rounded-xl overflow-hidden flex-1 flex flex-col"
      >
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Interlock ID</th>
                <th className="p-4 font-medium">System / Tank</th>
                <th className="p-4 font-medium">Trigger Condition</th>
                <th className="p-4 font-medium">Automated Action</th>
                <th className="p-4 font-medium">State</th>
                <th className="p-4 font-medium text-right">Controls</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-800/50">
              {interlocks.map((il) => (
                <tr key={il.id} className={`transition-colors ${il.status === 'active' ? 'bg-rose-950/10' : 'hover:bg-slate-800/30'}`}>
                  <td className="p-4 font-mono text-cyan-400">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-slate-500" />
                      {il.id}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-200">
                    <div>{il.name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{il.tank}</div>
                  </td>
                  <td className="p-4 font-mono text-amber-400">{il.condition}</td>
                  <td className="p-4 font-mono text-slate-300">{il.action}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {il.status === 'active' && <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />}
                      {il.status === 'standby' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {il.status === 'bypassed' && <PowerOff className="w-4 h-4 text-amber-500" />}
                      <span className={`text-xs font-semibold uppercase tracking-wider ${
                        il.status === 'active' ? 'text-rose-400' : 
                        il.status === 'standby' ? 'text-emerald-400' : 'text-amber-500'
                      }`}>
                        {il.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => toggleStatus(il.id)}
                      className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded border transition-colors ${
                        il.status === 'bypassed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                    >
                      {il.status === 'bypassed' ? 'Enable' : 'Bypass'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
