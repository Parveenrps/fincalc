import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDarkMode } from './hooks/useDarkMode'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SimpleInterest from './pages/SimpleInterest'
import CompoundInterest from './pages/CompoundInterest'
import EMICalculator from './pages/EMICalculator'
import NotFound from './pages/NotFound'

export default function App() {
  const { isDark, toggleDark } = useDarkMode()

  return (
    <BrowserRouter>
      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
          <Navbar isDark={isDark} toggleDark={toggleDark} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/simple-interest-calculator" element={<SimpleInterest />} />
              <Route path="/compound-interest-calculator" element={<CompoundInterest />} />
              <Route path="/emi-calculator" element={<EMICalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
