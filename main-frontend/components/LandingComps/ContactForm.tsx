"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GradientBlobBackground = () => {
  return (
    <>
      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-radial opacity-20 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Animated Dots Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.5" fill="var(--color-accent-glow)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
    </>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFocus = (field: string) => {
    setIsFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field: string) => {
    setIsFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      console.log("Form data submitted:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative w-full py-5  md:px-24 md:py-10 overflow-hidden "
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      <GradientBlobBackground />

      <div className="container mx-auto w-full  px-2  relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Left Side - Text */}
          <div className="relative text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                Let's
                <br />
                <span className="text-gradient">Connect</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Have a question or want to work together? Drop me a message and I'll get back to you soon.
              </p>
              
              <div className="mt-10 flex flex-col px-4  sm:flex-row gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>hello@example.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form  desktop view*/}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[90%] md:w-[60%] p-6 sm:p-8 md:p-8 rounded-2xl  shadow-2xl"
            style={{ 
              background: "var(--color-white)",
              boxShadow: "0 10px 40px rgba(124, 58, 237, 0.1)"
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "message"].map((field) => (
                <div key={field} className="relative">
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className={`relative transition-all duration-300 ease-in-out`}>
                    {field === "message" ? (
                      <textarea
                        name={field}
                        id={field}
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus(field)}
                        onBlur={() => handleBlur(field)}
                        placeholder="Your message here..."
                        required
                        className="w-full resize-none rounded-lg p-4 transition duration-300 ease-in-out border-2"
                        style={{
                          backgroundColor: "var(--color-off-white)",
                          borderColor: "var(--color-accent-glow)",
                          color: "var(--color-text)",
                        }}
                      ></textarea>
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        id={field}
                        onChange={handleChange}
                        onFocus={() => handleFocus(field)}
                        onBlur={() => handleBlur(field)}
                        placeholder={
                          field === "name" ? "Jane Smith" : "jane@example.com"
                        }
                        required
                        className="w-full rounded-lg p-2 transition duration-300 ease-in-out border-2"
                        style={{
                          backgroundColor: "var(--color-off-white)",
                          borderColor:  "var(--color-accent-glow)",
                          color: "var(--color-text)",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-semibold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] disabled:opacity-70 bg-gradient-animation"
                  style={{
                    color: "var(--color-white)",
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-2 rounded-lg"
                  style={{
                    backgroundColor: submitMessage.includes("successfully")
                      ? "rgba(167, 243, 208, 0.2)"
                      : "rgba(254, 202, 202, 0.2)",
                    color: submitMessage.includes("successfully")
                      ? "#047857"
                      : "#B91C1C",
                  }}
                >
                  {submitMessage}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}