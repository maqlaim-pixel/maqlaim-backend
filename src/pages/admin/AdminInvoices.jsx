import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Eye, CheckCircle, Clock, XCircle, IndianRupee, TrendingUp, Receipt, Plus, Trash2, Send } from 'lucide-react'
import api from '../../services/api'

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [invRes, statsRes] = await Promise.all([
        api.get('/invoices'),
        api.get('/invoices/stats'),
      ])
      setInvoices(invRes.data)
      setStats(statsRes.data)
    } catch (err) {
      console.error('Failed to load invoices:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    if (!confirm(`Mark invoice as ${status}?`)) return
    try {
      await api.put(`/invoices/${id}/status`, { status })
      loadData()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter)

  const fmt = (val) => {
    if (!val) return '₹0'
    return '₹' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 })
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" /></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">Invoices & GST</h1>
        <Link to="/admin/invoices/create" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors">
          <Plus size={16} /> Create Invoice
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-sky-100 p-3 rounded-lg"><FileText size={20} className="text-sky-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Total Invoices</p>
              <p className="text-2xl font-bold text-navy-900">{stats.totalInvoices || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg"><CheckCircle size={20} className="text-green-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-green-600">{stats.paidCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg"><Clock size={20} className="text-amber-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{stats.pendingCount || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-3 rounded-lg"><IndianRupee size={20} className="text-indigo-600" /></div>
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-navy-900">{fmt(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* GST Summary */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-navy-900 uppercase mb-4 flex items-center gap-2">
          <Receipt size={16} /> GST Collection Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-sky-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase">Total Tax Collected</p>
            <p className="text-xl font-bold text-sky-600">{fmt(stats.totalTaxCollected)}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase">CGST + SGST (Intra-state)</p>
            <p className="text-xl font-bold text-green-600">{fmt(stats.totalCgstSgst)}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase">IGST (Inter-state)</p>
            <p className="text-xl font-bold text-indigo-600">{fmt(stats.totalIgst)}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'draft', 'sent', 'paid', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === f ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}>
            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? invoices.length : invoices.filter(i => i.status === f).length})
          </button>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Invoice #</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-bold text-gray-500 uppercase">Package</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">Amount</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">GST</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase">Total</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="text-center px-5 py-3 text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">No invoices found</td></tr>
              ) : filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono text-sm font-bold text-sky-600">{inv.invoiceNumber}</span>
                    <p className="text-xs text-gray-400">{inv.invoiceDate}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-navy-900">{inv.customerName}</p>
                    <p className="text-xs text-gray-500">{inv.customerEmail}</p>
                    {inv.customerGstin && <p className="text-xs text-gray-400 font-mono">GSTIN: {inv.customerGstin}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-navy-900">{inv.packageTitle}</p>
                    <p className="text-xs text-gray-500">{inv.travelers} traveler(s)</p>
                  </td>
                  <td className="px-5 py-4 text-right text-sm">{fmt(inv.baseAmount)}</td>
                  <td className="px-5 py-4 text-right text-sm text-amber-600">{fmt(inv.totalTax)}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-bold text-navy-900">{fmt(inv.grandTotal)}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      inv.status === 'paid' ? 'bg-green-100 text-green-700' :
                      inv.status === 'sent' ? 'bg-yellow-100 text-yellow-700' :
                      inv.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Link to={`/admin/invoices/preview/${inv.id}`} className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors" title="Preview">
                        <Eye size={14} />
                      </Link>
                      <Link to={`/admin/invoices/edit/${inv.id}`} className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors" title="Edit">
                        <FileText size={14} />
                      </Link>
                      {inv.status === 'draft' && (
                        <button onClick={() => updateStatus(inv.id, 'sent')} className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors" title="Mark Sent">
                          <Send size={14} />
                        </button>
                      )}
                      {inv.status !== 'paid' && inv.status !== 'cancelled' && (
                        <button onClick={() => updateStatus(inv.id, 'paid')} className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="Mark Paid">
                          <CheckCircle size={14} />
                        </button>
                      )}
                      <button onClick={() => { if(confirm('Delete this invoice?')) api.delete(`/invoices/${inv.id}`).then(loadData) }} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
