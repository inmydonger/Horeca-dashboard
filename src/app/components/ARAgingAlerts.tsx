import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, Send, Check, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export interface ARAccount {
  id: string | number;
  name: string;
  overdue: number;
  days: number;
}

interface ARAgingAlertsProps {
  data: ARAccount[];
  className?: string;
}

export function ARAgingAlerts({ data, className = '' }: ARAgingAlertsProps) {
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);

  const handleConfirmReminder = () => {
    setIsReminderDialogOpen(false);
    toast('Reminder Sent', {
      description: 'The reminder has been sent to the company’s email address.',
      icon: <CheckCircle2 className="h-5 w-5 fill-slate-900 text-white" />
    });
  };

  return (
    <>
    <Card className={`shadow-sm border-slate-200 flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold text-[#0f172b]">A/R Aging Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </div>
          <CardDescription className="mt-1 text-sm text-[#62748e]">Overdue offline bank transfers</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs font-medium bg-white text-slate-900 shadow-sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className="flex flex-col h-full">
          {data.map((account) => (
            <div key={account.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-neutral-50 transition-colors">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-slate-900 text-sm">{account.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs font-medium">
                    Rp {account.overdue.toLocaleString('id-ID')}
                  </span>
                  <Badge variant="secondary" className="bg-[#fefce9] text-[#9e6c00] hover:bg-[#fefce9] border border-[#ffe770] text-[10px] px-2 py-0 h-5 font-semibold rounded-md">
                    {account.days} days late
                  </Badge>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8 text-xs font-medium shrink-0 bg-white shadow-sm text-slate-900" onClick={() => setIsReminderDialogOpen(true)}>
                <Send className="mr-2 h-3 w-3 text-slate-500" />
                Send Reminder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

      {/* Send Reminder Confirmation Dialog */}
      {isReminderDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div>
              <h3 className="text-[18px] font-semibold text-[#0f172b]">Send Reminder</h3>
              <p className="text-[14px] text-[#62748e] mt-2 leading-[22.75px]">
                Are you sure you want to send a reminder? It will be sent to their company email address.
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReminderDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmReminder}>
                <Check className="mr-2 h-4 w-4" />
                Confirm & Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
