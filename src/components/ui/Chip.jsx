export function Chip({ children, variant = 'default', className = '', ...props }) {
  return (
    <span className={`chip chip--${variant} ${className}`} {...props}>
      {children}
    </span>
  )
}
