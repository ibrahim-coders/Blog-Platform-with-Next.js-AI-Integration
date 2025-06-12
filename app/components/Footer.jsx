import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-xl font-bold mb-4 md:mb-0">
          Ai Content Generate Blog
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-emerald-500">
            Home
          </Link>
          <Link href="/about" className="hover:text-emerald-500">
            About
          </Link>
          <Link href="/contact" className="hover:text-emerald-500">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-emerald-500">
            Privacy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link href="#">
            <Facebook className="hover:text-emerald-500" />
          </Link>
          <Link href="#">
            <Twitter className="hover:text-emerald-500" />
          </Link>
          <Link href="#">
            <Instagram className="hover:text-emerald-500" />
          </Link>
          <Link href="#">
            <Linkedin className="hover:text-emerald-500" />
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-6 text-gray-400">
        © {new Date().getFullYear()} Ibrahim Coders. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
