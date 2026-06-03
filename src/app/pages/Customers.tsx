import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Building2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  Lock,
  Activity,
  CheckCircle2,
  ArrowUpDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';

// B2B Wholesale Mock Data (No B2C Metrics, strict B2B fields)
const mockCustomers = [
  { 
    id: 'c1', 
    company: 'Grand Horeca Group', 
    contactName: 'Michael Wong',
    contactEmail: 'purchasing@grandhoreca.com',
    terms: 'Net-30', 
    ar: 18000000, 
    lastActive: '2 hours ago',
    status: 'active'
  },
  { 
    id: 'c2', 
    company: 'Blue Bean Cafe', 
    contactName: 'Sarah Jenkins',
    contactEmail: 'sarah@bluebean.co.id',
    terms: 'Net-15', 
    ar: 5400000, 
    lastActive: '1 day ago',
    status: 'active'
  },
  { 
    id: 'c3', 
    company: 'Metro Catering', 
    contactName: 'Budi Santoso',
    contactEmail: 'finance@metrocatering.id',
    terms: 'Advance', 
    ar: 0, 
    lastActive: '3 days ago',
    status: 'active'
  },
  { 
    id: 'c4', 
    company: 'The Royal Hotel', 
    contactName: 'Diana Prince',
    contactEmail: 'procurement@royalhotel.com',
    terms: 'Net-60', 
    ar: 45000000, 
    lastActive: '5 hours ago',
    status: 'active'
  },
  { 
    id: 'c5', 
    company: 'Sunset Grill', 
    contactName: 'Kevin Hartono',
    contactEmail: 'kh@sunsetgrill.id',
    terms: 'Net-30', 
    ar: 1250000, 
    lastActive: '1 week ago',
    status: 'inactive'
  },
];

type ViewState = 'list' | 'invite' | 'profile';
type SortField = 'company' | 'ar' | null;
type SortDirection = 'asc' | 'desc';

export function Customers() {
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCustomers = mockCustomers
    .filter(customer => 
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'company') {
        return a.company.localeCompare(b.company) * multiplier;
      }
      if (sortField === 'ar') {
        return (a.ar - b.ar) * multiplier;
      }
      return 0;
    });

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (currentView === 'list' || currentView === 'invite') {
    return (
      <div className="space-y-6 pb-8 animate-in fade-in duration-300 relative max-w-7xl mx-auto">
        
        {/* Slide-out Drawer for Invite Flow */}
        {currentView === 'invite' && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
              onClick={() => setCurrentView('list')}
            />
            <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Create Customer Account</h2>
                  <p className="text-sm text-slate-500">Invite a new B2B buyer to the platform.</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={() => setCurrentView('list')}>
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Company Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Company Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Company Name</label>
                      <Input placeholder="e.g. Grand Horeca Group" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Tax ID (NPWP)</label>
                      <Input placeholder="00.000.000.0-000.000" className="font-mono text-sm" />
                    </div>
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Primary Contact</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Full Name</label>
                      <Input placeholder="e.g. Michael Wong" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Email Address</label>
                      <Input type="email" placeholder="purchasing@company.com" />
                      <p className="text-xs text-slate-500">This will be used for their platform login.</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Phone Number</label>
                      <Input type="tel" placeholder="+62 811-0000-0000" />
                    </div>
                  </div>
                </div>

                {/* Financial Agreement */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Financial Agreement</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Payment Terms</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                      <option value="">Select terms</option>
                      <option value="advance">Advance (COD)</option>
                      <option value="net-15">Net-15</option>
                      <option value="net-30">Net-30</option>
                      <option value="net-60">Net-60</option>
                    </select>
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Logistics</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Billing Address (HQ)</label>
                      <textarea 
                        className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 resize-none"
                        placeholder="Street address, building, floor..."
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-900">Default Shipping Address</label>
                        <div className="flex items-center gap-2">
                          <label htmlFor="sameAsBilling" className="text-xs text-slate-600 font-medium cursor-pointer">Same as billing</label>
                          <Switch id="sameAsBilling" className="data-[state=checked]:bg-blue-600" />
                        </div>
                      </div>
                      <textarea 
                        className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 resize-none"
                        placeholder="Shipping delivery address..."
                      />
                    </div>
                  </div>
                </div>

              </div>
              
              <div className="p-4 border-t border-slate-100 bg-neutral-50 flex justify-end gap-3 shrink-0">
                <Button variant="outline" className="bg-white" onClick={() => setCurrentView('list')}>
                  Cancel
                </Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => setCurrentView('list')}>
                  Generate Account & Send Invite
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Customers</h1>
            <p className="text-slate-500 text-sm mt-1">Manage wholesale accounts, terms, and outstanding balances.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="bg-red-600 text-white hover:bg-red-700 shadow-sm"
              onClick={() => setCurrentView('invite')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Invite Customer
            </Button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              type="search" 
              placeholder="Search companies or contacts..." 
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Account Directory Master List (Data Table) */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50/50 hover:bg-neutral-50/50">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead
                  className="cursor-pointer hover:text-slate-900 select-none"
                  onClick={() => toggleSort('company')}
                >
                  <div className="flex items-center gap-1">
                    Company Name
                    {sortField === 'company' ? (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ArrowUpDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead
                  className="text-right cursor-pointer hover:text-slate-900 select-none"
                  onClick={() => toggleSort('ar')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Outstanding A/R
                    {sortField === 'ar' ? (
                      sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ArrowUpDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className={`hover:bg-neutral-50 group cursor-pointer ${customer.status === 'inactive' ? 'opacity-70' : ''}`}
                  onClick={() => setCurrentView('profile')}
                >
                  <TableCell>
                    <div className="h-9 w-9 rounded-md border border-slate-200 bg-neutral-50 flex items-center justify-center text-slate-400">
                      <Building2 className="h-4 w-4" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{customer.company}</span>
                      {customer.status === 'inactive' && (
                        <Badge variant="secondary" className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0">Inactive</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{customer.contactName}</span>
                      <span className="text-xs text-slate-500 mt-0.5">{customer.contactEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white text-slate-600 font-normal">
                      {customer.terms}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.ar > 0 ? (
                      <span className="font-medium text-slate-900">{formatIDR(customer.ar)}</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {customer.lastActive}
                  </TableCell>
                  <TableCell className="relative">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId(openDropdownId === customer.id ? null : customer.id);
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                    
                    {openDropdownId === customer.id && (
                      <>
                        {/* Backdrop to close dropdown when clicking outside */}
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(null);
                          }} 
                        />
                        {/* Dropdown Menu */}
                        <div className="absolute right-8 top-10 z-50 w-48 rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md animate-in fade-in zoom-in-95 duration-100">
                          <button 
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(null);
                              setCurrentView('profile');
                            }}
                          >
                            View Profile
                          </button>
                          <button 
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(null);
                              // Handle edit logic here later
                            }}
                          >
                            Edit
                          </button>
                          <div className="h-px my-1 bg-slate-100 -mx-1" />
                          <button 
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(null);
                              // Handle revoke logic here later
                            }}
                          >
                            Revoke Access
                          </button>
                        </div>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    );
  }

  // Screen 3: Customer Profile
  if (currentView === 'profile') {
    return (
      <div className="space-y-6 pb-8 animate-in slide-in-from-right-4 duration-300 relative max-w-5xl mx-auto">
        {/* Detail Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div className="flex items-start gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-slate-500 mt-1 shrink-0"
              onClick={() => setCurrentView('list')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Grand Horeca Group</h1>
                <Badge variant="outline" className="bg-[#e6f6eb] text-[#218358] border-[#c4e8d1] border-[0.676px] rounded-[8px] px-[10.676px] py-[2.676px] font-semibold hover:bg-[#e6f6eb] hover:text-[#218358]">Active</Badge>
              </div>
              <p className="text-slate-500 text-sm mt-1">Customer since Jan 12, 2023</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
              <Lock className="mr-2 h-4 w-4" />
              Force Password Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Card 1: Primary Contact & Addresses */}
            <Card className="shadow-sm border-slate-200">
              <div className="p-6 pb-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900 flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-slate-500" />
                  Primary Contact & Logistics
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Michael Wong</p>
                    <p className="text-sm text-slate-500">Procurement Director</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="mr-2 h-4 w-4 text-slate-400" />
                      purchasing@grandhoreca.com
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="mr-2 h-4 w-4 text-slate-400" />
                      +62 811-9876-5432
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                      <FileText className="mr-1.5 h-3.5 w-3.5" /> Billing Address
                    </h3>
                    <address className="text-sm text-slate-700 not-italic leading-relaxed">
                      Grand Horeca Tower, Floor 12<br/>
                      Jl. Jend. Sudirman Kav 45<br/>
                      Jakarta Pusat, 10210<br/>
                      Indonesia
                    </address>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                      <MapPin className="mr-1.5 h-3.5 w-3.5" /> Default Shipping
                    </h3>
                    <address className="text-sm text-slate-700 not-italic leading-relaxed">
                      Central Kitchen / Warehouse<br/>
                      Kawasan Industri Pulo Gadung<br/>
                      Jakarta Timur, 13920<br/>
                      Indonesia
                    </address>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3: Order History */}
            <Card className="shadow-sm border-slate-200">
              <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Recent Orders</h2>
                <Button variant="outline" className="bg-white border-[#e2e8f0] text-[#0f172b] hover:bg-neutral-50 shadow-sm h-9 px-4 rounded-md">View All</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-50/30 hover:bg-neutral-50/30">
                    <TableHead className="w-[100px]">Order</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Fulfillment</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-slate-900">#ORD-2099</TableCell>
                    <TableCell className="text-slate-500">May 29, 2023</TableCell>
                    <TableCell><Badge variant="warning" className="bg-amber-100 text-amber-800">Pending</Badge></TableCell>
                    <TableCell><Badge variant="secondary" className="bg-slate-100 text-slate-600">Unpaid</Badge></TableCell>
                    <TableCell className="text-right font-medium">{formatIDR(18000000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-900">#ORD-2051</TableCell>
                    <TableCell className="text-slate-500">May 14, 2023</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-slate-100 text-slate-600">Delivered</Badge></TableCell>
                    <TableCell><Badge variant="success" className="bg-emerald-100 text-emerald-800">Paid</Badge></TableCell>
                    <TableCell className="text-right font-medium">{formatIDR(42500000)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-slate-900">#ORD-1982</TableCell>
                    <TableCell className="text-slate-500">Apr 28, 2023</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-slate-100 text-slate-600">Delivered</Badge></TableCell>
                    <TableCell><Badge variant="success" className="bg-emerald-100 text-emerald-800">Paid</Badge></TableCell>
                    <TableCell className="text-right font-medium">{formatIDR(12200000)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Card 2: Financials & Terms */}
            <Card className="shadow-sm border-slate-200">
              <div className="p-6 pb-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900 flex items-center">
                  <CreditCard className="mr-2 h-4 w-4 text-slate-500" />
                  Financials & Terms
                </h2>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Lifetime Value (LTV)</p>
                  <p className="text-2xl font-bold text-slate-900">{formatIDR(245000000)}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Outstanding A/R</p>
                  <p className="text-xl font-semibold text-rose-600">{formatIDR(18000000)}</p>
                  <p className="text-xs text-slate-500 mt-1">Due by June 28, 2023</p>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Payment Terms</span>
                    <Badge variant="outline" className="bg-neutral-50 text-slate-700 font-semibold border-slate-200">Net-30</Badge>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* NPWP Card */}
            <Card className="shadow-sm border-slate-200 bg-neutral-50/50">
              <div className="p-5">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tax Identity</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono text-slate-900">01.234.567.8-091.000</p>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Verified via NPWP registry</p>
              </div>
            </Card>

          </div>
        </div>
      </div>
    );
  }

  // Placeholder for the next screens
  return (
    <div className="p-8 text-center animate-in fade-in">
      <p className="text-slate-500">Screen under construction (View: {currentView})</p>
      <Button className="mt-4" onClick={() => setCurrentView('list')}>Go Back</Button>
    </div>
  );
}
