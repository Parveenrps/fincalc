import { Link } from 'react-router-dom'

const CALCULATORS = [
  { to: '/simple-interest-calculator', label: 'Simple Interest Calculator' },
  { to: '/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { to: '/emi-calculator', label: 'EMI Calculator' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-mono">₹</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Fin<span className="text-emerald-400">Calc</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Free, fast, and accurate finance calculators for smarter financial decisions. Built for individuals and professionals.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-semibold text-white mb-4">Calculators</h4>
            <ul className="space-y-2">
              {CALCULATORS.map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Info</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>All calculations are estimates only</li>
              <li>No data is stored on servers</li>
              <li>Free to use, always</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FinCalc. All rights reserved.</p>
          <p>Made with ❤️ for better financial literacy</p>
        </div>
      </div>
    </footer>
  )
}
