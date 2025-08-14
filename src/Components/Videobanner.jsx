import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import videoBanner from "../assets/Video.mp4";

export default function ScrollVideoSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 5.5]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "0px"]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[250vh] bg-black"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Text pinned at top:15px */}
        <div className="absolute left-20 top-[150px] text-white max-w-lg z-10">
          <h1 className="text-3xl font-bold leading-snug">
            We Register Your Dream, <br />
            Design Its Face, Code Its Engine, <br />
            and Launch It Across Continents.
          </h1>
          <hr className="border-t-2 border-white my-4 w-24" />
        </div>

        {/* Video animation */}
        <motion.div
          style={{
            scale,
            x,
            y,
            borderRadius,
            originX: 1,
            originY: 0,
          }}
          className="absolute top-[15px] right-5 w-[200px] h-[120px] md:w-[300px] md:h-[170px] overflow-hidden z-20"
        >
          <video
            src={videoBanner}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-fill"
          />
        </motion.div>
      </div>
    </div>
  );
}
