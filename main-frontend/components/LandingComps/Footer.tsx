"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { JSX, SVGProps } from "react";
import Image from "next/image";
import LOGO from "../../public/LOGO.png";
import BackgroundFooter from "./BgFooter";

// SVG Icons
const EnvelopeIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const PhoneIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z"
    />
  </svg>
);

const MapPinIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

// Social Media Icons
const SocialIcon = ({ name }: { name: string }) => {
  const iconSize = "w-5 h-5";

  if (name === "twitter") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  return null;
};

// Contact & Links
const contactDetails = [
  {
    icon: EnvelopeIcon,
    text: "hello@agency.com",
    href: "mailto:hello@agency.com",
  },
  { icon: PhoneIcon, text: "+ 54 2541 22 55 66", href: "tel:+542541225566" },
  { icon: MapPinIcon, text: "123 Main Street, New York, USA 10001" },
];

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Blogs", href: "/blogs" },
  { name: "Gallery", href: "/gallery" },
];

const serviceLinksData = [
  { name: "ACECQA", href: "https://www.acecqa.gov.au/" },
  {
    name: "CCS",
    href: "https://www.servicesaustralia.gov.au/child-care-subsidy",
  },
  {
    name: "CCS Calculator",
    href: "https://www.servicesaustralia.gov.au/how-much-child-care-subsidy-you-can-get?context=41186",
  },
  { name: "Starting Block", href: "https://startingblocks.gov.au/" },
];

const legalLinksData = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialMedia = [
  { name: "twitter", href: "https://twitter.com" },
  { name: "facebook", href: "https://facebook.com" },
  { name: "instagram", href: "https://instagram.com" },
  { name: "linkedin", href: "https://linkedin.com" },
];

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blob top-right */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle at center, var(--gradient-purple-start), var(--gradient-blue-end))`,
        }}
      />

      {/* Gradient blob bottom-left */}
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{
          background: `radial-gradient(circle at center, var(--gradient-blue-start), var(--gradient-purple-end))`,
        }}
      />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237C3AED' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Wave divider */}
      {/* <div className="absolute top-0 inset-x-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          fill="var(--color-white)"
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-16 md:h-20"
        >
          <path d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,122.7C672,96,768,64,864,74.7C960,85,1056,139,1152,138.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div> */}
    </div>
  );
};

// FINAL FOOTER COMPONENT
export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="  overflow-hidden z-10" // <-- Added overflow-hidden here
      style={{
        backgroundColor: "var(--color-accent-tint)",
        color: "var(--color-text)",
      }}
    >
      {/* <GradientBackground /> */}

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 ">
        {/* Logo & Social Media Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-7"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              <Image src={LOGO} alt="logo" />
              {/* <img src={LOGO} alt="logo" /> */}
            </h2>
            {/* <p
              className="text-sm max-w-md"
              style={{ color: "var(--color-text-muted)" }}
            >
              Crafting digital experiences that inspire and elevate your brand
              to new heights.
            </p> */}
          </div>

          <div className="flex space-x-4">
            {socialMedia.map((platform) => (
              <Link
                key={platform.name}
                href={platform.href}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 "
                style={{
                  backgroundColor: "var(--color-white)",
                  color: "var(--color-accent-glow)",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.15)",
                }}
              >
                <SocialIcon name={platform.name} />
              </Link>
            ))}
          </div>
        </motion.div>
        <div className="grid lg:grid-cols-[40%_60%] gap-10 md:gap-16">
          {/* Contact Column */}
          <motion.div variants={itemVariants} className="relative">
            <div className="space-y-4 relative z-10">
              {/* <h3
                className="text-xl font-bold mb-6 relative inline-block"
                style={{ color: "var(--color-accent-glow)" }}
              >
                Get In Touch
                <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-animation rounded-full"></div>
              </h3> */}

              {contactDetails.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-1 rounded-xl flex items-center space-x-4 transition-all duration-300"
                  style={{
                    backgroundColor: "var(--color-white)",
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.08)",
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-animation">
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: "var(--color-white)" }}
                    />
                  </div>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="font-medium hover:text-accent-glow transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span
                      className="font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.text}
                    </span>
                  )}
                </motion.div>
              ))}

              {/* <motion.div
                variants={itemVariants}
                className="mt-8 p-5 rounded-xl text-center"
                style={{
                  backgroundColor: "rgba(124, 58, 237, 0.06)",
                  border: "1px dashed var(--color-accent-soft)",
                }}
              >
                <p
                  className="font-medium mb-3"
                  style={{ color: "var(--color-accent-glow)" }}
                >
                  Ready to start your project?
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-glow hover:scale-105 bg-gradient-animation"
                  style={{ color: "var(--color-white)" }}
                >
                  Let's Talk
                </Link>
              </motion.div> */}
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={itemVariants} className="flex gap-10 md:gap-44">
            {[
              { title: "Menu", links: menuLinks },
              { title: "Services", links: serviceLinksData },
              { title: "Legal", links: legalLinksData },
            ].map((section) => (
              <div key={section.title}>
                <h3
                  className="text-lg font-bold mb-6 relative inline-block "
                  style={{ color: "var(--color-accent-glow)" }}
                >
                  {section.title}
                  <div className="absolute bottom-0 left-0 w-2/2 h-1 bg-gradient-animation rounded-full"></div>
                </h3>
                <ul className=" space-y-0 md:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center transition-all duration-300 hover:translate-x-1 hover:underline"
                        style={{
                          textDecorationColor: "var(--color-text-muted)",
                        }}
                      >
                        <div className="mr-2 w-1 h-1 rounded-full bg-gradient-animation"></div>
                        <span style={{ color: "var(--color-text-muted)" }}>
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
        {/* 
        <motion.div
          variants={itemVariants}
          className="mt-6 pt-4 text-center text-sm"
          style={{
            borderTop: "1px solid rgba(124, 58, 237, 0.1)",
            color: "var(--color-text-muted)",
          }}
        >
          <p>© {currentYear} Agency Studio. All Rights Reserved.</p>
          <p className="mt-2 text-xs">
            Designed with <span style={{ color: "#ff4b7d" }}>♥</span> for
            creative professionals.
          </p>
        </motion.div> */}
        <BackgroundFooter/>
      </div>
    </motion.footer>
  );
}
