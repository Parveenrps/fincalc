import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'

export default function NotFound() {
  return (
    <>
      <SEOMeta
        title="404 — Page Not Found | FinCalc"
        description="The page you're looking for doesn't exist."
      />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="font-display text-7xl font-black text-emerald-500 mb-4">404</h1>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">Page Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              ← Back to Home
            </Link>
            <Link to="/emi-calculator" className="btn-secondary">
              Open EMI Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
