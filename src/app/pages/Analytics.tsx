import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ArrowUpRight, 
  AlertCircle, 
  TrendingUp, 
  FileSpreadsheet, 
  ArrowRight,
  Package,
  ArrowLeft,
  Clock,
  Download,
  FileText,
  Eye,
  X,
  Check,
  Search,
  List,
  LayoutGrid,
  ArrowUpDown,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { KPIScorecard } from '../components/KPIScorecard';
import { RevenueChart } from '../components/RevenueChart';
import { ARAgingAlerts } from '../components/ARAgingAlerts';
import { TopProducts } from '../components/TopProducts';

// Mock Data - B2B Metrics
const chartData = [
  { name: 'Week 1', booked: 600000000, collected: 400000000 },
  { name: 'Week 2', booked: 500000000, collected: 300000000 },
  { name: 'Week 3', booked: 700000000, collected: 450000000 },
  { name: 'Week 4', booked: 547500000, collected: 285500000 },
];

const topProductsRevenue = [
  { id: 1, name: 'SHORT RIBS ECT A', value: 125000000 },
  { id: 2, name: 'HEAD MEAT LOCKERVALLEY @27,2', value: 85000000 },
  { id: 3, name: 'BRISKET BONE PPCS ME 15', value: 42000000 },
  { id: 4, name: 'TENDERLOIN ALLANA(31) @20', value: 38000000 },
  { id: 5, name: 'DORI FILLET BL ISI 3 @10', value: 24000000 },
];

const topProductsVolume = [
  { id: 1, name: 'SHORT RIBS ECT A', value: '840 Kg' },
  { id: 2, name: 'HEAD MEAT LOCKERVALLEY @27,2', value: '620 Kg' },
  { id: 3, name: 'BRISKET BONE PPCS ME 15', value: '450 Kg' },
  { id: 4, name: 'TENDERLOIN ALLANA(31) @20', value: '380 Kg' },
  { id: 5, name: 'DORI FILLET BL ISI 3 @10', value: '210 Kg' },
];

const accountsReceivable = [
  { id: 'c1', name: 'Grand Hotel', overdue: 231000000, days: 45 },
  { id: 'c2', name: 'Metro Catering', overdue: 181500000, days: 60 },
  { id: 'c3', name: 'Blue Bean Cafe', overdue: 93000000, days: 32 },
  { id: 'c4', name: 'Downtown Bistro', overdue: 62250000, days: 15 },
];

function OverflowMarquee({ children, className }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        setIsOverflowing(contentRef.current.scrollWidth > containerRef.current.clientWidth + 1);
      }
    };
    const timeoutId = setTimeout(checkOverflow, 50);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [children]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden whitespace-nowrap w-full flex ${className || ''}`}>
      <div 
        ref={contentRef} 
        className={`shrink-0 ${isOverflowing ? 'animate-marquee pr-8' : ''}`}
      >
        {children}
      </div>
      {isOverflowing && (
        <div 
          className="shrink-0 animate-marquee pr-8"
          aria-hidden="true"
        >
          {children}
        </div>
      )}
    </div>
  );
}

type AnalyticsViewState = 'overview' | 'reports';

// Mock Data for Previews
const mockARAging = [
  { id: 1, customer: 'Grand Hyatt Jakarta', current: 0, days30: 45000000, days60: 0, days90: 0, total: 45000000 },
  { id: 2, customer: 'Kopi Kenangan Group', current: 12000000, days30: 0, days60: 25000000, days90: 0, total: 37000000 },
  { id: 3, customer: 'Ismaya Group', current: 85000000, days30: 0, days60: 0, days90: 0, total: 85000000 },
  { id: 4, customer: 'Union Group', current: 0, days30: 15000000, days60: 8000000, days90: 2500000, total: 25500000 },
];

const mockSalesSummary = [
  { id: 1, date: '2023-10-01', customer: 'Grand Hyatt Jakarta', product: 'Premium Arabica Blend (10kg)', booked: 15000000, collected: 15000000 },
  { id: 2, date: '2023-10-02', customer: 'Kopi Kenangan Group', product: 'Robusta Espresso Roast (5kg)', booked: 8000000, collected: 0 },
  { id: 3, date: '2023-10-02', customer: 'Ismaya Group', product: 'Oat Milk Barista Edition (12x1L)', booked: 12500000, collected: 12500000 },
  { id: 4, date: '2023-10-03', customer: 'Union Group', product: 'Matcha Culinary Grade (1kg)', booked: 4500000, collected: 4500000 },
];

const mockReportsData = {
  'ar_aging': [
    { id: 'ar1', title: 'A/R Aging Report May 2026', date: '2026-05-31' },
    { id: 'ar2', title: 'A/R Aging Report April 2026', date: '2026-04-30' },
    { id: 'ar3', title: 'A/R Aging Report March 2026', date: '2026-03-31' },
  ],
  'sales_summary': [
    { id: 'ss1', title: 'Sales Summary May 2026', date: '2026-05-31' },
    { id: 'ss2', title: 'Sales Summary April 2026', date: '2026-04-30' },
  ]
};

export function Analytics() {
  const [currentView, setCurrentView] = useState<AnalyticsViewState>('overview');
  const [reportTab, setReportTab] = useState<'ar_aging' | 'sales_summary'>('ar_aging');
  const [reportView, setReportView] = useState<'list' | 'grid'>('list');
  const [reportSearch, setReportSearch] = useState('');
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = useState(false);
  const [isSendConfirmationOpen, setIsSendConfirmationOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<'ar_aging' | 'sales_summary' | null>(null);
  const [schedulerState, setSchedulerState] = useState({
    reports: { arAging: true, salesSummary: false },
    frequency: 'weekly',
    dayOfWeek: 'friday',
    time: '17:00',
    recipients: ''
  });

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCompactIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  if (currentView === 'overview') {
    return (
      <div className="space-y-6 pb-8 animate-in fade-in duration-300 relative max-w-7xl mx-auto">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 8s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Analytics & Reporting</h1>
            <p className="text-slate-500 text-sm mt-1">Track booked revenue, collected cash flow, and outstanding balances.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Navigates to Screen 2 later */}
            <Button 
              variant="outline" 
              className="bg-white text-slate-700 shadow-sm border-slate-200"
              onClick={() => setCurrentView('reports')}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4 text-slate-500" />
              Reports Hub
              <ArrowRight className="ml-2 h-3.5 w-3.5 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* Top Scorecards (Trio) */}
        <KPIScorecard bookedRevenue={2347500000} collectedRevenue={1435500000} outstandingAR={912000000} />

        {/* Data Visualizations */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Chart: Booked vs Collected */}
          <RevenueChart data={chartData} className="flex flex-col" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* A/R Aging Alerts */}
            <ARAgingAlerts data={accountsReceivable} />

            {/* Top Products Widget */}
            <TopProducts 
              revenueData={topProductsRevenue.map(p => ({
                id: p.id,
                name: p.name,
                image: <Package className="h-4 w-4 text-slate-400" />,
                value: formatCompactIDR(p.value)
              }))}
              volumeData={topProductsVolume.map(p => ({
                id: p.id,
                name: p.name,
                image: <Package className="h-4 w-4 text-slate-400" />,
                value: p.value
              }))}
            />
          </div>
        </div>
      </div>
    );
  }

  // Screen 2: Reports Hub
  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-300 relative max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentView('overview')} 
            className="text-slate-500 bg-white border-slate-200 shadow-sm shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Reports</h1>
            <p className="text-slate-500 text-sm mt-1">Export financial and operational data in CSV format.</p>
          </div>
        </div>
        <div>
          <Button 
            className="bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
            onClick={() => setIsSchedulerOpen(true)}
          >
            <Clock className="mr-2 h-4 w-4" />
            Schedule Automated Reports
          </Button>
        </div>
      </div>

      {/* Reports Layout */}
      <div className="mt-8">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <div className="flex gap-6">
            <button
              onClick={() => setReportTab('ar_aging')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${reportTab === 'ar_aging' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              <FileText className="h-4 w-4" />
              A/R Aging Report
            </button>
            <button
              onClick={() => setReportTab('sales_summary')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${reportTab === 'sales_summary' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              Sales Summary
            </button>
          </div>
        </div>

        {/* Tools: Search, Sort, Toggle View */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-6">
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-white border-slate-200 shadow-sm shrink-0">
              Most Recent
              <ArrowUpDown className="ml-2 h-4 w-4 text-slate-500" />
            </Button>
          </div>

          <div className="bg-slate-100 p-1 rounded-lg flex items-center shrink-0 w-full sm:w-auto">
            <button 
              onClick={() => setReportView('list')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${reportView === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List className="h-4 w-4" />
              List
            </button>
            <button 
              onClick={() => setReportView('grid')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${reportView === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              Grid
            </button>
          </div>
        </div>

        {/* Reports Content */}
        <div className={`mt-6 ${reportView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}`}>
          {mockReportsData[reportTab]
            .filter(report => report.title.toLowerCase().includes(reportSearch.toLowerCase()))
            .map((report) => (
              <Card key={report.id} className={`p-5 shadow-sm border-slate-200 flex transition-colors hover:border-slate-300 ${reportView === 'grid' ? 'flex-col gap-4' : 'flex-col sm:flex-row sm:items-center justify-between gap-4'}`}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    {reportTab === 'ar_aging' ? <FileText className="h-5 w-5 text-slate-500" /> : <FileSpreadsheet className="h-5 w-5 text-slate-500" />}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900 line-clamp-1">{report.title}</h3>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${reportView === 'grid' ? 'w-full grid grid-cols-2' : 'shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 sm:ml-4'}`}>
                  <Button 
                    variant="outline" 
                    className={`bg-white border-slate-200 shadow-sm ${reportView === 'grid' ? 'w-full' : 'w-full sm:w-auto'}`}
                    onClick={() => setPreviewReport(reportTab)}
                  >
                    <Eye className="mr-2 h-4 w-4 text-slate-500" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    className={`bg-white border-slate-200 shadow-sm ${reportView === 'grid' ? 'w-full' : 'w-full sm:w-auto'}`}
                    onClick={() => setIsSendConfirmationOpen(true)}
                  >
                    <Send className="mr-2 h-4 w-4 text-slate-500" />
                    <span className="truncate">Send Via Email</span>
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>
      
      {/* Screen 3: Scheduler Drawer (Off-Canvas) */}
      {isSchedulerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsSchedulerOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Schedule Reports</h2>
                <p className="text-sm text-slate-500 mt-1">Automate CSV exports to your team's email.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsSchedulerOpen(false)} className="text-slate-500 hover:text-slate-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drawer Body - Form */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Report Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900 block">Select Reports to Include</label>
                <div className="space-y-3">
                  <label className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${schedulerState.reports.arAging ? 'border-rose-600 bg-white' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <div className="flex items-center h-5 mt-0.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${schedulerState.reports.arAging ? 'border-rose-600' : 'border-slate-300'}`}>
                        {schedulerState.reports.arAging && <div className="w-2 h-2 rounded-full bg-rose-600" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={schedulerState.reports.arAging}
                        onChange={(e) => setSchedulerState(s => ({...s, reports: {...s.reports, arAging: e.target.checked}}))}
                      />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-900 block">A/R Aging Report</span>
                      <span className="text-xs text-slate-500">Unpaid invoices monthly</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${schedulerState.reports.salesSummary ? 'border-rose-600 bg-white' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <div className="flex items-center h-5 mt-0.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${schedulerState.reports.salesSummary ? 'border-rose-600' : 'border-slate-300'}`}>
                        {schedulerState.reports.salesSummary && <div className="w-2 h-2 rounded-full bg-rose-600" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        checked={schedulerState.reports.salesSummary}
                        onChange={(e) => setSchedulerState(s => ({...s, reports: {...s.reports, salesSummary: e.target.checked}}))}
                      />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-900 block">Sales Summary</span>
                      <span className="text-xs text-slate-500">Booked vs collected breakdown</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Format - Read Only per PRD */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 block">File Format</label>
                <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 cursor-not-allowed flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  CSV (Comma Separated Values)
                </div>
              </div>

              {/* Frequency Controls */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <label className="text-sm font-semibold text-slate-900 block">Delivery Frequency</label>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Cadence</label>
                    <select 
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                      value={schedulerState.frequency}
                      onChange={(e) => setSchedulerState(s => ({...s, frequency: e.target.value}))}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  {schedulerState.frequency === 'weekly' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1.5 block">Day of Week</label>
                        <select 
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                          value={schedulerState.dayOfWeek}
                          onChange={(e) => setSchedulerState(s => ({...s, dayOfWeek: e.target.value}))}
                        >
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1.5 block">Time</label>
                        <select 
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                          value={schedulerState.time}
                          onChange={(e) => setSchedulerState(s => ({...s, time: e.target.value}))}
                        >
                          <option value="08:00">08:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="17:00">05:00 PM</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Recipients */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-sm font-semibold text-slate-900 block">Recipients</label>
                <textarea 
                  className="w-full h-40 px-3 py-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 resize-none"
                  placeholder="e.g. finance@company.com, ceo@company.com"
                  value={schedulerState.recipients}
                  onChange={(e) => setSchedulerState(s => ({...s, recipients: e.target.value}))}
                />
                <p className="text-xs text-slate-500">Separate multiple email addresses with commas.</p>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-slate-200 bg-white flex gap-3">
              <Button variant="outline" className="flex-1 border-slate-200 bg-white text-slate-900 hover:bg-slate-50" onClick={() => setIsSchedulerOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-rose-600 text-white hover:bg-rose-700 shadow-sm border-0" onClick={() => setIsSaveConfirmationOpen(true)}>
                Save Schedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {isSaveConfirmationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in p-4">
          <Card className="w-full max-w-sm p-6 bg-white shadow-xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-slate-900">Confirm Schedule</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to save this automated report schedule? The selected reports will be sent out as CSV attachments to the specified recipients.
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSaveConfirmationOpen(false)}
                className="border-slate-200"
              >
                Cancel
              </Button>
              <Button 
                className="bg-rose-600 text-white hover:bg-rose-700 shadow-sm border-0"
                onClick={() => {
                  setIsSaveConfirmationOpen(false);
                  setIsSchedulerOpen(false);
                  toast.success('Schedule Saved', {
                    description: 'Your automated report schedule has been successfully created and is now active.',
                    duration: 4000,
                  });
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm & Save
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Send Confirmation Modal */}
      {isSendConfirmationOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in p-4">
          <Card className="w-full max-w-sm p-6 bg-white shadow-xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-slate-900">Send Report Confirmation</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to send this report? The selected reports will be sent as CSV attachments to the email linked to your account.
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSendConfirmationOpen(false)}
                className="border-slate-200"
              >
                Cancel
              </Button>
              <Button 
                className="bg-rose-600 text-white hover:bg-rose-700 shadow-sm border-0"
                onClick={() => {
                  setIsSendConfirmationOpen(false);
                  toast.success('Report Sent', {
                    description: 'The report has been successfully sent to your email.',
                    duration: 4000,
                  });
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm & Send
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Preview Modal Overlay */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in p-4">
          <Card className="w-full max-w-4xl p-0 bg-white shadow-xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="flex justify-between items-start p-5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {previewReport === 'ar_aging' ? <FileText className="h-5 w-5 text-slate-500" /> : <FileSpreadsheet className="h-5 w-5 text-slate-500" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {previewReport === 'ar_aging' ? 'A/R Aging Report Preview' : 'Sales Summary Preview'}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">Top 4 rows displayed. Export for full data.</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setPreviewReport(null)} className="text-slate-400 hover:text-slate-500">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="overflow-y-auto flex-1 min-h-0 bg-white">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-200 sticky top-0">
                  {previewReport === 'ar_aging' ? (
                    <tr>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium text-right">Current</th>
                      <th className="px-5 py-3 font-medium text-right">1-30 Days</th>
                      <th className="px-5 py-3 font-medium text-right">31-60 Days</th>
                      <th className="px-5 py-3 font-medium text-right">61-90 Days</th>
                      <th className="px-5 py-3 font-medium text-right">Total</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Product</th>
                      <th className="px-5 py-3 font-medium text-right">Booked</th>
                      <th className="px-5 py-3 font-medium text-right">Collected</th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewReport === 'ar_aging' ? (
                    mockARAging.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-slate-900">{row.customer}</td>
                        <td className="px-5 py-3 text-right text-slate-600">{formatIDR(row.current)}</td>
                        <td className="px-5 py-3 text-right text-slate-600">{formatIDR(row.days30)}</td>
                        <td className="px-5 py-3 text-right text-rose-600 font-medium">{formatIDR(row.days60)}</td>
                        <td className="px-5 py-3 text-right text-rose-600 font-medium">{formatIDR(row.days90)}</td>
                        <td className="px-5 py-3 text-right font-semibold text-slate-900">{formatIDR(row.total)}</td>
                      </tr>
                    ))
                  ) : (
                    mockSalesSummary.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3 text-slate-600">{row.date}</td>
                        <td className="px-5 py-3 font-medium text-slate-900">{row.customer}</td>
                        <td className="px-5 py-3 text-slate-600">{row.product}</td>
                        <td className="px-5 py-3 text-right text-slate-900">{formatIDR(row.booked)}</td>
                        <td className="px-5 py-3 text-right text-emerald-600 font-medium">{formatIDR(row.collected)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end gap-3 p-4 bg-slate-50 border-t border-slate-100 shrink-0">
              <Button variant="outline" className="bg-white border-slate-200 text-slate-900" onClick={() => setPreviewReport(null)}>
                Cancel
              </Button>
              <Button className="bg-rose-600 text-white hover:bg-rose-700 shadow-sm border-0">
                <Send className="mr-2 h-4 w-4" />
                Export Full CSV via Email
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
