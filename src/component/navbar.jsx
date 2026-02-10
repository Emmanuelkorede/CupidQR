import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaMoon, FaSun, FaUserCircle, FaTimes , FaInstagram, FaTiktok } from "react-icons/fa";

import '../styles/navbar.css'

export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <h2 className="logo">
            <Link to="/">CupidQR</Link>
          </h2>

          <div className="nav-icons">
            <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="icon-btn" onClick={() => setShowProfile(true)}>
              <FaUserCircle />
            </button>
          </div>
        </div>
      </nav>

      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowProfile(false)}>
              <FaTimes />
            </button>

<div className="profile-header">
  <div className="profile-avatar">JE</div>
  <h3>Job Emmanuel</h3>
  <p className="tag">Building the future, one pixel at a time.</p>
</div>

<div className="profile-body">
  {/* Relatable bio - keeping the age but making it punchy */}
  <p>16-year-old developer passionate about creating digital experiences that people love.</p>
  
  {/* Your tech joke - much more professional/witty than a list */}
  <p className="tech-joke">
    <strong>Focus:</strong> Frontend Specialist (Backend currently ⏳ <code>loading...</code>)
  </p>
  
  <div className="social-links">
    <p>Follow the journey:</p>
    <div className="social-icons">
        <a href="https://instagram.com/job.emmanuel.dev" target="_blank" rel="noreferrer" className="social-icon insta">
          <FaInstagram />
        </a>
        <a href="https://tiktok.com/@job.emmanuel.dev" target="_blank" rel="noreferrer" className="social-icon tiktok">
          <FaTiktok />
        </a>
    </div>
  </div>
  
</div>
          </div>
        </div>
      )}
    </>
  );
}