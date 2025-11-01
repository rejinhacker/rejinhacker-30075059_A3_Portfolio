import { Link } from 'react-scroll';

const Nav = () => {
  const navItems = [
    { to: 'hero', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'portfolio', label: 'Portfolio' },
    { to: 'skills', label: 'Skills' },
    { to: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md z-50 border-b border-slate-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-400 cursor-pointer">
            RS
          </div>

          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth={true}
                  duration={600}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium relative group"
                  activeClass="text-primary-400"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button className="md:hidden text-white text-xl">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;