import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

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
        y: 100,
        opacity: 0,
        ease: "power2.out"
      });

      // Content Animation
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        ease: "power2.out"
      });

      // Image Animation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
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

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="text-center !mb-20"
        >
          <p
            className="text-primary font-medium tracking-widest uppercase !mb-4"
          >
            Introduction
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold !mb-6"
          >
            Overview.
          </h2>
          <div className="w-20 h-1 bg-primary !mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            ref={contentRef}
            className="!space-y-8"
          >
            <h3 className="text-2xl font-bold text-secondary !mb-4">
              Determined Full Stack Developer
            </h3>
            <p className="text-secondary-dim leading-relaxed text-lg !mb-0">
              I'm a skilled software developer with experience in JavaScript, and expertise in frameworks like React, Node.js, and Three.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems.
            </p>
            <p className="text-secondary-dim leading-relaxed text-lg !mb-0">
              My journey in web development is driven by a passion for creating seamless user experiences and robust backend systems. I specialize in building modern web applications that are both performant and visually stunning.
            </p>
            
            <div className="flex flex-wrap gap-6 !pt-10">
              <div className="glass !px-10 !py-8 rounded-3xl flex-1 min-w-[200px] border-l-4 border-l-primary group hover:glass-accent transition-all">
                <h4 className="font-bold text-white text-3xl !mb-2 group-hover:text-primary transition-colors">2+</h4>
                <p className="text-secondary-dim text-sm font-medium">Years of Experience</p>
              </div>
              <div className="glass !px-10 !py-8 rounded-3xl flex-1 min-w-[200px] border-l-4 border-l-accent group hover:glass-accent transition-all">
                <h4 className="font-bold text-white text-3xl !mb-2 group-hover:text-accent transition-colors">10+</h4>
                <p className="text-secondary-dim text-sm font-medium">Projects Built</p>
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-2">
              <img 
                src={`${import.meta.env.BASE_URL}aboutImg.png`} 
                alt="About Me" 
                className="w-full h-full rounded-2xl object-cover"
              />
              {/* Overlay elements for decoration */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 blur-2xl rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
