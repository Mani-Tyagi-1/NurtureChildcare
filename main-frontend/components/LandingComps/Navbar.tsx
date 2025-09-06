"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "GALLERY", href: "/gallery" },
  { name: "BLOGS", href: "/blogs" },
  { name: "NEWSLETTER", href: "/newsletter" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("HOME");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main navbar */}
      <nav
        className={`w-full px-6 py-2 fixed top-0 z-50 flex items-center
              justify-between md:justify-start
              gap-3 md:gap-80
              backdrop-blur-xl rounded-b-xl ${
                isScrolled ? "backdrop-blur-md" : ""
              }`}
        style={{
          backgroundColor: isScrolled ? "rgba(15, 23, 42, 0.3)" : "transparent",
          border: isScrolled
            ? "1px solid rgba(124, 58, 237, 0.15)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div className="shrink-0">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-8 w-auto md:h-auto rounded-lg object-contain"
          />
        </div>

        {/* Desktop Nav Links (layout unchanged) */}
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
                className="relative text-xs font-medium transition duration-300 ease-in-out px-3 py-2 rounded-full"
                style={{
                  color: isActive
                    ? "var(--color-white)"
                    : "var(--color-accent-soft)",
                  // ✅ use longhands only
                  backgroundImage:
                    isActive || active === link.name
                      ? "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))"
                      : "none",
                  backgroundColor: "transparent",
                  boxShadow:
                    active === link.name
                      ? "0 4px 12px rgba(124, 58, 237, 0.25)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (active !== link.name && !isActive) {
                    e.currentTarget.style.color = "var(--color-white)";
                    e.currentTarget.style.backgroundImage =
                      "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== link.name && !isActive) {
                    e.currentTarget.style.color = "var(--color-accent-soft)";
                    e.currentTarget.style.backgroundImage = "none";
                  }
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(124, 58, 237, 0.2)" }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden w-[80%]" /* was 'W-[80%]' */
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
          </div>
        </div>
      )}
    </>
  );
}
