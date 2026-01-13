import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  FaHtml5, FaCss3Alt, FaJs, FaPhp, FaReact, FaNodeJs, FaLaravel, FaDatabase, FaGitAlt, FaGithub, FaBrain, FaUsers, FaClock, FaComments 
} from 'react-icons/fa';
import { SiTailwindcss, SiBootstrap, SiExpress, SiMysql, SiMongodb, SiThreedotjs, SiFramer, SiGreensock } from 'react-icons/si';

const SkillCard = ({ icon: Icon, name, index, categoryIndex }) => (
  <motion.div
    variants={fadeIn("up", "spring", (categoryIndex * 0.2) + (index * 0.1), 0.75)}
    className="glass !p-4 rounded-2xl flex flex-col items-center justify-center !gap-3 transition-all duration-300 hover:scale-105 hover:glass-accent group aspect-square shadow-lg"
  >
    <div className="text-3xl md:text-4xl text-primary/70 group-hover:text-primary transition-colors duration-300">
      <Icon />
    </div>
    <p className="text-secondary-dim group-hover:text-white font-medium text-[10px] md:text-xs text-center leading-tight break-words max-w-full">
      {name}
    </p>
    <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"></div>
  </motion.div>
);

const Category = ({ title, skills, index: categoryIndex }) => (
  <motion.div
    variants={fadeIn("up", "tween", categoryIndex * 0.1, 1)}
    className="glass !p-6 md:!p-8 rounded-3xl h-full"
  >
    <h3 className="text-lg md:text-xl font-bold text-white border-l-4 border-l-primary !pl-4 !mb-8">
      {title}
    </h3>
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 !gap-4 items-start justify-start">
      {skills.map((skill, i) => (
        <SkillCard key={`${title}-${skill.name}`} {...skill} index={i} categoryIndex={categoryIndex} />
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const categoriesRef = useRef([]);

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

      // Categories Staggered Animation
      categoriesRef.current.forEach((category, index) => {
        if (category) {
          gsap.from(category, {
            scrollTrigger: {
              trigger: category,
              start: "top 95%",
              end: "top 70%",
              scrub: 1,
            },
            y: 50,
            opacity: 0,
            ease: "power2.out"
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "HTML5", icon: FaHtml5 },
        { name: "CSS3", icon: FaCss3Alt },
        { name: "JavaScript", icon: FaJs },
        { name: "PHP", icon: FaPhp },
        { name: "SQL", icon: FaDatabase },
      ],
    },
    {
      title: "Frameworks",
      skills: [
        { name: "React", icon: FaReact },
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express", icon: SiExpress },
        { name: "Laravel", icon: FaLaravel },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Bootstrap", icon: SiBootstrap },
      ],
    },
    {
      title: "Libraries",
      skills: [
        { name: "Three.js", icon: SiThreedotjs },
        { name: "Framer Motion", icon: SiFramer },
        { name: "GSAP", icon: SiGreensock },
      ],
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: SiMysql },
        { name: "MongoDB", icon: SiMongodb },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: FaGitAlt },
        { name: "GitHub", icon: FaGithub },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", icon: FaBrain },
        { name: "Team Collaboration", icon: FaUsers },
        { name: "Time Management", icon: FaClock },
        { name: "Communication", icon: FaComments },
      ],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-black">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="text-center !mb-20"
        >
          <p
            className="text-primary font-medium tracking-widest uppercase !mb-4"
          >
            Capabilities
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold !mb-6"
          >
            Skills & Expertise.
          </h2>
          <div className="w-20 h-1 bg-primary !mx-auto rounded-full"></div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {skillCategories.map((category, index) => (
            <div key={category.title} ref={el => categoriesRef.current[index] = el}>
              <Category {...category} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
