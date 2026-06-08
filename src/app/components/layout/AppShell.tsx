import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { Home, ShoppingCart, Package, Users, BarChart3, Settings, LogOut, Search, PanelLeft, AlertCircle } from 'lucide-react';
import { cn, Button } from '../ui/button';

export function AppShell() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsSignOutDialogOpen(false);
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - White theme */}
      <div className={cn(
        "bg-white border-r border-slate-200 text-slate-600 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <div className={cn(
          "h-16 flex items-center border-b border-slate-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "justify-center px-0" : "justify-between px-6"
        )}>
          {!isCollapsed && (
            <div className="flex items-baseline gap-1 overflow-hidden animate-in fade-in duration-300">
              <span className="font-bold text-orange-600 text-sm">the</span>
              <span className="font-black text-blue-800 text-xl tracking-tight">HORECA</span>
            </div>
          )}
          {isCollapsed && (
            <div className="flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-300">
              <span className="font-bold text-orange-600 text-[10px]">the</span>
              <span className="font-black text-blue-800 text-sm tracking-tight">H</span>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors flex-shrink-0 focus:outline-none", isCollapsed && "hidden")}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md transition-all duration-300 text-sm font-medium",
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-neutral-50 hover:text-slate-900",
                  isCollapsed ? "justify-center py-3" : "gap-3 px-3 py-2"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("flex-shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4", isActive ? "text-slate-900" : "text-slate-400")} />
                  {!isCollapsed && <span className="whitespace-nowrap animate-in fade-in duration-300">{item.name}</span>}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className={cn(
          "border-t border-slate-200 transition-all duration-300 ease-in-out",
          isCollapsed ? "p-3 flex flex-col gap-3" : "p-4"
        )}>
          <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3 px-2 py-2")}>
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 text-sm font-medium text-white">D</div>
            {!isCollapsed && (
              <div className="flex flex-col whitespace-nowrap animate-in fade-in duration-300 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900 truncate">Dewi</span>
                  <span className="text-[12px] font-medium bg-[#f1f5f9] text-[#314158] px-2.5 py-0.5 rounded-full">Superadmin</span>
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsSignOutDialogOpen(true)}
            title={isCollapsed ? "Sign out" : undefined}
            className={cn(
              "flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors font-medium",
              isCollapsed ? "justify-center p-3" : "gap-2 px-2 py-2 mt-2 w-full text-sm"
            )}
          >
            <LogOut className={cn("flex-shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
            {!isCollapsed && <span className="whitespace-nowrap">Sign out</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            {isCollapsed && (
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors flex-shrink-0 focus:outline-none"
                aria-label="Expand sidebar"
              >
                <PanelLeft className="w-5 h-5" />
              </button>
            )}
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, customers, or products..."
                className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Help</button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {/* Sign Out Confirmation Dialog */}
      {isSignOutDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Sign out</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Are you sure you want to sign out of your account? You will need to log in again to access the dashboard.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSignOutDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}