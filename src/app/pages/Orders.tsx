import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowLeft,
  CheckCircle2,
  FileText,
  Truck,
  Download,
  Wallet,
  X,
  Check,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Calendar } from '../../components/ui/calendar';
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';

// Expanded views for the complete lifecycle
type ViewState = 'list' | 'detail-edit' | 'detail-locked' | 'detail-shipped' | 'detail-paid';

export function Orders() {
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [statusChangeTarget, setStatusChangeTarget] = useState<ViewState | null>(null);
  const [editedQty] = useState<number>(15);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 25));

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Values
  const originalPrice = 450000;
  const originalQty = 20;
  const currentTotal = originalPrice * editedQty;
  const baseSubtotal = 9000000;

  // Render the List View
  if (currentView === 'list') {
    return (
      <div className="space-y-6 pb-8 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-semibold text-[#0f172b] tracking-[-0.53px] leading-[32px]">Order List</h1>
            <p className="text-[#62748e] text-[14px] leading-[20px] mt-1">Review and fulfill incoming orders.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-[#45556c] bg-white border-[#e5e5e5] shadow-[0px_1px_1px_rgba(0,0,0,0.1)] h-10 px-4 font-medium rounded-md">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#62748e]" />
              <Input 
                type="search" 
                placeholder="Search orders..." 
                className="pl-9 w-[250px] bg-white border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] h-10 rounded-md text-[#62748e] placeholder:text-[#62748e]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#e5e5e5] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50/50 border-b border-[#e5e5e5] hover:bg-neutral-50/50">
                <TableHead className="w-[120px] text-[#62748e] font-medium h-12">Order ID</TableHead>
                <TableHead className="text-[#62748e] font-medium h-12">Customer</TableHead>
                <TableHead className="text-[#62748e] font-medium h-12">Date</TableHead>
                <TableHead className="text-[#62748e] font-medium h-12">Fulfillment</TableHead>
                <TableHead className="text-[#62748e] font-medium h-12">Payment</TableHead>
                <TableHead className="text-right text-[#62748e] font-medium h-12">Total (IDR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Highlighted Top Row - Focus Point */}
              <TableRow 
                className="cursor-pointer hover:bg-neutral-50/50 bg-[rgba(250,250,250,0.3)] border-b border-[#e5e5e5] group transition-colors h-[54px]"
                onClick={() => setCurrentView('detail-edit')}
              >
                <TableCell className="font-medium text-[#0f172b]">
                  #ORD-2099
                </TableCell>
                <TableCell className="font-medium text-[#0f172b]">
                  Grand Horeca Group
                </TableCell>
                <TableCell className="text-[#62748e]">
                  May 29, 2026
                </TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#fefce9] border-[#ffe770] text-[#9e6c00] text-xs font-semibold">
                    Request
                  </div>
                </TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-transparent bg-[#f1f5f9] text-[#45556c] text-xs font-semibold">
                    Unpaid
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium text-[#020618]">
                  {formatIDR(18000000)}
                </TableCell>
              </TableRow>

              {/* Other Dummy Rows */}
              <TableRow className="border-b border-[#e5e5e5] h-[54px]">
                <TableCell className="font-medium text-[#45556c]">#ORD-2098</TableCell>
                <TableCell className="text-[#314158]">Blue Bean Cafe</TableCell>
                <TableCell className="text-[#62748e]">May 28, 2026</TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f4fe] border-[#c2e5ff] text-[#0d74ce] text-xs font-semibold">
                    Processing
                  </div>
                </TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-transparent bg-[#f1f5f9] text-[#45556c] text-xs font-semibold">
                    Unpaid
                  </div>
                </TableCell>
                <TableCell className="text-right text-[#314158]">
                  {formatIDR(5400000)}
                </TableCell>
              </TableRow>
              <TableRow className="h-[54px]">
                <TableCell className="font-medium text-[#45556c]">#ORD-2097</TableCell>
                <TableCell className="text-[#314158]">Metro Catering</TableCell>
                <TableCell className="text-[#62748e]">May 27, 2026</TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f6eb] border-[#c4e8d1] text-[#218358] text-xs font-semibold">
                    Delivered
                  </div>
                </TableCell>
                <TableCell>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f6eb] border-[#c4e8d1] text-[#218358] text-xs font-semibold">
                    Paid
                  </div>
                </TableCell>
                <TableCell className="text-right text-[#314158]">
                  {formatIDR(12250000)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Helpers for Badges based on State
  const renderFulfillmentBadge = () => {
    if (currentView === 'detail-edit') return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#fefce9] border-[#ffe770] text-[#9e6c00] text-[12px] font-semibold">Request</div>;
    if (currentView === 'detail-locked') return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f4fe] border-[#c2e5ff] text-[#0d74ce] text-[12px] font-semibold">Processing</div>;
    if (currentView === 'detail-shipped') return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f6eb] border-[#c4e8d1] text-[#218358] text-[12px] font-semibold">Delivered</div>;
    if (currentView === 'detail-paid') return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f6eb] border-[#c4e8d1] text-[#218358] text-[12px] font-semibold">Delivered</div>;
  };

  const renderPaymentBadge = () => {
    if (currentView === 'detail-paid') return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border bg-[#e6f6eb] border-[#c4e8d1] text-[#218358] text-[12px] font-semibold">Paid</div>;
    return <div className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-transparent bg-[#f1f5f9] text-[#45556c] text-[12px] font-semibold">Unpaid</div>;
  };

  const isLocked = currentView !== 'detail-edit';

  return (
    <div className="space-y-6 pb-8 animate-in slide-in-from-right-4 duration-300 relative">
      
      {/* Confirm Status Change Modal Overlay */}
      {statusChangeTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] border-0 mx-4 rounded-[12px] overflow-hidden bg-white">
            <div className="p-6">
              <h2 className="text-[18px] font-semibold text-[#0f172b] tracking-[-0.44px]">Confirm Status Change</h2>
              <p className="text-[14px] text-[#62748e] mt-2">
                Are you sure you want to change the order status? This action cannot be undone.
              </p>
            </div>
            <div className="p-6 pt-0 flex gap-3 justify-end border-none">
              <Button 
                variant="outline" 
                className="bg-white text-[#0f172b] border-[#e5e5e5] hover:bg-neutral-50 font-medium rounded-[8px] px-4 py-2 h-10"
                onClick={() => setStatusChangeTarget(null)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#dc2626] text-white hover:bg-[#b91c1c] shadow-sm font-medium rounded-[8px] px-4 py-2 h-10"
                onClick={() => {
                  setCurrentView(statusChangeTarget);
                  setStatusChangeTarget(null);
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Modal Overlay */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] border-0 mx-4 rounded-[12px] overflow-hidden bg-white">
            <div className="relative p-6 pb-4 border-b border-[#e5e5e5]">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4 h-6 w-6 text-[#62748e] hover:text-[#0f172b]"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <h2 className="text-[18px] font-semibold text-[#0f172b] tracking-[-0.44px]">Reconcile Offline Payment</h2>
              <p className="text-[14px] text-[#62748e] mt-2">
                Record bank transfer details for Order <span className="font-medium text-[#0f172b]">#ORD-2099</span>.
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-[#0f172b]">Date Received</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex w-full items-center border border-[#e5e5e5] rounded-[8px] h-10 overflow-hidden focus-visible:ring-1 focus-visible:ring-slate-900 focus-visible:outline-none hover:bg-neutral-50 transition-colors">
                      <div className="pl-3 pr-3 py-2 flex items-center justify-center border-r border-[#e5e5e5] bg-transparent h-full">
                        <CalendarIcon className="w-4 h-4 text-[#62748e]" />
                      </div>
                      <div className="flex-1 h-full px-3 flex items-center text-[14px] text-[#0f172b] bg-transparent">
                        {date ? format(date, "dd/MM/yyyy") : <span className="text-[#62748e]">Select a date</span>}
                      </div>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-[12px] border-[#e5e5e5] shadow-lg z-[150]" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      captionLayout="dropdown"
                      fromYear={2020}
                      toYear={2030}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-[14px] font-medium text-[#0f172b]">Bank Reference Number</label>
                <div className="flex items-center border border-[#e5e5e5] rounded-[8px] h-10 overflow-hidden focus-within:ring-1 focus-within:ring-[#e5e5e5]">
                  <input type="text" placeholder="e.g. BCA-9928172635" className="flex-1 h-full px-3 outline-none text-[14px] text-[#62748e] bg-white" />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 flex justify-end gap-3">
              <Button 
                variant="outline" 
                className="rounded-[8px] border-[#e5e5e5] text-[#0f172b] font-medium hover:bg-neutral-50 h-10 px-4"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#dc2626] text-white hover:bg-[#b91c1c] rounded-[8px] font-medium h-10 px-4"
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setCurrentView('detail-paid');
                }}
              >
                Confirm Payment
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Detail Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-[#62748e]"
            onClick={() => setCurrentView('list')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-semibold text-[#0f172b] tracking-[-0.53px] leading-[32px]">Order #ORD-2099</h1>
              <div className="flex gap-2">
                {renderFulfillmentBadge()}
                {renderPaymentBadge()}
              </div>
            </div>
            <p className="text-[#62748e] text-[14px] mt-1 leading-[20px]">Placed on May 29, 2026 at 10:42 AM</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {currentView === 'detail-locked' && (
            <>
              <Button variant="outline" className="bg-white text-[#45556c] border-[#e5e5e5]">
                <FileText className="mr-2 h-4 w-4 text-[#62748e]" />
                Generate PDF Invoice
              </Button>
              <Button className="bg-[#dc2626] text-white hover:bg-[#b91c1c] shadow-sm font-medium rounded-[8px] px-4 py-2 h-10" onClick={() => setStatusChangeTarget('detail-shipped')}>
                <Truck className="mr-2 h-4 w-4" />
                Mark as Shipped
              </Button>
            </>
          )}
          {currentView === 'detail-edit' && (
            <Button 
              className="bg-[#dc2626] text-white hover:bg-[#b91c1c] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] font-medium rounded-[8px] px-4 py-2 h-10"
              onClick={() => setStatusChangeTarget('detail-locked')}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Accept Requested Order
            </Button>
          )}
          {currentView === 'detail-shipped' && (
            <Button 
              className="bg-[#dc2626] text-white hover:bg-[#b91c1c] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] font-medium rounded-[8px] px-4 py-2 h-10"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Main Layout (2-Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Line Items) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#e5e5e5] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-6 border-b border-[#e5e5e5] flex flex-row items-center justify-between">
              <div className="space-y-1.5">
                <h2 className="text-[16px] font-semibold text-[#0f172b]">Order Items</h2>
                <p className="text-[14px] text-[#62748e]">
                  {!isLocked ? 'Review quantities before accepting the order.' : 'Final agreed quantities.'}
                </p>
              </div>
              {(currentView === 'detail-shipped' || currentView === 'detail-paid') && (
                <Button variant="outline" size="sm" className="bg-white text-[#45556c] border-[#e5e5e5]">
                  <Download className="mr-2 h-4 w-4 text-[#62748e]" />
                  PDF Invoice
                </Button>
              )}
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-neutral-50/50 border-b border-[#e5e5e5] hover:bg-neutral-50/50">
                  <TableHead className="w-[60px] h-12"></TableHead>
                  <TableHead className="text-[#62748e] font-medium h-12">Product</TableHead>
                  <TableHead className="text-[#62748e] font-medium h-12 text-left">Unit Price</TableHead>
                  <TableHead className="text-[#62748e] font-medium h-12 text-center w-[150px]">Quantity</TableHead>
                  <TableHead className="text-right text-[#62748e] font-medium h-12">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Item 1 */}
                <TableRow className="border-b border-[#e5e5e5] hover:bg-transparent h-[72px]">
                  <TableCell>
                    <div className="h-10 w-10 rounded bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center">
                      <span className="text-[10px] text-[#94a3b8] font-medium">IMG</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#0f172b] text-[14px]">25kg Premium Bakery Flour</p>
                    <p className="text-[12px] text-[#62748e]">SKU: FLR-25-PRM</p>
                  </TableCell>
                  <TableCell className="text-[#62748e] text-[14px]">
                    {formatIDR(180000)}
                  </TableCell>
                  <TableCell className="text-[#0f172b] font-medium text-[14px] text-center">
                    50
                  </TableCell>
                  <TableCell className="text-right font-medium text-[#0f172b] text-[14px]">
                    {formatIDR(9000000)}
                  </TableCell>
                </TableRow>

                {/* Item 2: Edited Item */}
                <TableRow className="border-b border-[#e5e5e5] hover:bg-transparent h-[72px]">
                  <TableCell>
                    <div className="h-10 w-10 rounded bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center">
                      <span className="text-[10px] text-[#94a3b8] font-medium">IMG</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#0f172b] text-[14px]">Premium Arabica Beans 5kg</p>
                    <p className="text-[12px] text-[#62748e]">SKU: ARB-05-WHL</p>
                  </TableCell>
                  <TableCell className="text-[#62748e] text-[14px]">
                    {formatIDR(originalPrice)}
                  </TableCell>
                  <TableCell className="text-[#0f172b] font-medium text-[14px] text-center">
                    {editedQty}
                  </TableCell>
                  <TableCell className="text-right font-medium text-[#0f172b] text-[14px]">
                    {formatIDR(currentTotal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Column (Action Sidebar) */}
        <div className="space-y-6">
          
          {/* Action Sidebar */}

          {/* Payment Receipt Card for Screen 5 (Delivered & Paid) */}
          {currentView === 'detail-paid' && (
            <div className="bg-[#e6f6eb] border border-[#c4e8d1] rounded-[12px] shadow-sm overflow-hidden">
              <div className="p-4 border-b border-[#c4e8d1]">
                <h3 className="text-[14px] font-medium flex items-center text-[#218358]">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Payment Receipt
                </h3>
              </div>
              <div className="p-4 pt-4 space-y-3 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-[#218358] opacity-80">Date Paid</span>
                  <span className="font-medium text-[#14532d]">June 5, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#218358] opacity-80">Reference</span>
                  <span className="font-medium text-[#14532d]">BCA-9928172635</span>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-white hover:bg-emerald-50 border-[#c4e8d1] text-[#218358] shadow-sm">
                  <Download className="mr-2 h-4 w-4" /> Download Receipt
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white border border-[#e5e5e5] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-6 pb-4">
              <h3 className="text-[14px] font-semibold text-[#0f172b]">Customer Details</h3>
            </div>
            <div className="px-6 pb-6 space-y-4">
              <div>
                <p className="font-medium text-[#0f172b] text-[14px]">Grand Horeca Group</p>
                <p className="text-[14px] text-[#62748e]">HQ: Central Jakarta</p>
              </div>
              <div className="pt-4 border-t border-[#e5e5e5]">
                <p className="text-[11px] text-[#62748e] font-medium uppercase tracking-wider mb-2">Contact</p>
                <p className="text-[14px] text-[#0f172b]">Michael Wong</p>
                <p className="text-[14px] text-[#2563eb]">purchasing@grandhoreca.com</p>
                <p className="text-[14px] text-[#62748e]">+62 811-9876-5432</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e5e5e5] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-6 pb-4 border-b border-[#e5e5e5]">
              <h3 className="text-[14px] font-semibold text-[#0f172b]">Order Summary</h3>
            </div>
            <div className="p-6 pt-4 space-y-3">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#62748e]">Subtotal (2 items)</span>
                <div className="text-right">
                  <span className="font-medium text-[#0f172b]">
                    {formatIDR(baseSubtotal + currentTotal)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#62748e]">Tax (11% PPN)</span>
                <span className="font-medium text-[#0f172b]">
                  {formatIDR((baseSubtotal + currentTotal) * 0.11)}
                </span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#62748e]">Shipping</span>
                <span className="font-medium text-[#0f172b]">Free (Wholesale)</span>
              </div>
            </div>
            <div className="p-6 pt-4 border-t border-[#e5e5e5] bg-neutral-50/50 flex justify-between items-center">
              <span className="font-semibold text-[#0f172b] text-[16px]">Final Total</span>
              <div className="text-right">
                <span className="font-semibold text-[18px] text-[#0f172b]">
                  {formatIDR((baseSubtotal + currentTotal) * 1.11)}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white border border-[#e5e5e5] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="p-6 pb-4 border-b border-[#e5e5e5]">
              <h3 className="text-[14px] font-semibold text-[#0f172b]">Activity Timeline</h3>
            </div>
            <div className="p-6 pt-5 pb-6">
              <div className="space-y-0">
                <div className="flex gap-4 min-h-[60px]">
                  <div className="relative flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1 ${currentView === 'detail-paid' ? 'bg-[#3b82f6]' : 'bg-[#cbd5e1]'}`} />
                    <div className={`w-px h-full absolute top-4 ${currentView === 'detail-paid' ? 'bg-[#3b82f6]' : 'bg-[#e2e8f0]'}`} />
                  </div>
                  <div className="pb-4">
                    <p className={`text-[14px] font-medium text-[#0f172b] leading-none ${currentView !== 'detail-paid' ? 'opacity-60' : ''}`}>Payment Reconciled</p>
                    {currentView === 'detail-paid' && <p className="text-[12px] text-[#62748e] mt-1.5">June 5, 2026</p>}
                  </div>
                </div>
                
                <div className="flex gap-4 min-h-[60px]">
                  <div className="relative flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1 ${currentView === 'detail-shipped' || currentView === 'detail-paid' ? 'bg-[#3b82f6]' : 'bg-[#cbd5e1]'}`} />
                    <div className={`w-px h-full absolute top-4 ${(currentView === 'detail-paid' || currentView === 'detail-shipped') ? 'bg-[#3b82f6]' : 'bg-[#e2e8f0]'}`} />
                  </div>
                  <div className="pb-4">
                    <p className={`text-[14px] font-medium text-[#0f172b] leading-none ${(currentView === 'detail-locked' || currentView === 'detail-edit') ? 'opacity-60' : ''}`}>Order Shipped</p>
                    {(currentView === 'detail-shipped' || currentView === 'detail-paid') && <p className="text-[12px] text-[#62748e] mt-1.5">May 30, 2026</p>}
                  </div>
                </div>

                <div className="flex gap-4 min-h-[60px]">
                  <div className="relative flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1 ${currentView !== 'detail-edit' ? 'bg-[#3b82f6]' : 'bg-[#cbd5e1]'}`} />
                    <div className={`w-px h-full absolute top-4 ${currentView !== 'detail-edit' ? 'bg-[#3b82f6]' : 'bg-[#e2e8f0]'}`} />
                  </div>
                  <div className="pb-4">
                    <p className={`text-[14px] font-medium text-[#0f172b] leading-none ${currentView === 'detail-edit' ? 'opacity-60' : ''}`}>Adjusted & Accepted</p>
                    {currentView !== 'detail-edit' && <p className="text-[12px] text-[#62748e] mt-1.5">May 29, 2026</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mt-1 bg-[#3b82f6]`} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#0f172b] leading-none">Order Requested</p>
                    <p className="text-[12px] text-[#62748e] mt-1.5">May 29, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
