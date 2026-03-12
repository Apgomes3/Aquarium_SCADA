import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Power, Settings, Filter, Wind, Thermometer, Droplets, X, Save } from 'lucide-react';

const initialLssData: Record<string, any[]> = {
  'TNK-01': [
    { id: 'PMP-01A', name: 'Main Circulation Pump A', type: 'Pump', status: 'Running', input: '400V / 32A', output: '12,500 L/m', setPoint: '12,500 L/m', runtime: '4,200 hrs', icon: Power, minLevel: '0', maxLevel: '15000', highAlarm: '14500', lowAlarm: '10000' },
    { id: 'PMP-01B', name: 'Main Circulation Pump B', type: 'Pump', status: 'Standby', input: '0V / 0A', output: '0 L/m', setPoint: '12,500 L/m', runtime: '1,100 hrs', icon: Power, minLevel: '0', maxLevel: '15000', highAlarm: '14500', lowAlarm: '10000' },
    { id: 'FLT-01', name: 'Primary Sand Filter', type: 'Filter', status: 'Running', input: '12,500 L/m', output: '0.5 bar dP', setPoint: '< 1.0 bar dP', runtime: '840 hrs', icon: Filter, minLevel: '0', maxLevel: '2.0', highAlarm: '1.5', lowAlarm: '0.1' },
    { id: 'SKM-01', name: 'Protein Skimmer', type: 'Skimmer', status: 'Running', input: '450 L/m Air', output: '42% Cup Level', setPoint: '< 80% Cup', runtime: '2,100 hrs', icon: Wind, minLevel: '0', maxLevel: '100', highAlarm: '90', lowAlarm: '10' },
    { id: 'CHL-01', name: 'Chiller Unit', type: 'Temperature', status: 'Running', input: '45% Load', output: '24.5 °C', setPoint: '24.5 °C', runtime: '5,600 hrs', icon: Thermometer, minLevel: '10', maxLevel: '30', highAlarm: '26', lowAlarm: '22' },
    { id: 'UV-01', name: 'UV Sterilizer Array', type: 'Sterilization', status: 'Running', input: '2.4 kW', output: '92% Intensity', setPoint: '> 80%', runtime: '3,200 hrs', icon: Activity, minLevel: '0', maxLevel: '100', highAlarm: '100', lowAlarm: '70' },
  ],
  'TNK-02': [
    { id: 'PMP-02A', name: 'Reef Circulation Pump', type: 'Pump', status: 'Running', input: '230V / 15A', output: '4,200 L/m', setPoint: '4,200 L/m', runtime: '8,900 hrs', icon: Power, minLevel: '0', maxLevel: '5000', highAlarm: '4800', lowAlarm: '3500' },
    { id: 'FLT-02', name: 'Bio-Filter Array', type: 'Filter', status: 'Running', input: '4,200 L/m', output: '0.6 bar dP', setPoint: '< 1.2 bar dP', runtime: '1,200 hrs', icon: Filter, minLevel: '0', maxLevel: '2.0', highAlarm: '1.5', lowAlarm: '0.1' },
    { id: 'SKM-02', name: 'High-Cap Skimmer', type: 'Skimmer', status: 'Warning', input: '420 L/m Air', output: '98% Cup Level', setPoint: '< 80% Cup', runtime: '4,500 hrs', icon: Wind, minLevel: '0', maxLevel: '100', highAlarm: '85', lowAlarm: '10' },
    { id: 'DOS-02', name: 'Calcium Reactor', type: 'Dosing', status: 'Running', input: '15 ml/min', output: 'pH 6.5 Effluent', setPoint: 'pH 6.5', runtime: '900 hrs', icon: Droplets, minLevel: '6.0', maxLevel: '7.0', highAlarm: '6.8', lowAlarm: '6.2' },
  ],
  'TNK-03': [
    { id: 'PMP-03A', name: 'Cold Water Pump', type: 'Pump', status: 'Running', input: '400V / 28A', output: '2,000 L/m', setPoint: '2,500 L/m', runtime: '12,000 hrs', icon: Power, minLevel: '0', maxLevel: '3000', highAlarm: '2800', lowAlarm: '1500' },
    { id: 'FLT-03', name: 'Mechanical Filter', type: 'Filter', status: 'Warning', input: '2,000 L/m', output: '1.2 bar dP', setPoint: '< 1.0 bar dP', runtime: 'OVERDUE', icon: Filter, minLevel: '0', maxLevel: '2.0', highAlarm: '1.0', lowAlarm: '0.1' },
    { id: 'CHL-03', name: 'Heavy Duty Chiller', type: 'Temperature', status: 'Critical', input: '100% Load', output: '14.5 °C', setPoint: '12.0 °C', runtime: '8,400 hrs', icon: Thermometer, minLevel: '5', maxLevel: '20', highAlarm: '14', lowAlarm: '10' },
  ]
};

export function LifeSupportTable() {
  const [selectedTank, setSelectedTank] = useState('TNK-01');
  const [lssData, setLssData] = useState(initialLssData);
  const [editingItem, setEditingItem] = useState<any>(null);

  const equipment = lssData[selectedTank] || [];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    setLssData(prev => ({
      ...prev,
      [selectedTank]: prev[selectedTank].map(item => item.id === editingItem.id ? editingItem : item)
    }));
    setEditingItem(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditingItem((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Life Support Systems</h2>
          <p className="text-sm text-slate-500">Detailed component I/O and set values.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedTank}
            onChange={(e) => setSelectedTank(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-sm text-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="TNK-01">Ocean Voyager (TNK-01)</option>
            <option value="TNK-02">Tropical Reef (TNK-02)</option>
            <option value="TNK-03">Cold Water (TNK-03)</option>
          </select>
          <button className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      <motion.div 
        key={selectedTank}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d131c] border border-slate-800 rounded-xl overflow-hidden flex-1 flex flex-col"
      >
        <div className="overflow-x-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 font-medium">Equipment ID</th>
                <th className="p-4 font-medium">Component</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Input (Power/Feed)</th>
                <th className="p-4 font-medium">Output (Flow/Val)</th>
                <th className="p-4 font-medium">Set Value</th>
                <th className="p-4 font-medium">Runtime</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-800/50">
              {equipment.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-mono text-cyan-400">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-500" />
                        {item.id}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-200">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.type}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border ${
                        item.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'Standby' ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' :
                        item.status === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-300">{item.input}</td>
                    <td className="p-4 font-mono font-bold text-slate-100">{item.output}</td>
                    <td className="p-4 font-mono text-cyan-400">{item.setPoint}</td>
                    <td className="p-4 font-mono text-slate-400">{item.runtime}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setEditingItem({ ...item })}
                        className="p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Instrument Settings"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Settings Modal */}
      {editingItem && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Instrument Settings</h3>
                  <p className="text-xs font-mono text-slate-500">{editingItem.id} | {editingItem.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setEditingItem(null)}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-2">Operating Range</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Min Level</label>
                    <input 
                      type="text" 
                      value={editingItem.minLevel || ''}
                      onChange={(e) => handleInputChange('minLevel', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Max Level</label>
                    <input 
                      type="text" 
                      value={editingItem.maxLevel || ''}
                      onChange={(e) => handleInputChange('maxLevel', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-2">Alarm Thresholds</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Low Alarm (LL)</label>
                    <input 
                      type="text" 
                      value={editingItem.lowAlarm || ''}
                      onChange={(e) => handleInputChange('lowAlarm', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-amber-400 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">High Alarm (HH)</label>
                    <input 
                      type="text" 
                      value={editingItem.highAlarm || ''}
                      onChange={(e) => handleInputChange('highAlarm', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-rose-400 font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Set Point (SP)</label>
                  <input 
                    type="text" 
                    value={editingItem.setPoint || ''}
                    onChange={(e) => handleInputChange('setPoint', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button 
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white border border-cyan-500 rounded-md text-sm font-medium hover:bg-cyan-500 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Configuration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
