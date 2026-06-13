import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar({ isDarkMode, setIsDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Sistem Absensi Magang</h1>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            <span className="nav-icon"></span>
            <span className="nav-text">Dashboard</span>
          </NavLink>

          <NavLink to="/jurnal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            <span className="nav-icon">📝</span>
            <span className="nav-text">Jurnal</span>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            <span className="nav-icon">👤</span>
            <span className="nav-text">Profile</span>
          </NavLink>

          <button 
            className="nav-link theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <span className="nav-icon">{isDarkMode ? '☀️' : ''}</span>
          </button>

          <NavLink to="/" className="nav-link nav-logout" onClick={closeMobileMenu}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </NavLink>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button 
          className="hamburger-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h2>Menu</h2>
              <button className="close-btn" onClick={closeMobileMenu}>
                ✕
              </button>
            </div>

            <div className="mobile-menu-items">
              <NavLink to="/dashboard" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="nav-icon">📊</span>
                <span className="nav-text">Dashboard</span>
              </NavLink>

              <NavLink to="/jurnal" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="nav-icon">📝</span>
                <span className="nav-text">Jurnal</span>
              </NavLink>

              <NavLink to="/profile" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span className="nav-icon">👤</span>
                <span className="nav-text">Profile</span>
              </NavLink>

              <button 
                className="mobile-nav-link theme-toggle-mobile"
                onClick={() => {
                  setIsDarkMode(!isDarkMode)
                  closeMobileMenu()
                }}
              >
                <span className="nav-icon">{isDarkMode ? '☀️' : '🌙'}</span>
                <span className="nav-text">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <NavLink to="/" className="mobile-nav-link nav-logout-mobile" onClick={closeMobileMenu}>
                <span className="nav-icon"></span>
                <span className="nav-text">Logout</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar