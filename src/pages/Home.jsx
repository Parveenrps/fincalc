import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'
import AdBanner from '../components/AdBanner'

const CALCULATORS = [
  {
    to: '/simple-interest-calculator',
    icon: '📈',
    title: 'Simple Interest',
    description: 'Calculate interest on your principal amount with a fixed rate over time.',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Most Popular',
    inputs: ['Principal Amount', 'Interest Rate', 'Time Period'],
  },
  {
    to: '/compound-interest-calculator',
    icon: '📊',
    title: 'Compound Interest',
    description: 'See the power of compounding — interest on interest, growing your wealth exponentially.',
    color: 'from-blue-500 to-cyan-600',
    badge: 'Powerful',
    inputs: ['Principal Amount', 'Rate & Frequency', 'Time Period'],
  },
  {
    to: '/emi-calculator',
    icon: '🏦',
    title: 'EMI Calculator',
    description: 'Plan your loan repayments — calculate monthly EMI, total interest, and total payment.',
    color: 'from-violet-500 to-purple-600',
    badge: 'Loan Planning',
    inputs: ['Loan Amount', 'Interest Rate', 'Loan Tenure'],
  },
]

const FEATURES = [
  { icon: '⚡', title: 'Instant Results', desc: 'Real-time calculations as you type — no button press needed.' },
  { icon: '📱', title: 'Mobile Ready', desc: 'Works beautifully on every device, from phone to desktop.' },
  { icon: '🔒', title: 'Privacy First', desc: 'All calculations happen in your browser. Zero data sent to servers.' },
  { icon: '📄', title: 'PDF Export', desc: 'Download your calculation results as a professionally styled PDF.' },
]

export default function Home() {
  return (
    <>
      <SEOMeta
        title="FinCalc — Free Finance Calculators | SI, CI, EMI"
        description="Calculate Simple Interest, Compound Interest, and EMI instantly with FinCalc. Free, accurate, and mobile-friendly finance tools."
        canonical="https://fincalc.app/"
      />

      {/* Hero */}
      <section className="bg-hero text-white py-20 px-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            Free Finance Tools
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Smart Finance
            <br />
            <span className="text-gradient">Calculators</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Make better financial decisions with our accurate, fast, and free calculators. 
            No sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/emi-calculator" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">
              <span>Calculate EMI</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/compound-interest-calculator" className="px-8 py-4 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all inline-flex items-center gap-2 text-base font-medium">
              Compound Interest
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner Top */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <AdBanner slot="leaderboard" />
      </div>

      {/* Calculators Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Choose Your Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Three powerful tools for every financial need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CALCULATORS.map(calc => (
            <Link
              key={calc.to}
              to={calc.to}
              className="glass-card p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {calc.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">{calc.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${calc.color} text-white font-medium`}>
                  {calc.badge}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{calc.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {calc.inputs.map(inp => (
                  <span key={inp} className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                    {inp}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-4 text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:gap-2 transition-all">
                Calculate now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Banner Middle */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdBanner />
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Why FinCalc?</h2>
          <p className="text-slate-500 dark:text-slate-400">Built for accuracy, speed, and simplicity</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="glass-card p-6 text-center">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl shadow-emerald-900/20">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to calculate?</h2>
          <p className="text-emerald-100 mb-8 text-lg">Start with our most-used EMI calculator</p>
          <Link to="/emi-calculator" className="inline-block px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
            Open EMI Calculator →
          </Link>
        </div>
      </section>
    </>
  )
}
