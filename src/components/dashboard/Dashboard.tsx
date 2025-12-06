import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Gamepad2, Crosshair, Target, CreditCard, TrendingUp, Calculator, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useValorant } from '../../hooks/useValorant';
import { useCSGO } from '../../hooks/useCSGO';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useGameWorth } from '../../hooks/useGameWorth';
import { formatRM, formatVP } from '../../lib/utils';
import { SpendingPieChart } from './SpendingPieChart';

export function Dashboard() {
  const { user } = useAuth();
  const { stats: valorantStats } = useValorant();
  const { stats: csgoStats } = useCSGO();
  const { stats: subStats } = useSubscriptions();
  const { stats: gameWorthStats } = useGameWorth();

  const totalGamingSpendRM = valorantStats.totalSpentRM + csgoStats.totalPaidRM;
  const totalInventoryValueRM = valorantStats.estimatedValueRM + csgoStats.currentValueRM;
  const csgoProfit = csgoStats.profitLossRM;

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden glass-card p-8"
      >
        {/* Background holographic effect */}
        <div className="absolute inset-0 holographic opacity-30" />

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#c471f5] flex items-center justify-center shadow-lg glow-purple">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-orbitron text-white">
                Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
              </h1>
              <p className="text-white/50 text-lg">Your gaming spending overview</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/05 rounded-2xl p-5 border border-white/10">
              <p className="text-sm text-white/50 mb-1">Total Gaming Spend</p>
              <p className="text-2xl font-bold font-orbitron text-[#ff6b9d]">{formatRM(totalGamingSpendRM)}</p>
            </div>
            <div className="bg-white/05 rounded-2xl p-5 border border-white/10">
              <p className="text-sm text-white/50 mb-1">Inventory Value</p>
              <p className="text-2xl font-bold font-orbitron text-[#00d4ff]">{formatRM(totalInventoryValueRM)}</p>
            </div>
            <div className="bg-white/05 rounded-2xl p-5 border border-white/10">
              <p className="text-sm text-white/50 mb-1">Monthly Subs</p>
              <p className="text-2xl font-bold font-orbitron text-[#c471f5]">{formatRM(subStats.monthlyTotalRM)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valorant Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/valorant" className="block">
            <div className="glass-card-hover p-6 h-full group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff4655] to-transparent rounded-t-2xl" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#ff4655]/20 flex items-center justify-center">
                    <Crosshair className="w-6 h-6 text-[#ff4655]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-orbitron text-white">Valorant</h2>
                    <p className="text-sm text-white/50">Skin Collection</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#ff4655] group-hover:translate-x-1 transition-all" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Total Skins</span>
                  <span className="font-bold text-white">{valorantStats.totalSkins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">VP Collected</span>
                  <span className="font-bold text-[#00d4ff]">{formatVP(valorantStats.totalVP)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Money Spent</span>
                  <span className="font-bold text-white">{formatRM(valorantStats.totalSpentRM)}</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Account Value</span>
                    <span className="font-bold text-xl text-[#ff4655]">~{formatRM(valorantStats.estimatedValueRM)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* CS:GO Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/csgo" className="block">
            <div className="glass-card-hover p-6 h-full group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#de9b35] to-transparent rounded-t-2xl" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#de9b35]/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#de9b35]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-orbitron text-white">CS:GO / CS2</h2>
                    <p className="text-sm text-white/50">Inventory</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#de9b35] group-hover:translate-x-1 transition-all" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Total Skins</span>
                  <span className="font-bold text-white">{csgoStats.totalSkins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Total Paid</span>
                  <span className="font-bold text-white">{formatRM(csgoStats.totalPaidRM)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Market Value</span>
                  <span className="font-bold text-[#ffd700]">{formatRM(csgoStats.currentValueRM)}</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Profit/Loss</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${csgoProfit >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`font-bold text-xl ${csgoProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {csgoProfit >= 0 ? '+' : ''}{formatRM(csgoProfit)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscriptions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/subscriptions" className="block">
            <div className="glass-card-hover p-5 h-full group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#c471f5]/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#c471f5]" />
                  </div>
                  <span className="font-bold text-white">Subscriptions</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#c471f5] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Active</span>
                  <span className="text-white">{subStats.activeSubscriptions} services</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Monthly</span>
                  <span className="text-[#ff6b9d] font-bold">{formatRM(subStats.monthlyTotalRM)}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Game Worth Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/calculator" className="block">
            <div className="glass-card-hover p-5 h-full group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <span className="font-bold text-white">Game Worth?</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#22c55e] group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Games Tracked</span>
                  <span className="text-white">{gameWorthStats.totalGames}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Avg RM/Hour</span>
                  <span className="text-[#22c55e] font-bold">{formatRM(gameWorthStats.avgRmPerHour)}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/leaderboard" className="block">
            <div className="glass-card-hover p-5 h-full group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </div>
                  <span className="font-bold text-white">Leaderboard</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Your Code</span>
                  <span className="text-white font-mono">{user?.shareCode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total Skins</span>
                  <span className="text-yellow-500 font-bold">{valorantStats.totalSkins + csgoStats.totalSkins}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Pie Chart and Total Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <SpendingPieChart
            data={{
              valorantSpent: valorantStats.totalSpentRM,
              csgoSpent: csgoStats.totalPaidRM,
              subscriptionsSpent: subStats.yearlyTotalRM,
              gamesSpent: gameWorthStats.totalSpentRM,
            }}
          />
        </motion.div>

        {/* Total Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-bold font-orbitron text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#ffd700]" />
            Total Gaming Investment
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/05 rounded-2xl p-4 text-center border border-white/10">
              <p className="text-sm text-white/50 mb-2">Skins Owned</p>
              <p className="text-3xl font-bold font-orbitron text-white">
                {valorantStats.totalSkins + csgoStats.totalSkins}
              </p>
            </div>
            <div className="bg-white/05 rounded-2xl p-4 text-center border border-white/10">
              <p className="text-sm text-white/50 mb-2">Total Spent</p>
              <p className="text-3xl font-bold font-orbitron text-[#ff6b9d]">
                {formatRM(totalGamingSpendRM + subStats.yearlyTotalRM + gameWorthStats.totalSpentRM)}
              </p>
            </div>
            <div className="bg-white/05 rounded-2xl p-4 text-center border border-white/10">
              <p className="text-sm text-white/50 mb-2">Inventory Value</p>
              <p className="text-3xl font-bold font-orbitron text-[#00d4ff]">
                {formatRM(totalInventoryValueRM)}
              </p>
            </div>
            <div className="bg-white/05 rounded-2xl p-4 text-center border border-white/10">
              <p className="text-sm text-white/50 mb-2">Net Position</p>
              <p className={`text-3xl font-bold font-orbitron ${
                totalInventoryValueRM - totalGamingSpendRM >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {totalInventoryValueRM - totalGamingSpendRM >= 0 ? '+' : ''}
                {formatRM(totalInventoryValueRM - totalGamingSpendRM)}
              </p>
            </div>
          </div>

          {/* Quick Stats List */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/50">Games Tracked</span>
              <span className="text-white font-bold">{gameWorthStats.totalGames}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">Active Subscriptions</span>
              <span className="text-white font-bold">{subStats.activeSubscriptions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/50">Avg RM/Hour (Games)</span>
              <span className="text-[#22c55e] font-bold">{formatRM(gameWorthStats.avgRmPerHour)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}