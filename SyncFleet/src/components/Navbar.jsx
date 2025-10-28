import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header className="bg-gradient-to-tr from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white font-inter sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center px-6 md:px-10 py-4 md:py-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-orbitron tracking-wide text-cyan-400 drop-shadow-md"
          >
            SyncFleet
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-cyan-400 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-cyan-400 transition">
              Contact
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-[#FFD369] text-black px-5 py-2 rounded-lg shadow-lg hover:bg-[#b38c33] transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-cyan-500 px-5 py-2 rounded-lg shadow-lg hover:bg-cyan-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border border-cyan-400 px-5 py-2 rounded-lg hover:bg-cyan-900 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* {menuOpen ? <HiX /> : <HiMenu />} */}
            <HiMenu />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:hidden flex flex-col justify-between`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-sans  text-cyan-400"
            >
              SyncFleet
            </Link>
            <button onClick={() => setMenuOpen(false)}>
              <HiX className="text-2xl text-gray-300 hover:text-cyan-400" />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-cyan-400 transition"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-white/20">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full bg-[#FFD369] text-black py-2 rounded-lg shadow-lg hover:bg-[#b38c33] transition"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-full bg-cyan-500 py-2 rounded-lg text-center shadow-lg hover:bg-cyan-400 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="w-full border border-cyan-400 py-2 rounded-lg text-center hover:bg-cyan-900 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for when sidebar is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
