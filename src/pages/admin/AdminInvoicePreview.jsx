import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Download, Printer, Send, MessageCircle, Mail, CheckCircle, Clock, FileText, Edit3 } from 'lucide-react'
import api from '../../services/api'

export default function AdminInvoicePreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sendModal, setSendModal] = useState(false)
  const [sending, setSending] = useState(false)
  const invoiceRef = useRef()

  const [sendForm, setSendForm] = useState({
    sendVia: 'email',
    recipientEmail: '',
    recipientPhone: '',
    sendAdminCopy: false,
  })

  useEffect(() => {
    api.get(`/invoices/${id}`).then(res => {
      setInvoice(res.data)
      setSendForm({
        sendVia: 'email',
        recipientEmail: res.data.customerEmail || '',
        recipientPhone: res.data.customerPhone || '',
        sendAdminCopy: false,
      })
    }).catch(() => alert('Invoice not found'))
    .finally(() => setLoading(false))
  }, [id])

  const handlePrint = () => {
    const content = invoiceRef.current
    if (!content) return
    const win = window.open('', '_blank')
    win.document.write(`<html><head><title>Invoice ${invoice?.invoiceNumber}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; padding: 20px; }
        .box { max-width: 800px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 30px; }
        .hdr { display: flex; justify-content: space-between; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 20px; }
        .co h1 { font-size: 22px; color: #0ea5e9; } .co p { font-size: 12px; color: #666; margin-top: 3px; }
        .meta { text-align: right; } .meta h2 { font-size: 18px; } .meta p { font-size: 12px; color: #666; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .badge-paid { background: #d1fae5; color: #065f46; } .badge-sent { background: #fef3c7; color: #92400e; }
        .badge-draft { background: #e0e7ff; color: #3730a3; } .badge-cancelled { background: #fee2e2; color: #991b1b; }
        .parties { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .party { width: 48%; background: #f8fafc; padding: 15px; border-radius: 8px; }
        .party h3 { font-size: 11px; text-transform: uppercase; color: #0ea5e9; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px; }
        .party p { font-size: 12px; color: #333; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #f1f5f9; padding: 8px 10px; text-align: left; font-size: 10px; text-transform: uppercase; color: #475569; border-bottom: 2px solid #e2e8f0; }
        td { padding: 8px 10px; border-bottom: 1px solid #f1f5f9; font-size: 12px; }
        .tr { text-align: right; }
        .totals { width: 320px; margin-left: auto; }
        .totals td { padding: 5px 10px; font-size: 12px; }
        .totals .gt td { font-weight: bold; font-size: 15px; border-top: 2px solid #0ea5e9; padding-top: 8px; }
        .gst-box { background: #f0f9ff; padding: 12px; border-radius: 8px; margin-bottom: 15px; display: flex; gap: 15px; justify-content: center; }
        .gst-item { text-align: center; } .gst-item .lb { font-size: 10px; color: #666; } .gst-item .vl { font-size: 14px; font-weight: bold; }
        .ftr { margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 10px; color: #666; text-align: center; }
        @media print { body { padding: 0; } .box { border: none; } }
      </style></head><body><div class="box">${content.innerHTML}</div></body></html>`)
    win.document.close()
    setTimeout(() => win.print(), 400)
  }

  const handleSend = async () => {
    if (!sendForm.recipientEmail && !sendForm.recipientPhone) {
      alert('Enter at least email or phone number'); return
    }
    setSending(true)
    try {
      await api.post(`/invoices/${id}/send`, sendForm)
      // Refresh invoice
      const res = await api.get(`/invoices/${id}`)
      setInvoice(res.data)
      setSendModal(false)
      alert('Invoice sent successfully!')
    } catch (err) {
      alert('Failed to send: ' + (err.response?.data?.error || err.message))
    } finally {
      setSending(false)
    }
  }

  const handleWhatsApp = () => {
    if (!invoice?.customerPhone) { alert('No phone number available'); return }
    const phone = invoice.customerPhone.replace(/[^0-9]/g, '')
    const msg = encodeURIComponent(`Hello ${invoice.customerName},\n\nHere is your invoice from TravelVista.\n\nInvoice #: ${invoice.invoiceNumber}\nAmount: ₹${Number(invoice.grandTotal).toLocaleString('en-IN')}\n\nThank you for choosing TravelVista!`)
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  const fmt = (v) => '₹' + Number(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const statusBadge = (status) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      sent: 'bg-yellow-100 text-yellow-700',
      unpaid: 'bg-orange-100 text-orange-700',
      cancelled: 'bg-red-100 text-red-700',
      draft: 'bg-blue-100 text-blue-700',
    }
    return <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${styles[status] || styles.draft}`}>
      {status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />} {status}
    </span>
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" /></div>
  if (!invoice) return <div className="text-center py-16"><p className="text-red-600">Invoice not found</p></div>

  // Compute items (from invoice.items or fallback)
  const items = invoice.items && invoice.items.length > 0 ? invoice.items : [{
    description: invoice.packageTitle || 'Service',
    hsnCode: invoice.hsnCode || '9954',
    quantity: invoice.travelers || 1,
    rate: invoice.baseAmount && invoice.travelers ? invoice.baseAmount / invoice.travelers : 0,
    taxableAmount: invoice.baseAmount || 0,
    totalTax: invoice.totalTax || 0,
    lineTotal: invoice.grandTotal || 0,
    cgstRate: invoice.cgstRate || 0, cgstAmount: invoice.cgstAmount || 0,
    sgstRate: invoice.sgstRate || 0, sgstAmount: invoice.sgstAmount || 0,
    igstRate: invoice.igstRate || 0, igstAmount: invoice.igstAmount || 0,
  }]

  const isIntraState = Number(invoice.cgstAmount) > 0

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/admin/invoices" className="flex items-center gap-2 text-navy-600 hover:text-sky-600 transition-colors text-sm">
            <ArrowLeft size={18} /> Back to Invoices
          </Link>
          <div className="flex gap-2">
            <Link to={`/admin/invoices/edit/${invoice.id}`} className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Edit3 size={14} /> Edit
            </Link>
            <button onClick={handlePrint} className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Printer size={14} /> Print
            </button>
            <button onClick={handlePrint} className="flex items-center gap-1.5 bg-navy-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-navy-900 transition-colors">
              <Download size={14} /> PDF
            </button>
            <button onClick={handleWhatsApp} className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
              <MessageCircle size={14} /> WhatsApp
            </button>
            <button onClick={() => setSendModal(true)} className="flex items-center gap-1.5 bg-sky-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors">
              <Send size={14} /> Send Invoice
            </button>
          </div>
        </div>

        {/* Invoice Content (printable) */}
        <div ref={invoiceRef} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b-4 border-sky-500">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-sky-600">{invoice.companyName || 'TravelVista'}</h1>
                <p className="text-sm text-gray-500 mt-1">{invoice.companyAddress}</p>
                {invoice.companyGstin && <p className="text-sm text-gray-600 mt-1">GSTIN: <span className="font-mono font-bold">{invoice.companyGstin}</span></p>}
                <p className="text-sm text-gray-500">State: {invoice.companyState}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <FileText size={20} className="text-sky-600" />
                  <h2 className="text-xl font-bold text-navy-900">TAX INVOICE</h2>
                </div>
                <p className="text-sm text-gray-600">Invoice #: <span className="font-mono font-bold">{invoice.invoiceNumber}</span></p>
                <p className="text-sm text-gray-500">Date: {invoice.invoiceDate}</p>
                {invoice.dueDate && <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>}
                <div className="mt-2">{statusBadge(invoice.status)}</div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Parties */}
            <div className="flex justify-between gap-8 mb-8">
              <div className="flex-1 bg-gray-50 rounded-xl p-5">
                <h3 className="text-xs font-bold uppercase text-sky-600 mb-3 pb-2 border-b border-gray-200">Sold To (Buyer)</h3>
                <p className="font-bold text-navy-900">{invoice.customerName}</p>
                <p className="text-sm text-gray-600">{invoice.customerEmail}</p>
                <p className="text-sm text-gray-600">{invoice.customerPhone}</p>
                {invoice.customerAddress && <p className="text-sm text-gray-500 mt-1">{invoice.customerAddress}</p>}
                {invoice.customerGstin && <p className="text-sm text-gray-700 mt-2">GSTIN: <span className="font-mono font-bold">{invoice.customerGstin}</span></p>}
                {invoice.customerState && <p className="text-sm text-gray-500">State: {invoice.customerState}</p>}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-5">
                <h3 className="text-xs font-bold uppercase text-sky-600 mb-3 pb-2 border-b border-gray-200">Package / Service Details</h3>
                <p className="font-bold text-navy-900">{invoice.packageTitle || 'N/A'}</p>
                {invoice.travelDate && <p className="text-sm text-gray-600">Travel: {invoice.travelDate}{invoice.endDate ? ` → ${invoice.endDate}` : ''}</p>}
                {invoice.travelers && <p className="text-sm text-gray-600">Travelers: {invoice.travelers}</p>}
                {/* Sent info */}
                {invoice.sentAt && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Sent: {invoice.sentVia} on {new Date(invoice.sentAt).toLocaleDateString('en-IN')}</p>
                    {invoice.emailStatus && <p className="text-xs text-gray-500">Email: {invoice.emailStatus}</p>}
                    {invoice.whatsappStatus && <p className="text-xs text-gray-500">WhatsApp: {invoice.whatsappStatus}</p>}
                    {invoice.adminCopySent && <p className="text-xs text-green-600">✓ Admin copy sent</p>}
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-6">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>HSN</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Disc %</th>
                  <th className="text-right">Taxable</th>
                  <th className="text-right">GST</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <p className="font-semibold text-navy-900">{item.description}</p>
                    </td>
                    <td className="font-mono text-sm">{item.hsnCode}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">{fmt(item.rate)}</td>
                    <td className="text-right">{item.discountPercent > 0 ? `${item.discountPercent}%` : '-'}</td>
                    <td className="text-right">{fmt(item.taxableAmount)}</td>
                    <td className="text-right text-amber-600">{fmt(item.totalTax)}</td>
                    <td className="text-right font-semibold">{fmt(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* GST Summary */}
            <div className="bg-sky-50 rounded-xl p-4 mb-6">
              <h3 className="text-xs font-bold uppercase text-sky-700 mb-3">GST Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                {isIntraState ? (
                  <>
                    <div className="text-center bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">CGST ({invoice.cgstRate}%)</p>
                      <p className="text-lg font-bold text-navy-900">{fmt(invoice.cgstAmount)}</p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">SGST ({invoice.sgstRate}%)</p>
                      <p className="text-lg font-bold text-navy-900">{fmt(invoice.sgstAmount)}</p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">IGST</p>
                      <p className="text-lg font-bold text-gray-400">₹0.00</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">CGST</p>
                      <p className="text-lg font-bold text-gray-400">₹0.00</p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">SGST</p>
                      <p className="text-lg font-bold text-gray-400">₹0.00</p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-3">
                      <p className="text-xs text-gray-500">IGST ({invoice.igstRate}%)</p>
                      <p className="text-lg font-bold text-navy-900">{fmt(invoice.igstAmount)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <table className="w-80">
                <tbody>
                  <tr><td className="text-gray-600">Subtotal</td><td className="text-right">{fmt(invoice.baseAmount)}</td></tr>
                  {Number(invoice.discountAmount) > 0 && <tr><td className="text-gray-600">Discount</td><td className="text-right text-green-600">-{fmt(invoice.discountAmount)}</td></tr>}
                  <tr><td className="text-gray-600">Total Tax (GST)</td><td className="text-right">{fmt(invoice.totalTax)}</td></tr>
                  <tr className="border-t-2 border-sky-500"><td className="pt-3 text-lg font-bold text-navy-900">Grand Total</td><td className="pt-3 text-right text-lg font-bold text-sky-600">{fmt(invoice.grandTotal)}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Amount in Words */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Amount in Words</p>
              <p className="text-sm font-semibold text-navy-900">{amountInWords(invoice.grandTotal)} Rupees Only</p>
            </div>

            {/* Payment Details */}
            {invoice.paymentMode && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <p className="text-xs text-green-700 uppercase font-bold mb-1">Payment Details</p>
                <p className="text-sm text-green-800">Mode: {invoice.paymentMode}</p>
                {invoice.paymentReference && <p className="text-sm text-green-800">Reference: {invoice.paymentReference}</p>}
              </div>
            )}

            {invoice.notes && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Notes</p>
                <p className="text-sm text-gray-700">{invoice.notes}</p>
              </div>
            )}

            {/* Created By */}
            {invoice.createdByName && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Created by: {invoice.createdByName} ({invoice.createdByEmail})</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">This is a computer-generated invoice and does not require a physical signature.</p>
            <p className="text-xs text-gray-500 mt-1">For queries, contact {invoice.companyEmail || 'hello@travelvista.com'} | {invoice.companyPhone || '+91 98765 43210'}</p>
            <p className="text-xs text-gray-400 mt-2">Powered by TravelVista</p>
          </div>
        </div>
      </div>

      {/* Send Modal */}
      {sendModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={() => setSendModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-navy-900 mb-4">Send Invoice</h3>
            <p className="text-sm text-gray-500 mb-4">Send invoice #{invoice.invoiceNumber} to {invoice.customerName}</p>

            <div className="space-y-4">
              {/* Send Via */}
              <div>
                <label className="text-xs font-medium text-gray-600 mb-2 block">Send Via</label>
                <div className="flex gap-2">
                  {['email', 'whatsapp', 'both'].map(via => (
                    <button key={via} type="button" onClick={() => setSendForm(p => ({ ...p, sendVia: via }))}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                        sendForm.sendVia === via ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}>
                      {via === 'email' && <><Mail size={14} className="inline mr-1" /> Email</>}
                      {via === 'whatsapp' && <><MessageCircle size={14} className="inline mr-1" /> WhatsApp</>}
                      {via === 'both' && 'Both'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              {(sendForm.sendVia === 'email' || sendForm.sendVia === 'both') && (
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Recipient Email</label>
                  <input type="email" value={sendForm.recipientEmail} onChange={e => setSendForm(p => ({ ...p, recipientEmail: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                </div>
              )}

              {/* WhatsApp */}
              {(sendForm.sendVia === 'whatsapp' || sendForm.sendVia === 'both') && (
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Recipient Phone (with country code)</label>
                  <input type="tel" value={sendForm.recipientPhone} onChange={e => setSendForm(p => ({ ...p, recipientPhone: e.target.value }))}
                    placeholder="+91 98765 43210" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none" />
                </div>
              )}

              {/* Admin Copy */}
              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input type="checkbox" checked={sendForm.sendAdminCopy} onChange={e => setSendForm(p => ({ ...p, sendAdminCopy: e.target.checked }))}
                  className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500" />
                <div>
                  <p className="text-sm font-medium text-navy-900">Send copy to Admin</p>
                  <p className="text-xs text-gray-500">Also send invoice to admin's email/WhatsApp</p>
                </div>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setSendModal(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSend} disabled={sending} className="flex-1 px-4 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Send size={14} />
                {sending ? 'Sending...' : 'Send Invoice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Amount in Words (Indian format)
function amountInWords(amount) {
  if (!amount || amount <= 0) return 'Zero'
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']
  const n = Math.floor(Number(amount))
  if (n === 0) return 'Zero'
  let r = ''
  if (n >= 10000000) r += ones[Math.floor(n / 10000000)] + ' Crore '
  if (n >= 100000) r += ones[Math.floor((n % 10000000) / 100000)] + ' Lakh '
  if (n >= 1000) r += ones[Math.floor((n % 100000) / 1000)] + ' Thousand '
  if (n >= 100) r += ones[Math.floor((n % 1000) / 100)] + ' Hundred '
  const lastTwo = n % 100
  if (lastTwo >= 20) r += tens[Math.floor(lastTwo / 10)] + ' ' + ones[lastTwo % 10] + ' '
  else if (lastTwo > 0) r += ones[lastTwo] + ' '
  return r.trim()
}
