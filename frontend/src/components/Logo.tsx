export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="LuminaPath AI">
      <div className="relative grid h-11 w-11 place-items-center rounded-[14px] bg-ink text-white shadow-glow dark:bg-white dark:text-night">
        <div className="absolute h-6 w-6 rounded-full border-2 border-aurora" />
        <div className="h-2 w-7 rotate-[-28deg] rounded-full bg-ember" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-lg font-black tracking-normal text-ink dark:text-white">LuminaPath</p>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aurora">AI Academy</p>
        </div>
      )}
    </div>
  );
}
