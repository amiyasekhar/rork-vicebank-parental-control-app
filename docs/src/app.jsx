import { useEffect, useRef } from "react";

function useReveal(options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    }, options);

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [options]);

  return ref;
}

export default function App() {
  const revealRef = useReveal();

  return (
    <main className="page">
      {/* HERO */}
      <section className="hero">
        <h1 className="logo">
          <span className="logo-left">Vice</span>
          <span className="logo-right">Bank</span>
        </h1>
        <p className="tagline">
          <span className="emph">Rizz Up</span>, don’t Jizz Up
        </p>
        {/* no border here */}
        <div className="boxed noborder">
          <p className="sub">
            Financial accountability to get you off of 🌽 and on top of a baddie 🍑
          </p>
        </div>
      </section>

      {/* MOCKUPS (fade-up on scroll) */}
      <section className="mockups" ref={revealRef}>
        <div className="phones">
          <img className="phone reveal" style={{ transitionDelay: "0ms" }} src="/phone-1.png" alt="Screen 1" />
          <img className="phone reveal" style={{ transitionDelay: "120ms" }} src="/phone-2.png" alt="Screen 2" />
          <img className="phone reveal" style={{ transitionDelay: "240ms" }} src="/phone-3.png" alt="Screen 3" />
          <img className="phone reveal" style={{ transitionDelay: "360ms" }} src="/phone-4.png" alt="Screen 4" />
        </div>

        {/* bottom CTA is now a centered button */}
        <div className="cta-wrapper reveal" style={{ transitionDelay: "520ms" }}>
          <button className="cta-button">
            Your First Step Towards Being a <strong>Rizzler</strong> Starts here…
          </button>
        </div>
      </section>
    </main>
  );
}