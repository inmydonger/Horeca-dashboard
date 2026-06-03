import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Download, 
  TrendingUp, 
  Wallet, 
  AlertCircle, 
  ArrowRight,
  Send,
  ArrowUpDown,
  Check
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { KPIScorecard } from '../components/KPIScorecard';
import { RevenueChart } from '../components/RevenueChart';
import { ARAgingAlerts } from '../components/ARAgingAlerts';
import { TopProducts } from '../components/TopProducts';

// Mock Data
const revenueData = [
  { name: 'Week 1', booked: 480000000, collected: 322500000 },
  { name: 'Week 2', booked: 615000000, collected: 420000000 },
  { name: 'Week 3', booked: 577500000, collected: 228000000 },
  { name: 'Week 4', booked: 675000000, collected: 465000000 },
];

const topProductsRevenue = [
  { id: 1, name: 'SHORT RIBS ECT A', image: '🥩', value: 'Rp 125 jt' },
  { id: 2, name: 'HEAD MEAT LOCKERVALLEY @2', image: '🥩', value: 'Rp 85 jt' },
  { id: 3, name: 'BRISKET BONE PPCS ME 15', image: '🥩', value: 'Rp 42 jt' },
  { id: 4, name: 'TENDERLOIN ALLANA(31) @20', image: '🥩', value: 'Rp 38 jt' },
  { id: 5, name: 'DORI FILLET BL ISI 3 @10', image: '🐟', value: 'Rp 24 jt' },
];

const topProductsVolume = [
  { id: 1, name: 'SHORT RIBS ECT A', image: '🥩', value: '850 Kg' },
  { id: 5, name: 'DORI FILLET BL ISI 3 @10', image: '🐟', value: '620 Kg' },
  { id: 2, name: 'HEAD MEAT LOCKERVALLEY @2', image: '🥩', value: '415 Kg' },
  { id: 4, name: 'TENDERLOIN ALLANA(31) @20', image: '🥩', value: '280 Kg' },
  { id: 3, name: 'BRISKET BONE PPCS ME 15', image: '🥩', value: '190 Kg' },
];

const accountsReceivable = [
  { id: 'c1', name: 'Grand Hotel', overdue: 231000000, days: 45 },
  { id: 'c2', name: 'Metro Catering', overdue: 181500000, days: 60 },
  { id: 'c3', name: 'Blue Bean Cafe', overdue: 93000000, days: 32 },
  { id: 'c4', name: 'Downtown Bistro', overdue: 62250000, days: 15 },
];

export function Home() {
  const [isSendCsvDialogOpen, setIsSendCsvDialogOpen] = useState(false);

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Welcome back, Sarah</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your wholesale operations today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-slate-600 bg-white shadow-sm border-slate-200">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="destructive" className="shadow-sm" onClick={() => setIsSendCsvDialogOpen(true)}>
            <Send className="mr-2 h-4 w-4" />
            Send CSV via Email
          </Button>
        </div>
      </div>

      {/* Top KPI Scorecards */}
      <KPIScorecard bookedRevenue={2347500000} collectedRevenue={1435500000} outstandingAR={912000000} />

      {/* Main Analytics Chart */}
      <RevenueChart data={revenueData} />

      {/* Bottom Data Widgets */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Selling Products */}
        <TopProducts 
          revenueData={topProductsRevenue} 
          volumeData={topProductsVolume} 
          showViewAll={true}
        />

        {/* A/R Aging Alerts */}
        <ARAgingAlerts data={accountsReceivable} />
      </div>

      {/* Send CSV Confirmation Dialog */}
      {isSendCsvDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Send Report Confirmation</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to send this report? The selected reports will be sent as CSV attachments to the email linked to your account.
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSendCsvDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setIsSendCsvDialogOpen(false)}>
                <Check className="mr-2 h-4 w-4" />
                Confirm & Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
