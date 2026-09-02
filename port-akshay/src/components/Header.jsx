import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">Akshay Bagewadi</div>

        <div className="right">
          <nav className="nav">
            <a href="#projects">Projects</a>
            <a href="#about">about</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="status">
            <span className="status-dot"></span>
            <span>available for freelance</span>
          </div>
        </div>
      </div>

      {/* underline */}
      <div className="header-underline"></div>
    </header>
  );
}