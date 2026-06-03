import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';

export interface ProductStat {
  id: string | number;
  name: string;
  image?: React.ReactNode;
  value: string | React.ReactNode;
}

interface TopProductsProps {
  revenueData: ProductStat[];
  volumeData: ProductStat[];
  className?: string;
  showViewAll?: boolean;
}

export function TopProducts({ revenueData, volumeData, className = '', showViewAll = false }: TopProductsProps) {
  const [activeTab, setActiveTab] = useState<'revenue' | 'volume'>('revenue');
  const currentProducts = activeTab === 'revenue' ? revenueData : volumeData;

  return (
    <Card className={`shadow-sm border-slate-200 flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing wholesale items.</CardDescription>
        </div>
        {showViewAll && (
          <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Toggle Tabs */}
        <div className="flex items-center p-1 bg-slate-100/80 rounded-lg mb-6">
          <button 
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === 'revenue' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            By Revenue (Cash)
          </button>
          <button 
            onClick={() => setActiveTab('volume')}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === 'volume' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            By Volume (Kg)
          </button>
        </div>

        <div className="space-y-4 flex-1">
          {currentProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0 shadow-sm">
                  {product.image}
                </div>
                <div className="min-w-0 pr-4">
                  <span className="font-medium text-slate-900 text-sm block truncate">{product.name}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-900 shrink-0">
                {product.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
