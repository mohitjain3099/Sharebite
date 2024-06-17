// Filename - components/Footer.js

import React, { useState } from "react";
import "../../../css/Footer.css";
import ContactUsPopup from "./contactUsPopup";
import { useSelector } from "react-redux";
import { User } from "../../models/User";
import { selectUser } from "../../store/user-slice";
import Constants from "../../AppConstants";
// Define the Footer component
const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user: User | null = useSelector(selectUser());
  const isLoggedIn = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  const link = isLoggedIn() ? "/Donate" : "/Login";

  const handleSubscription = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(`${Constants.API_URL}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Send an email
      const emailResponse = await fetch(`${Constants.API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to Sharebite",
          text: "Thank you for subscribing to our news! We will be keeping you posted with all upcoming events and news. Stay tuned.",
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      // Clear the email field
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="Box">
      <h1 className="title">A Computer Science Portal for Geeks!</h1>

      <div className="FooterContainer">
        <div className="Row">
          <div className="Column">
            <p className="Heading">About Us</p>
            <a className="FooterLink" href="/AboutUs#about">
              About Sharebite
            </a>
            <a className="FooterLink" href="/AboutUs#how-it-works">
              How It Works
            </a>
            <a className="FooterLink" href="/AboutUs#our-mission">
              Our Mission
            </a>
            <a className="FooterLink" href="/AboutUs#meet-our-team">
              Meet Our Team
            </a>
          </div>

          <div className="Column">
            <p className="Heading">Contact Us</p>
            <div onClick={() => setModalIsOpen(true)} className="FooterLink">
              India
            </div>
            <div onClick={() => setModalIsOpen(true)} className="FooterLink">
              USA
            </div>
          </div>

          <div className="Column">
            <p className="Heading">Linkedin</p>
            <a
              className="FooterLink"
              href="https://www.linkedin.com/in/amit-singh-tomar-4172631b1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin">
                <span className="social-media-text">Amit</span>
              </i>
            </a>
            <a
              className="FooterLink"
              href="https://www.linkedin.com/in/mohit-jain-3008/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin">
                <span className="social-media-text">Mohit</span>
              </i>
            </a>
            <a
              className="FooterLink"
              href="https://www.linkedin.com/in/shreyas-kothari/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin">
                <span className="social-media-text">Shreyas</span>
              </i>
            </a>
            <a
              className="FooterLink"
              href="https://www.linkedin.com/in/aniketnx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin">
                <span className="social-media-text">Aniket</span>
              </i>
            </a>
          </div>
          <div className="Column">
            <p className="Heading">Social Media</p>
            <div className="subscription-section">
              <form onSubmit={handleSubscription}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-section">© 2021 Sharebite</div>
      <ContactUsPopup
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

export default Footer;
