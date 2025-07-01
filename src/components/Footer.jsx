import React from "react";
import { motion } from "motion/react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Users,
  Info,
  FileText,
  Shield,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full bg-gray-900 text-gray-300 pt-16 pb-10"
    >
      <div className="w-full max-w-7xl px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl font-bold text-white">Globira</h2>
          </div>
          <p className="text-sm text-gray-400">
            Your trusted B2B wholesale platform connecting businesses with
            verified suppliers worldwide.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Phone className="w-4 h-4 text-amber-500" />
            <span>Bulk order support: +880 1234 567891</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            <Users className="w-5 h-5" />
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              {
                name: "About Us",
                href: "/about",
                icon: <Info className="w-4 h-4" />,
              },
              {
                name: "Our Products",
                href: "/products",
                icon: <ShoppingCart className="w-4 h-4" />,
              },
              {
                name: "B2B Solutions",
                href: "/solutions",
                icon: <Users className="w-4 h-4" />,
              },
              {
                name: "Contact Sales",
                href: "/contact",
                icon: <Phone className="w-4 h-4" />,
              },
            ].map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-amber-500">{link.icon}</span>
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

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              {
                name: "Blog",
                href: "/blog",
                icon: <FileText className="w-4 h-4" />,
              },
              { name: "FAQ", href: "/faq", icon: <Info className="w-4 h-4" /> },
              {
                name: "Shipping Policy",
                href: "/shipping",
                icon: <ShoppingCart className="w-4 h-4" />,
              },
              {
                name: "Returns",
                href: "/returns",
                icon: <ShoppingCart className="w-4 h-4" />,
              },
            ].map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-amber-500">{link.icon}</span>
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

        {/* Contact & Newsletter */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 mt-0.5 w-4 h-4" />
                <span>123 Business Plaza, Dinajpur, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500 w-4 h-4" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-amber-500 w-4 h-4" />
                <span>support@globira.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2 text-white">
              Get wholesale updates
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your business email"
                className="w-full px-4 py-2 text-sm rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 text-sm text-white rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="w-4 h-4" />
            <span>© {currentYear} Globira Wholesale. All rights reserved.</span>
          </div>

          <div className="flex gap-6 text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>

          <div className="flex gap-4 text-gray-400">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
