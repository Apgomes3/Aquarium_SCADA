import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock, Filter, Search, Wrench, ShieldAlert } from 'lucide-react';

const initialAlerts = [
  { id: 'ALM-1042', timestamp: '2026-03-07 19:45:22', severity: 'critical', message: 'Protein Skimmer Overflow Detected', system: 'TNK-02', value: '98%', limit: '> 95%', status: 'active', fix: 'Drain Cup & Reset Skimmer' },
  { id: 'ALM-1041', timestamp: '2026-03-07 19:40:15', severity: 'critical', message: 'Chiller Failure / High Temp', system: 'TNK-03', value: '14.5 °C', limit: '> 14.0 °C', status: 'active', fix: 'Switch to Backup Chiller' },
  { id: 'ALM-1040', timestamp: '2026-03-07 18:30:00', severity: 'warning', message: 'Filter Backwash Overdue', system: 'TNK-03', value: '1.2 bar', limit: '> 1.0 bar', status: 'active', fix: 'Initiate Backwash Cycle' },
  { id: 'ALM-1039', timestamp: '2026-03-07 16:15:10', severity: 'info', message: 'Automated Dosing Completed', system: 'TNK-01', value: '500 ml', limit: 'N/A', status: 'resolved', fix: '' },
  { id: 'ALM-1038', timestamp: '2026-03-07 14:20:05', severity: 'warning', message: 'Low Sump Level', system: 'TNK-01', value: '45%', limit: '< 50%', status: 'acknowledged', fix: 'Check Auto Top-Off' },
  { id: 'ALM-1037', timestamp: '2026-03-07 10:05:00', severity: 'critical', message: 'Main Pump P-01A Power Loss', system: 'TNK-01', value: '0 kW', limit: '< 5 kW', status: 'resolved', fix: 'Reset Breaker' },
  { id: 'ALM-1036', timestamp: '2026-03-06 22:30:00', severity: 'warning', message: 'pH Dropping', system: 'TNK-02', value: '7.85', limit: '< 7.9', status: 'resolved', fix: 'Buffer Added' },
];

export function AlertsModule({ alerts, setAlerts }: { alerts: any[], setAlerts: any }) {
  const [filter, setFilter] = useState('all'); // all, active, critical, warning

  const filteredAlerts = alerts.filter(a => {
    if (filter === 'active') return a.status === 'active';
    if (filter === 'critical') return a.severity === 'critical';
    if (filter === 'warning') return a.severity === 'warning';
    return true;
  });

  const handleStatusChange = (id: string, newStatus: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleAcknowledgeAll = () => {
    setAlerts(alerts.map(a => a.status === 'active' ? { ...a, status: 'acknowledged' } : a));
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-rose-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'info': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default: return null;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'info': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'text-rose-400';
      case 'acknowledged': return 'text-amber-400';
      case 'resolved': return 'text-slate-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">System Alerts & Logs</h2>
          <p className="text-sm text-slate-500">Historical and active alarm management.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAcknowledgeAll}
            className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            Acknowledge All
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-[#0d131c] p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search alerts by ID, message, or system..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-md pl-9 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-sm text-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all">All Alerts</option>
            <option value="active">Active Only</option>
            <option value="critical">Critical Only</option>
            <option value="warning">Warnings Only</option>
          </select>
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
                <th className="p-4 font-medium">Alert ID</th>
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Severity</th>
                <th className="p-4 font-medium">Message</th>
                <th className="p-4 font-medium">System</th>
                <th className="p-4 font-medium">Value / Limit</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-800/50">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className={`transition-colors ${alert.status === 'active' && alert.severity === 'critical' ? 'bg-rose-950/10' : 'hover:bg-slate-800/30'}`}>
                  <td className="p-4 font-mono text-cyan-400">{alert.id}</td>
                  <td className="p-4 font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {alert.timestamp}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-bold uppercase tracking-wider ${getSeverityClass(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                      {alert.severity}
                    </div>
                  </td>
                  <td className={`p-4 font-medium ${alert.status === 'resolved' ? 'text-slate-500' : 'text-slate-200'}`}>
                    {alert.message}
                    {alert.fix && alert.status === 'active' && (
                      <div className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                        <Wrench className="w-3 h-3" /> Fix: {alert.fix}
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-mono text-slate-400">{alert.system}</td>
                  <td className="p-4 font-mono">
                    <span className={alert.status === 'active' ? 'text-rose-400' : 'text-slate-300'}>{alert.value}</span>
                    <span className="text-slate-500 mx-1">/</span>
                    <span className="text-slate-500">{alert.limit}</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-semibold uppercase tracking-wider text-xs ${getStatusClass(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {alert.status === 'active' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(alert.id, 'acknowledged')}
                            className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded border bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 transition-colors"
                          >
                            Ack
                          </button>
                          <button 
                            onClick={() => handleStatusChange(alert.id, 'resolved')}
                            className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <button 
                          onClick={() => handleStatusChange(alert.id, 'resolved')}
                          className="text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
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
