/**
 * Calculate Simple Interest
 * SI = (P × R × T) / 100
 */
export function calculateSimpleInterest({ principal, rate, time }) {
  const P = parseFloat(principal) || 0
  const R = parseFloat(rate) || 0
  const T = parseFloat(time) || 0
  const interest = (P * R * T) / 100
  const totalAmount = P + interest
  return { interest, totalAmount, principal: P, rate: R, time: T }
}

/**
 * Calculate Compound Interest
 * A = P(1 + r/n)^(nt)
 */
export function calculateCompoundInterest({ principal, rate, time, frequency }) {
  const P = parseFloat(principal) || 0
  const R = parseFloat(rate) || 0
  const T = parseFloat(time) || 0
  const n = parseInt(frequency) || 1

  const r = R / 100
  const finalAmount = P * Math.pow(1 + r / n, n * T)
  const compoundInterest = finalAmount - P

  return { compoundInterest, finalAmount, principal: P, rate: R, time: T }
}

/**
 * Calculate EMI (Equated Monthly Installment)
 * EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
 */
export function calculateEMI({ loanAmount, interestRate, tenure }) {
  const P = parseFloat(loanAmount) || 0
  const annualRate = parseFloat(interestRate) || 0
  const months = parseInt(tenure) || 0

  const r = annualRate / (12 * 100) // monthly rate

  let monthlyEMI = 0
  if (r === 0) {
    monthlyEMI = P / months
  } else {
    monthlyEMI = (P * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  }

  const totalPayment = monthlyEMI * months
  const totalInterest = totalPayment - P

  return {
    monthlyEMI,
    totalInterest,
    totalPayment,
    loanAmount: P,
    interestRate: annualRate,
    tenure: months,
  }
}

export const FREQUENCY_OPTIONS = [
  { label: 'Yearly', value: '1' },
  { label: 'Half-Yearly', value: '2' },
  { label: 'Quarterly', value: '4' },
  { label: 'Monthly', value: '12' },
]
