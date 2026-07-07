import './Sidebar.css';

export type PageKey = 'home' | 'wish' | 'you' | 'us' | 'gallery' | 'sumsum';

const NAV_ITEMS: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'wish', label: 'wish' },
  { key: 'you', label: 'you' },
  { key: 'us', label: 'us?' },
  { key: 'gallery', label: 'gallery' },
  { key: 'sumsum', label: 'sum-sum' },
];

interface SidebarProps {
  isOpen: boolean;
  current: PageKey;
  onSelect: (page: PageKey) => void;
  onClose: () => void;
}

export default function Sidebar({ isOpen, current, onSelect, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          {NAV_ITEMS.map((item, i) => (
            <li
              key={item.key}
              style={{ transitionDelay: isOpen ? `${i * 0.05 + 0.1}s` : '0s' }}
            >
              <button
                className={current === item.key ? 'active' : ''}
                onClick={() => onSelect(item.key)}
              >
                {item.label}
              </button>
              <span className="divider" />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
