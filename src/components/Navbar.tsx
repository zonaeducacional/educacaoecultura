
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "py-3 bg-background/95 backdrop-blur-md shadow-md" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
        >
          <BookOpen className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-semibold tracking-tight">CulturaEduca</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/educação">Educação</NavLink>
          <NavLink to="/cultura">Cultura</NavLink>
          <NavLink to="/opinião">Opinião</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="p-2 md:hidden text-gray-700 hover:text-orange-500 transition-colors"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-md animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/">Início</MobileNavLink>
            <MobileNavLink to="/educação">Educação</MobileNavLink>
            <MobileNavLink to="/cultura">Cultura</MobileNavLink>
            <MobileNavLink to="/opinião">Opinião</MobileNavLink>
            <MobileNavLink to="/sobre">Sobre</MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative font-medium transition-colors duration-200 hover:text-orange-500",
        "after:content-[''] after:absolute after:h-0.5 after:bg-orange-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300",
        isActive ? "text-orange-500 after:w-full" : "text-foreground/80 after:w-0 hover:after:w-full"
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={cn(
        "block py-2 px-4 font-medium transition-colors rounded-lg",
        isActive 
          ? "text-orange-500 bg-secondary" 
          : "text-foreground/80 hover:text-orange-500 hover:bg-secondary"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
