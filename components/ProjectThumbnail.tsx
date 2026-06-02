type ProjectThumbnailProps = {
  projectId: string
}

const thumbnails: Record<
  string,
  {
    gradient: string
    label: string
    labelColor: string
    icon: React.ReactNode
  }
> = {
  safecircle: {
    gradient: 'linear-gradient(135deg, #1C3A5E 0%, #0D2240 100%)',
    label: 'PARENTAL CONTROL',
    labelColor: 'rgba(10,132,255,0.7)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 2L4 5v6c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V5l-8-3z"
          stroke="rgba(10,132,255,0.8)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  patientgo: {
    gradient: 'linear-gradient(135deg, #1A3C2E 0%, #0D2318 100%)',
    label: 'HEALTHCARE',
    labelColor: 'rgba(48,209,88,0.8)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M3 12h4l2-6 4 12 2-6h6"
          stroke="rgba(48,209,88,0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  'jojo-ott': {
    gradient: 'linear-gradient(135deg, #3A1C3A 0%, #220D22 100%)',
    label: 'OTT / MEDIA',
    labelColor: 'rgba(191,90,242,0.8)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M8 5v14l11-7L8 5z" fill="rgba(191,90,242,0.8)" />
      </svg>
    ),
  },
  fancall: {
    gradient: 'linear-gradient(135deg, #3A2A1C 0%, #221608 100%)',
    label: 'REAL-TIME',
    labelColor: 'rgba(255,159,10,0.8)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="2"
          y="6"
          width="14"
          height="12"
          rx="2"
          stroke="rgba(255,159,10,0.8)"
          strokeWidth="1.5"
        />
        <path
          d="M16 10l4-2v8l-4-2"
          stroke="rgba(255,159,10,0.8)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  andalus: {
    gradient: 'linear-gradient(135deg, #1C1C3A 0%, #0D0D22 100%)',
    label: 'E-COMMERCE',
    labelColor: 'rgba(100,210,255,0.8)',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 6h15l-1.5 9h-12L6 6z"
          stroke="rgba(100,210,255,0.8)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L5 3H2"
          stroke="rgba(100,210,255,0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="19" r="1.5" fill="rgba(100,210,255,0.8)" />
        <circle cx="17" cy="19" r="1.5" fill="rgba(100,210,255,0.8)" />
      </svg>
    ),
  },
}

export function ProjectThumbnail({ projectId }: ProjectThumbnailProps) {
  const config = thumbnails[projectId] ?? thumbnails.safecircle

  return (
    <div className="project-thumbnail" style={{ background: config.gradient }}>
      <div className="project-thumbnail__icon">{config.icon}</div>
      <span className="project-thumbnail__domain" style={{ color: config.labelColor }}>
        {config.label}
      </span>
    </div>
  )
}
