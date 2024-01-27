import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-container">
      <header className="header">
        <img className="hxh" src="/images/hxh.jpg" alt="Small Image" />
        <h1>Job Hunter</h1>
        <p>
          You can't just look for a job in this economy, you have to HUNT it
          down because that's what it means to be a HUNTER!
        </p>
      </header>

      <section className="features-section">
        <h4>Key Features</h4>
        <ul>
          <li>
            Prey on potential job opportunities by clicking on geographic
            locations
          </li>
          <li>Set your scouting distance based on the location</li>
          <li>Capture your next trophy(job) as a Big Game Hunter!</li>
        </ul>
      </section>

      <section className="team-section">
        <h4>Meet Our Team</h4>
        <div className="team-members">
          <div className="member">
            Jason
            <img className="hxh" src="/images/hxh.jpg" alt="Small Image" />
          </div>
          <div className="member">
            Dylan
            <img className="hxh" src="/images/hxh.jpg" alt="Small Image" />
          </div>
          <div className="member">
            Husain
            <img className="hxh" src="/images/hxh.jpg" alt="Small Image" />
          </div>
          <div className="member">
            Ryan
            <img className="hxh" src="/images/hxh.jpg" alt="Small Image" />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <Link to="/map" className="button-style">
          Start Hunting
        </Link>
      </section>

      {/* <section className="testimonials-section">
        <h4>What Users Say</h4>
        <blockquote>
          "Job Hunter helped me find my dream job in tech!" - Jane Doe
        </blockquote>
      </section> */}

      <footer className="footer">
        {/* <div className="social-links">
          Add actual social media links
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div> */}
        <div className="contact-info">
          <p>Contact us at: support@jobhunter.com</p>
        </div>
      </footer>
    </div>
  );
}
