import { createRouter, createRootRoute, createRoute, Outlet, useNavigate, createHashHistory } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { useAuth } from './context/AuthContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { ValorantPage } from './components/valorant/ValorantPage';
import { CSGOPage } from './components/csgo/CSGOPage';
import { SubscriptionsPage } from './components/subscriptions/SubscriptionsPage';
import { GameWorthPage } from './components/gameworth/GameWorthPage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { SignInForm } from './components/auth/SignInForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { Gamepad2 } from 'lucide-react';

function RootComponent() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/auth/signin' });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#c471f5] flex items-center justify-center mx-auto mb-4 animate-pulse glow-purple">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <p className="text-white/50 font-orbitron">Loading LootLedger...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Outlet />
  );
}

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Outlet />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const valorantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/valorant',
  component: ValorantPage,
});

const csgoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/csgo',
  component: CSGOPage,
});

const subscriptionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscriptions',
  component: SubscriptionsPage,
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calculator',
  component: GameWorthPage,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leaderboard',
  component: LeaderboardPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthLayout,
});

const signinRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signin',
  component: SignInForm,
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signup',
  component: SignUpForm,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  valorantRoute,
  csgoRoute,
  subscriptionsRoute,
  calculatorRoute,
  leaderboardRoute,
  authRoute.addChildren([signinRoute, signupRoute]),
]);

const hashHistory = createHashHistory();

export const router = createRouter({
  routeTree,
  history: hashHistory,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
