
import { useState } from 'react';
import { Menu, X, Settings, User } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-morphism border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold neon-text">ARUBA</h1>
              <p className="text-xs text-gray-400">HPE Networks</p>
            </div>
          </div>

          {/* Desktop Navigation */}
         

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <User className="w-5 h-5 text-gray-300" />
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full animate-neon-pulse"></div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-300 hover:text-neon-blue transition-colors">
                Services
              </a>
              <a href="#analytics" className="text-gray-300 hover:text-neon-blue transition-colors">
                Analytics
              </a>
              <a href="#documentation" className="text-gray-300 hover:text-neon-blue transition-colors">
                Documentation
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
