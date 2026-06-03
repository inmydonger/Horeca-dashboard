import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit logic for password reset
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Panel - Branding (Same as Login) */}
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
            
            {!isSubmitted ? (
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0f172b]">Reset your password</h2>
                <p className="text-sm text-[#62748e]">
                  Enter your work email address and we'll send you a link to reset your password.
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-[#0f172b]">Check your email</h2>
                <p className="text-sm text-[#62748e] leading-relaxed">
                  We've sent a password reset link to <span className="font-medium text-[#0f172b]">{email}</span>. 
                  Please check your inbox and spam folder.
                </p>
              </div>
            )}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="space-y-3 pt-2">
                <Button type="submit" className="w-full h-10 bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors font-medium">
                  Send Reset Link
                </Button>
                
                <div className="text-center pt-2">
                  <Link to="/login" className="text-[13px] font-medium text-[#62748e] hover:text-[#0f172b] transition-colors">
                    Back to login
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <div className="pt-4">
              <Link to="/login" className="block">
                <Button type="button" variant="outline" className="w-full h-10">
                  Return to login
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-8 flex justify-center items-center gap-1.5">
            <span className="text-[14px] font-medium text-slate-900">Powered by</span>
            <img src="/assets/rme-logo.png" alt="RME" className="h-[26px] object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}