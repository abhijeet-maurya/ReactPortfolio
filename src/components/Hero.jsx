import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';
import Background3D from './Background3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Content Scroll Fade
      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0,
        y: -50,
        scale: 0.9,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen mx-auto flex flex-col justify-center items-center overflow-hidden bg-hero-gradient">
      <Background3D />
      <div className="absolute inset-0 z-0">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <motion.div
        ref={contentRef}
        variants={staggerContainer(0.2, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="z-10 text-center px-6 -mt-10"
      >
        <motion.p
          variants={fadeIn("down", "spring", 0.5, 1)}
          className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4"
        >
          Welcome to my portfolio
        </motion.p>
        
        <motion.h1
          variants={fadeIn("up", "spring", 0.7, 1)}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 leading-tight"
        >
          Hi, I'm <span className="text-primary">Abhijeet</span>
        </motion.h1>

        <motion.h2
          variants={fadeIn("up", "spring", 0.9, 1)}
          className="text-lg md:text-2xl text-secondary-dim max-w-2xl mx-auto mb-4 font-medium"
        >
          Full Stack Web Developer
        </motion.h2>

        <motion.p
          variants={fadeIn("up", "spring", 1.1, 1)}
          className="text-xs md:text-sm text-secondary-dim/90 max-w-[450px] !mx-auto text-center !mb-8 leading-relaxed"
        >
          Building modern, performant, and visually engaging web experiences with a focus on clean code and user-centric design.
        </motion.p>

        <motion.div
          variants={fadeIn("up", "spring", 1.3, 1)}
          className="flex flex-wrap items-center justify-center gap-8 mt-10"
        >
          <a
            href="#projects"
            className="!inline-flex !items-center !justify-center !px-6 !py-4 min-w-[180px] rounded-xl bg-primary text-white text-base font-bold transition-all hover:brightness-110 active:scale-95 shadow-xl shadow-primary/30 text-center whitespace-nowrap"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="!inline-flex !items-center !justify-center !px-6 !py-4 min-w-[180px] text-primary border-2 border-primary/20 text-base font-bold hover:text-white hover:bg-primary/10 transition-all rounded-xl whitespace-nowrap"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-secondary-dim/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
