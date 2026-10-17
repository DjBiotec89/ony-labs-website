export function Brand({ compact = false }) {
  return (
    <span className={`brand ${compact ? 'brand--compact' : ''}`}>
      <img src="/brand/ony-labs-founder-mark-transparent.png" alt="" width="473" height="1326" />
      <span className="brand-name">
        ONY
        <span aria-hidden="true">–</span>
        LABS
      </span>
    </span>
  )
}
