import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

import bg from "./assets/bg.png";
import upimg from "./assets/1st img.png";
import downimg from "./assets/2nd img.png";
import vlogo from "./assets/v Logo.png";
import coverimg from "./assets/cover img.png";
import vspell from "./assets/v spell.png";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  gsap.set(".bg",      { yPercent: 0 });
  gsap.set(".upimg",   { yPercent: 0 });
  gsap.set(".downimg", { yPercent: 0 });
  gsap.set(".vlogo", { autoAlpha: 1, scale: 1, xPercent: -50, yPercent: -50 });
  gsap.set(".vspell",  { autoAlpha: 0, scale: 0.9 , xPercent: -50, yPercent: -50});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-section",
    start: "top top",
    end: "+=150%", // shorter scroll distance instead of 220%
    scrub: true,
    pin: true,
    anticipatePin: 1,
  }
});
  // Background subtle parallax
  tl.to(".bg", { yPercent: -12, ease: "none", duration: 1 }, 0);

  // Initial small move for top/bottom halves
  tl.to(".upimg",   { yPercent: -20, ease: "none", duration: 0.3 }, 0);
  tl.to(".downimg", { yPercent:  20, ease: "none", duration: 0.3 }, "<");

  // Zoom and fade out vlogo
  tl.to(".vlogo", { scale: 1.5, autoAlpha: 0, ease: "power2.out", duration: 0.6 }, ">-0.1");

  // Move upimg & downimg off-screen fully at same time
  tl.to(".upimg",   { yPercent: -120, ease: "power1.in", duration: 0.8 }, "<");
  tl.to(".downimg", { yPercent:  120, ease: "power1.in", duration: 0.65 }, "<")

  // Show vspell slightly before images fully leave
  tl.to(".vspell", { autoAlpha: 1, scale: 2.1, ease: "back.out(1.4)", duration: 0.25 }, ">-0.4")
    .to(".vspell", { scale: 2.3, ease: "power1.out", duration: 0.15 });

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener("load", onLoad);

  return () => {
    window.removeEventListener("load", onLoad);
    tl.scrollTrigger && tl.scrollTrigger.kill();
    tl.kill();
  };
}, []);


  return (
    <>
      <section className="first-section">
        <img className="bg" src={bg} alt="" />

        <div className="half half-top">
          <div className="upimg">
            <img src={upimg} alt="" />
          </div>
        </div>

        <div className="half half-bottom">
          <div className="downimg">
            <img src={downimg} alt="" />
          </div>
        </div>

        <img className="vlogo" src={vlogo} alt="" />
        <img className="coverimg" src={coverimg} alt="" />

        <div className="vspell">
          <img src={vspell} alt="" />
        </div>
      </section>

      <section className="next-section">
        <h1>Next Section Content</h1>
      </section>
    </>
  );
}
