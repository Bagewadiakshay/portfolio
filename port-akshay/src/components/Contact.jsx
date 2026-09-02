import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
      
     
        {/* top line + text */}
      <div className="contact-topbar">
        <p className="contact-toptext">.say hello </p>
      </div>

      {/* left text */}
      <h2 className="contact-title">
        I'm open for projects, feel free to Contact me to see<br />
          how can we collaborate :)
      </h2>

        <div className="contact-buttons">
          <a
            className="contact-btn"
            href="mailto:akshaybagewadi108@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaEnvelope />
            Email
          </a>

          <a
            className="contact-btn"
            href="https://www.linkedin.com/in/akshay-bagewadi-426847339/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>

          <a
            className="contact-btn"
            href="https://github.com/Bagewadiakshay"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            GitHub
          </a>
          <div className="contact-topbar_1"></div>
        </div>
      </div>
    </section>
  );
}