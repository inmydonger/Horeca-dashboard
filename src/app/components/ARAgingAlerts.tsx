import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, Send } from 'lucide-react';

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
  return (
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
            <div key={account.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
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
              <Button size="sm" variant="outline" className="h-8 text-xs font-medium shrink-0 bg-white shadow-sm text-slate-900">
                <Send className="mr-2 h-3 w-3 text-slate-500" />
                Send Reminder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
