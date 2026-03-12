import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Save,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';

export function Settings() {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General System', icon: SettingsIcon },
    { id: 'account', label: 'User Profile', icon: User },
    { id: 'notifications', label: 'Alert Config', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'data', label: 'Historian & DB', icon: Database },
    { id: 'network', label: 'Network & API', icon: Globe },
  ];

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">System Settings</h2>
          <p className="text-sm text-slate-500">Configure global parameters, user access, and system integrations.</p>
        </div>
        <button className="px-4 py-2 bg-cyan-500 text-slate-900 rounded-md text-sm font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Sidebar */}
        <div className="w-64 flex flex-col gap-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#0d131c] border border-slate-800 rounded-xl overflow-y-auto custom-scrollbar p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl space-y-8"
            >
              {activeSection === 'general' && (
                <>
                  <section className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      SCADA Engine Configuration
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Polling Rate (ms)</label>
                        <input type="number" defaultValue={500} className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">System ID</label>
                        <input type="text" defaultValue="AQUA-SCADA-01" className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                      <HardDrive className="w-5 h-5 text-cyan-400" />
                      Storage & Logging
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                        <div>
                          <p className="text-sm font-medium text-slate-200">Auto-Archive Logs</p>
                          <p className="text-xs text-slate-500">Move logs older than 30 days to cold storage.</p>
                        </div>
                        <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                        <div>
                          <p className="text-sm font-medium text-slate-200">High-Resolution Telemetry</p>
                          <p className="text-xs text-slate-500">Store 1s interval data for critical sensors.</p>
                        </div>
                        <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-lg font-medium text-slate-200 flex items-center gap-2">
                      <Network className="w-5 h-5 text-cyan-400" />
                      Communication Protocols
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {['Modbus TCP', 'OPC UA', 'MQTT', 'BACnet'].map(protocol => (
                        <div key={protocol} className="flex items-center gap-3 p-3 bg-slate-900/30 rounded border border-slate-800">
                          <input type="checkbox" defaultChecked={protocol !== 'BACnet'} className="accent-cyan-500" />
                          <span className="text-sm text-slate-300">{protocol}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {activeSection !== 'general' && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <SettingsIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm">This settings module is currently being provisioned.</p>
                  <p className="text-xs mt-1">Contact system administrator for access.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { AnimatePresence } from 'motion/react';
