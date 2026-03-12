import { 
  LayoutDashboard, 
  Droplet, 
  Activity, 
  Settings, 
  AlertTriangle, 
  TrendingUp,
  Bot,
  Fish,
  Database
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tanks', label: 'LSS System Management', icon: Activity },
    { id: 'central', label: 'Central Services', icon: Database },
    { id: 'water', label: 'Water Quality', icon: Droplet },
    { id: 'lss', label: 'Life Support', icon: Activity },
    { id: 'trends', label: 'Historical Trends', icon: TrendingUp },
    { id: 'alerts', label: 'System Alerts', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0d131c] border-r border-slate-800 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/50">
          <Droplet className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-100 tracking-wider">AQUA<span className="text-cyan-400">SCADA</span></h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">System Control</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              {item.label}
              {item.id === 'alerts' && (
                <span className="ml-auto flex h-2 w-2 rounded-full bg-amber-500"></span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400">System Load</span>
            <span className="text-xs text-emerald-400 font-mono">24%</span>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500/50 w-[24%] rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
