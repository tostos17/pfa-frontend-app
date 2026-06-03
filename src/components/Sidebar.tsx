import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface NavItem {
  name: string;
  path: string;
  icon: string;
  allowedRoles: Array<'ADMIN' | 'COACH' | 'PLAYER' | 'PARENT'>;
}

const navigationItems: NavItem[] = [
  { name: 'Roster', path: '/dashboard', icon: '👥', allowedRoles: ['ADMIN', 'COACH', 'PLAYER', 'PARENT'] },
  { name: 'Analytics', path: '/analytics', icon: '📊', allowedRoles: ['ADMIN', 'COACH'] },
  { name: 'Matchday', path: '/matches', icon: '⚽', allowedRoles: ['ADMIN', 'COACH', 'PLAYER'] },
  { name: 'Financial Ledger', path: '/finance', icon: '💼', allowedRoles: ['ADMIN'] },
];

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter links based on current user's role authorization scope
  const visibleNavItems = navigationItems.filter(item => item.allowedRoles.includes(user.role));

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen flex flex-col justify-between hidden md:flex shrink-0">
      {/* Upper Navigation Block */}
      <div>
        {/* Branding Head */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-700 bg-gray-800/50">
          <span className="text-2xl">⚽</span>
          <span className="font-extrabold text-xl text-white tracking-wide">Academy OS</span>
        </div>

        {/* Dynamic Route Links */}
        <nav className="mt-6 px-4 space-y-1">
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`
              }
            >
              <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile Footer Block */}
      <div className="p-4 border-t border-gray-700 bg-gray-850">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-450 border border-emerald-500/30 flex items-center justify-center font-bold text-sm uppercase">
            {user.firstName[0]}
            {user.lastName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-450 font-medium truncate uppercase tracking-wider">{user.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-red-400 bg-red-550/5 hover:bg-red-550/10 border border-red-500/10 hover:border-red-500/20 rounded-lg transition-all"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;