import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index, cardRef }) => (
  <div
    ref={cardRef}
    className="group relative glass rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:glass-accent shadow-2xl shadow-black/50"
  >
    {/* Project Image */}
    <div className="relative h-56 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
      {/* Placeholder for project image */}
      <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-700">
        <span className="text-4xl font-bold opacity-20 uppercase tracking-tighter">Project Preview</span>
      </div>
      
      {/* Quick Links Overlay */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <motion.a
          whileHover={{ scale: 1.1 }}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors"
        >
          <FaExternalLinkAlt />
        </motion.a>
      </div>
    </div>

    {/* Project Content */}
    <div className="!p-8 flex flex-col flex-1">
      <h3 className="text-2xl font-bold text-white !mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
      <p className="text-secondary-dim text-sm leading-relaxed !mb-8 flex-1">
        {project.description}
      </p>
      
      <div className="flex flex-wrap !gap-3 !mt-auto">
        {project.tags.map((tag) => (
          <span key={tag.name} className={`text-[10px] !px-4 !py-1.5 rounded-full font-bold uppercase tracking-wider ${tag.color}`}>
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
    
    {/* Card Bottom Glow */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
);

const Projects = () => {
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

      // Project Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 65%",
              scrub: 1,
            },
            y: 100,
            opacity: 0,
            ease: "power2.out"
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, high-performance professional portfolio built with React, Framer Motion, and GSAP. Features smooth animations, 3D elements, and fully responsive design to showcase developer expertise and projects with a premium aesthetic.",
      tags: [
        { name: "React", color: "text-blue-400 bg-blue-400/10" },
        { name: "Tailwind", color: "text-cyan-400 bg-cyan-400/10" },
        { name: "Framer Motion", color: "text-purple-400 bg-purple-400/10" },
      ],
      github: "https://github.com/abhijeet-maurya",
      link: "#",
    },
    {
      title: "Android Phone Prototype",
      description: "A web-based simulation of an Android UI built with raw HTML, CSS, and JS. Focuses on heavy DOM manipulation, complex event handling, and recreating authentic mobile interactions like app drawers, notifications, and settings panels.",
      tags: [
        { name: "JavaScript", color: "text-yellow-400 bg-yellow-400/10" },
        { name: "CSS3", color: "text-blue-500 bg-blue-500/10" },
        { name: "DOM", color: "text-green-400 bg-green-400/10" },
      ],
      github: "https://github.com/abhijeet-maurya",
      link: "#",
    },
    {
      title: "3D Animated Homepage",
      description: "An immersive 3D experience using React Three Fiber and Three.js. Showcases interactive 3D models with physics-based animations, smooth camera transitions, and optimized performance across multiple devices and viewports.",
      tags: [
        { name: "Three.js", color: "text-white bg-white/10" },
        { name: "R3F", color: "text-red-400 bg-red-400/10" },
        { name: "GLSL", color: "text-orange-400 bg-orange-400/10" },
      ],
      github: "https://github.com/abhijeet-maurya",
      link: "#",
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="text-center !mb-20"
        >
          <p
            className="text-primary font-medium tracking-widest uppercase !mb-4"
          >
            My work
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold !mb-6"
          >
            Projects Showcase.
          </h2>
          <div className="w-20 h-1 bg-primary !mx-auto rounded-full"></div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              cardRef={el => cardsRef.current[index] = el}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
