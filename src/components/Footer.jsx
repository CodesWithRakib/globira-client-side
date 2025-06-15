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
      className="bg-gray-100 dark:bg-zinc-950 dark:text-white text-gray-800 pt-16 pb-6"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400 bg-clip-text text-transparent">
            Globira
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your trusted B2B wholesale platform for verified products and global
            brands.
          </p>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
            <BsWhatsapp className="text-lg" />
            <span>Bulk order support: +880 1234 567891</span>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About Us", href: "/about" },
              { name: "B2B Solutions", href: "/solutions" },
              { name: "Contact", href: "/contact" },
              { name: "FAQ", href: "/faq" },
            ].map((link, index) => (
              <li key={index}>
                <motion.a
                  whileHover={{ x: 5 }}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Contact Us
          </h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 mt-1" />
              <span>Dinajpur, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-blue-600 dark:text-blue-400" />
              <span>+880 1234 567890</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 dark:text-blue-400" />
              <span>support@globira.com</span>
            </li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Follow Us
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Stay updated with our latest offers and business solutions
          </p>
          <div className="flex gap-4 text-xl">
            {[
              {
                icon: <FaFacebook />,
                color: "hover:text-blue-600",
                label: "Facebook",
                href: "https://www.facebook.com/CodesWithRakib/",
              },
              {
                icon: <BsTwitterX />,
                color: "hover:text-sky-500",
                label: "Twitter",
                href: "https://x.com/codeswithrakib",
              },
              {
                icon: <BsLinkedin />,
                color: "hover:text-blue-700",
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/codeswithrakib/",
              },
              {
                icon: <BsInstagram />,
                color: "hover:text-pink-500",
                label: "Instagram",
                href: "https://www.instagram.com/codeswithrakib/",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -5 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`text-gray-600 dark:text-gray-400 ${social.color} transition-colors`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2 text-gray-800 dark:text-white">
              Subscribe to Newsletter
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm rounded-l-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-3 py-2 text-sm rounded-r-lg transition-colors">
                Join
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        viewport={{ once: true }}
        className="border-t border-gray-300 dark:border-zinc-800 mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <span>© {currentYear} Globira. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:underline">
              Cookie Policy
            </a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
