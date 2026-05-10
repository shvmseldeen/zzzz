import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useApp } from '../lib/AppContext';

export default function Navbar() {
  const { cart, isLoggedIn, currentUser, toggleCart, openAuth, handleLogout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location] = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/shop', label: 'Shop' },
    { href: '/doctors', label: 'Our Doctors' },
    { href: '/mypet', label: 'My Pet' },
    { href: '/appointment', label: 'Appointment' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  const initials = currentUser
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-navy-500/10 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
        style={{ background: scrolled ? 'rgba(250,248,245,0.98)' : 'rgba(250,248,245,0.9)' }}
      >
        <div className="page-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-navy-500 flex items-center justify-center group-hover:bg-gold-400 transition-colors duration-300">
                <i className="fas fa-paw text-ivory-100 text-lg"></i>
              </div>
              <span className="text-xl font-bold text-navy-500">My<span className="text-gold-400">Pet</span></span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium text-navy-500 hover:text-gold-400 ${isActive(link.href) ? 'active-link' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Cart */}
              <button onClick={toggleCart} className="relative p-2 text-navy-500 hover:text-gold-400 transition-colors">
                <i className="fas fa-shopping-bag text-lg"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-400 text-ivory-100 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Desktop auth / avatar */}
              <div className="hidden sm:flex items-center gap-3">
                {isLoggedIn && currentUser ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(o => !o)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-ivory-300 hover:border-gold-400 hover:bg-ivory-200 transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-navy-500 flex items-center justify-center text-xs font-bold text-ivory-100 flex-shrink-0">
                        {initials}
                      </div>
                      <span className="text-sm font-semibold text-navy-500 max-w-[100px] truncate">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <i className={`fas fa-chevron-down text-navy-300 text-xs transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}></i>
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-ivory-100 rounded-2xl border border-ivory-300 shadow-xl py-2 z-50">
                        <div className="px-4 py-3 border-b border-ivory-300">
                          <p className="text-sm font-bold text-navy-500 truncate">{currentUser.name}</p>
                          <p className="text-xs text-navy-300 truncate">{currentUser.email}</p>
                        </div>
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-ivory-200 transition-colors text-sm text-navy-500"
                        >
                          <i className="fas fa-user-circle text-gold-400 w-4"></i>
                          My Profile
                        </Link>
                        <Link
                          href="/mypet"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-ivory-200 transition-colors text-sm text-navy-500"
                        >
                          <i className="fas fa-paw text-gold-400 w-4"></i>
                          My Pets
                        </Link>
                        <Link
                          href="/appointment"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-ivory-200 transition-colors text-sm text-navy-500"
                        >
                          <i className="fas fa-calendar-check text-gold-400 w-4"></i>
                          Appointments
                        </Link>
                        <div className="border-t border-ivory-300 mt-1 pt-1">
                          <button
                            onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-sm text-red-500 w-full text-left"
                          >
                            <i className="fas fa-sign-out-alt w-4"></i>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button onClick={() => openAuth('login')} className="btn-outline px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider">Sign In</button>
                    <button onClick={() => openAuth('signup')} className="btn-gold px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider">Sign Up</button>
                  </>
                )}
              </div>

              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-navy-500">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu fixed inset-0 z-[60] bg-ivory-100 lg:hidden ${mobileOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-4 border-b border-navy-500/10">
          <span className="text-xl font-bold text-navy-500">My<span className="text-gold-400">Pet</span></span>
          <button onClick={() => setMobileOpen(false)} className="p-2 text-navy-500">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {isLoggedIn && currentUser && (
          <div className="flex items-center gap-3 px-6 py-4 bg-ivory-200 border-b border-ivory-300">
            <div className="w-10 h-10 rounded-xl bg-navy-500 flex items-center justify-center text-sm font-bold text-ivory-100">
              {initials}
            </div>
            <div>
              <p className="text-sm font-bold text-navy-500">{currentUser.name}</p>
              <p className="text-xs text-navy-300">{currentUser.email}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col p-6 gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium py-3 px-3 rounded-xl border-b border-ivory-300 ${isActive(link.href) ? 'text-gold-500' : 'text-navy-500'}`}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium py-3 px-3 rounded-xl border-b border-ivory-300 text-navy-500 flex items-center gap-2"
            >
              <i className="fas fa-user-circle text-gold-400 text-sm"></i> My Profile
            </Link>
          )}
          <div className="flex gap-3 mt-4">
            {isLoggedIn ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="btn-outline flex-1 py-3 rounded-lg text-sm font-semibold text-red-500 border-red-500"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button onClick={() => { openAuth('login'); setMobileOpen(false); }} className="btn-outline flex-1 py-3 rounded-lg text-sm font-semibold">Sign In</button>
                <button onClick={() => { openAuth('signup'); setMobileOpen(false); }} className="btn-gold flex-1 py-3 rounded-lg text-sm font-semibold">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
