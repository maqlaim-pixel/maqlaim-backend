import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Download, Printer, ArrowLeft, FileText, CheckCircle, Clock } from 'lucide-react'
import api from '../../services/api'

export default function InvoicePage() {
  const { id } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const invoiceRef = useRef()

  useEffect(() => {
    loadInvoice()
  }, [id])

  const loadInvoice = async () => {
    try {
      const res = await api.get(`/invoices/${id}`)
      setInvoice(res.data)
    } catch (err) {
      setError('Invoice not found')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    const printContent = invoiceRef.current
    if (!printContent) return
    const win = window.open('', '_blank')
    win.document.write(`
      <html><head><title>Invoice ${invoice?.invoiceNumber}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; padding: 20px; }
        .invoice-box { max-width: 800px; margin: 0 auto; border: 1px solid #e0e0e0; padding: 30px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 20px; }
        .company h1 { font-size: 24px; color: #0ea5e9; }
        .company p { font-size: 12px; color: #666; margin-top: 4px; }
        .invoice-meta { text-align: right; }
        .invoice-meta h2 { font-size: 20px; color: #1a1a2e; }
        .invoice-meta p { font-size: 12px; color: #666; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase; }
        .badge-paid { background: #d1fae5; color: #065f46; }
        .badge-pending { background: #fef3c7; color: #92400e; }
        .badge-draft { background: #e0e7ff; color: #3730a3; }
        .parties { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .party { width: 48%; }
        .party h3 { font-size: 12px; text-transform: uppercase; color: #0ea5e9; margin-bottom: 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px; }
        .party p { font-size: 13px; color: #333; line-height: 1.6; }
        .party .label { color: #666; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; color: #475569; border-bottom: 2px solid #e2e8f0; }
        td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
        .text-right { text-align: right; }
        .totals { width: 350px; margin-left: auto; }
        .totals tr td { padding: 6px 12px; font-size: 13px; }
        .totals .total-row td { font-weight: bold; font-size: 16px; border-top: 2px solid #0ea5e9; padding-top: 10px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #666; text-align: center; }
        .gst-summary { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
        .gst-summary h3 { font-size: 12px; text-transform: uppercase; color: #0ea5e9; margin-bottom: 10px; }
        .gst-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .gst-item { text-align: center; }
        .gst-item .label { font-size: 10px; color: #666; text-transform: uppercase; }
        .gst-item .value { font-size: 16px; font-weight: bold; color: #1a1a2e; }
        @media print { body { padding: 0; } .invoice-box { border: none; } }
      </style></head><body>
      <div class="invoice-box">${printContent.innerHTML}</div>
      </body></html>
    `)
    win.document.close()
    setTimeout(() => { win.print(); }, 500)
  }

  const handleDownload = () => {
    handlePrint() // Print to PDF via browser
  }

  const fmt = (val) => {
    if (!val) return '₹0.00'
    return '₹' + Number(val).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" /></div>
  if (error) return <div className="text-center py-16"><p className="text-red-600 text-lg">{error}</p><Link to="/account/bookings" className="text-sky-600 mt-4 inline-block">← Back to Bookings</Link></div>
  if (!invoice) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/account/bookings" className="flex items-center gap-2 text-navy-600 hover:text-sky-600 transition-colors">
            <ArrowLeft size={18} /> Back to Bookings
          </Link>
          <div className="flex gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              <Printer size={16} /> Print
            </button>
            <button onClick={handleDownload} className="flex items-center gap-2 bg-navy-800 hover:bg-navy-900 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              <Download size={16} /> Download PDF
            </button>
          </div>
        </div>

        {/* Invoice Content */}
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
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                    invoice.status === 'sent' ? 'bg-yellow-100 text-yellow-700' :
                    invoice.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {invoice.status === 'paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="p-8">
            <div className="flex justify-between gap-8 mb-8">
              <div className="flex-1 bg-gray-50 rounded-xl p-5">
                <h3 className="text-xs font-bold uppercase text-sky-600 mb-3 pb-2 border-b border-gray-200">Sold To (Buyer)</h3>
                <p className="font-bold text-navy-900">{invoice.customerName}</p>
                <p className="text-sm text-gray-600">{invoice.customerEmail}</p>
                <p className="text-sm text-gray-600">{invoice.customerPhone}</p>
                {invoice.customerAddress && <p className="text-sm text-gray-500 mt-1">{invoice.customerAddress}</p>}
                {invoice.customerGstin && (
                  <p className="text-sm text-gray-700 mt-2">GSTIN: <span className="font-mono font-bold">{invoice.customerGstin}</span></p>
                )}
                {invoice.customerState && <p className="text-sm text-gray-500">State: {invoice.customerState}</p>}
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-5">
                <h3 className="text-xs font-bold uppercase text-sky-600 mb-3 pb-2 border-b border-gray-200">Package Details</h3>
                <p className="font-bold text-navy-900">{invoice.packageTitle}</p>
                {invoice.travelDate && <p className="text-sm text-gray-600">Travel: {invoice.travelDate}{invoice.endDate ? ` → ${invoice.endDate}` : ''}</p>}
                <p className="text-sm text-gray-600">Travelers: {invoice.travelers}</p>
                {invoice.booking && <p className="text-sm text-gray-500 mt-1">Booking Ref: {invoice.booking.bookingRef}</p>}
              </div>
            </div>

            {/* Line Items Table */}
            <table className="w-full mb-6">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>HSN</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Rate</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <p className="font-semibold text-navy-900">{invoice.packageTitle}</p>
                    <p className="text-xs text-gray-500">{invoice.itemDescription}</p>
                  </td>
                  <td className="font-mono text-sm">{invoice.hsnCode}</td>
                  <td className="text-right">{invoice.travelers}</td>
                  <td className="text-right">{fmt(invoice.baseAmount / (invoice.travelers || 1))}</td>
                  <td className="text-right font-semibold">{fmt(invoice.baseAmount)}</td>
                </tr>
              </tbody>
            </table>

            {/* GST Summary */}
            <div className="bg-sky-50 rounded-xl p-5 mb-6">
              <h3 className="text-xs font-bold uppercase text-sky-700 mb-3">GST Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                {Number(invoice.cgstAmount) > 0 && (
                  <div className="text-center bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-500">CGST ({invoice.cgstRate}%)</p>
                    <p className="text-lg font-bold text-navy-900">{fmt(invoice.cgstAmount)}</p>
                  </div>
                )}
                {Number(invoice.sgstAmount) > 0 && (
                  <div className="text-center bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-500">SGST ({invoice.sgstRate}%)</p>
                    <p className="text-lg font-bold text-navy-900">{fmt(invoice.sgstAmount)}</p>
                  </div>
                )}
                {Number(invoice.igstAmount) > 0 && (
                  <div className="text-center bg-white rounded-lg p-3">
                    <p className="text-xs text-gray-500">IGST ({invoice.igstRate}%)</p>
                    <p className="text-lg font-bold text-navy-900">{fmt(invoice.igstAmount)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <table className="w-80">
                <tbody>
                  <tr><td className="text-gray-600">Subtotal (Base Amount)</td><td className="text-right">{fmt(invoice.baseAmount)}</td></tr>
                  {Number(invoice.discountAmount) > 0 && <tr><td className="text-gray-600">Discount</td><td className="text-right text-green-600">-{fmt(invoice.discountAmount)}</td></tr>}
                  <tr><td className="text-gray-600">Total Tax (GST)</td><td className="text-right">{fmt(invoice.totalTax)}</td></tr>
                  <tr className="border-t-2 border-sky-500">
                    <td className="pt-3 text-lg font-bold text-navy-900">Grand Total</td>
                    <td className="pt-3 text-right text-lg font-bold text-sky-600">{fmt(invoice.grandTotal)}</td>
                  </tr>
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

            {/* Notes */}
            {invoice.notes && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Notes</p>
                <p className="text-sm text-gray-700">{invoice.notes}</p>
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
    </div>
  )
}

// ── Number to Words (Indian format) ──────────────────────────────
function amountInWords(amount) {
  if (!amount || amount <= 0) return 'Zero'
  const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen']
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']

  const n = Math.floor(Number(amount))
  if (n === 0) return 'Zero'

  let result = ''
  if (n >= 10000000) { result += ones[Math.floor(n / 10000000)] + ' Crore '; }
  if (n >= 100000) { result += ones[Math.floor((n % 10000000) / 100000)] + ' Lakh '; }
  if (n >= 1000) { result += ones[Math.floor((n % 100000) / 1000)] + ' Thousand '; }
  if (n >= 100) { result += ones[Math.floor((n % 1000) / 100)] + ' Hundred '; }
  const lastTwo = n % 100
  if (lastTwo >= 20) { result += tens[Math.floor(lastTwo / 10)] + ' ' + ones[lastTwo % 10] + ' ' }
  else if (lastTwo > 0) { result += ones[lastTwo] + ' ' }

  return result.trim()
}
