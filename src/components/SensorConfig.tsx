import { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, Activity, Save } from 'lucide-react';

const initialSensors = [
  { id: 'TE-01', type: 'Temperature', tank: 'TNK-01', value: '24.5', unit: '°C', ll: '22.0', l: '23.5', h: '26.0', hh: '28.0', mode: 'PID', p: '2.5', i: '0.1', d: '0.05' },
  { id: 'PH-01', type: 'pH', tank: 'TNK-01', value: '8.2', unit: '', ll: '7.8', l: '8.0', h: '8.4', hh: '8.6', mode: 'PID', p: '1.2', i: '0.05', d: '0.01' },
  { id: 'ORP-01', type: 'ORP', tank: 'TNK-01', value: '320', unit: 'mV', ll: '250', l: '280', h: '400', hh: '450', mode: 'Manual', p: '-', i: '-', d: '-' },
  { id: 'TE-02', type: 'Temperature', tank: 'TNK-02', value: '26.8', unit: '°C', ll: '24.0', l: '25.0', h: '26.5', hh: '28.0', mode: 'PID', p: '3.0', i: '0.2', d: '0.1' },
  { id: 'PH-02', type: 'pH', tank: 'TNK-02', value: '8.0', unit: '', ll: '7.8', l: '7.9', h: '8.3', hh: '8.5', mode: 'PID', p: '1.5', i: '0.1', d: '0.02' },
];

export function SensorConfig() {
  const [sensors, setSensors] = useState(initialSensors);

  const handleModeToggle = (id: string) => {
    setSensors(sensors.map(s => {
      if (s.id === id) {
        return { ...s, mode: s.mode === 'PID' ? 'Manual' : 'PID', p: s.mode === 'PID' ? '-' : '1.0', i: s.mode === 'PID' ? '-' : '0.1', d: s.mode === 'PID' ? '-' : '0.0' };
      }
      return s;
    }));
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Sensor Configuration</h2>
          <p className="text-sm text-slate-500">Alarm limits and PID loop tuning parameters.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md text-sm font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
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
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Sensor ID</th>
                <th className="p-4 font-medium">Type / Tank</th>
                <th className="p-4 font-medium">Current</th>
                <th className="p-4 font-medium text-rose-400">Low-Low</th>
                <th className="p-4 font-medium text-amber-400">Low</th>
                <th className="p-4 font-medium text-amber-400">High</th>
                <th className="p-4 font-medium text-rose-400">High-High</th>
                <th className="p-4 font-medium">Control Mode</th>
                <th className="p-4 font-medium">P</th>
                <th className="p-4 font-medium">I</th>
                <th className="p-4 font-medium">D</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-800/50">
              {sensors.map((sensor) => (
                <tr key={sensor.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-mono text-cyan-400">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-slate-500" />
                      {sensor.id}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{sensor.type}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{sensor.tank}</div>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-100">{sensor.value} <span className="text-xs text-slate-500 font-sans">{sensor.unit}</span></td>
                  
                  {/* Alarm Limits (Editable visually) */}
                  <td className="p-4">
                    <input type="text" defaultValue={sensor.ll} className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-rose-400 focus:outline-none focus:border-cyan-500" />
                  </td>
                  <td className="p-4">
                    <input type="text" defaultValue={sensor.l} className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-amber-400 focus:outline-none focus:border-cyan-500" />
                  </td>
                  <td className="p-4">
                    <input type="text" defaultValue={sensor.h} className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-amber-400 focus:outline-none focus:border-cyan-500" />
                  </td>
                  <td className="p-4">
                    <input type="text" defaultValue={sensor.hh} className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-rose-400 focus:outline-none focus:border-cyan-500" />
                  </td>

                  {/* PID Controls */}
                  <td className="p-4">
                    <button 
                      onClick={() => handleModeToggle(sensor.id)}
                      className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded border transition-colors w-20 ${
                        sensor.mode === 'PID' 
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {sensor.mode}
                    </button>
                  </td>
                  <td className="p-4">
                    <input type="text" value={sensor.p} disabled={sensor.mode === 'Manual'} className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-slate-300 disabled:opacity-50 focus:outline-none focus:border-cyan-500" />
                  </td>
                  <td className="p-4">
                    <input type="text" value={sensor.i} disabled={sensor.mode === 'Manual'} className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-slate-300 disabled:opacity-50 focus:outline-none focus:border-cyan-500" />
                  </td>
                  <td className="p-4">
                    <input type="text" value={sensor.d} disabled={sensor.mode === 'Manual'} className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 font-mono text-slate-300 disabled:opacity-50 focus:outline-none focus:border-cyan-500" />
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
