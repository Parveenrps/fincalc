export default function InputField({ label, name, value, onChange, min, max, step, prefix, suffix, type = 'number', placeholder }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="label">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 font-medium select-none">
            {prefix}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`input-field ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-10' : ''}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm select-none">
            {suffix}
          </span>
        )}
      </div>
      {(min !== undefined && max !== undefined) && (
        <input
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={value || min}
          onChange={onChange}
          className="mt-2"
          aria-label={`${label} slider`}
        />
      )}
    </div>
  )
}
