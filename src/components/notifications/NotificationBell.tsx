import { useState, useMemo } from 'react';
import { Bell, X, Calendar, Percent, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UPCOMING_SALES, SaleNotification } from '../../types/notifications';
import { daysUntil, formatDate } from '../../lib/utils';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Generate notifications from upcoming sales
  const notifications: SaleNotification[] = useMemo(() => {
    return UPCOMING_SALES.map((sale, index) => ({
      ...sale,
      id: `sale-${index}`,
      read: readIds.has(`sale-${index}`),
      createdAt: new Date().toISOString(),
    }));
  }, [readIds]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setReadIds(prev => new Set([...prev, id]));
  };

  const markAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    setReadIds(new Set(allIds));
  };

  const getGameColor = (game: string) => {
    switch (game) {
      case 'valorant':
        return '#ff4655';
      case 'csgo':
        return '#de9b35';
      default:
        return '#c471f5';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/05 transition-colors"
      >
        <Bell className="w-5 h-5 text-white/60" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b9d] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 glass-card p-0 overflow-hidden z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#ff6b9d]" />
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-white/50 hover:text-white/80 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <Bell className="w-8 h-8 text-white/20 mx-auto mb-2" />
                    <p className="text-white/50 text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const daysLeft = daysUntil(notification.startDate);
                    const isStarted = daysLeft <= 0;

                    return (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-white/05 hover:bg-white/03 transition-colors ${
                          !notification.read ? 'bg-white/02' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: getGameColor(notification.game) }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm">
                              {notification.title}
                            </p>
                            <p className="text-white/50 text-xs mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="flex items-center gap-1 text-xs text-white/40">
                                <Calendar className="w-3 h-3" />
                                {isStarted ? 'Live now!' : `In ${daysLeft} days`}
                              </span>
                              {notification.discount && (
                                <span className="flex items-center gap-1 text-xs text-green-500">
                                  <Percent className="w-3 h-3" />
                                  Up to {notification.discount}% off
                                </span>
                              )}
                            </div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-[#ff6b9d] flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-white/10 text-center">
                <p className="text-xs text-white/40">
                  💡 Tips: Check these sales to grow your collection!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}