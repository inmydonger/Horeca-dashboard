import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { TrendingUp, Wallet, AlertCircle } from 'lucide-react';

export interface KPIScorecardProps {
  bookedRevenue: number;
  collectedRevenue: number;
  outstandingAR: number;
}

export function KPIScorecard({ bookedRevenue, collectedRevenue, outstandingAR }: KPIScorecardProps) {
  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid gap-[16px] md:grid-cols-3">
      {/* Booked Revenue */}
      <Card className="shadow-none drop-shadow-[0px_1px_1px_rgba(0,0,0,0.1)] border-[0.676px] border-[#e2e8f0] bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <CardTitle className="text-[14px] font-medium leading-[20px] text-[#45556c] tracking-[-0.5004px]">
            Booked Revenue
          </CardTitle>
          <TrendingUp className="h-[16px] w-[16px] text-slate-400" />
        </CardHeader>
        <CardContent className="flex flex-col items-start p-6 pt-0">
          <div className="text-[30px] font-bold leading-[36px] text-[#0f172b] tracking-[0.3955px]">
            {formatIDR(bookedRevenue)}
          </div>
          <p className="text-[12px] font-normal leading-[16px] text-[#62748e] mt-1">
            Total Gross Merchandise Value
          </p>
        </CardContent>
      </Card>

      {/* Collected Revenue */}
      <Card className="shadow-none drop-shadow-[0px_1px_1px_rgba(0,0,0,0.1)] border-[0.676px] border-[#e6f7ed] bg-[#f4fbf7]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <CardTitle className="text-[14px] font-medium leading-[20px] text-[#208368] tracking-[-0.5004px]">
            Collected Revenue
          </CardTitle>
          <Wallet className="h-[16px] w-[16px] text-[#208368]" />
        </CardHeader>
        <CardContent className="flex flex-col items-start p-6 pt-0">
          <div className="text-[30px] font-bold leading-[36px] text-[#26997b] tracking-[0.3955px]">
            {formatIDR(collectedRevenue)}
          </div>
          <p className="text-[12px] font-normal leading-[16px] text-[#208368] mt-1 flex items-center gap-1">
            Offline payments reconciled
          </p>
        </CardContent>
      </Card>

      {/* Outstanding A/R */}
      <Card className="shadow-none drop-shadow-[0px_1px_1px_rgba(0,0,0,0.1)] border-[0.676px] border-[#fffab8] bg-[#fefce9]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
          <CardTitle className="text-[14px] font-medium leading-[20px] text-[#9e6c00] tracking-[-0.5004px]">
            Outstanding A/R
          </CardTitle>
          <AlertCircle className="h-[16px] w-[16px] text-[#9e6c00]" />
        </CardHeader>
        <CardContent className="flex flex-col items-start p-6 pt-0">
          <div className="text-[30px] font-bold leading-[36px] text-[#d5ae39] tracking-[0.3955px]">
            {formatIDR(outstandingAR)}
          </div>
          <p className="text-[12px] font-normal leading-[16px] text-[#9e6c00] mt-1">
            Unpaid invoices
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
