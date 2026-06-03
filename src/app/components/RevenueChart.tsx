import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface RevenueDataPoint {
  name: string;
  booked: number;
  collected: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  className?: string;
}

export function RevenueChart({ data, className = '' }: RevenueChartProps) {
  return (
    <Card className={`shadow-sm border-slate-200 ${className}`}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Revenue Reconciliation</CardTitle>
            <CardDescription>Booked vs. Collected over the last 4 weeks</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#cad5e2]"></div>
              <span className="text-slate-600">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#0090ff]"></div>
              <span className="text-slate-600">Collected</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="h-[300px] w-full mt-4 px-4 sm:px-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => value === 0 ? '0,00 Rp' : `${value / 1000000}M`}
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number, name: string) => [
                  `Rp ${value.toLocaleString('id-ID')}`, 
                  name === 'booked' ? 'Booked' : 'Collected'
                ]}
              />
              <Bar dataKey="booked" fill="#cad5e2" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Bar dataKey="collected" fill="#0090ff" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
