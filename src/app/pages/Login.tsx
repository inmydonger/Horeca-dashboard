import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link, useNavigate } from 'react-router';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic, navigates to the Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#020618] flex-col relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img 
            alt="Commercial Kitchen" 
            src="/assets/login-bg.png" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172b]/60 via-[#020618]/70 to-[#020618]/90" />
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#1d293d]/90 to-transparent" />
        </div>
        
        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-end p-12 h-full pb-20 pl-16">
          <div className="max-w-md">
            <h1 className="text-[28px] font-semibold tracking-tight text-white mb-4 leading-[38.5px]">
              The dashboard for wholesale operations.
            </h1>
            <p className="text-[15px] leading-[24.375px] text-slate-300 font-normal">
              Manage your B2B orders, configure invoicing, and control staff access with enterprise-grade precision.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-[360px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center mb-8">
            <img src="/assets/horeca-logo.png" alt="The HORECA" className="h-[52px] object-contain mb-8" />
            
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-[#0f172b]">Welcome back</h2>
              <p className="text-sm text-[#62748e]">Sign in to your seller dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[14px] font-medium leading-none text-[#0f172b]" htmlFor="email">
                Work Email
              </label>
              <Input 
                id="email"
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 text-[#62748e]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium leading-none text-[#0f172b]" htmlFor="password">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[13px] font-medium text-[#62748e] hover:text-[#0f172b] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 pr-10 text-[#62748e] tracking-widest placeholder:tracking-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">Toggle password visibility</span>
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-10 mt-2 bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors font-medium">
              Sign In
            </Button>
          </form>

          <div className="mt-8 flex justify-center items-center gap-1.5">
            <span className="text-[14px] font-medium text-slate-900">Powered by</span>
            <img src="/assets/rme-logo.png" alt="RME" className="h-[26px] object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}