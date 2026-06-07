import React from 'react';
import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto border-t border-slate-700">
      
      {/* 1. MAIN LINKS GRID */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Popular Categories</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Cars</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Flats for rent</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Mobile Phones</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Jobs</Link></li>
            </ul>
          </div>

          {/* Column 2: Trending Searches */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Trending Searches</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Bikes</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Watches</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Books</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Dogs</Link></li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">About Us</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">About Dubizzle Group</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">OLX Blog</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">OLX for Businesses</Link></li>
            </ul>
          </div>

          {/* Column 4: Follow Us (Social Links) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Follow Us</h4>
            {/* <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
            </div> */}
          </div>

        </div>
      </div>

      {/* 2. SUB FOOTER (COPYRIGHT & BRANDING) */}
      <div className="bg-slate-900 py-4 border-t border-slate-800 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs font-medium text-slate-400">
          <p>Free Classifieds in Pakistan · © {currentYear} OLX</p>
          <p className="text-[11px] opacity-75">Developed with MERN Stack & Zustand</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;