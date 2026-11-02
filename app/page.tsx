import About from "./components/About";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Works from "./components/Works";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* the hero stays pinned while About slides over it */}
        <div className="relative">
          <Hero />
          <About />
        </div>
        <Works />
        <Awards />
        <Contact />
      </main>
    </>
  );
}
