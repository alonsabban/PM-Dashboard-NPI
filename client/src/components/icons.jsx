function IconBase({ children, size = 18, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconGrid(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </IconBase>
  );
}

export function IconTasks(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="4" height="4" rx="1" />
      <path d="M9 6h12" />
      <rect x="3" y="11" width="4" height="4" rx="1" />
      <path d="M9 13h12" />
      <rect x="3" y="18" width="4" height="4" rx="1" />
      <path d="M9 20h12" />
    </IconBase>
  );
}

export function IconStar(props) {
  return (
    <IconBase {...props}>
      <polygon points="12 2 14.9 8.6 22 9.3 16.7 14 18.2 21 12 17.3 5.8 21 7.3 14 2 9.3 9.1 8.6" />
    </IconBase>
  );
}

export function IconLayers(props) {
  return (
    <IconBase {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </IconBase>
  );
}

export function IconSearch(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </IconBase>
  );
}

export function IconSliders(props) {
  return (
    <IconBase {...props}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <circle cx="9" cy="6" r="2" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <circle cx="15" cy="12" r="2" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="7" cy="18" r="2" />
    </IconBase>
  );
}

export function IconAlert(props) {
  return (
    <IconBase {...props}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  );
}

export function IconTrendingUp(props) {
  return (
    <IconBase {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </IconBase>
  );
}
