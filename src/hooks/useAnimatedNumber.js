import { useState, useEffect, useRef } from 'react'

export function useAnimatedNumber(targetValue, duration = 800) {
  const [current, setCurrent] = useState(0)
  const startRef = useRef(null)
  const frameRef = useRef(null)
  const prevTargetRef = useRef(0)

  useEffect(() => {
    if (targetValue === prevTargetRef.current) return
    const startValue = prevTargetRef.current
    prevTargetRef.current = targetValue

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    startRef.current = null

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(startValue + (targetValue - startValue) * eased)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [targetValue, duration])

  return current
}
