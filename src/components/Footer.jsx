import React from "react";
import { motion } from "motion/react";
import {
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import {
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full bg-gradient-to-r from-gray-900 via-zinc-950 to-gray-900 text-gray-300 pt-16 pb-10"
    >
      <div className="w-full max-w-[1440px] px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Column 1: Brand Info */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-amber-500 text-transparent bg-clip-text mb-4">
            Globira
          </h2>
          <p className="text-sm mb-4 text-gray-400">
            Your trusted B2B wholesale platform for verified products and global
            brands.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BsWhatsapp className="text-lg" />
            <span>Bulk order support: +880 1234 567891</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About Us", href: "/about" },
              { name: "B2B Solutions", href: "/solutions" },
              { name: "Contact", href: "/contact" },
              { name: "FAQ", href: "/faq" },
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact + Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-3 text-sm mb-6">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-amber-500 mt-1" />
              <span>Dinajpur, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-amber-500" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-amber-500" />
              <span>support@globira.com</span>
            </li>
          </ul>

          <h4 className="text-sm font-medium mb-2 text-white">
            Subscribe to Newsletter
          </h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm rounded-l-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
            />
            <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 text-sm text-white rounded-r-md">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Social & Bottom Bar */}
      <div className="border-t border-zinc-800 mt-10 pt-6 px-6 text-sm">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-gray-400 text-center">
            © {currentYear} Globira. All rights reserved.
          </span>
          <div className="flex gap-4 text-lg text-gray-400">
            <a
              href="https://www.facebook.com/CodesWithRakib/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/codeswithrakib"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://www.linkedin.com/in/codeswithrakib/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://www.instagram.com/codeswithrakib/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <BsInstagram />
            </a>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end text-gray-400">
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
            <a href="/cookies" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
