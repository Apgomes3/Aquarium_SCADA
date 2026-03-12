import { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Wrench } from 'lucide-react';

export function SystemAlerts({ setActiveTab, alerts, setAlerts }: { setActiveTab?: (tab: string) => void, alerts: any[], setAlerts: any }) {
  const activeAlerts = alerts.filter(a => a.status === 'active');
  const activeCount = activeAlerts.length;

  const handleFix = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const handleAcknowledgeAll = () => {
    setAlerts(alerts.map(a => a.status === 'active' ? { ...a, status: 'acknowledged' } : a));
  };

  return (
    <div className="bg-[#0d131c] border border-slate-800 rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-slate-200 uppercase tracking-wider">Active Alerts</h3>
          {activeCount > 0 && (
            <button 
              onClick={handleAcknowledgeAll}
              className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest font-bold"
            >
              Ack All
            </button>
          )}
        </div>
        <span className={`${activeCount > 0 ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border text-xs px-2 py-0.5 rounded-full font-mono transition-colors`}>
          {activeCount} Active
        </span>
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeAlerts.map((alert) => (
          <div key={alert.id} className={`border rounded-lg p-3 flex flex-col gap-3 transition-all ${
            alert.status === 'resolved' ? 'bg-slate-900/30 border-slate-800/30 opacity-60' :
            alert.severity === 'critical' ? 'bg-rose-950/20 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.05)]' : 
            'bg-amber-950/20 border-amber-500/30'
          }`}>
            <div className="flex gap-3 items-start">
              <div className="mt-0.5">
                {alert.status === 'resolved' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> :
                 alert.severity === 'critical' ? <AlertCircle className="w-4 h-4 text-rose-400 animate-pulse" /> : 
                 <AlertTriangle className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${alert.status === 'resolved' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                  {alert.message}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-[10px] border border-slate-800">{alert.system}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{alert.timestamp.split(' ')[1]}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {alert.status === 'active' && (
              <div className="pt-2 border-t border-slate-800/50 flex justify-end">
                <button 
                  onClick={() => handleFix(alert.id)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/30 transition-colors"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  {alert.fix}
                </button>
              </div>
            )}
          </div>
        ))}
        {activeCount === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-slate-500 gap-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500/50" />
            <p className="text-sm">All systems nominal</p>
          </div>
        )}
      </div>
      
      <button 
        onClick={() => setActiveTab && setActiveTab('alerts')}
        className="mt-4 w-full py-2 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors uppercase tracking-wider"
      >
        View Alert History
      </button>
    </div>
  );
}
