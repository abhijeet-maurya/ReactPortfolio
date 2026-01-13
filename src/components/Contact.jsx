import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import { FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactItem = ({ icon: Icon, label, value, href, index, itemRef }) => (
  <a
    ref={itemRef}
    href={href}
    key={label}
    target={href.startsWith('http') ? "_blank" : "_self"}
    rel="noopener noreferrer"
    className="flex items-center !gap-6 glass !p-8 rounded-3xl group hover:glass-accent transition-all duration-300 shadow-lg"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary text-2xl group-hover:bg-primary group-hover:text-black transition-all duration-500">
      <Icon />
    </div>
    <div>
      <p className="text-primary text-xs font-bold uppercase tracking-wider !mb-2">{label}</p>
      <p className="text-white text-lg font-bold group-hover:text-primary transition-colors">{value}</p>
    </div>
  </a>
);

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftContentRef = useRef(null);
  const contactItemsRef = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        ease: "power2.out"
      });

      // Left Content Animation
      gsap.from(leftContentRef.current, {
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 90%",
          end: "top 70%",
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        ease: "power2.out"
      });

      // Contact Items Staggered Animation
      contactItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "top 80%",
              scrub: 1,
            },
            x: -50,
            opacity: 0,
            ease: "power2.out"
          });
        }
      });

      // Form Animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
        x: 100,
        opacity: 0,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      label: "Phone",
      value: "+91 8448419728",
      icon: FaPhone,
      href: "tel:+918448419728",
    },
    {
      label: "Email",
      value: "Abhijeetmauryaam@gmail.com",
      icon: FaEnvelope,
      href: "mailto:Abhijeetmauryaam@gmail.com",
    },
    {
      label: "Location",
      value: "Delhi, India",
      icon: FaMapMarkerAlt,
      href: "#",
    },
    {
      label: "GitHub",
      value: "abhijeet-maurya",
      icon: FaGithub,
      href: "https://github.com/abhijeet-maurya",
    },
    {
      label: "LinkedIn",
      value: "abhijeet-maurya-developer",
      icon: FaLinkedin,
      href: "https://linkedin.com/in/abhijeet-maurya-developer",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-black relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className="text-center !mb-20"
        >
          <p
            className="text-primary font-medium tracking-widest uppercase !mb-4"
          >
            Get in touch
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold !mb-6"
          >
            Contact Me.
          </h2>
          <div className="w-20 h-1 bg-primary !mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={leftContentRef}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Let's build something amazing together!</h3>
            <p className="text-secondary-dim text-lg leading-relaxed mb-10">
              Whether you have a question, want to start a project, or just want to connect, feel free to reach out through any of these platforms. I'm always open to discussing new opportunities and creative ideas.
            </p>
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, index) => (
                <ContactItem 
                  key={index} 
                  {...item} 
                  index={index} 
                  itemRef={el => contactItemsRef.current[index] = el}
                />
              ))}
            </div>
          </div>

          <div
            ref={formRef}
            className="glass !p-1.5 rounded-3xl"
          >
            <div className="bg-background/80 backdrop-blur-xl !p-10 md:!p-16 rounded-2xl border border-white/5">
              <h4 className="text-2xl font-bold text-white !mb-10">Send a Message</h4>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-secondary-dim text-sm font-bold mb-2 uppercase tracking-tighter">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-secondary-dim text-sm font-bold mb-2 uppercase tracking-tighter">Your Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-secondary-dim text-sm font-bold mb-2 uppercase tracking-tighter">Message</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How can I help you?"></textarea>
                </div>
                <button className="w-full py-4 bg-accent-gradient text-white font-bold rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-10 border-t border-white/5 text-center text-secondary-dim text-sm">
        <p>&copy; {new Date().getFullYear()} Abhijeet. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ using React, Tailwind & Framer Motion</p>
      </footer>
    </section>
  );
};

export default Contact;
