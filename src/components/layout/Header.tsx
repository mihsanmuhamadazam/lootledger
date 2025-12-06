import { Link, useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Gamepad2, Crosshair, Target, CreditCard, LayoutDashboard, LogOut, Menu, X, Calculator, Users, Share2, Copy } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { cn, generateShareLink, copyToClipboard } from '../../lib/utils';
import { useToast } from '../ui/Toast';
import { NotificationBell } from '../notifications';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/valorant', label: 'Valorant', icon: Crosshair },
  { to: '/csgo', label: 'CS:GO', icon: Target },
  { to: '/subscriptions', label: 'Subs', icon: CreditCard },
  { to: '/calculator', label: 'Worth?', icon: Calculator },
  { to: '/leaderboard', label: 'Friends', icon: Users },
];

export function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showToast } = useToast();

  const handleShareLink = async () => {
    if (user?.shareCode) {
      const link = generateShareLink(user.shareCode);
      const success = await copyToClipboard(link);
      if (success) {
        showToast('Share link copied to clipboard!', 'success');
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 glass-card rounded-none border-x-0 border-t-0 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b9d] to-[#c471f5] flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-orbitron gradient-text hidden sm:block">
              LootLedger
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'relative px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2',
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/05'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            {user && <NotificationBell />}

            {/* Share button */}
            {user && (
              <button
                onClick={handleShareLink}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/05 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Share your profile"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-mono">{user.shareCode}</span>
                <Copy className="w-3 h-3" />
              </button>
            )}

            {/* User Menu */}
            {user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {user.name}
                  </p>
                </div>
                <button
                  onClick={signOut}
                  className="p-2 rounded-full text-white/50 hover:text-[#ff6b9d] hover:bg-[#ff6b9d]/10 transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/60 hover:bg-white/05"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-white/10"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map(({ to, label, icon: Icon }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3',
                      isActive
                        ? 'text-white bg-white/10 border border-white/10'
                        : 'text-white/50 hover:bg-white/05'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile user info */}
            {user && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <button
                    onClick={handleShareLink}
                    className="text-sm text-white/50 flex items-center gap-1 hover:text-white/80"
                  >
                    <Share2 className="w-3 h-3" />
                    {user.shareCode}
                  </button>
                </div>
                <button
                  onClick={signOut}
                  className="px-4 py-2 rounded-full text-[#ff6b9d] hover:bg-[#ff6b9d]/10 transition-all duration-200 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  );
}