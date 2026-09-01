import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Save, Plus, Trash2, ArrowLeft, Calculator, Users, FileText } from 'lucide-react'
import api from '../../services/api'

const EMPTY_ITEM = { description: '', hsnCode: '9954', quantity: 1, unit: 'NOS', rate: 0, discountPercent: 0 }

export default function AdminInvoiceForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [users, setUsers] = useState([])

  // Form state
  const [form, setForm] = useState({
    userId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerGstin: '',
    customerState: '',
    packageTitle: '',
    travelDate: '',
    endDate: '',
    travelers: 1,
    dueDate: '',
    notes: 'Thank you for choosing TravelVista!',
  })

  const [items, setItems] = useState([{ ...EMPTY_ITEM }])

  const GST_RATE = 18
  const companyState = 'Maharashtra' // Will come from settings

  // Load users and existing invoice
  useEffect(() => {
    api.get('/invoices/users').then(res => setUsers(res.data || [])).catch(() => {})
    if (isEdit) {
      setLoading(true)
      api.get(`/invoices/${id}`).then(res => {
        const inv = res.data
        setForm({
          userId: inv.user?.id || '',
          customerName: inv.customerName || '',
          customerEmail: inv.customerEmail || '',
          customerPhone: inv.customerPhone || '',
          customerAddress: inv.customerAddress || '',
          customerGstin: inv.customerGstin || '',
          customerState: inv.customerState || '',
          packageTitle: inv.packageTitle || '',
          travelDate: inv.travelDate || '',
          endDate: inv.endDate || '',
          travelers: inv.travelers || 1,
          dueDate: inv.dueDate || '',
          notes: inv.notes || '',
        })
        if (inv.items && inv.items.length > 0) {
          setItems(inv.items.map(it => ({
            description: it.description || '',
            hsnCode: it.hsnCode || '9954',
            quantity: it.quantity || 1,
            unit: it.unit || 'NOS',
            rate: it.rate || 0,
            discountPercent: it.discountPercent || 0,
          })))
        }
      }).catch(() => alert('Invoice not found')).finally(() => setLoading(false))
    }
  }, [id, isEdit])

  // Auto-fill when user is selected
  const handleUserSelect = (e) => {
    const userId = e.target.value
    setForm(prev => ({ ...prev, userId }))
    if (userId) {
      const user = users.find(u => u.id === Number(userId))
      if (user) {
        setForm(prev => ({ ...prev, userId, customerName: user.name, customerEmail: user.email, customerPhone: user.phone }))
      }
    }
  }

  const updateItem = (index, field, value) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  const addItem = () => setItems(prev => [...prev, { ...EMPTY_ITEM }])
  const removeItem = (index) => setItems(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev)

  // Calculate GST for each item
  const calculateItems = () => {
    const isIntra = form.customerState?.trim().toLowerCase() === companyState.trim().toLowerCase()
    return items.map(item => {
      const rate = Number(item.rate) || 0
      const qty = Number(item.quantity) || 1
      const discPct = Number(item.discountPercent) || 0
      const base = rate * qty
      const discAmt = base * discPct / 100
      const taxable = base - discAmt
      const gstAmt = taxable * GST_RATE / 100
      const halfGst = gstAmt / 2

      if (isIntra) {
        return {
          ...item,
          taxableAmount: taxable,
          cgstRate: 9, sgstRate: 9, igstRate: 0,
          cgstAmount: halfGst, sgstAmount: halfGst, igstAmount: 0,
          totalTax: gstAmt,
          lineTotal: taxable + gstAmt,
        }
      } else {
        return {
          ...item,
          taxableAmount: taxable,
          cgstRate: 0, sgstRate: 0, igstRate: GST_RATE,
          cgstAmount: 0, sgstAmount: 0, igstAmount: gstAmt,
          totalTax: gstAmt,
          lineTotal: taxable + gstAmt,
        }
      }
    })
  }

  const calculatedItems = calculateItems()
  const subtotal = calculatedItems.reduce((sum, it) => sum + (it.taxableAmount || 0), 0)
  const totalTax = calculatedItems.reduce((sum, it) => sum + (it.totalTax || 0), 0)
  const totalDiscount = calculatedItems.reduce((sum, it) => sum + (it.taxableAmount ? (Number(it.rate) * Number(it.quantity) - it.taxableAmount) : 0), 0)
  const grandTotal = calculatedItems.reduce((sum, it) => sum + (it.lineTotal || 0), 0)

  const isIntraState = form.customerState?.trim().toLowerCase() === companyState.trim().toLowerCase()

  const fmt = (v) => '₹' + Number(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.customerName) { alert('Customer name is required'); return }
    if (items.length === 0 || !items[0].description) { alert('Add at least one item'); return }

    setSaving(true)
    try {
      const body = {
        ...form,
        userId: form.userId ? Number(form.userId) : null,
        travelers: Number(form.travelers) || 1,
        items: items.map(it => ({
          description: it.description,
          hsnCode: it.hsnCode || '9954',
          quantity: Number(it.quantity) || 1,
          unit: it.unit || 'NOS',
          rate: Number(it.rate) || 0,
          discountPercent: Number(it.discountPercent) || 0,
        })),
      }

      if (isEdit) {
        await api.put(`/invoices/${id}`, body)
      } else {
        await api.post('/invoices', body)
      }
      navigate('/admin/invoices')
    } catch (err) {
      alert('Failed to save invoice: ' + (err.response?.data?.error || err.message))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" /></div>

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/invoices')} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Invoice' : 'Create New Invoice'}</h1>
          <p className="text-sm text-gray-500">Fill in the details to generate a GST-compliant invoice</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client / User Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-navy-900 uppercase mb-4 flex items-center gap-2">
            <Users size={16} className="text-sky-600" /> Client / User Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Select User (auto-fill)</label>
              <select value={form.userId} onChange={handleUserSelect} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none">
                <option value="">— Select User —</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Customer Name *</label>
              <input type="text" required value={form.customerName} onChange={e => setForm(p => ({ ...p, customerName: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Email</label>
              <input type="email" value={form.customerEmail} onChange={e => setForm(p => ({ ...p, customerEmail: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Phone</label>
              <input type="text" value={form.customerPhone} onChange={e => setForm(p => ({ ...p, customerPhone: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Address</label>
              <input type="text" value={form.customerAddress} onChange={e => setForm(p => ({ ...p, customerAddress: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Customer GSTIN</label>
              <input type="text" value={form.customerGstin} onChange={e => setForm(p => ({ ...p, customerGstin: e.target.value }))} placeholder="Optional" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Customer State</label>
              <input type="text" value={form.customerState} onChange={e => setForm(p => ({ ...p, customerState: e.target.value }))} placeholder="e.g. Gujarat" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Package Title</label>
              <input type="text" value={form.packageTitle} onChange={e => setForm(p => ({ ...p, packageTitle: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-navy-900 uppercase mb-4 flex items-center gap-2">
            <FileText size={16} className="text-sky-600" /> Invoice Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Travel Date</label>
              <input type="date" value={form.travelDate} onChange={e => setForm(p => ({ ...p, travelDate: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">End Date</label>
              <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Due Date</label>
              <input type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Travelers</label>
              <input type="number" min="1" value={form.travelers} onChange={e => setForm(p => ({ ...p, travelers: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-gray-600 mb-1 block">Notes</label>
            <textarea rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-navy-900 uppercase flex items-center gap-2">
              <Calculator size={16} className="text-sky-600" /> Line Items & GST
            </h3>
            <span className="text-xs text-gray-500">
              GST Type: <span className={`font-bold ${isIntraState ? 'text-green-600' : 'text-indigo-600'}`}>
                {isIntraState ? 'Intra-state (CGST+SGST)' : 'Inter-state (IGST)'}
              </span>
            </span>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 uppercase w-8">#</th>
                  <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 uppercase">Description *</th>
                  <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 uppercase w-20">HSN</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase w-16">Qty</th>
                  <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 uppercase w-16">Unit</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase w-24">Rate (₹)</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase w-20">Disc %</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase w-28">Taxable</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase w-24">GST</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase w-28">Total</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {calculatedItems.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-3 py-1">
                      <input type="text" required value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none" placeholder="Service description" />
                    </td>
                    <td className="px-3 py-1">
                      <input type="text" value={item.hsnCode} onChange={e => updateItem(i, 'hsnCode', e.target.value)} className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none font-mono" />
                    </td>
                    <td className="px-3 py-1">
                      <input type="number" min="1" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm text-right focus:ring-1 focus:ring-sky-500 focus:outline-none" />
                    </td>
                    <td className="px-3 py-1">
                      <input type="text" value={item.unit} onChange={e => updateItem(i, 'unit', e.target.value)} className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none" />
                    </td>
                    <td className="px-3 py-1">
                      <input type="number" min="0" step="0.01" value={item.rate} onChange={e => updateItem(i, 'rate', e.target.value)} className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm text-right focus:ring-1 focus:ring-sky-500 focus:outline-none" />
                    </td>
                    <td className="px-3 py-1">
                      <input type="number" min="0" max="100" step="0.5" value={item.discountPercent} onChange={e => updateItem(i, 'discountPercent', e.target.value)} className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm text-right focus:ring-1 focus:ring-sky-500 focus:outline-none" />
                    </td>
                    <td className="px-3 py-2 text-right text-gray-700 font-mono">{fmt(item.taxableAmount)}</td>
                    <td className="px-3 py-2 text-right text-amber-600 font-mono">{fmt(item.totalTax)}</td>
                    <td className="px-3 py-2 text-right font-bold text-navy-900 font-mono">{fmt(item.lineTotal)}</td>
                    <td className="px-2">
                      {calculatedItems.length > 1 && (
                        <button type="button" onClick={() => removeItem(i)} className="p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="button" onClick={addItem} className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium mb-6 transition-colors">
            <Plus size={16} /> Add Item
          </button>

          {/* Totals Summary */}
          <div className="flex justify-end">
            <div className="w-80 bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal (before GST)</span>
                <span className="font-mono">{fmt(subtotal)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span className="font-mono">-{fmt(totalDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{isIntraState ? 'CGST (9%)' : 'IGST (18%)'}</span>
                <span className="font-mono text-amber-600">{fmt(totalTax)}</span>
              </div>
              {isIntraState && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>SGST (9%)</span>
                  <span className="font-mono text-amber-600">{fmt(totalTax / 2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span className="text-navy-900">Grand Total</span>
                <span className="text-sky-600">{fmt(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button type="button" onClick={() => navigate('/admin/invoices')} className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold text-sm transition-colors disabled:opacity-50">
            <Save size={16} />
            {saving ? 'Saving...' : isEdit ? 'Update Invoice' : 'Create Invoice'}
          </button>
        </div>
      </form>
    </div>
  )
}
