import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { TankManagement } from './components/TankManagement';
import { CentralServices } from './components/CentralServices';
import { WaterQualityTable } from './components/WaterQualityTable';
import { LifeSupportTable } from './components/LifeSupportTable';
import { Interlocks } from './components/Interlocks';
import { SensorConfig } from './components/SensorConfig';
import { AlertsModule } from './components/AlertsModule';
import { Trends } from './components/Trends';
import { Settings } from './components/Settings';
import { initialAlerts } from './data/alerts';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState(initialAlerts);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#0a0f16] text-slate-300 font-sans overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar currentTime={currentTime} />
        <main className="flex-1 overflow-y-auto p-6 bg-[#0a0f16]">
          {activeTab === 'overview' && <Dashboard setActiveTab={setActiveTab} alerts={alerts} setAlerts={setAlerts} />}
          {activeTab === 'tanks' && <TankManagement alerts={alerts} setAlerts={setAlerts} />}
          {activeTab === 'central' && <CentralServices />}
          {activeTab === 'water' && <WaterQualityTable />}
          {activeTab === 'lss' && <LifeSupportTable />}
          {activeTab === 'trends' && <Trends />}
          {activeTab === 'alerts' && <AlertsModule alerts={alerts} setAlerts={setAlerts} />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'interlocks' && <Interlocks />}
          {activeTab === 'sensors' && <SensorConfig />}
          
          {!['overview', 'tanks', 'central', 'water', 'lss', 'trends', 'alerts', 'settings', 'interlocks', 'sensors'].includes(activeTab) && (
            <div className="flex items-center justify-center h-full text-slate-500">
              <p>Module '{activeTab}' is currently offline or under maintenance.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
