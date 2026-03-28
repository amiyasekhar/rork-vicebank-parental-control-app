import { useEffect, useRef } from "react";
import phone1 from "../public/phone-1.png";
import phone2 from "../public/phone-2.png";
import phone3 from "../public/phone-3.png";
import phone4 from "../public/phone-4.png";

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
            Vicebank is a financial accountability browser extension built to keep you honest about quitting porn, gambling, and other vices. Think you’re ready to quit? Then it’s time to put your money where your mouth is.
          </p>
        </div>
      </section>

      {/* MOCKUPS (fade-up on scroll) */}
      <section className="mockups" ref={revealRef}>
        <div className="phones">
          <img className="phone reveal" style={{ transitionDelay: "0ms" }} src={phone1} alt="Screen 1" />
          <img className="phone reveal" style={{ transitionDelay: "120ms" }} src={phone2} alt="Screen 2" />
          <img className="phone reveal" style={{ transitionDelay: "240ms" }} src={phone3} alt="Screen 3" />
          <img className="phone reveal" style={{ transitionDelay: "360ms" }} src={phone4} alt="Screen 4" />
        </div>

        {/* bottom CTA is now a centered button */}
        <div className="cta-wrapper reveal" style={{ transitionDelay: "520ms" }}>
          <button className="cta-button">
            change starts here
          </button>
        </div>
      </section>
    </main>
  );
}