import { useAnimatedNumber } from "../hooks/useAnimatedNumber";

function AnimatedValue({ value, prefix = "", suffix = "", decimals = 2 }) {
  const animated = useAnimatedNumber(value);
  const display =
    decimals > 0
      ? animated.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(animated).toLocaleString("en-IN");
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function ResultCard({
  label,
  value,
  rawValue,
  prefix = "₹",
  suffix = "",
  highlight = false,
  decimals = 2,
}) {
  if (rawValue === undefined || rawValue === null || isNaN(rawValue))
    return null;

  return (
    <div
      className={`result-card transition-all duration-300 ${highlight ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""}`}
    >
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className={`font-mono font-bold ${highlight ? "text-2xl text-emerald-700 dark:text-emerald-400" : "text-xl text-slate-800 dark:text-slate-100"}`}
      >
        <AnimatedValue
          value={rawValue}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </p>
    </div>
  );
}
