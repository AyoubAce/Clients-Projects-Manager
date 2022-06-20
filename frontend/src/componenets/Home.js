import React from "react";
import Projects from "./Projects";
import Clients from "./Clients";
import Modals from "./Modals";

function Home() {
  return (
    <>
      <div className="container">
        <Modals />
        <Projects />
        <Clients />
      </div>
    </>
  );
}

export default Home;
