import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../assets/vishnu_ads_logo.png"; 

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.6; // 60vh
      if (window.scrollY > triggerHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        showNavbar
          ? "bg-black/50 backdrop-blur-md shadow-lg translate-y-0"
          : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        
        {/* Left: Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Right: Menu + Icons */}
        <div className="flex items-center gap-10">
          {/* Menu */}
          <ul className="hidden md:flex gap-8 text-sm font-bold">
            <li>
              <a
                href="#home"
                className="transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#8274a7] hover:to-[#84c7c5]"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#8274a7] hover:to-[#84c7c5]"
              >
                PROJECTS
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#8274a7] hover:to-[#84c7c5]"
              >
                ABOUT US
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#8274a7] hover:to-[#84c7c5]"
              >
                CONTACT
              </a>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 text-xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="mailto:example@gmail.com"
              className="text-xl"
            >
              <MdEmail />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
