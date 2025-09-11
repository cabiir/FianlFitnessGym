import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`flex items-center justify-between px-5 md:px-8 lg:px-10 py-4 md:py-5 fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      {/* Logo */}
      <Link to="/" className="font-bold font-serif italic text-xl md:text-2xl text-primaryDarkGreen ">
        Fitness 
      </Link>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`bg-primaryDarkGreen block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
        <span className={`bg-primaryDarkGreen block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`bg-primaryDarkGreen block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
      </button>

      {/* Navigation */}
      <nav className={`absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 md:opacity-100 invisible md:visible -translate-y-4 md:translate-y-0'}`}>
        <ul className="flex flex-col md:flex-row md:flex-1 justify-start gap-6 md:gap-8 p-5 md:p-0 md:ml-28">
          <li className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300">
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          </li>
          <li className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300">
            <Link to="/trainers" onClick={() => setIsMenuOpen(false)}>Trail</Link>
          </li>

          <li className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300">
            <Link to="/plans" onClick={() => setIsMenuOpen(false)}>Plans</Link>
          </li>
          <li className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Buttons */}
      <div className="hidden md:flex gap-4">
    <Link to="/login"> <button className="bg-primaryDarkGreen text-secondaryBeige px-6 md:px-8 py-2 rounded-full hover:bg-primaryDarkGreen2 transition-colors duration-300 transform hover:scale-105">
          Login
        </button></Link>
      <Link to="/signIn"><button className="bg-secondaryBeige text-primaryDarkGreen border-2 border-primaryDarkGreen px-6 md:px-8 py-2 rounded-full hover:bg-white transition-colors duration-300 transform hover:scale-105">
          Sign Up
        </button></Link>
      </div>

      {/* Mobile buttons (shown when menu is open) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white p-5 shadow-md flex flex-col gap-4">
          <button className="bg-primaryDarkGreen text-secondaryBeige px-8 py-3 rounded-full hover:bg-primaryDarkGreen2 transition-colors duration-300">
            Login
          </button>
          <button className="bg-secondaryBeige text-primaryDarkGreen border-2 border-primaryDarkGreen px-8 py-3 rounded-full hover:bg-white transition-colors duration-300">
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;