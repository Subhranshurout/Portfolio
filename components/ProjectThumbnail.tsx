type ProjectThumbnailProps = {
  abbr: string
  label: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-32',
  md: 'h-36',
  lg: 'h-44',
}

export function ProjectThumbnail({ abbr, label, size = 'md' }: ProjectThumbnailProps) {
  return (
    <div className={`project-thumbnail ${sizeClasses[size]}`}>
      <span className="project-thumbnail__abbr">{abbr}</span>
      <span className="project-thumbnail__label">{label}</span>
    </div>
  )
}
