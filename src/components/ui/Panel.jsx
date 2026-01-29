export function Panel({ children, className = '', ...props }) {
  return (
    <div className={`panel ${className}`} {...props}>
      {children}
    </div>
  )
}
