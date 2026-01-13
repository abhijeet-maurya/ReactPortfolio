import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({ experience, index, cardRef }) => (
  <div className={`relative flex items-center justify-between w-full mb-12 flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
    {/* Timeline vertical line placeholder for mobile */}
    <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-primary/20 hidden md:block z-0"></div>
    
    {/* Content Card */}
    <div
      ref={cardRef}
      className="w-full md:w-[45%] glass !p-10 rounded-3xl relative z-10 hover:glass-accent transition-all duration-300 shadow-2xl"
    >
      <div className="flex justify-between items-start !mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white !mb-2">{experience.title}</h3>
          <p className="text-primary font-medium">{experience.company}</p>
        </div>
        <span className="text-xs font-bold text-primary bg-primary/10 !px-4 !py-1.5 rounded-full uppercase tracking-wider">
          {experience.date}
        </span>
      </div>
      
      <ul className="list-disc list-inside !space-y-3 text-secondary-dim !mt-6">
        {experience.points.map((point, i) => (
          <li key={i} className="text-sm leading-relaxed bullet-primary">
            {point}
          </li>
        ))}
      </ul>
      
      <div className="mt-6 flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-secondary-dim">
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Timeline Dot */}
    <div className="hidden md:flex absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-background border-4 border-primary z-20 shadow-[0_0_10px_rgba(0,210,255,0.5)]"></div>
  </div>
);

const Experience = () => {
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

      // Experience Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const xOffset = index % 2 === 0 ? -150 : 150;
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 65%",
              scrub: 1,
            },
            x: xOffset,
            opacity: 0,
            ease: "power2.out"
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Venets Media Pvt. Ltd.",
      date: "Jan – Jun 2025",
      points: [
        "Developed dynamic web applications using React & Node.js",
        "Improved UI/UX responsiveness and performance",
        "Integrated REST APIs with Express & MongoDB",
        "Collaborated with design and product teams to deliver high-quality solutions"
      ],
      tags: ["React", "Node.js", "Express", "MongoDB", "UI/UX"],
    },
    {
      title: "Web Developer Intern",
      company: "JSR Amenities Pvt. Ltd.",
      date: "Nov 2024 – Jan 2025",
      points: [
        "Built and maintained websites using HTML, CSS, PHP",
        "Database integration with MySQL",
        "Performance optimization & SEO improvements",
        "Assisted in technical documentation and bug fixes"
      ],
      tags: ["HTML", "CSS", "PHP", "MySQL", "SEO"],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      {/* Decorative vertical line for the whole section */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headerRef}
          className="text-center !mb-24"
        >
          <p
            className="text-primary font-medium tracking-widest uppercase !mb-4"
          >
            What I've done so far
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold !mb-6"
          >
            Work Experience.
          </h2>
          <div className="w-20 h-1 bg-primary !mx-auto rounded-full"></div>
        </div>

        <div
          className="relative"
        >
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={`${exp.company}-${exp.title}-${index}`} 
              experience={exp} 
              index={index} 
              cardRef={el => cardsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
