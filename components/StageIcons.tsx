export function CheckoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function InstallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function LintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <line x1="6" y1="8" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="7.5" y1="9.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function TestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path d="M3 3h4v5L4 13h8l-3-5V3h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function BuildIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="9" width="12" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 9V4.5C5 3.67 5.67 3 6.5 3h3c.83 0 1.5.67 1.5 1.5V9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function ScanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L3 4.5v4C3 11.3 5.2 13.7 8 14c2.8-.3 5-2.7 5-5.5v-4L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <line x1="6" y1="8" x2="7.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="7.5" y1="9.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function DeployIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
      <path d="M8 2C8 2 3 6 3 9.5a5 5 0 0010 0C13 6 8 2 8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="8" cy="9.5" r="1.5" fill="currentColor" />
      <line x1="8" y1="13" x2="8" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export const STAGE_ICONS: Record<string, React.FC> = {
  checkout: CheckoutIcon,
  install:  InstallIcon,
  lint:     LintIcon,
  test:     TestIcon,
  build:    BuildIcon,
  scan:     ScanIcon,
  deploy:   DeployIcon,
};
