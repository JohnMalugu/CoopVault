import React, { useState, useEffect } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Input, Select } from '@/components/ui/Input'
import { formatCurrency } from '@/utils/formatters'
import { Calculator } from 'lucide-react'

const products = [
  { value: '3|12|Normal Loan', label: 'Normal Loan (3× savings, 12% p.a.)' },
  { value: '1|8|Emergency Loan', label: 'Emergency Loan (1× savings, 8% p.a.)' },
  { value: '5|15|Development Loan', label: 'Development Loan (5× savings, 15% p.a.)' },
]

export const LoanCalculator: React.FC = () => {
  const [savings, setSavings] = useState(1200000)
  const [pendingLoan, setPendingLoan] = useState(0)
  const [product, setProduct] = useState(products[0].value)
  const [amount, setAmount] = useState(2000000)
  const [tenure, setTenure] = useState(24)
  const [result, setResult] = useState({ eligible: 0, monthly: 0, interest: 0, total: 0, rate: 0 })

  useEffect(() => {
    const [mult, rate, _name] = product.split('|')
    const m = parseFloat(mult), r = parseFloat(rate)
    const eligible = savings * m - pendingLoan
    const actual = Math.min(amount, Math.max(eligible, 0))
    const mr = r / 100 / 12
    const monthly = actual > 0 && tenure > 0
      ? actual * (mr * Math.pow(1 + mr, tenure)) / (Math.pow(1 + mr, tenure) - 1)
      : 0
    const total = monthly * tenure
    setResult({ eligible, monthly, interest: total - actual, total, rate: r })
  }, [savings, pendingLoan, product, amount, tenure])

  const exceeded = amount > result.eligible

  return (
    <div className="animate-fade-in">
      <PageHeader title="Loan Calculator" subtitle="Calculate your loan eligibility and repayment schedule" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        {/* Input panel */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-card">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white"><Calculator size = {20} className="text-primary-500"/> <span>Your Financial Position</span></div>
          </div>
          <div className="p-6 space-y-4">
            <Input label="Savings Value (TZS)" type="number" value={savings} onChange={e => setSavings(+e.target.value)} />
            <Input label="Pending Loan Value (TZS)" type="number" value={pendingLoan} onChange={e => setPendingLoan(+e.target.value)} />
            <Select label="Loan Product" value={product} onChange={e => setProduct(e.target.value)} options={products} />
            <Input label="Eligible Loan Value" type="text" value={formatCurrency(Math.max(result.eligible, 0))} readOnly className="opacity-70 cursor-not-allowed" />
            <Input label="Requested Amount (TZS)" type="number" value={amount} onChange={e => setAmount(+e.target.value)} />
            <Input label="Tenure (months)" type="number" value={tenure} onChange={e => setTenure(+e.target.value)} />
          </div>
        </div>

        {/* Result panel */}
        <div>
          <div className="bg-gradient-to-br from-primary-900 to-primary-600 rounded-xl p-6 text-white">
            <div className="text-xs font-bold opacity-70 uppercase tracking-wider">Eligible Loan Amount</div>
            <div className="text-4xl font-extrabold tracking-tight mt-1.5">
              {formatCurrency(Math.max(result.eligible, 0))}
            </div>
            <div className="text-xs opacity-60 mt-1">{product.split('|')[2]} — {result.rate}% p.a.</div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              {[
                { label: 'Monthly Repayment', value: formatCurrency(Math.round(result.monthly)) },
                { label: 'Total Interest', value: formatCurrency(Math.round(result.interest)) },
                { label: 'Total Repayment', value: formatCurrency(Math.round(result.total)) },
                { label: 'Interest Rate', value: `${result.rate}% p.a.` },
              ].map(item => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3.5">
                  <div className="text-xs opacity-70 font-medium">{item.label}</div>
                  <div className="text-lg font-bold font-mono mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>

            {exceeded && (
              <div className="mt-4 bg-amber-500/20 border border-amber-400/30 rounded-xl p-3 text-sm">
                ⚠️ Requested amount exceeds your eligibility of {formatCurrency(Math.max(result.eligible, 0))}
              </div>
            )}
          </div>

          {/* Repayment breakdown */}
          <div className="mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-card">
            <div className="font-bold text-gray-900 dark:text-white mb-3 text-sm">Principal vs Interest Split</div>
            <div className="space-y-2">
              {[
                { label: 'Principal', value: Math.min(amount, result.eligible), total: result.total, color: 'bg-primary-500' },
                { label: 'Interest', value: result.interest, total: result.total, color: 'bg-accent-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.total > 0 ? Math.round((item.value / item.total) * 100) : 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.total > 0 ? (item.value / item.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
