import './Logo.css';

interface LogoProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function Logo({ onClick, isOpen }: LogoProps) {
  return (
    <button
      className={`logo-btn ${isOpen ? 'is-open' : ''}`}
      onClick={onClick}
      aria-label="Open navigation"
    >
      <svg viewBox="0 0 48 48" width="30" height="30" aria-hidden="true">
        <rect x="8" y="20" width="32" height="20" rx="2" fill="#8fbc93" />
        <rect x="8" y="20" width="32" height="6" fill="#c9b297" />
        <rect x="21" y="20" width="6" height="20" fill="#fcf4d2" />
        <path
          d="M24 20 C 14 14, 10 6, 17 5 C 22 4, 24 12, 24 20 Z"
          fill="#f4c0d6"
        />
        <path
          d="M24 20 C 34 14, 38 6, 31 5 C 26 4, 24 12, 24 20 Z"
          fill="#f4c0d6"
        />
      </svg>
    </button>
  );
}
