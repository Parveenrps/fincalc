/**
 * Format a number as Indian currency (INR)
 */
export function formatCurrency(amount, currency = 'INR') {
  if (isNaN(amount) || amount === null) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a plain number with commas (Indian system)
 */
export function formatNumber(num) {
  if (isNaN(num) || num === null) return '0'
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(num)
}

/**
 * Format percentage
 */
export function formatPercent(value) {
  return `${parseFloat(value).toFixed(2)}%`
}

/**
 * Parse a string to float safely
 */
export function safeParseFloat(val) {
  const parsed = parseFloat(val)
  return isNaN(parsed) ? 0 : parsed
}
