import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Mic, Home, Info, Phone, MessageSquare, Sparkles } from "lucide-react";

export default function Navbar({ onLogout, isAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-5xl mx-auto bg-white/50 backdrop-blur-xl rounded-full shadow-2xl border border-white/40 px-6 py-3 flex justify-between items-center transition-all duration-300 hover:shadow-indigo-500/10 hover:bg-white/80">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg relative group-hover:scale-105 transition-transform duration-300">
                <Mic className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
              CASK
            </span>
          </Link>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-1">
          <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" isActive={location.pathname === '/'} />
          <NavLink to="/about" icon={<Info className="w-4 h-4" />} text="About" isActive={location.pathname === '/about'} />
          
          {isAuthenticated ? (
            <>
              <NavLink to="/assistant" icon={<Sparkles className="w-4 h-4" />} text="Assistant" isActive={location.pathname === '/assistant'} />
              <NavLink to="/contact" icon={<Phone className="w-4 h-4" />} text="Contact" isActive={location.pathname === '/contact'} />
              <NavLink to="/feedback" icon={<MessageSquare className="w-4 h-4" />} text="Feedback" isActive={location.pathname === '/feedback'} />
            </>
          ) : (
            <NavLink to="/contact" icon={<Phone className="w-4 h-4" />} text="Contact" isActive={location.pathname === '/contact'} />
          )}
        </div>

        {/* Right Side (Auth Buttons) */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={() => {
                onLogout();
                navigate("/login");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 font-medium text-sm border border-transparent hover:border-red-100 group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors hover:bg-white/50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text, isActive }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive 
          ? "bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100" 
          : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
