"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  description: string;
  subject: string;
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSuccess(false);

    try {
      const res = await fetch("/api/add-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { message?: string; success?: boolean };
      
      console.log(json, "json");
      console.log(res, "res");

      if (!res.ok || !json?.success) {
        throw new Error(json.message || "Failed to send message");
      }
      reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.span className="text-primary font-semibold tracking-wider uppercase text-sm">
                Get In Touch
              </motion.span>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}>
                Let's Build <br />
                <span className="text-muted-foreground">Something Great.</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Have a project in mind? Or just want to say hello? I'm always open to new
                opportunities and collaborations.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "hello@aburayhan.com", href: "mailto:hello@aburayhan.com" },
                { icon: Phone, label: "Phone", value: "+880 1621 807642", href: "tel:+8801621807642" },
                { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: "#" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/60 group-hover:text-white/40 transition-all duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{item.label}</p>
                    <a href={item.href} className="text-lg font-bold text-white/70 hover:text-primary/60  transition-colors">
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            {/* <div className="flex gap-4 pt-4">
              {[FaGithub, FaLinkedin, FaTwitter, FaFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div> */}
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card/40 border border-border/10 p-6 md:p-10 rounded-md backdrop-blur-sm shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm opacity-65 font-bold text-foreground">Full Name</label>
                  <input
                    {...register("name", { required: "Name is required", minLength: { value: 2, message: "Min length is 2" } })}
                    placeholder="John Doe"
                    className={`w-full bg-background/50 border ${errors.name ? 'border-red-500' : 'border-border/50'} px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">Email Address</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                      })}
                      placeholder="john@example.com"
                      className={`w-full bg-background/50 border ${errors.email ? 'border-red-500' : 'border-border/50'} px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm opacity-65 font-bold text-foreground">Phone Number</label>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      placeholder="+880 1xxx xxxxxx"
                      className={`w-full bg-background/50 border ${errors.phone ? 'border-red-500' : 'border-border/50'} px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* subject */}

                <div className="space-y-2">
                  <label className="text-sm opacity-65 font-bold text-foreground">Subject</label>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    placeholder="Subject"
                    className={`w-full bg-background/50 border ${errors.subject ? 'border-red-500' : 'border-border/50'} px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors`}
                  />
                  {errors.subject && <p className="text-xs text-red-500 font-medium">{errors.subject.message}</p>}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-sm opacity-65 font-bold text-foreground">Message</label>
                  <textarea
                    {...register("description", { required: "Message is required", minLength: { value: 10, message: "Tell me a bit more..." } })}
                    rows={4}
                    placeholder="I'd like to talk about..."
                    className={`w-full bg-background/50 border ${errors.description ? 'border-red-500' : 'border-border/50'} px-5 py-4 rounded-md focus:outline-none focus:border-primary transition-colors resize-none`}
                  />
                  {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-md font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {submitError && (
                  <p className="text-center text-sm text-red-500 font-medium">
                    {submitError}
                  </p>
                )}

                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-sm text-green-500 font-bold"
                  >
                    Message sent successfully! Check your email for a
                    confirmation — I&apos;ll reply soon.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
