export function Section({ eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      <div className="sectionHead">
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h2 className="h2">{title}</h2>
        {subtitle ? <p className="sub">{subtitle}</p> : null}
      </div>
      <div className="sectionBody">{children}</div>
    </section>
  )
}
