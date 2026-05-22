import { useState, useEffect } from 'react'
import SEOMeta from '../components/SEOMeta'
import PageHeader from '../components/PageHeader'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ActionButtons from '../components/ActionButtons'
import AdBanner from '../components/AdBanner'
import { calculateEMI } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { downloadResultPDF } from '../utils/pdfExport'

const DEFAULT = { loanAmount: '', interestRate: '', tenure: '' }

export default function EMICalculator() {
  const [saved, setSaved] = useLocalStorage('fincalc-emi', DEFAULT)
  const [form, setForm] = useState(saved)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const { loanAmount, interestRate, tenure } = form
    if (loanAmount && interestRate && tenure) {
      const res = calculateEMI({ loanAmount, interestRate, tenure })
      setResult(res)
      setSaved(form)
    } else {
      setResult(null)
    }
  }, [form])

  const handleReset = () => {
    setForm(DEFAULT)
    setResult(null)
    setSaved(DEFAULT)
  }

  const copyText = result
    ? `EMI Calculation\nLoan Amount: ${formatCurrency(result.loanAmount)}\nInterest Rate: ${result.interestRate}% p.a.\nTenure: ${result.tenure} months\nMonthly EMI: ${formatCurrency(result.monthlyEMI)}\nTotal Interest: ${formatCurrency(result.totalInterest)}\nTotal Payment: ${formatCurrency(result.totalPayment)}`
    : ''

  const handlePDF = () => {
    if (!result) return
    return downloadResultPDF({
      title: 'EMI Calculator',
      inputs: [
        { label: 'Loan Amount', value: formatCurrency(result.loanAmount) },
        { label: 'Annual Interest Rate', value: `${result.interestRate}%` },
        { label: 'Loan Tenure', value: `${result.tenure} Months` },
      ],
      outputs: [
        { label: 'Monthly EMI', value: formatCurrency(result.monthlyEMI), highlight: true },
        { label: 'Total Interest', value: formatCurrency(result.totalInterest) },
        { label: 'Total Payment', value: formatCurrency(result.totalPayment) },
      ],
    })
  }

  // Amortization schedule (first 12 months)
  const getSchedule = () => {
    if (!result) return []
    const r = result.interestRate / (12 * 100)
    let balance = result.loanAmount
    return Array.from({ length: Math.min(result.tenure, 12) }, (_, i) => {
      const interest = balance * r
      const principal = result.monthlyEMI - interest
      balance -= principal
      return { month: i + 1, emi: result.monthlyEMI, principal, interest, balance: Math.max(balance, 0) }
    })
  }

  const schedule = getSchedule()

  return (
    <>
      <SEOMeta
        title="EMI Calculator — FinCalc | Loan EMI Calculator"
        description="Calculate your monthly EMI instantly. Plan home loans, car loans, or personal loans with our free and accurate EMI calculator."
        canonical="https://fincalc.app/emi-calculator"
      />
      <PageHeader
        icon="🏦"
        badge="EMI Calculator"
        title="EMI Calculator"
        description="Plan your loan repayments. Calculate monthly EMI, total interest payable, and total amount."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 glass-card p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Loan Details</h2>
          <div className="space-y-6">
            <InputField
              label="Loan Amount (₹)"
              name="loanAmount"
              value={form.loanAmount}
              onChange={handleChange}
              min={10000}
              max={100000000}
              step={10000}
              prefix="₹"
              placeholder="e.g. 1000000"
            />
            <InputField
              label="Annual Interest Rate"
              name="interestRate"
              value={form.interestRate}
              onChange={handleChange}
              min={1}
              max={30}
              step={0.1}
              suffix="%"
              placeholder="e.g. 8.5"
            />
            <InputField
              label="Loan Tenure (Months)"
              name="tenure"
              value={form.tenure}
              onChange={handleChange}
              min={6}
              max={360}
              step={6}
              suffix="Mo"
              placeholder="e.g. 240"
            />
          </div>

          {form.tenure && (
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              = {Math.round(form.tenure / 12 * 10) / 10} years
            </p>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Results</h2>
            {result ? (
              <div className="space-y-4 animate-in">
                <ResultCard label="Monthly EMI" rawValue={result.monthlyEMI} highlight />
                <ResultCard label="Total Interest" rawValue={result.totalInterest} />
                <ResultCard label="Total Payment" rawValue={result.totalPayment} />

                {/* Donut-like breakdown */}
                <div className="mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Payment Breakdown</p>
                  <div className="flex rounded-lg overflow-hidden h-5">
                    <div
                      className="bg-violet-500 transition-all duration-700 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(result.loanAmount / result.totalPayment) * 100}%` }}
                    >
                      {Math.round((result.loanAmount / result.totalPayment) * 100)}%
                    </div>
                    <div
                      className="bg-amber-400 transition-all duration-700 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                    >
                      {Math.round((result.totalInterest / result.totalPayment) * 100)}%
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500 inline-block" /> Principal</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Interest</span>
                  </div>
                </div>

                <ActionButtons
                  onReset={handleReset}
                  copyText={copyText}
                  onDownloadPDF={handlePDF}
                />
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 dark:text-slate-500">
                <div className="text-5xl mb-3">🏦</div>
                <p className="text-sm">Enter loan details to calculate EMI</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner />
      </div>

      {/* Amortization Table */}
      {schedule.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
          <div className="glass-card p-6 md:p-8 overflow-x-auto">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
              Amortization Schedule
              <span className="text-sm font-body font-normal text-slate-500 ml-2">(First 12 months)</span>
            </h2>
            <table className="w-full text-sm mt-4">
              <thead>
                <tr className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="text-left py-2 pr-4">Month</th>
                  <th className="text-right py-2 pr-4">EMI</th>
                  <th className="text-right py-2 pr-4">Principal</th>
                  <th className="text-right py-2 pr-4">Interest</th>
                  <th className="text-right py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={row.month} className={`border-t border-slate-100 dark:border-slate-700/50 ${i % 2 === 0 ? '' : 'bg-slate-50/50 dark:bg-slate-800/20'}`}>
                    <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400 font-mono">{row.month}</td>
                    <td className="py-2.5 pr-4 text-right font-mono text-slate-700 dark:text-slate-300">{formatCurrency(row.emi)}</td>
                    <td className="py-2.5 pr-4 text-right font-mono text-violet-600 dark:text-violet-400">{formatCurrency(row.principal)}</td>
                    <td className="py-2.5 pr-4 text-right font-mono text-amber-600 dark:text-amber-400">{formatCurrency(row.interest)}</td>
                    <td className="py-2.5 text-right font-mono text-slate-700 dark:text-slate-300">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass-card p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">About EMI</h2>
          <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3">
            <p>An Equated Monthly Installment (EMI) is a fixed monthly payment made by a borrower to a lender. It consists of both principal repayment and interest charged on the outstanding loan.</p>
            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 font-mono text-violet-800 dark:text-violet-300 text-center text-sm border border-violet-200 dark:border-violet-700/50">
              EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
            </div>
            <p>Where <strong>P</strong> = Loan amount, <strong>r</strong> = monthly interest rate, <strong>n</strong> = number of monthly instalments.</p>
          </div>
        </div>
      </div>
    </>
  )
}
