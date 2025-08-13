import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function ScrollVideoSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const shouldFix = rect.top <= 10 && rect.bottom > window.innerHeight
        setIsFixed(shouldFix)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleVideoEnd = () => {
      setIsVideoEnded(true)
      setTimeout(() => {
        const nextSection = sectionRef.current?.nextElementSibling
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 500)
    }

    video.addEventListener("ended", handleVideoEnd)
    return () => video.removeEventListener("ended", handleVideoEnd)
  }, [])

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1.2, isFixed ? 8 : 4])
  const x = useTransform(scrollYProgress, [0, 0.3, 1], ["0%", "-10%", "-50%"])
  const y = useTransform(scrollYProgress, [0, 0.3, 1], ["0%", "-5%", "-50%"])
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ["16px", "8px", "0px"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0])

  return (
    <div ref={sectionRef} className="relative min-h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white max-w-2xl z-10 text-center md:text-left md:left-20 md:transform-none"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            We Register Your Dream, <br />
            Design Its Face, Code Its Engine, <br />
            and Launch It Across Continents.
          </h1>
          <hr className="border-t-2 border-white my-6 w-32 mx-auto md:mx-0" />
          <p className="text-lg text-gray-300 leading-relaxed">
            From concept to global deployment, we transform your vision into reality with cutting-edge design and
            development.
          </p>
        </motion.div>

        <motion.div
          style={{ scale, x, y, borderRadius, originX: 1, originY: 0 }}
          className={`absolute top-[15px] right-5 w-[200px] h-[120px] md:w-[300px] md:h-[170px] overflow-hidden z-20 ${
            isFixed ? "fixed top-0 right-0 w-screen h-screen" : ""
          }`}
        >
          <video
            ref={videoRef}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            autoPlay
            muted
            loop={!isFixed}
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
          <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              style={{ scaleX: scrollYProgress, originX: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
