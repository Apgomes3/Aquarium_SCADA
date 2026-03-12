import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Droplets, Wind, Thermometer, Activity, Settings, Power, Filter, Camera, AlertCircle, X, TrendingUp } from 'lucide-react';
import { WaterQualityChart } from './WaterQualityChart';

const tankConfigs: Record<string, any> = {
  'TNK-01': {
    id: 'TNK-01',
    name: 'Ocean Voyager',
    vol: '6.3M GAL',
    tank: { temp: '24.5', tempAlert: false, ph: '8.2', phAlert: false, sal: '35.1', salAlert: false, orp: '320', orpAlert: false, status: 'optimal' },
    sump: { id: 'SMP-01', level: '85%', makeup: 'Standby', dosing: 'Active', status: 'optimal' },
    skimmer: { id: 'SKM-01', air: '450 L/m', cup: '42%', cupAlert: false, status: 'optimal' },
    pump: { id: 'PMP-01A', power: '15.2 kW', flow: '12.5k L/m', status: 'optimal' },
    filter: { id: 'FLT-01', dp: '0.5 bar', dpAlert: false, backwash: '14 hrs', status: 'optimal' },
    chiller: { id: 'CHL-01', load: '45%', loadAlert: false, uv: '92%', uvAlert: false, status: 'optimal' }
  },
  'TNK-02': {
    id: 'TNK-02',
    name: 'Tropical Reef',
    vol: '1.2M GAL',
    tank: { temp: '26.8', tempAlert: true, ph: '8.0', phAlert: false, sal: '34.8', salAlert: false, orp: '280', orpAlert: true, status: 'warning' },
    sump: { id: 'SMP-02', level: '90%', makeup: 'Active', dosing: 'Active', status: 'optimal' },
    skimmer: { id: 'SKM-02', air: '420 L/m', cup: '98%', cupAlert: true, status: 'critical' },
    pump: { id: 'PMP-02A', power: '8.5 kW', flow: '4.2k L/m', status: 'optimal' },
    filter: { id: 'FLT-02', dp: '0.6 bar', dpAlert: false, backwash: '48 hrs', status: 'optimal' },
    chiller: { id: 'CHL-02', load: '60%', loadAlert: false, uv: '85%', uvAlert: false, status: 'optimal' }
  },
  'TNK-03': {
    id: 'TNK-03',
    name: 'Cold Water',
    vol: '800K GAL',
    tank: { temp: '14.5', tempAlert: true, ph: '8.1', phAlert: false, sal: '33.5', salAlert: false, orp: '350', orpAlert: false, status: 'warning' },
    sump: { id: 'SMP-03', level: '75%', makeup: 'Standby', dosing: 'Standby', status: 'optimal' },
    skimmer: { id: 'SKM-03', air: '300 L/m', cup: '60%', cupAlert: false, status: 'optimal' },
    pump: { id: 'PMP-03A', power: '12.0 kW', flow: '2.0k L/m', status: 'warning' },
    filter: { id: 'FLT-03', dp: '1.2 bar', dpAlert: true, backwash: 'OVERDUE', status: 'warning' },
    chiller: { id: 'CHL-03', load: '100%', loadAlert: true, uv: '40%', uvAlert: true, status: 'critical' }
  }
};

const getNodeClasses = (status: string) => {
  if (status === 'critical') return 'border-rose-500 animate-scada-flash bg-rose-950/20 cursor-pointer';
  if (status === 'warning') return 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] bg-amber-950/10 cursor-pointer';
  return 'border-slate-700 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-slate-900';
};

export function TankManagement({ alerts, setAlerts }: { alerts: any[], setAlerts: any }) {
  const [selectedTank, setSelectedTank] = useState('TNK-01');
  const [selectedAlarm, setSelectedAlarm] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedTrend, setSelectedTrend] = useState<{ tankId: string, tankName: string, parameter: string } | null>(null);
  const [isOverrideActive, setIsOverrideActive] = useState(false);
  const [stoppedPumps, setStoppedPumps] = useState<string[]>([]);
  
  const config = tankConfigs[selectedTank];
  
  const togglePump = (pumpId: string) => {
    if (stoppedPumps.includes(pumpId)) {
      setStoppedPumps(prev => prev.filter(id => id !== pumpId));
    } else {
      setStoppedPumps(prev => [...prev, pumpId]);
    }
  };

  const handleNodeClick = (tankId: string) => {
    const activeAlert = alerts.find(a => a.system === tankId && a.status === 'active');
    if (activeAlert) {
      setSelectedAlarm(activeAlert);
    }
  };

  const handleParamClick = (tankId: string, tankName: string, parameter: string) => {
    setSelectedTrend({ tankId, tankName, parameter });
  };

  const getParameterLabel = (param: string) => {
    switch (param.toLowerCase()) {
      case 'temp': return 'Temperature';
      case 'ph': return 'pH';
      case 'salinity': case 'sal': return 'Salinity';
      case 'orp': return 'ORP';
      default: return param;
    }
  };

  const updateAlarmStatus = (id: string, newStatus: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setSelectedAlarm(null);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100 tracking-tight">LSS System Management</h2>
          <p className="text-sm text-slate-500">Piping and Instrumentation Diagram for {config.name}.</p>
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
          <button 
            onClick={() => setShowCamera(true)}
            className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Live Camera
          </button>
          <button 
            onClick={() => setIsOverrideActive(!isOverrideActive)}
            className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
              isOverrideActive 
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 hover:bg-rose-500/30' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Override
          </button>
        </div>
      </div>

      <motion.div 
        key={selectedTank}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0a0f16] border border-slate-800 rounded-xl flex-1 relative overflow-hidden flex items-center justify-center p-6 shadow-2xl"
      >
        <div className="w-full h-full min-h-[600px] relative">
          <svg viewBox="0 0 1200 800" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {selectedTank === 'TNK-01' && (
              <g>
                {/* Pipes TNK-01 */}
                <Pipe d="M 600 270 L 600 550" /> {/* Tank to Sump */}
                <Pipe d="M 400 650 L 360 650" /> {/* Sump to Skimmer Pump */}
                <Pipe d="M 320 650 L 320 650" /> {/* Pump to Skimmers */}
                <Pipe d="M 320 500 L 450 500 L 450 550" /> {/* Skimmers to Sump */}
                <Pipe d="M 800 650 L 850 650" /> {/* Sump to Pump A */}
                <Pipe d="M 800 650 L 800 750 L 1050 750 L 1050 710" /> {/* Sump to Pump B */}
                <Pipe d="M 960 550 L 960 470" /> {/* Pumps to Filter Bank */}
                <Pipe d="M 1010 250 L 1010 100 L 550 100" /> {/* Filter to UV Pump */}
                <Pipe d="M 510 100 L 160 100 L 160 150" /> {/* Pump to UV */}
                <Pipe d="M 270 250 L 350 250" /> {/* UV to Tank */}

                {/* Nodes TNK-01 */}
                <foreignObject x={350} y={50} width={500} height={220}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full">
                    <MainTankNode config={config} onParamClick={(param: string) => handleParamClick(config.id, config.name, param)} />
                  </div>
                </foreignObject>
                <foreignObject x={400} y={550} width={400} height={160}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full"><SumpNode config={config} /></div>
                </foreignObject>
                <foreignObject x={320} y={600} width={80} height={100}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full">
                    <PumpNode 
                      config={{...config, pump: { ...config.pump, id: 'PMP-01S' }}} 
                      compact 
                      isStopped={stoppedPumps.includes('PMP-01S')}
                      onToggle={() => isOverrideActive && togglePump('PMP-01S')}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={510} y={50} width={80} height={100}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full">
                    <PumpNode 
                      config={{...config, pump: { ...config.pump, id: 'PMP-01U' }}} 
                      compact 
                      isStopped={stoppedPumps.includes('PMP-01U')}
                      onToggle={() => isOverrideActive && togglePump('PMP-01U')}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={50} y={450} width={270} height={260}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full">
                    <div className="flex flex-col gap-2 h-full">
                      <SkimmerNode config={{...config, skimmer: { ...config.skimmer, id: 'SKM-01A' }}} compact />
                      <SkimmerNode config={{...config, skimmer: { ...config.skimmer, id: 'SKM-01B' }}} compact />
                    </div>
                  </div>
                </foreignObject>
                <foreignObject x={850} y={550} width={300} height={160}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full flex gap-2">
                    <PumpNode 
                      config={{...config, pump: { ...config.pump, id: 'PMP-01A' }}} 
                      compact 
                      isStopped={stoppedPumps.includes('PMP-01A')}
                      onToggle={() => isOverrideActive && togglePump('PMP-01A')}
                    />
                    <PumpNode 
                      config={{...config, pump: { ...config.pump, id: 'PMP-01B' }}} 
                      compact 
                      isStopped={stoppedPumps.includes('PMP-01B')}
                      onToggle={() => isOverrideActive && togglePump('PMP-01B')}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={850} y={250} width={320} height={220}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full flex gap-2">
                    <FilterNode config={{...config, filter: { ...config.filter, id: 'FLT-01A' }}} compact />
                    <FilterNode config={{...config, filter: { ...config.filter, id: 'FLT-01B' }}} compact />
                    <FilterNode config={{...config, filter: { ...config.filter, id: 'FLT-01C' }}} compact />
                  </div>
                </foreignObject>
                <foreignObject x={50} y={150} width={220} height={200}>
                  <div onClick={() => handleNodeClick('TNK-01')} className="h-full"><ChillerNode config={config} /></div>
                </foreignObject>
              </g>
            )}

            {selectedTank === 'TNK-02' && (
              <g>
                {/* Pipes TNK-02: Trickling Filter Layout */}
                <Pipe d="M 600 270 L 600 300" /> {/* Tank to Trickling Filter */}
                <Pipe d="M 600 460 L 600 550" /> {/* Trickling Filter to Sump */}
                <Pipe d="M 800 650 L 900 650" /> {/* Sump to Return Pump */}
                <Pipe d="M 1010 550 L 1010 470" /> {/* Pump to UV */}
                <Pipe d="M 1010 250 L 1010 100 L 550 100" /> {/* UV to Chiller Pump */}
                <Pipe d="M 510 100 L 160 100 L 160 250 L 350 250" /> {/* Pump to Tank */}

                {/* Nodes TNK-02 */}
                <foreignObject x={350} y={50} width={500} height={220}>
                  <div onClick={() => handleNodeClick('TNK-02')} className="h-full">
                    <MainTankNode config={config} onParamClick={(param: string) => handleParamClick(config.id, config.name, param)} />
                  </div>
                </foreignObject>
                <foreignObject x={510} y={50} width={80} height={100}>
                  <div onClick={() => handleNodeClick('TNK-02')} className="h-full">
                    <PumpNode 
                      config={{...config, pump: { ...config.pump, id: 'PMP-02U' }}} 
                      compact 
                      isStopped={stoppedPumps.includes('PMP-02U')}
                      onToggle={() => isOverrideActive && togglePump('PMP-02U')}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={450} y={300} width={300} height={160}>
                  <div onClick={() => handleNodeClick('TNK-02')} className="h-full">
                    <TricklingFilterNode config={config} />
                  </div>
                </foreignObject>
                <foreignObject x={400} y={550} width={400} height={160}>
                  <div onClick={() => handleNodeClick('TNK-02')} className="h-full"><SumpNode config={config} /></div>
                </foreignObject>
                <foreignObject x={900} y={550} width={220} height={160}>
                  <div onClick={() => handleNodeClick('TNK-02')} className="h-full">
                    <PumpNode 
                      config={config} 
                      isStopped={stoppedPumps.includes(config.pump.id)}
                      onToggle={() => isOverrideActive && togglePump(config.pump.id)}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={900} y={250} width={220} height={220}>
                  <div onClick={() => handleNodeClick('TNK-02')} className="h-full"><ChillerNode config={config} /></div>
                </foreignObject>
              </g>
            )}

            {selectedTank === 'TNK-03' && (
              <g>
                {/* Pipes TNK-03: Cold Water Standard */}
                <Pipe d="M 600 270 L 600 550" /> {/* Tank to Sump */}
                <Pipe d="M 800 650 L 900 650" /> {/* Sump to Pump */}
                <Pipe d="M 1010 550 L 1010 470" /> {/* Pump to Filter */}
                <Pipe d="M 1010 250 L 1010 100 L 550 100" /> {/* Filter to Chiller Pump */}
                <Pipe d="M 510 100 L 160 100 L 160 150" /> {/* Pump to Chiller */}
                <Pipe d="M 270 250 L 350 250" /> {/* Chiller to Tank */}

                {/* Nodes TNK-03 */}
                <foreignObject x={350} y={50} width={500} height={220}>
                  <div onClick={() => handleNodeClick('TNK-03')} className="h-full">
                    <MainTankNode config={config} onParamClick={(param: string) => handleParamClick(config.id, config.name, param)} />
                  </div>
                </foreignObject>
                <foreignObject x={510} y={50} width={80} height={100}>
                  <div onClick={() => handleNodeClick('TNK-03')} className="h-full">
                    <PumpNode 
                      config={{...config, pump: { ...config.pump, id: 'PMP-03U' }}} 
                      compact 
                      isStopped={stoppedPumps.includes('PMP-03U')}
                      onToggle={() => isOverrideActive && togglePump('PMP-03U')}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={400} y={550} width={400} height={160}>
                  <div onClick={() => handleNodeClick('TNK-03')} className="h-full"><SumpNode config={config} /></div>
                </foreignObject>
                <foreignObject x={900} y={550} width={220} height={160}>
                  <div onClick={() => handleNodeClick('TNK-03')} className="h-full">
                    <PumpNode 
                      config={config} 
                      isStopped={stoppedPumps.includes(config.pump.id)}
                      onToggle={() => isOverrideActive && togglePump(config.pump.id)}
                    />
                  </div>
                </foreignObject>
                <foreignObject x={900} y={250} width={220} height={220}>
                  <div onClick={() => handleNodeClick('TNK-03')} className="h-full"><FilterNode config={config} /></div>
                </foreignObject>
                <foreignObject x={50} y={150} width={220} height={200}>
                  <div onClick={() => handleNodeClick('TNK-03')} className="h-full"><ChillerNode config={config} /></div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>
        
        {/* Water Quality Row at the bottom of the PID diagram */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 p-4 flex items-center justify-around">
          <div 
            onClick={() => handleParamClick(config.id, config.name, 'temp')}
            className="flex flex-col items-center cursor-pointer hover:bg-slate-800/50 px-4 py-2 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Temperature</span>
              <TrendingUp className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-mono font-bold ${config.tank.tempAlert ? 'text-rose-400' : 'text-slate-200'}`}>{config.tank.temp}</span>
              <span className="text-[10px] text-slate-500">°C</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div 
            onClick={() => handleParamClick(config.id, config.name, 'ph')}
            className="flex flex-col items-center cursor-pointer hover:bg-slate-800/50 px-4 py-2 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">pH Level</span>
              <TrendingUp className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-mono font-bold ${config.tank.phAlert ? 'text-rose-400' : 'text-slate-200'}`}>{config.tank.ph}</span>
              <span className="text-[10px] text-slate-500">pH</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div 
            onClick={() => handleParamClick(config.id, config.name, 'sal')}
            className="flex flex-col items-center cursor-pointer hover:bg-slate-800/50 px-4 py-2 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Salinity</span>
              <TrendingUp className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-mono font-bold ${config.tank.salAlert ? 'text-rose-400' : 'text-slate-200'}`}>{config.tank.sal}</span>
              <span className="text-[10px] text-slate-500">ppt</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div 
            onClick={() => handleParamClick(config.id, config.name, 'orp')}
            className="flex flex-col items-center cursor-pointer hover:bg-slate-800/50 px-4 py-2 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">ORP</span>
              <TrendingUp className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-lg font-mono font-bold ${config.tank.orpAlert ? 'text-rose-400' : 'text-slate-200'}`}>{config.tank.orp}</span>
              <span className="text-[10px] text-slate-500">mV</span>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-800"></div>
          <div 
            onClick={() => handleParamClick(config.id, config.name, 'do')}
            className="flex flex-col items-center cursor-pointer hover:bg-slate-800/50 px-4 py-2 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">DO</span>
              <TrendingUp className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono font-bold text-slate-200">7.2</span>
              <span className="text-[10px] text-slate-500">mg/L</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Alarm Modal */}
      {selectedAlarm && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-4">
              <div className={`p-2 rounded-full ${selectedAlarm.severity === 'critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">Alarm Details</h3>
                <p className="text-xs font-mono text-slate-500">{selectedAlarm.id} | {selectedAlarm.timestamp}</p>
              </div>
            </div>
            
            <div className="mb-6 space-y-3">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Message</div>
                <div className="text-slate-200 font-medium">{selectedAlarm.message}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">System</div>
                  <div className="text-slate-300 font-mono">{selectedAlarm.system}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Status</div>
                  <div className="text-rose-400 font-bold uppercase tracking-wider text-sm">{selectedAlarm.status}</div>
                </div>
              </div>
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Current Value</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Limit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-mono font-bold text-rose-400">{selectedAlarm.value}</span>
                  <span className="text-sm font-mono text-slate-400">{selectedAlarm.limit}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => updateAlarmStatus(selectedAlarm.id, 'acknowledged')} 
                className="px-4 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded hover:bg-amber-500/20 transition-colors font-medium text-sm"
              >
                Acknowledge
              </button>
              <button 
                onClick={() => updateAlarmStatus(selectedAlarm.id, 'resolved')} 
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-500/20 transition-colors font-medium text-sm"
              >
                Reset / Clear
              </button>
              <button 
                onClick={() => setSelectedAlarm(null)} 
                className="px-4 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded hover:bg-slate-700 transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden max-w-5xl w-full shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-100">Live Feed: {config.name}</h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                  LIVE
                </span>
              </div>
              <button onClick={() => setShowCamera(false)} className="text-slate-400 hover:text-slate-200 text-sm font-medium">Close</button>
            </div>
            <div className="relative aspect-video bg-black">
              {/* Using a high-quality Unsplash image to simulate a camera feed */}
              <img 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
                alt="Tank Camera" 
                className="w-full h-full object-cover opacity-80" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 pointer-events-none border-[4px] border-black/40"></div>
              <div className="absolute top-4 left-4 text-white/70 font-mono text-sm drop-shadow-md">CAM-01 | {new Date().toISOString().replace('T', ' ').substring(0, 19)}</div>
              <div className="absolute bottom-4 right-4 text-white/70 font-mono text-sm drop-shadow-md flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                REC
              </div>
              
              {/* Fake PTZ Controls Overlay */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors">
                  +
                </button>
                <button className="w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors">
                  -
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Trend Modal */}
      <AnimatePresence>
        {selectedTrend && (
          <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-4xl w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{getParameterLabel(selectedTrend.parameter)} Trends</h3>
                    <p className="text-xs font-mono text-slate-500">{selectedTrend.tankName} ({selectedTrend.tankId}) | Past 24 Hours</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTrend(null)}
                  className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="h-[400px] w-full bg-slate-950/50 rounded-lg border border-slate-800 p-4">
                <WaterQualityChart parameter={selectedTrend.parameter.toLowerCase()} tankId={selectedTrend.tankId} />
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button 
                  onClick={() => setSelectedTrend(null)} 
                  className="px-6 py-2 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors font-medium">
                  Export Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Pipe = ({ d, flow = true, reverse = false, color = '#06b6d4' }: any) => (
  <g>
    <path d={d} stroke="#1e293b" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="#0f172a" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {flow && (
      <path 
        d={d} 
        stroke={color} 
        strokeWidth="4" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeDasharray="12 12" 
        className={reverse ? 'animate-flow-reverse' : 'animate-flow'} 
      />
    )}
  </g>
);

const MetricBox = ({ label, value, unit, icon: Icon, alert = false, critical = false, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-[#0a0f16]/80 backdrop-blur-sm border ${critical ? 'border-rose-500/80 animate-pulse' : alert ? 'border-amber-500/80' : 'border-slate-700/50'} rounded-lg p-2 flex flex-col cursor-pointer hover:border-cyan-500/50 transition-colors group`}
  >
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Icon className={`w-3 h-3 ${critical ? 'text-rose-400' : alert ? 'text-amber-400' : 'text-cyan-500'}`} />
        <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <TrendingUp className="w-2.5 h-2.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`font-mono font-bold text-lg ${critical ? 'text-rose-400' : alert ? 'text-amber-400' : 'text-slate-200'}`}>{value}</span>
      <span className="text-[10px] text-slate-500 font-mono">{unit}</span>
    </div>
  </div>
);

function MainTankNode({ config, onParamClick }: any) {
  const { id, name, vol, tank } = config;
  
  return (
    <div className={`border-2 rounded-xl p-4 h-full flex flex-col relative overflow-hidden ${getNodeClasses(tank.status)}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-blue-600/10 pointer-events-none"></div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-cyan-500/20 border-t border-cyan-500/50 transition-all duration-1000" style={{ height: '85%' }}>
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjAgUTIwIDAgNDAgMjAgVDgwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] animate-flow"></div>
      </div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-slate-100 font-bold text-lg tracking-wide flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400" />
            {name}
          </h3>
          <p className="text-slate-400 font-mono text-xs mt-1">VOL: {vol} | {id}</p>
        </div>
        <div className={`px-2 py-1 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
          tank.status === 'optimal' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' :
          tank.status === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' :
          'bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            tank.status === 'optimal' ? 'bg-emerald-400' :
            tank.status === 'warning' ? 'bg-amber-400' : 'bg-rose-400'
          }`}></div>
          {tank.status}
        </div>
      </div>

      <div className="relative z-10 mt-auto grid grid-cols-4 gap-3">
        <MetricBox label="TEMP" value={tank.temp} unit="°C" icon={Thermometer} alert={tank.tempAlert} onClick={(e: any) => { e.stopPropagation(); onParamClick('temp'); }} />
        <MetricBox label="pH" value={tank.ph} unit="" icon={Activity} alert={tank.phAlert} onClick={(e: any) => { e.stopPropagation(); onParamClick('ph'); }} />
        <MetricBox label="SALINITY" value={tank.sal} unit="ppt" icon={Droplets} alert={tank.salAlert} onClick={(e: any) => { e.stopPropagation(); onParamClick('sal'); }} />
        <MetricBox label="ORP" value={tank.orp} unit="mV" icon={Activity} alert={tank.orpAlert} onClick={(e: any) => { e.stopPropagation(); onParamClick('orp'); }} />
      </div>
    </div>
  );
}

function SumpNode({ config }: any) {
  const { sump } = config;
  return (
    <div className={`border-2 rounded-xl p-4 h-full flex flex-col relative overflow-hidden ${getNodeClasses(sump.status)}`}>
      <div className="absolute bottom-0 left-0 right-0 bg-cyan-500/20 border-t border-cyan-500/50 transition-all duration-1000" style={{ height: sump.level }}></div>
      
      <div className="relative z-10 flex justify-between items-start mb-2">
        <h3 className="text-slate-200 font-bold text-sm flex items-center gap-2">
          <Droplets className="w-4 h-4 text-cyan-400" />
          Collection Sump
        </h3>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{sump.id}</span>
      </div>
      
      <div className="relative z-10 mt-auto grid grid-cols-3 gap-3">
        <div className="bg-slate-950/80 backdrop-blur rounded-lg p-2.5 border border-slate-800">
          <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Level</div>
          <div className="text-sm font-mono text-emerald-400 font-bold">{sump.level}</div>
        </div>
        <div className="bg-slate-950/80 backdrop-blur rounded-lg p-2.5 border border-slate-800">
          <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Makeup H2O</div>
          <div className="text-sm font-mono text-slate-400">{sump.makeup}</div>
        </div>
        <div className="bg-slate-950/80 backdrop-blur rounded-lg p-2.5 border border-slate-800">
          <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Dosing</div>
          <div className="text-sm font-mono text-cyan-400 font-bold">{sump.dosing}</div>
        </div>
      </div>
    </div>
  );
}

function PumpNode({ config, compact = false, isStopped = false, onToggle }: any) {
  const { pump } = config;
  const status = isStopped ? 'critical' : pump.status;
  
  return (
    <div 
      onClick={onToggle}
      className={`border-2 rounded-xl p-4 h-full flex flex-col relative transition-all ${onToggle ? 'cursor-pointer hover:scale-[1.02]' : ''} ${getNodeClasses(status)}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={`text-slate-200 font-bold flex items-center gap-2 ${compact ? 'text-[10px]' : 'text-sm'}`}>
          <Power className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} ${status === 'critical' ? 'text-rose-500' : status === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`} />
          {!compact && 'Main Pump'}
        </h3>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{pump.id}</span>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className={`relative rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-950 shadow-inner ${compact ? 'w-10 h-10 border-2' : 'w-16 h-16'}`}>
          <Settings className={`text-cyan-500 ${status === 'critical' ? '' : 'animate-spin'} ${compact ? 'w-5 h-5' : 'w-8 h-8'}`} style={{ animationDuration: '2s' }} />
          {isStopped && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-rose-500 rotate-45 absolute"></div>
              <div className="w-full h-1 bg-rose-500 -rotate-45 absolute"></div>
            </div>
          )}
        </div>
      </div>

      {!compact && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-slate-950 rounded-lg p-2 text-center border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Power</div>
            <div className={`text-xs font-mono font-bold ${isStopped ? 'text-rose-500' : 'text-emerald-400'}`}>{isStopped ? '0.0 kW' : pump.power}</div>
          </div>
          <div className="bg-slate-950 rounded-lg p-2 text-center border border-slate-800">
            <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Flow</div>
            <div className={`text-xs font-mono font-bold ${isStopped ? 'text-rose-500' : status === 'warning' ? 'text-amber-400' : 'text-cyan-400'}`}>{isStopped ? '0 L/m' : pump.flow}</div>
          </div>
        </div>
      )}
      
      {isStopped && (
        <div className="absolute inset-0 bg-rose-500/5 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded border border-rose-500/50">STOPPED</span>
        </div>
      )}
    </div>
  );
}

function FilterNode({ config, compact = false }: any) {
  const { filter } = config;
  return (
    <div className={`border-2 rounded-xl p-4 h-full flex flex-col relative ${getNodeClasses(filter.status)}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-slate-200 font-bold flex items-center gap-2 ${compact ? 'text-[10px]' : 'text-sm'}`}>
          <Filter className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-slate-400`} />
          {!compact && 'Sand Filter'}
        </h3>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{filter.id}</span>
      </div>
      
      <div className="flex-1 flex gap-4">
        <div className={`${compact ? 'w-8' : 'w-14'} h-full bg-slate-800 rounded-full relative overflow-hidden border-2 border-slate-700 shadow-inner`}>
          <div className="absolute bottom-0 w-full h-[70%] bg-[#8b7355] opacity-80"></div>
          <div className="absolute top-0 w-full h-[30%] bg-cyan-500/20"></div>
        </div>
        {!compact && (
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800">
              <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Pressure Drop</div>
              <div className={`text-sm font-mono font-bold ${filter.dpAlert ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>{filter.dp}</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800">
              <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Backwash In</div>
              <div className={`text-sm font-mono font-bold ${filter.status === 'warning' ? 'text-amber-400' : 'text-slate-300'}`}>{filter.backwash}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkimmerNode({ config, compact = false }: any) {
  const { skimmer } = config;
  return (
    <div className={`border-2 rounded-xl p-4 h-full flex flex-col relative ${getNodeClasses(skimmer.status)}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-slate-200 font-bold flex items-center gap-2 ${compact ? 'text-[10px]' : 'text-sm'}`}>
          <Wind className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-slate-400`} />
          {!compact && 'Protein Skimmer'}
        </h3>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{skimmer.id}</span>
      </div>
      
      <div className="flex-1 flex gap-4">
        <div className={`${compact ? 'w-10' : 'w-16'} h-full bg-slate-800 rounded-t-[2rem] rounded-b-lg relative overflow-hidden border-2 border-slate-700 flex flex-col justify-end shadow-inner`}>
          <div className={`w-full h-[60%] relative ${skimmer.status === 'critical' ? 'bg-amber-500/20' : 'bg-cyan-500/20'}`}>
            <div className="absolute bottom-2 left-3 w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
            <div className="absolute bottom-6 left-8 w-3 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className={`w-full h-[20%] border-t-2 border-slate-600 ${skimmer.status === 'critical' ? 'bg-rose-900/50' : 'bg-[#334155]'}`}></div>
        </div>
        {!compact && (
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800">
              <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Air Flow</div>
              <div className="text-sm font-mono text-slate-300 font-bold">{skimmer.air}</div>
            </div>
            <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800">
              <div className="text-[9px] text-slate-500 uppercase mb-1 font-bold tracking-wider">Cup Level</div>
              <div className={`text-sm font-mono font-bold ${skimmer.cupAlert ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>{skimmer.cup}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TricklingFilterNode({ config }: any) {
  return (
    <div className={`border-2 rounded-xl p-4 h-full flex flex-col relative ${getNodeClasses('optimal')}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-slate-200 font-bold text-sm flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-400" />
          Trickling Filter
        </h3>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">TFK-02</span>
      </div>
      
      <div className="flex-1 relative bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:8px_8px]"></div>
        <div className="absolute top-0 left-0 right-0 h-4 bg-cyan-500/20 border-b border-cyan-500/30 flex items-center justify-around">
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <div className="mt-6 px-3">
          <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">Bio-Media Load</div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '75%' }}></div>
          </div>
          <div className="mt-2 text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Efficiency: 94%</span>
            <span>Temp: 26.5°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChillerNode({ config }: any) {
  const { chiller } = config;
  return (
    <div className={`border-2 rounded-xl p-4 h-full flex flex-col relative ${getNodeClasses(chiller.status)}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-200 font-bold text-sm flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-blue-400" />
          Chiller & UV
        </h3>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{chiller.id}</span>
      </div>
      
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Cooling Load</div>
            <div className={`text-xs font-mono font-bold ${chiller.loadAlert ? 'text-rose-400 animate-pulse' : 'text-blue-400'}`}>{chiller.load}</div>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${chiller.loadAlert ? 'bg-rose-500' : 'bg-blue-500'}`} style={{ width: chiller.load }}></div>
          </div>
        </div>
        
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">UV Intensity</div>
            <div className={`text-xs font-mono font-bold ${chiller.uvAlert ? 'text-rose-400 animate-pulse' : 'text-purple-400'}`}>{chiller.uv}</div>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${chiller.uvAlert ? 'bg-rose-500' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`} style={{ width: chiller.uv }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
