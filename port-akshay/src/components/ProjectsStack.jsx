import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export default function ProjectsStack() {
  return (
    <section id="projects" style={{ background: "#050510" }}>
      <ScrollStack>
        <p className="project-toptext">.PROJECT!! </p>
         <div className="project-topbar">
        
      </div>
        <ScrollStackItem itemClassName="pCard blue">
          <h2>MERN Report Maker</h2>
          <p>Demo project card</p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="pCard purple">
          <h2>AWS Cloud Portfolio</h2>
          <p>Demo project card</p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="pCard green">
          <h2>React Dashboard UI</h2>
          <p>Demo project card</p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="pCard pink">
          <h2>Full Stack Auth App</h2>
          <p>Demo project card</p>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
}