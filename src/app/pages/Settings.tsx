import React, { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Users, 
  Bell, 
  UploadCloud,
  Plus,
  MoreHorizontal,
  X,
  Edit2,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';

export function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');

  // Dummy data for users table
  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@rmehoreca.com', role: 'Super Admin', lastLogin: '2 mins ago' },
    { id: 2, name: 'Bob Johnson', email: 'bob@rmehoreca.com', role: 'Finance', lastLogin: 'Yesterday' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@rmehoreca.com', role: 'Warehouse', lastLogin: '3 days ago' },
  ]);

  // Dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Modal state
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Form states
  const [staffFormName, setStaffFormName] = useState('');
  const [staffFormEmail, setStaffFormEmail] = useState('');
  const [staffFormRole, setStaffFormRole] = useState('Finance');

  const openAddModal = () => {
    setEditingUserId(null);
    setStaffFormName('');
    setStaffFormEmail('');
    setStaffFormRole('Finance');
    setIsStaffModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUserId(user.id);
    setStaffFormName(user.name);
    setStaffFormEmail(user.email);
    setStaffFormRole(user.role);
    setIsStaffModalOpen(true);
    setOpenDropdownId(null);
  };

  const removeUser = (id: number) => {
    setUsersList(usersList.filter(u => u.id !== id));
    setOpenDropdownId(null);
    toast.success('User removed successfully');
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUserId) {
      setUsersList(usersList.map(u => 
        u.id === editingUserId 
          ? { ...u, name: staffFormName, email: staffFormEmail, role: staffFormRole } 
          : u
      ));
      toast.success('Staff member updated successfully');
    } else {
      const newUser = {
        id: Date.now(),
        name: staffFormName,
        email: staffFormEmail,
        role: staffFormRole,
        lastLogin: 'Never'
      };
      setUsersList([...usersList, newUser]);
      toast.success('Staff member added successfully', {
        description: 'An invitation email has been sent.'
      });
    }
    setIsStaffModalOpen(false);
  };

  // Logic to disable Super Admin if one already exists
  const hasSuperAdmin = usersList.some(u => u.role === 'Super Admin');
  const editingUserIsSuperAdmin = editingUserId 
    ? usersList.find(u => u.id === editingUserId)?.role === 'Super Admin' 
    : false;
  
  // Can select super admin if there's no super admin OR the user we're currently editing is the super admin
  const canSelectSuperAdmin = !hasSuperAdmin || editingUserIsSuperAdmin;

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-6">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Top Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 mb-8 no-scrollbar">
        <nav className="flex gap-6 min-w-max">
          <button 
            className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'partner-profile' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
            onClick={() => setActiveTab('partner-profile')}
          >
            <Building2 className="w-4 h-4" />
            Partner Profile
          </button>
          <button 
            className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'billing' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
            onClick={() => setActiveTab('billing')}
          >
            <CreditCard className="w-4 h-4" />
            Billing & Invoicing
          </button>
          <button 
            className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'users' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            <Users className="w-4 h-4" />
            Internal Users & Roles
          </button>
          <button 
            className={`flex items-center gap-2 pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'notifications' 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>
        </nav>
      </div>

      {/* Active Content Area */}
      <main>
        {activeTab === 'partner-profile' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Partner Profile</h3>
                <p className="text-sm text-slate-500 mt-1">Manage your brand identity and legal configuration.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <Button variant="outline" className="bg-white hover:bg-slate-50">Discard</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => toast.success('Profile settings saved')}>Save Changes</Button>
              </div>
            </div>

            {/* Card 1: Brand & Legal Identity */}
            <Card className="border-slate-200 shadow-sm rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base">Brand & Legal Identity</CardTitle>
                <CardDescription>
                  This information appears on your buyer portal and all generated PDF invoices.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Logo Upload */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-900">Company Logo</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <UploadCloud className="h-5 w-5 text-slate-500" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">SVG, PNG, or JPG (max. 2MB)</p>
                  </div>
                  <p className="text-[13px] text-slate-500">This logo appears on your buyer portal and all generated PDF invoices.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Legal Entity Name</label>
                    <Input placeholder="e.g. PT RME Horeca Indonesia" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Tax Identification Number (NPWP/GST)</label>
                    <Input placeholder="e.g. 01.234.567.8-901.000" />
                    <p className="text-[13px] text-slate-500">Required for legal invoice compliance.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Company Address</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 resize-y"
                    placeholder="Enter full legal address..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Offline Invoice Bank Details */}
            <Card className="border-slate-200 shadow-sm rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base">Offline Invoice Bank Details</CardTitle>
                <CardDescription>
                  These details will be printed on the bottom of all invoices to instruct buyers on where to send offline transfers.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Bank Name</label>
                    <Input placeholder="e.g. Bank Central Asia (BCA)" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Account Name</label>
                    <Input placeholder="e.g. PT RME Horeca Indonesia" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-900">Account Number</label>
                    <Input placeholder="e.g. 1234567890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Additional Payment Notes</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 resize-y"
                    placeholder="e.g. Please include Invoice ID in the transfer reference"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Internal Users</h3>
                <p className="text-sm text-slate-500 mt-1">Manage staff access and module permissions.</p>
              </div>
              <Button 
                onClick={openAddModal}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </div>

            <Card className="border-slate-200 shadow-sm rounded-lg overflow-visible">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-medium text-slate-500">Name & Email</TableHead>
                    <TableHead className="font-medium text-slate-500">Role</TableHead>
                    <TableHead className="font-medium text-slate-500">Last Login</TableHead>
                    <TableHead className="font-medium text-slate-500 w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                        No internal users found.
                      </TableCell>
                    </TableRow>
                  ) : usersList.map((user) => (
                    <TableRow key={user.id} className="group">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{user.name}</span>
                          <span className="text-sm text-slate-500">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.role === 'Super Admin' ? 'default' : 'secondary'}
                          className={user.role === 'Super Admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <div className="relative">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                          
                          {/* Custom Dropdown Menu */}
                          {openDropdownId === user.id && (
                            <>
                              {/* Overlay to handle outside clicks */}
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setOpenDropdownId(null)}
                              />
                              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-slate-200 z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                <button 
                                  className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                                  onClick={() => openEditModal(user)}
                                >
                                  <Edit2 className="w-4 h-4 mr-2 text-slate-500" />
                                  Edit User
                                </button>
                                <button 
                                  className="w-full flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                                  onClick={() => removeUser(user.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2 text-rose-500" />
                                  Remove User
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Billing & Invoicing</h3>
                <p className="text-sm text-slate-500 mt-1">Manage invoice defaults and your platform subscription.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <Button variant="outline" className="bg-white hover:bg-slate-50">Discard</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => toast.success('Invoice settings saved')}>Save Settings</Button>
              </div>
            </div>

            {/* Card 1: Invoice Engine Customization */}
            <Card className="border-slate-200 shadow-sm rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base">Invoice Engine Customization (For Buyers)</CardTitle>
                <CardDescription>
                  Configure the default settings for the PDF invoices sent to your customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Invoice Prefix</label>
                    <Input defaultValue="INV-" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Next Invoice Number</label>
                    <Input type="number" defaultValue="0600" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-900">Default Payment Terms</label>
                    <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="net15">Net-15</option>
                      <option value="net30">Net-30</option>
                      <option value="net60">Net-60</option>
                    </select>
                    <p className="text-[13px] text-slate-500">This applies to new customers unless overridden on their profile.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Default Footer / Memo</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-900 resize-y"
                    defaultValue="Standard terms and conditions: All payments must be made via offline bank transfer. Goods remain property of RME Horeca until paid in full."
                  />
                  <p className="text-[13px] text-slate-500">Standard terms and conditions printed at the bottom of every invoice.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-500 mt-1">Manage system alerts and automated buyer communication.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                <Button variant="outline" className="bg-white hover:bg-slate-50">Discard</Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => toast.success('Notification settings saved')}>Save Settings</Button>
              </div>
            </div>

            {/* Card 1: Buyer Email Triggers */}
            <Card className="border-slate-200 shadow-sm rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base">Buyer Email Triggers (Outbound)</CardTitle>
                <CardDescription>
                  Manage the automated emails sent to your customers during the order lifecycle.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-900">Order Requested (Proforma)</label>
                      <p className="text-[13px] text-slate-500">Sent when a buyer submits a new order request.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-900">Order Accepted</label>
                      <p className="text-[13px] text-slate-500">Sent when you approve and finalize the order details.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-900">Order Dispatched (Includes Invoice PDF)</label>
                      <p className="text-[13px] text-slate-500">Sent when goods are marked out for delivery, attaching the final invoice.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-900">Payment Received Receipt</label>
                      <p className="text-[13px] text-slate-500">Sent when an offline bank transfer is verified by finance.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium text-slate-900">Overdue Payment Reminder</label>
                      <p className="text-[13px] text-slate-500">Sent 3 days after standard payment terms are exceeded.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Internal Routing */}
            <Card className="border-slate-200 shadow-sm rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <CardTitle className="text-base">Internal Routing (Inbound Alerts)</CardTitle>
                <CardDescription>
                  Direct system alerts to specific internal departments.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">New Order Requests Alert</label>
                    <Input type="email" defaultValue="warehouse@rmehoreca.com" />
                    <p className="text-[13px] text-slate-500">Notifies the warehouse team to triage incoming proforma orders.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Payment Overdue Alert</label>
                    <Input type="email" defaultValue="finance@rmehoreca.com" />
                    <p className="text-[13px] text-slate-500">Alerts the finance team when an invoice exceeds its Net terms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </main>

      {/* Role Assignment Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {editingUserId ? 'Edit Staff Member' : 'Add Staff Member'}
                </h3>
                <p className="text-sm text-slate-500">
                  {editingUserId ? 'Update member details and permissions.' : 'Send an invitation to join the team.'}
                </p>
              </div>
              <button 
                onClick={() => setIsStaffModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleStaffSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Full Name</label>
                  <Input 
                    placeholder="e.g. Jane Doe" 
                    required 
                    value={staffFormName}
                    onChange={(e) => setStaffFormName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="jane@example.com" 
                    required 
                    value={staffFormEmail}
                    onChange={(e) => setStaffFormEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-900">Assign Role</label>
                <div className="space-y-3">
                  {/* Super Admin Option */}
                  <label 
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      !canSelectSuperAdmin 
                        ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-200' 
                        : staffFormRole === 'Super Admin' 
                          ? 'border-[#DC2626] bg-white cursor-pointer' 
                          : 'border-slate-200 hover:border-slate-300 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center h-5">
                      <input 
                        type="radio" 
                        name="role" 
                        value="Super Admin"
                        className="w-4 h-4 accent-[#DC2626] text-[#DC2626] border-slate-300 focus:ring-[#DC2626] disabled:opacity-50" 
                        checked={staffFormRole === 'Super Admin'}
                        onChange={(e) => setStaffFormRole(e.target.value)}
                        disabled={!canSelectSuperAdmin}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">Super Admin</span>
                        {!canSelectSuperAdmin && (
                          <span className="text-[10px] font-medium bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-sm">
                            Already assigned
                          </span>
                        )}
                      </div>
                      <span className="text-[13px] text-slate-500 mt-0.5">Full access to all modules, including financial settings and user management.</span>
                    </div>
                  </label>

                  {/* Finance Option */}
                  <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${staffFormRole === 'Finance' ? 'border-[#DC2626] bg-white' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-center h-5">
                      <input 
                        type="radio" 
                        name="role" 
                        value="Finance"
                        className="w-4 h-4 accent-[#DC2626] text-[#DC2626] border-slate-300 focus:ring-[#DC2626]" 
                        checked={staffFormRole === 'Finance'}
                        onChange={(e) => setStaffFormRole(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">Finance</span>
                      <span className="text-[13px] text-slate-500 mt-0.5">Access to Analytics, Invoices, and Orders. Cannot edit products or system settings.</span>
                    </div>
                  </label>

                  {/* Warehouse Option */}
                  <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${staffFormRole === 'Warehouse' ? 'border-[#DC2626] bg-white' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-center h-5">
                      <input 
                        type="radio" 
                        name="role" 
                        value="Warehouse"
                        className="w-4 h-4 accent-[#DC2626] text-[#DC2626] border-slate-300 focus:ring-[#DC2626]" 
                        checked={staffFormRole === 'Warehouse'}
                        onChange={(e) => setStaffFormRole(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">Warehouse</span>
                      <span className="text-[13px] text-slate-500 mt-0.5">Access to Order Triage and Fulfillment only. Cannot view financial analytics, margins, or bank settings.</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-slate-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsStaffModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-red-600 text-white hover:bg-red-700"
                >
                  {editingUserId ? 'Save Changes' : 'Send Invitation'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}