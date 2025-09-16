import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { ShoppingCart } from "lucide-react";

function Header({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`flex items-center justify-between px-5 md:px-8 lg:px-10 py-4 md:py-5 fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="font-bold font-serif italic text-xl md:text-2xl text-primaryDarkGreen"
      >
        Fitness
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`bg-primaryDarkGreen block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
          }`}
        ></span>
        <span
          className={`bg-primaryDarkGreen block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-primaryDarkGreen block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
          }`}
        ></span>
      </button>

      {/* Navigation */}
      <nav
        className={`absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 md:opacity-100 invisible md:visible -translate-y-4 md:translate-y-0"
        }`}
      >
        <ul className="flex flex-col md:flex-row md:flex-1 justify-start gap-6 md:gap-8 p-5 md:p-0 md:ml-28">
          <li>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/trainers"
              onClick={() => setIsMenuOpen(false)}
              className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300"
            >
              Trail
            </Link>
          </li>
          <li>
            <Link
              to="/plans"
              onClick={() => setIsMenuOpen(false)}
              className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300"
            >
              Plans
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/sublements"
              onClick={() => setIsMenuOpen(false)}
              className="text-primaryDarkGreen text-lg md:text-xl hover:text-primaryDarkGreen2 transition-colors duration-300"
            >
              Sublements
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Side: Auth Buttons + Cart */}
      <div className="hidden md:flex gap-4 items-center">
        {/* Shopping Cart always visible */}
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart className="text-primaryDarkGreen" size={24} />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        {user ? (
          <>
            <span className="text-primaryDarkGreen font-semibold">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-secondaryBeige text-primaryDarkGreen border-2 border-primaryDarkGreen px-6 py-2 rounded-full hover:bg-white transition-colors duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="bg-primaryDarkGreen text-secondaryBeige px-6 md:px-8 py-2 rounded-full hover:bg-primaryDarkGreen2 transition-colors duration-300 transform hover:scale-105">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
