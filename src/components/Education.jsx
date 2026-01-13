import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';
import { FaGraduationCap, FaUniversity, FaSchool } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EducationCard = ({ education, index, cardRef }) => (
  <div
    ref={cardRef}
    className="glass !p-10 rounded-3xl border-l-4 border-l-primary hover:glass-accent transition-all duration-300 shadow-xl"
  >
    <div className="flex items-center !gap-6 !mb-6">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl">
        {education.icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white leading-tight !mb-1">{education.degree}</h3>
        <p className="text-primary text-sm font-medium">{education.institution}</p>
      </div>
    </div>
    
    <div className="flex justify-between items-center !mt-10">
      <span className="text-secondary-dim text-sm font-medium flex items-center !gap-3">
        <span className="w-2 h-2 rounded-full bg-primary/40"></span>
        {education.duration}
      </span>
      <span className="!px-5 !py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold">
        {education.score}
      </span>
    </div>
  </div>
);

const Education = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

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

      // Education Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 65%",
              scrub: 1,
            },
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: "power2.out"
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const educations = [
    {
      degree: "ADCE - Computer Engineering",
      institution: "IICS, Delhi",
      duration: "2022 – 2025",
      score: "93%",
      icon: <FaGraduationCap />,
    },
    {
      degree: "BCA - Bachelor of Computer Applications",
      institution: "IGNOU, Delhi",
      duration: "2022 – Present",
      score: "Ongoing",
      icon: <FaUniversity />,
    },
    {
      degree: "Class 12 – Commerce with Maths",
      institution: "CBSE",
      duration: "Completed",
      score: "70%",
      icon: <FaSchool />,
    },
  ];

  return (
    <section id="education" ref={sectionRef} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="text-center !mb-20"
        >
          <p
            className="text-primary font-medium tracking-widest uppercase !mb-4"
          >
            Academic Foundation
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold !mb-6"
          >
            Education.
          </h2>
          <div className="w-20 h-1 bg-primary !mx-auto rounded-full"></div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {educations.map((edu, index) => (
            <EducationCard 
              key={`${edu.institution}-${edu.degree}`} 
              education={edu} 
              index={index} 
              cardRef={el => cardsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
