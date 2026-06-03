import { useState } from 'react';
import {
  Search,
  Plus,
  MoreHorizontal,
  Image as ImageIcon,
  ArrowLeft,
  UploadCloud,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../components/ui/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';

// B2B Wholesale Mock Data
const mockProducts = [
  {
    id: 'p1',
    name: 'SHORT RIBS ECT A',
    sku: 'FLR-21-SRE',
    category: 'Beef',
    basePrice: 109940,
    stock: 450,
  },
  {
    id: 'p2',
    name: 'HEAD MEAT LOCKERVALLEY @27,2',
    sku: 'FLR-20-HML',
    category: 'Beef',
    basePrice: 110228,
    stock: 120,
  },
  {
    id: 'p3',
    name: 'BRISKET BONE PPCS ME 15',
    sku: 'FLR-19-BBP',
    category: 'Beef',
    basePrice: 85000,
    stock: 34,
  },
  {
    id: 'p4',
    name: 'TENDERLOIN A',
    sku: 'FLR-18-TDA',
    category: 'Beef',
    basePrice: 250000,
    stock: 0,
  },
  {
    id: 'p5',
    name: 'RIBEYE STEAK',
    sku: 'FLR-17-RES',
    category: 'Beef',
    basePrice: 320000,
    stock: 12,
  },
];

type ViewState = 'list' | 'add' | 'edit';
type ModalType = 'add' | 'edit' | null;
type SortField = 'name' | 'stock' | null;
type SortDirection = 'asc' | 'desc';

export function Products() {
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModalType, setConfirmModalType] = useState<ModalType>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUoM, setSelectedUoM] = useState('Kilograms (kg)');

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

  const editingProduct = editingProductId ? mockProducts.find(p => p.id === editingProductId) : null;

  const handleEditProduct = (product: any) => {
    setEditingProductId(product.id);
    setCurrentView('edit');
    setSelectedCategory(product.category);
    setSelectedUoM('Kilograms (kg)');
  };

  const handleAddProduct = () => {
    setEditingProductId(null);
    setCurrentView('add');
    setSelectedCategory('');
    setSelectedUoM('Kilograms (kg)');
  };

  const filteredAndSortedProducts = mockProducts
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (!sortField) return 0;
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * multiplier;
      }
      if (sortField === 'stock') {
        return (a.stock - b.stock) * multiplier;
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

  if (currentView === 'add' || currentView === 'edit') {
    return (
      <div className="space-y-6 pb-24 animate-in slide-in-from-right-4 duration-300 relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-4 border-b border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500"
              onClick={() => setCurrentView('list')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">{currentView === 'edit' ? 'Edit Product' : 'Add Product'}</h1>
              <p className="text-slate-500 text-sm">{currentView === 'edit' ? 'Modify the product details.' : 'Create a new SKU in your B2B wholesale catalog.'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white" onClick={() => setCurrentView('list')}>
              Discard
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700 shadow-sm" onClick={() => setConfirmModalType(currentView === 'edit' ? 'edit' : 'add')}>
              Save Product
            </Button>
          </div>
        </div>

        {confirmModalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white border border-[#e2e8f0] drop-shadow-xl flex flex-col gap-[16px] items-start p-[25px] relative rounded-[12px] w-[384px] max-w-full animate-in zoom-in-95 duration-200">
              <div className="flex flex-col gap-[8px] items-start w-full">
                <h3 className="font-semibold text-[#0f172b] text-[18px] tracking-tight">
                  {confirmModalType === 'edit' ? 'Confirm Change' : 'Confirm Add Product'}
                </h3>
                <p className="text-[#62748e] text-[14px] leading-relaxed">
                  {confirmModalType === 'edit' 
                    ? 'Are you sure you want to change the product information? This action will update the product stock globally.'
                    : 'Are you sure you want to add a new product? This product will be updated globally.'}
                </p>
              </div>
              <div className="flex gap-[12px] items-center justify-end pt-[16px] w-full">
                <Button variant="outline" className="h-[40px] px-[17px] font-medium text-[14px] border-[#e2e8f0]" onClick={() => setConfirmModalType(null)}>
                  Cancel
                </Button>
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white h-[40px] px-[16px] font-medium text-[14px] flex items-center gap-2" onClick={() => { setConfirmModalType(null); setCurrentView('list'); }}>
                  <Check className="h-4 w-4" />
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">

            {/* Card 1: Core Identity */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-base font-medium">Core Identity</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Product Name</label>
                  <Input defaultValue={editingProduct?.name || ''} placeholder="e.g. 25kg Premium Bakery Flour" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Description</label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                    placeholder="Provide details about the product..."
                    defaultValue={currentView === 'edit' ? 'Premium quality imported beef.' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Media</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer group">
                    <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                      <UploadCloud className="h-5 w-5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Click or drag and drop to upload</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Upload images or PDF Specification Sheets (e.g., Halal certs, Allergen data).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: B2B Pricing & Safeguard */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-base font-medium">B2B Pricing</CardTitle>
                <CardDescription>Configure base wholesale pricing.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2 max-w-xs">
                  <label className="text-sm font-medium text-slate-900">Base Price (IDR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-sm font-medium">Rp</span>
                    <Input defaultValue={editingProduct?.basePrice || ''} type="number" placeholder="0" className="pl-9 bg-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">

            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-base font-medium">Organization</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 flex justify-between">
                    SKU
                    <span className="text-slate-400 font-normal">Required</span>
                  </label>
                  <Input defaultValue={editingProduct?.sku || ''} placeholder="e.g. FLR-25-PRM" className="bg-white font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Category</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className={`flex items-center justify-between h-10 w-full rounded-[8px] border border-[#e2e8f0] bg-white px-[12.676px] py-[8.676px] text-[14px] font-normal shadow-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${selectedCategory ? 'text-[#0f172b]' : 'text-[#62748e]'}`}>
                        {selectedCategory || "Select Category"}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start"
                      className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-[#e2e8f0] border-[0.676px] rounded-[12px] p-[4.676px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                    >
                      {['Beef', 'Chicken', 'Sea Food', 'Spices'].map(cat => (
                        <DropdownMenuItem 
                          key={cat} 
                          onClick={() => setSelectedCategory(cat)}
                          className="px-[8px] py-[6px] text-[14px] text-[#0f172b] cursor-pointer rounded-md hover:bg-slate-100 outline-none"
                        >
                          {cat}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Inventory & B2B Logistics */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4 border-b border-slate-100">
                <CardTitle className="text-base font-medium">Inventory & Logistics</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Current Stock Level</label>
                  <Input defaultValue={editingProduct?.stock ?? ''} type="number" placeholder="0" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Base Unit of Measure (UoM)</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center justify-between h-10 w-full rounded-[8px] border border-[#e2e8f0] bg-white px-[12.676px] py-[8.676px] text-[14px] font-normal text-[#0f172b] shadow-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                        {selectedUoM}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="start"
                      className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white border-[#e2e8f0] border-[0.676px] rounded-[12px] p-[4.676px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                    >
                      {['Kilograms (kg)', 'Liter (L)', 'Carton', 'Pallet', 'Unit / Piece'].map(uom => (
                        <DropdownMenuItem 
                          key={uom} 
                          onClick={() => setSelectedUoM(uom)}
                          className="px-[8px] py-[6px] text-[14px] text-[#0f172b] cursor-pointer rounded-md hover:bg-slate-100 outline-none"
                        >
                          {uom}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-900 leading-tight block h-8">
                      Minimum Order Qty (MOQ)
                    </label>
                    <Input type="number" placeholder="e.g. 5" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-900 leading-tight block h-8">
                      Quantity Multiples
                    </label>
                    <Input type="number" placeholder="e.g. 6" className="bg-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-300 relative max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Products</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your wholesale catalog and B2B pricing rules.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-red-600 text-white hover:bg-red-700 shadow-sm"
            onClick={handleAddProduct}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search by product name or SKU..."
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Master List (Data Table) */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="w-[64px]"></TableHead>
              <TableHead
                className="cursor-pointer hover:text-slate-900 select-none"
                onClick={() => toggleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Product & SKU
                  {sortField === 'name' ? (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ArrowUpDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Base Price</TableHead>
              <TableHead
                className="text-right cursor-pointer hover:text-slate-900 select-none"
                onClick={() => toggleSort('stock')}
              >
                <div className="flex items-center justify-end gap-1">
                  Current Stock
                  {sortField === 'stock' ? (
                    sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ArrowUpDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-slate-50 group">
                <TableCell>
                  <div className="h-10 w-10 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{product.name}</span>
                    <span className="text-xs text-slate-500 font-mono mt-0.5">{product.sku}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-white text-slate-600 font-normal border-slate-200">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900">
                  {formatIDR(product.basePrice)}
                </TableCell>
                <TableCell className="text-right">
                  {product.stock > 0 ? (
                    <span className="text-slate-900 font-medium">{product.stock}</span>
                  ) : (
                    <span className="text-rose-600 font-medium bg-rose-50 px-2 py-0.5 rounded text-xs">Out of Stock</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity data-[state=open]:opacity-100 focus:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
