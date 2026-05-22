/**
 * Generate and download a PDF report for calculator results
 */
export async function downloadResultPDF({ title, inputs, outputs }) {
  try {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const green = [5, 150, 105]
    const dark = [15, 23, 42]
    const gray = [100, 116, 139]
    const lightGray = [241, 245, 249]

    // Header bar
    doc.setFillColor(...green)
    doc.rect(0, 0, 210, 40, 'F')

    // Logo area
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(26)
    doc.setFont('helvetica', 'bold')
    doc.text('FinCalc', 20, 20)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Smart Finance Calculators', 20, 28)

    doc.setFontSize(10)
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}`, 150, 20)
    doc.text('fincalc.app', 150, 28)

    // Title
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...dark)
    doc.text(title, 20, 58)

    // Divider
    doc.setDrawColor(...green)
    doc.setLineWidth(0.5)
    doc.line(20, 62, 190, 62)

    // Inputs section
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...gray)
    doc.text('INPUTS', 20, 74)

    let y = 82
    doc.setFontSize(11)
    inputs.forEach(({ label, value }) => {
      doc.setFillColor(...lightGray)
      doc.roundedRect(20, y - 5, 170, 10, 2, 2, 'F')
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...gray)
      doc.text(label, 26, y + 1)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...dark)
      doc.text(String(value), 130, y + 1)
      y += 14
    })

    y += 6
    // Outputs section
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...gray)
    doc.text('RESULTS', 20, y)
    y += 10

    outputs.forEach(({ label, value, highlight }) => {
      if (highlight) {
        doc.setFillColor(...green)
        doc.roundedRect(20, y - 5, 170, 12, 3, 3, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(255, 255, 255)
        doc.text(label, 26, y + 2)
        doc.text(String(value), 130, y + 2)
      } else {
        doc.setFillColor(236, 253, 245)
        doc.roundedRect(20, y - 5, 170, 11, 2, 2, 'F')
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...gray)
        doc.text(label, 26, y + 1)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(5, 120, 80)
        doc.text(String(value), 130, y + 1)
      }
      y += 16
    })

    // Footer
    doc.setFillColor(...lightGray)
    doc.rect(0, 280, 210, 17, 'F')
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    doc.text('This report is generated for informational purposes only. Always consult a financial advisor.', 20, 290)
    doc.text('© FinCalc — fincalc.app', 160, 290)

    doc.save(`fincalc-${title.toLowerCase().replace(/\s+/g, '-')}-result.pdf`)
    return true
  } catch (err) {
    console.error('PDF generation failed:', err)
    return false
  }
}
