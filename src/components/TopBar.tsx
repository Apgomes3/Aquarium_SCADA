import { Bell, Search, User, Wifi } from 'lucide-react';
import { format } from 'date-fns';

interface TopBarProps {
  currentTime: Date;
}

export function TopBar({ currentTime }: TopBarProps) {
  return (
    <header className="h-16 bg-[#0d131c] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search tags, tanks, or alerts..." 
            className="bg-slate-900/50 border border-slate-800 text-sm rounded-md pl-9 pr-4 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/50 px-3 py-1.5 rounded-md border border-slate-800">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span>{format(currentTime, 'HH:mm:ss')}</span>
          <span className="text-slate-600">|</span>
          <span>{format(currentTime, 'MMM dd, yyyy')}</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-400 hover:text-slate-200 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-[#0d131c]"></span>
          </button>
          
          <div className="h-6 w-px bg-slate-800"></div>
          
          <button className="flex items-center gap-2 hover:bg-slate-800/50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-800">
            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs font-medium text-slate-200">Admin</span>
              <span className="text-[10px] text-slate-500">Level 5 Access</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
