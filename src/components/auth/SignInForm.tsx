import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Mail, Lock, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../ui/Toast';
import { Button } from '../ui/Button';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      showToast('Welcome back, gamer! 🎮', 'success');
      navigate({ to: '/' });
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Sign in failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6b9d] to-[#c471f5] flex items-center justify-center mx-auto mb-4 shadow-lg glow-purple">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-orbitron gradient-text">
            LootLedger
          </h1>
          <p className="text-white/50 mt-2">
            Sign in to track your gaming loot
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-clean pl-12"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-clean pl-12"
              required
              minLength={6}
            />
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Enter the Lobby
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/50">
            New player?{' '}
            <Link
              to="/auth/signup"
              className="text-[#00d4ff] hover:text-[#ff6b9d] font-medium transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}