import Silk from "./components/Silk.jsx";
import BlurText from "./components/BlurText.jsx";
import Contact from "./components/Contact.jsx";
import Header from "./components/Header.jsx";
import About from "./components/about.jsx";
import ProjectsStack from "./components/ProjectsStack.jsx";





export default function App() {
  return (
    
    <div style={{ width: "100%", background: "#0b0b0f", color: "white" }}>
      
      {/* ================= HERO SECTION ================= */}
      <section style={{ width: "100%", height: "100vh", position: "relative" }}>
        
        {/* Silk Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 , pointerEvents: "none" }}>
          <Silk
            speed={5}
            scale={1}
            color="#2E5BFF"
            noiseIntensity={1.8}
            rotation={0.15}
          />
        </div>
    <>
    
  <Header />
  {/* hero + sections */}
</>

    
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            textAlign: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
           <BlurText
            text="Hey , I'm "
            delay={240}
            animateBy="words"
            direction="top"
            className="mini-hero-title"
          />
          <BlurText
            text="AKSHAY BAGEWADI"
            delay={240}
            animateBy="words"
            direction="top"
            className="hero-title"
          />

          <BlurText
            text="• MERN Developer • AWS • Cloud Learner "
            delay={280}
            animateBy="words"
            direction="middle"
            className="hero"
          />
        </div>
      </section>
       <section id="home"></section>
       <section id="projects"></section>
       <div style={{ position: "relative", zIndex: 2 }}>
  
</div>
<ProjectsStack />
  
  {/* <about/>  */}
  
<About />
{/* contact */}
<Contact />


 



      {/*........................... Footer................................. */}
      <footer style={{ padding: "30px", textAlign: "center", opacity: 0.9  }}>
  Email :{" "}
  <a href="mailto:akshaybagewadi108@gmail.com" style={{ color: "white" }}>
    akshaybagewadi108@gmail.com
  </a>
</footer>
  
      {/* .................................................................... */}
    </div>
  );
}