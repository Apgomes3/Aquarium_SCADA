import React, { useState } from 'react';
import { TankStatus } from './TankStatus';
import { WaterQualityChart } from './WaterQualityChart';
import { SystemAlerts } from './SystemAlerts';
import { AIInsights } from './AIInsights';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Droplets, Plus, X, FileText, Download, Layout, Eye, EyeOff } from 'lucide-react';

export function Dashboard({ setActiveTab, alerts, setAlerts }: { setActiveTab?: (tab: string) => void, alerts: any[], setAlerts: any }) {
  const [waterAdded, setWaterAdded] = useState(1250);
  const [waterInput, setWaterInput] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleAddWater = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(waterInput);
    if (!isNaN(amount) && amount > 0) {
      setWaterAdded(prev => prev + amount);
      setWaterInput('');
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Facility Overview</h2>
          <p className="text-sm text-slate-500">Real-time monitoring and telemetry.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md text-sm font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
          <button 
            onClick={() => setShowConfigModal(true)}
            className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Layout className="w-4 h-4" />
            Configure View
          </button>
        </div>
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0d131c] border border-slate-800 rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-100">Generate System Report</h3>
                <button onClick={() => setShowReportModal(false)} className="p-1 hover:bg-slate-800 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Report Type</label>
                  <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
                    <option>Daily Operations Summary</option>
                    <option>Water Quality Analysis</option>
                    <option>Alarm & Event Log</option>
                    <option>Energy Consumption Report</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Time Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 hover:bg-slate-700">Last 24h</button>
                    <button className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-400 hover:bg-slate-800">Last 7 Days</button>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="w-full py-3 bg-cyan-500 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all">
                    <Download className="w-5 h-5" />
                    Download PDF Report
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Config Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfigModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0d131c] border border-slate-800 rounded-2xl shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-100">Configure Dashboard View</h3>
                <button onClick={() => setShowConfigModal(false)} className="p-1 hover:bg-slate-800 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Visible Modules</label>
                  {[
                    { name: 'KPI Summary Cards', enabled: true },
                    { name: 'Tank Status Grid', enabled: true },
                    { name: 'Live Alarm Sidebar', enabled: true },
                    { name: 'Water Quality Trends', enabled: true },
                    { name: 'AI Insights Panel', enabled: true },
                  ].map(mod => (
                    <div key={mod.name} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                      <span className="text-sm text-slate-200">{mod.name}</span>
                      <button className={`p-1.5 rounded-md transition-colors ${mod.enabled ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 bg-slate-800'}`}>
                        {mod.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => setShowConfigModal(false)}
                    className="w-full py-3 bg-slate-800 text-slate-200 rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    Apply Layout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Facility KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-5 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Power Draw</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-bold text-slate-100">142.5</span>
              <span className="text-sm font-mono text-slate-500">kW</span>
            </div>
          </div>
          <div className="h-12 w-24 bg-slate-900 rounded-lg border border-slate-800 flex items-end p-1 gap-0.5">
            {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-amber-500/50 rounded-sm" style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-5 flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Water Added (24h)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-bold text-slate-100">{waterAdded.toLocaleString()}</span>
              <span className="text-sm font-mono text-slate-500">Gal</span>
            </div>
          </div>
          <form onSubmit={handleAddWater} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={waterInput}
                onChange={(e) => setWaterInput(e.target.value)}
                placeholder="Amount" 
                className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
              <button type="submit" className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="col-span-1 lg:col-span-2 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <TankStatus 
            id="TNK-01" 
            name="Ocean Voyager" 
            type="Saltwater"
            volume="6.3M Gal"
            status="optimal"
            metrics={{ temp: 24.5, ph: 8.2, salinity: 35.1, orp: 320 }}
          />
          <TankStatus 
            id="TNK-02" 
            name="Tropical Reef" 
            type="Saltwater"
            volume="1.2M Gal"
            status="warning"
            metrics={{ temp: 26.8, ph: 8.0, salinity: 34.8, orp: 280 }}
          />
          <TankStatus 
            id="TNK-03" 
            name="Cold Water" 
            type="Saltwater"
            volume="800K Gal"
            status="optimal"
            metrics={{ temp: 12.2, ph: 8.1, salinity: 33.5, orp: 350 }}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col gap-6"
        >
          <AIInsights />
          <SystemAlerts setActiveTab={setActiveTab} alerts={alerts} setAlerts={setAlerts} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 flex-1 min-h-[400px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-slate-200">Water Quality Trends</h3>
            <select className="bg-slate-900 border border-slate-800 text-sm text-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-cyan-500/50">
              <option>Ocean Voyager</option>
              <option>Tropical Reef</option>
              <option>Cold Water</option>
            </select>
          </div>
          <div className="flex-1 min-h-0">
            <WaterQualityChart />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
