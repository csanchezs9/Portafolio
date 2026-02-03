"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "camilosanchezs288@gmail.com",
      href: "mailto:camilosanchezs288@gmail.com?subject=Contacto desde portafolio",
    },
    {
      icon: Phone,
      label: t.contact.title === "Contacto" ? "WhatsApp" : "WhatsApp",
      value: "+57 317 374 5021",
      href: "https://wa.me/573173745021?text=Hola%20Camilo%2C%20me%20gustar%C3%ADa%20hablar%20contigo%20sobre...",
    },
    {
      icon: MapPin,
      label: t.contact.title === "Contacto" ? "Ubicación" : "Location",
      value: "Medellín, Colombia",
      href: "https://www.google.com/maps/place/Medell%C3%ADn,+Antioquia/@6.2442034,-75.5812115,12z",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t.contact.success, {
          description: t.contact.successDesc,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(t.contact.error, {
          description: data.error || t.contact.errorDesc,
        });
      }
    } catch (error) {
      toast.error(t.contact.error, {
        description: t.contact.errorDesc,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {/* Huge Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-12 leading-tight">
              {t.contact.title === "Contacto"
                ? "Hablemos de tu próximo proyecto"
                : "Let's build something great together"}
            </h2>

            {/* Minimal Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider text-muted-foreground mb-3"
                >
                  01 — {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-border/30 focus:border-primary pb-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/40"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-muted-foreground mb-3"
                >
                  02 — {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-border/30 focus:border-primary pb-3 text-lg outline-none transition-colors placeholder:text-muted-foreground/40"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-muted-foreground mb-3"
                >
                  03 — {t.contact.message}
                </label>
                <div className="border-b-2 border-border/30 focus-within:border-primary transition-colors pb-3">
                  <textarea
                    id="message"
                    rows={1}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 text-lg outline-none resize-none placeholder:text-muted-foreground/40"
                    placeholder={t.contact.message}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg overflow-hidden shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                <span className="relative z-10">
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side - Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24">
              {/* Glassmorphism Card */}
              <div className="relative rounded-2xl bg-card/30 backdrop-blur-xl border border-border/20 p-8 shadow-2xl">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />

                <div className="relative space-y-6">
                  <h3 className="text-2xl font-heading font-bold mb-8">
                    {t.contact.title === "Contacto" ? "Información de contacto" : "Contact Information"}
                  </h3>

                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith("mailto:") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Decorative Element */}
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {t.contact.title === "Contacto"
                    ? "Respondo en menos de 24 horas"
                    : "I respond within 24 hours"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
