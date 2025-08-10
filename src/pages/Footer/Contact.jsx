import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import useTitle from "../../hooks/useTitle";
import ContactForm from "./ContactForm";

const Contact = () => {
  useTitle("Contact Us");

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Email Support",
      description: "For general inquiries and support",
      details: "support@globira.com",
      action: "mailto:support@globira.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Sales Team",
      description: "For business and wholesale inquiries",
      details: "+880 1234 567890",
      action: "tel:+8801234567890",
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Headquarters",
      description: "Our main office location",
      details: "123 Business Avenue, Dhaka 1212, Bangladesh",
      action: "https://maps.google.com",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Working Hours",
      description: "Our standard support availability",
      details: "Sunday-Thursday: 9AM - 6PM (GMT+6)",
      action: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Our Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're here to help with your wholesale and business needs. Reach out
            through any channel below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              Quick Contacts
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {method.description}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {method.details}
                      </p>
                      {method.action && (
                        <a
                          href={method.action}
                          className="inline-block mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
                        >
                          Contact Now →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Hours Note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-900"
            >
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> For urgent wholesale inquiries outside
                business hours, please email{" "}
                <a
                  href="mailto:emergency@globira.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  emergency@globira.com
                </a>{" "}
                and we'll respond within 2 hours.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>
              <ContactForm />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                By submitting this form, you agree to our{" "}
                <a
                  href="/privacy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8625569896427!2d90.3906143154319!3d23.75086808458835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhaka%201212%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="dark:grayscale dark:opacity-90"
            title="Globira Office Location"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
