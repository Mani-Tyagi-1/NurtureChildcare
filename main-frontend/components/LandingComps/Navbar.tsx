"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  Menu, X, User } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "GALLERY", href: "/gallery" },
  { name: "BLOGS", href: "/blogs" },
  { name: "NEWSLETTER", href: "/newsletter" },
  // { name: "GUIDE", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  // const [active, setActive] = useState("HOME");
  //automatic detect current path
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* Main navbar */}
      <nav
        className={`w-full px-6 py-2 fixed top-0 z-50 flex justify-start gap-80 items-center backdrop-blur-xl rounded-b-xl ${isScrolled ? "backdrop-blur-md" : ""}`} 
        style={{
          backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.3)" : "transparent",
          border: isScrolled
            ? "1px solid rgba(124, 58, 237, 0.15)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div className="">
          {/* <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
            }}
          >
            <Globe size={24} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-2xl text-gradient">NC & ES</span>
            <div
              className="text-xs font-medium opacity-70"
              style={{ color: "var(--color-accent-soft)" }}
            >
              Network & Education
            </div>
          </div> */}

          <img src="/Logo.png" alt="Logo" className=" rounded-lg" />
        </div>

        {/* Desktop Nav Links */}
        <div
          className="hidden md:flex items-center space-x-2 px-4 py-2 backdrop-blur-md rounded-full "
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(124, 58, 237, 0.15)",
          }}
        >
          {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="relative  text-xs font-medium transition duration-300 ease-in-out px-3 py-2 rounded-full"
              style={{
                color:
                  isActive
                    ? "var(--color-white)"
                    : "var(--color-accent-soft)",
                backgroundColor:
                  active === link.name
                    ? "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))"
                    : "transparent",
                boxShadow:
                  active === link.name
                    ? "0 4px 12px rgba(124, 58, 237, 0.25)"
                    : "none",
                background:
                  isActive 
                    ? "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))"
                    : "transparent",
              }}
              onMouseEnter={(e) => {
                if (active !== link.name) {
                  e.currentTarget.style.color = "var(--color-white)";
                  e.currentTarget.style.backgroundColor =
                    "rgba(124, 58, 237, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== link.name) {
                  e.currentTarget.style.color = "var(--color-accent-soft)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              {link.name}
            </Link>
            );
})}
        </div>

        {/* Mobile menu button */}
        <div className="  md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg"
            style={{
              backgroundColor: "rgba(124, 58, 237, 0.2)",
            }}
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>

        {/* Login/Signup Button */}
        <div className="hidden md:block">
          {/* <a
            href="/template"
            className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition duration-300 ease-in-out hover:scale-105 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
              color: "var(--color-white)",
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 16px rgba(124, 58, 237, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(124, 58, 237, 0.3)";
            }}
          >
            <User size={16} />
            <span>LOGIN / SIGNUP</span>
          </a> */}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}
        >
          <div className="pt-24 px-6 pb-6 h-full flex flex-col">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActive(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 px-4 rounded-lg font-medium text-sm transition duration-200"
                  style={{
                    color:
                      active === link.name
                        ? "var(--color-white)"
                        : "var(--color-accent-soft)",
                    backgroundColor:
                      active === link.name
                        ? "rgba(124, 58, 237, 0.3)"
                        : "transparent",
                    borderLeft:
                      active === link.name
                        ? "3px solid var(--color-accent-glow)"
                        : "3px solid transparent",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* <div className="mt-auto">
              <a
                href="/template"
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg font-medium transition duration-300 ease-in-out"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                  color: "var(--color-white)",
                }}
              >
                <User size={18} />
                <span>LOGIN / SIGNUP</span>
              </a>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
