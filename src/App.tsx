import { useState } from 'react';
import Logo from './components/Logo';
import Sidebar, { type PageKey } from './components/Sidebar';
import './App.css';

const PAGE_SRC: Record<PageKey, string> = {
  home: '/pages/home.html',
  wish: '/pages/wish.html',
  you: '/pages/you.html',
  us: '/pages/us.html',
  gallery: '/pages/gallery.html',
  sumsum: '/pages/sumsum.html',
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>('home');

  const handleSelect = (page: PageKey) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      <Logo onClick={() => setSidebarOpen((o) => !o)} isOpen={sidebarOpen} />
      <Sidebar
        isOpen={sidebarOpen}
        current={currentPage}
        onSelect={handleSelect}
        onClose={() => setSidebarOpen(false)}
      />
      <iframe
        key={currentPage}
        className="page-frame"
        src={PAGE_SRC[currentPage]}
        title={currentPage}
      />
    </div>
  );
}

export default App;
