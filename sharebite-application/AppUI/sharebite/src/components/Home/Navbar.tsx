import React, { useState } from "react";
import "../../../css/Navbar.css";
import LoginPopup from "./LoginPopup"; // Import the LoginPopup component

// Define the Navbar component
const Navbar: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle opening the login popup
  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="App-header">
      <nav>
        <div className="logo sedan-regular">Sharebite</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/posts">Posts</a>
          <a href="/donate">Donate</a>
        </div>
        <div className="login-button">
          <button onClick={handleLoginOpen}>Login</button>
        </div>
        <div onClick={toggleMenu} className="profile-icon">
          <span>AN</span>
        </div>
        {isMenuOpen && (
          <ul className="profile-menu">
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/logout">Log Out</a>
            </li>
          </ul>
        )}
      </nav>
      {isLoginOpen && <LoginPopup onClose={handleLoginClose} />}
    </header>
  );
};

export default Navbar;
