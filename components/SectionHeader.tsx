type SectionHeaderProps = {
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
  spacious?: boolean
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  spacious = false,
}: SectionHeaderProps) {
  const isCenter = align === 'center'
  const headerClass = [
    'section-header',
    spacious ? 'section-header--spacious' : '',
    isCenter ? 'section-header--center text-center mx-auto' : 'max-w-2xl',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </header>
  )
}
