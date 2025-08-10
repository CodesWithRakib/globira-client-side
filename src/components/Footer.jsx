import React, { useState } from "react";
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
  Send,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

// Reusable Modal Component
const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full text-center"
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Coming Soon
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleUnavailable = (msg) => {
    setModalMessage(msg);
    setModalOpen(true);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full bg-gray-900 text-gray-300 pt-16 pb-10 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

        <div className="relative z-10 w-full container px-6 mx-auto">
          {/* Top section with brand and newsletter */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 pb-10 border-b border-gray-800">
            <div className="lg:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-600">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Globira</h2>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Your trusted B2B wholesale platform connecting businesses with
                verified suppliers worldwide.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Bulk order support: +880 1234 567891</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:w-2/3 lg:max-w-md">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  Get wholesale updates
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Subscribe to our newsletter for exclusive deals and industry
                  insights
                </p>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your business email"
                    className="flex-grow px-4 py-3 text-sm rounded-l-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-3 text-sm text-white rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2 pb-2 border-b border-gray-800">
                <Users className="w-5 h-5 text-blue-400" />
                Company
              </h3>
              <ul className="space-y-4">
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
                    modal: true,
                    message: "B2B Solutions section is under development.",
                    icon: <Users className="w-4 h-4" />,
                  },
                  {
                    name: "Contact Sales",
                    href: "/contact",
                    icon: <Phone className="w-4 h-4" />,
                  },
                ].map((link, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="text-blue-400">{link.icon}</span>
                    {link.modal ? (
                      <button
                        onClick={() => handleUnavailable(link.message)}
                        className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2 pb-2 border-b border-gray-800">
                <FileText className="w-5 h-5 text-blue-400" />
                Resources
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    name: "Blog",
                    modal: true,
                    message: "Blog content is coming soon.",
                    icon: <FileText className="w-4 h-4" />,
                  },
                  {
                    name: "FAQ",
                    href: "/faq",
                    icon: <Info className="w-4 h-4" />,
                  },
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
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="text-blue-400">{link.icon}</span>
                    {link.modal ? (
                      <button
                        onClick={() => handleUnavailable(link.message)}
                        className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2 pb-2 border-b border-gray-800">
                <Mail className="w-5 h-5 text-blue-400" />
                Contact
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <MapPin className="text-blue-400 mt-0.5 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    123 Business Plaza, Dinajpur, Bangladesh
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Phone className="text-blue-400 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    +880 1234 567890
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <Mail className="text-blue-400 w-4 h-4 flex-shrink-0" />
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    support@globira.com
                  </span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2 pb-2 border-b border-gray-800">
                <Shield className="w-5 h-5 text-blue-400" />
                Legal
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    name: "Privacy Policy",
                    href: "/privacy",
                  },
                  {
                    name: "Terms of Service",
                    href: "/terms",
                  },
                  {
                    name: "Cookie Policy",
                    href: "/cookies",
                  },
                ].map((link, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <span className="text-blue-400">
                      <FileText className="w-4 h-4" />
                    </span>
                    <a
                      href={link.href}
                      className="text-gray-400 group-hover:text-white transition-colors flex items-center gap-1"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>
                  © {currentYear} Globira Wholesale. All rights reserved.
                </span>
              </div>

              <div className="flex gap-6 text-gray-400">
                <a
                  href="/privacy"
                  className="hover:text-blue-300 transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="hover:text-blue-300 transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="hover:text-blue-300 transition-colors"
                >
                  Cookie Policy
                </a>
              </div>

              <div className="flex gap-4 text-gray-400">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Info Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
      />
    </>
  );
};

export default Footer;
