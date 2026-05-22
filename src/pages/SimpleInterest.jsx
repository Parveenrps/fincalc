import { useState, useEffect } from 'react'
import SEOMeta from '../components/SEOMeta'
import PageHeader from '../components/PageHeader'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ActionButtons from '../components/ActionButtons'
import AdBanner from '../components/AdBanner'
import { calculateSimpleInterest } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { downloadResultPDF } from '../utils/pdfExport'

const DEFAULT = { principal: '', rate: '', time: '' }

export default function SimpleInterest() {
  const [saved, setSaved] = useLocalStorage('fincalc-si', DEFAULT)
  const [form, setForm] = useState(saved)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const { principal, rate, time } = form
    if (principal && rate && time) {
      const res = calculateSimpleInterest({ principal, rate, time })
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
    ? `Simple Interest Calculation\nPrincipal: ${formatCurrency(result.principal)}\nRate: ${result.rate}%\nTime: ${result.time} years\nInterest: ${formatCurrency(result.interest)}\nTotal Amount: ${formatCurrency(result.totalAmount)}`
    : ''

  const handlePDF = () => {
    if (!result) return
    return downloadResultPDF({
      title: 'Simple Interest Calculator',
      inputs: [
        { label: 'Principal Amount', value: formatCurrency(result.principal) },
        { label: 'Annual Interest Rate', value: `${result.rate}%` },
        { label: 'Time Period', value: `${result.time} Year(s)` },
      ],
      outputs: [
        { label: 'Simple Interest', value: formatCurrency(result.interest) },
        { label: 'Total Amount', value: formatCurrency(result.totalAmount), highlight: true },
      ],
    })
  }

  return (
    <>
      <SEOMeta
        title="Simple Interest Calculator — FinCalc"
        description="Calculate simple interest instantly. Enter principal, rate, and time to get interest amount and total payable."
        canonical="https://fincalc.app/simple-interest-calculator"
      />
      <PageHeader
        icon="📈"
        badge="Simple Interest"
        title="Simple Interest Calculator"
        description="Calculate interest using the formula SI = (P × R × T) / 100"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 glass-card p-6 md:p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Enter Details</h2>
          <div className="space-y-6">
            <InputField
              label="Principal Amount (₹)"
              name="principal"
              value={form.principal}
              onChange={handleChange}
              min={1000}
              max={10000000}
              step={1000}
              prefix="₹"
              placeholder="e.g. 100000"
            />
            <InputField
              label="Annual Interest Rate"
              name="rate"
              value={form.rate}
              onChange={handleChange}
              min={0.1}
              max={50}
              step={0.1}
              suffix="%"
              placeholder="e.g. 8.5"
            />
            <InputField
              label="Time Period (Years)"
              name="time"
              value={form.time}
              onChange={handleChange}
              min={1}
              max={50}
              step={1}
              suffix="Yr"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Results</h2>
            {result ? (
              <div className="space-y-4 animate-in">
                <ResultCard label="Simple Interest" rawValue={result.interest} />
                <ResultCard label="Total Amount" rawValue={result.totalAmount} highlight />
                <ResultCard label="Principal" rawValue={result.principal} />

                {/* Bar visualization */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Principal vs Interest Breakdown</p>
                  <div className="flex rounded-lg overflow-hidden h-4">
                    <div
                      className="bg-emerald-500 transition-all duration-700"
                      style={{ width: `${(result.principal / result.totalAmount) * 100}%` }}
                      title={`Principal: ${Math.round((result.principal / result.totalAmount) * 100)}%`}
                    />
                    <div
                      className="bg-amber-400 transition-all duration-700"
                      style={{ width: `${(result.interest / result.totalAmount) * 100}%` }}
                      title={`Interest: ${Math.round((result.interest / result.totalAmount) * 100)}%`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Principal</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Interest</span>
                  </div>
                </div>

                <ActionButtons
                  onReset={handleReset}
                  onCopy={() => {}}
                  copyText={copyText}
                  onDownloadPDF={handlePDF}
                />
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 dark:text-slate-500">
                <div className="text-5xl mb-3">🧮</div>
                <p className="text-sm">Fill in the details to see your results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner />
      </div>

      {/* Info Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass-card p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">About Simple Interest</h2>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3">
            <p>Simple Interest (SI) is calculated on the original principal amount only, not on accumulated interest. It's commonly used for short-term loans and deposits.</p>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 font-mono text-emerald-800 dark:text-emerald-300 text-center text-base border border-emerald-200 dark:border-emerald-700/50">
              SI = (P × R × T) / 100 &nbsp;|&nbsp; Total = P + SI
            </div>
            <p>Where <strong>P</strong> = Principal, <strong>R</strong> = Rate per annum, <strong>T</strong> = Time in years.</p>
          </div>
        </div>
      </div>
    </>
  )
}
