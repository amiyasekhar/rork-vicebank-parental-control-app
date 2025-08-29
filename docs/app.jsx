import { useEffect, useRef } from "react";

function useReveal(options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          // Optional: unobserve after first reveal
          io.unobserve(e.target);
        }
      });
    }, options);

    items.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [options]);

  return containerRef;
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
        <p className="sub">
          Financial accountability to get you off of 🌽 and on top of a baddie 🍑
        </p>
      </section>

      {/* PHONE MOCKUPS (fade-up on scroll) */}
      <section className="mockups" ref={revealRef}>
        <div className="phones">
          <img className="phone reveal" style={{ transitionDelay: "0ms" }} src="/phone-1.png" alt="Dashboard screen" />
          <img className="phone reveal" style={{ transitionDelay: "120ms" }} src="/phone-2.png" alt="Custom domains screen" />
          <img className="phone reveal" style={{ transitionDelay: "240ms" }} src="/phone-3.png" alt="Grace period screen" />
          <img className="phone reveal" style={{ transitionDelay: "360ms" }} src="/phone-4.png" alt="Welcome screen" />
        </div>

        <p className="cta reveal" style={{ transitionDelay: "520ms" }}>
          Your First Step Towards Being a <strong>Rizzler</strong> Starts here…
        </p>
      </section>
    </main>
  );
}