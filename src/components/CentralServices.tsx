import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wind, RefreshCw, Droplets, Database, Activity, Thermometer, Zap, AlertCircle } from 'lucide-react';

export function CentralServices() {
  const [airPressure, setAirPressure] = useState(6.2);
  const [backwashStatus, setBackwashStatus] = useState('Filtering');
  
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">Central Services</h2>
          <p className="text-sm text-slate-500">Facility-wide support systems and utilities.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">All Systems Normal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Air Systems */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Compressed Air Systems</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">SYS-AIR-01</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Main Header Pressure</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-slate-100">{airPressure.toFixed(1)}</span>
                <span className="text-sm text-slate-500">BAR</span>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Compressor Load</div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-bold text-blue-400">42</span>
                <span className="text-sm text-slate-500">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-800/50">
              <span className="text-sm text-slate-300">Compressor A</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Running</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-800/50">
              <span className="text-sm text-slate-300">Compressor B</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px] font-bold uppercase">Standby</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-800/50">
              <span className="text-sm text-slate-300">Air Dryer</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Active</span>
            </div>
          </div>
        </motion.div>

        {/* Backwash Recovery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Backwash Recovery</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">SYS-BWR-01</span>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="flex-1 relative h-48 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
              <div className="absolute bottom-0 w-full bg-emerald-500/20 border-t border-emerald-500/40 transition-all duration-1000" style={{ height: '65%' }}></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-mono font-bold text-slate-100">65%</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Recovery Tank</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Current State</div>
                <div className="text-sm font-bold text-emerald-400">{backwashStatus}</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Daily Recovered</div>
                <div className="text-sm font-bold text-slate-200">12,450 L</div>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Turbidity</div>
                <div className="text-sm font-bold text-slate-200">1.2 NTU</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Saltwater Storage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Saltwater Storage</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">RES-SW-01</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'SW-TNK-A', level: '82%', sal: '35.2', temp: '22.1' },
              { id: 'SW-TNK-B', level: '45%', sal: '34.9', temp: '21.8' },
              { id: 'SW-TNK-C', level: '95%', sal: '35.5', temp: '22.4' },
            ].map(tank => (
              <div key={tank.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                <div className="text-[10px] text-slate-500 font-mono mb-2">{tank.id}</div>
                <div className="h-24 bg-slate-950 rounded border border-slate-800 mb-3 relative overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-cyan-500/30 border-t border-cyan-500/50" style={{ height: tank.level }}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-300">{tank.level}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">SAL</span>
                    <span className="text-slate-200">{tank.sal} ppt</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">TEMP</span>
                    <span className="text-slate-200">{tank.temp}°C</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Freshwater Reservoir */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0d131c] border border-slate-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-400/20 rounded-lg text-blue-300">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Freshwater Reservoir</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">RES-FW-01</span>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Inventory</div>
                <div className="text-3xl font-mono font-bold text-slate-100">1.25M <span className="text-sm text-slate-500">GAL</span></div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">RO Production</div>
                <div className="text-xl font-mono font-bold text-blue-400">450 <span className="text-sm text-slate-500">L/min</span></div>
              </div>
            </div>
            <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: '78%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
              <span>0 GAL</span>
              <span>78% CAPACITY</span>
              <span>1.6M GAL</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-800/50 flex items-center gap-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">UV Sterilizer</div>
                <div className="text-xs font-bold text-slate-200">Active - 98% Eff.</div>
              </div>
            </div>
            <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-800/50 flex items-center gap-3">
              <Activity className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">TDS Monitor</div>
                <div className="text-xs font-bold text-slate-200">12 ppm</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
