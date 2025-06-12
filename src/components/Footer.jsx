import React from "react";
import { BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-zinc-950 dark:text-white text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3">Globira</h2>
          <p className="text-sm">
            Your trusted B2B wholesale platform for verified products and global
            brands. Bulk deals, fast delivery, and support you can rely on.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Dinajpur, Bangladesh</li>
            <li>📞 +880 1234 567890</li>
            <li>✉️ support@globira.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://www.facebook.com/CodesWithRakib/"
              target="_blank"
              aria-label="Facebook"
              className="hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/codeswithrakib"
              target="_blank"
              aria-label="x"
              className="hover:text-sky-500"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://www.linkedin.com/in/codeswithrakib/"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-blue-800"
            >
              <BsLinkedin />
            </a>
            <a
              href="https://www.instagram.com/codeswithrakib/"
              target="_blank"
              aria-label="Instagram"
              className="hover:text-pink-500"
            >
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-zinc-800 mt-10 pt-5 text-center text-sm">
        © {new Date().getFullYear()} Globira. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
