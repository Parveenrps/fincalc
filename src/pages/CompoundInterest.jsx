import { useState, useEffect } from 'react'
import SEOMeta from '../components/SEOMeta'
import PageHeader from '../components/PageHeader'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import ActionButtons from '../components/ActionButtons'
import AdBanner from '../components/AdBanner'
import { calculateCompoundInterest, FREQUENCY_OPTIONS } from '../utils/calculations'
import { formatCurrency } from '../utils/formatters'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { downloadResultPDF } from '../utils/pdfExport'

const DEFAULT = { principal: '', rate: '', time: '', frequency: '12' }

export default function CompoundInterest() {
  const [saved, setSaved] = useLocalStorage('fincalc-ci', DEFAULT)
  const [form, setForm] = useState(saved)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const { principal, rate, time, frequency } = form
    if (principal && rate && time) {
      const res = calculateCompoundInterest({ principal, rate, time, frequency })
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

  const freqLabel = FREQUENCY_OPTIONS.find(f => f.value === form.frequency)?.label || 'Yearly'

  const copyText = result
    ? `Compound Interest Calculation\nPrincipal: ${formatCurrency(result.principal)}\nRate: ${result.rate}%\nTime: ${result.time} years\nCompounding: ${freqLabel}\nCompound Interest: ${formatCurrency(result.compoundInterest)}\nFinal Amount: ${formatCurrency(result.finalAmount)}`
    : ''

  const handlePDF = () => {
    if (!result) return
    return downloadResultPDF({
      title: 'Compound Interest Calculator',
      inputs: [
        { label: 'Principal Amount', value: formatCurrency(result.principal) },
        { label: 'Annual Interest Rate', value: `${result.rate}%` },
        { label: 'Time Period', value: `${result.time} Year(s)` },
        { label: 'Compounding Frequency', value: freqLabel },
      ],
      outputs: [
        { label: 'Compound Interest', value: formatCurrency(result.compoundInterest) },
        { label: 'Final Amount', value: formatCurrency(result.finalAmount), highlight: true },
      ],
    })
  }

  // Yearly growth data for visual
  const growthData = result && form.time
    ? Array.from({ length: Math.min(parseInt(form.time), 20) }, (_, i) => {
        const yr = calculateCompoundInterest({ ...form, time: i + 1 })
        return { year: i + 1, amount: yr.finalAmount }
      })
    : []

  const maxAmount = growthData.length ? Math.max(...growthData.map(d => d.amount)) : 1

  return (
    <>
      <SEOMeta
        title="Compound Interest Calculator — FinCalc"
        description="See the power of compounding. Calculate compound interest with different compounding frequencies — yearly, monthly, and more."
        canonical="https://fincalc.app/compound-interest-calculator"
      />
      <PageHeader
        icon="📊"
        badge="Compound Interest"
        title="Compound Interest Calculator"
        description="A = P(1 + r/n)^(nt) — Watch your money grow exponentially"
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
              placeholder="e.g. 12"
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
              placeholder="e.g. 10"
            />

            {/* Frequency Selector */}
            <div>
              <label className="label">Compounding Frequency</label>
              <div className="grid grid-cols-4 gap-2">
                {FREQUENCY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, frequency: opt.value }))}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      form.frequency === opt.value
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Results</h2>
            {result ? (
              <div className="space-y-4 animate-in">
                <ResultCard label="Compound Interest" rawValue={result.compoundInterest} />
                <ResultCard label="Final Amount" rawValue={result.finalAmount} highlight />
                <ResultCard label="Principal" rawValue={result.principal} />

                {/* Breakdown bar */}
                <div className="mt-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Principal vs Interest</p>
                  <div className="flex rounded-lg overflow-hidden h-4">
                    <div
                      className="bg-blue-500 transition-all duration-700"
                      style={{ width: `${(result.principal / result.finalAmount) * 100}%` }}
                    />
                    <div
                      className="bg-emerald-400 transition-all duration-700"
                      style={{ width: `${(result.compoundInterest / result.finalAmount) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Principal</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Interest</span>
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
                <div className="text-5xl mb-3">📈</div>
                <p className="text-sm">Fill in the details to see compounding magic</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      {growthData.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">Year-by-Year Growth</h2>
            <div className="flex items-end gap-1.5 h-32">
              {growthData.map(d => (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-500 hover:from-emerald-500 hover:to-teal-400 cursor-pointer relative"
                    style={{ height: `${(d.amount / maxAmount) * 100}%`, minHeight: '4px' }}
                    title={`Year ${d.year}: ${formatCurrency(d.amount)}`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                      {formatCurrency(d.amount)}
                    </div>
                  </div>
                  {d.year % Math.max(1, Math.floor(growthData.length / 5)) === 0 && (
                    <span className="text-xs text-slate-400 dark:text-slate-500">{d.year}y</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ad Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner />
      </div>

      {/* Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass-card p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4">About Compound Interest</h2>
          <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-3">
            <p>Compound interest is interest calculated on both the initial principal and the accumulated interest. Albert Einstein reportedly called it the "eighth wonder of the world."</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 font-mono text-blue-800 dark:text-blue-300 text-center text-base border border-blue-200 dark:border-blue-700/50">
              A = P × (1 + r/n)^(n×t)
            </div>
            <p>Where <strong>P</strong> = Principal, <strong>r</strong> = annual rate (decimal), <strong>n</strong> = compounds/year, <strong>t</strong> = years.</p>
          </div>
        </div>
      </div>
    </>
  )
}
