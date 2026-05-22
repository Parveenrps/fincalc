/**
 * AdBanner — Google AdSense placeholder
 * Replace the inner content with your actual AdSense code:
 *   <ins class="adsbygoogle" ...></ins>
 *   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 */
export default function AdBanner({ slot = 'default', className = '' }) {
  return (
    <div
      className={`w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center ${className}`}
      style={{ minHeight: slot === 'leaderboard' ? '90px' : '120px' }}
      aria-label="Advertisement"
    >
      <div className="text-center py-4 px-6">
        <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Advertisement
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Google Ad Here
        </p>
        {/* 
          ========= ADSENSE CODE GOES HERE =========
          Replace this comment with your AdSense snippet, e.g.:

          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          ==========================================
        */}
      </div>
    </div>
  )
}
