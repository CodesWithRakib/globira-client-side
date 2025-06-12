import React from "react";

const GoogleMap = () => {
  return (
    <section className="w-full h-[400px] mt-10">
      <iframe
        title="Our Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.0168614784893!2d88.64683901538594!3d25.627058020198004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4e8fbdce1c7db%3A0xe0341f18e45cb7a1!2sDinajpur%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1718200000000!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-lg grayscale hover:grayscale-0 transition-all duration-300 dark:brightness-75"
      ></iframe>
    </section>
  );
};

export default GoogleMap;
