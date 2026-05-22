export default function PageHeader({ icon, title, description, badge }) {
  return (
    <div className="bg-hero text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
            {badge}
          </span>
        )}
        <div className="text-5xl mb-4 animate-float">{icon}</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-slate-300 text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
