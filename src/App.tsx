/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  User, 
  Briefcase, 
  Send, 
  ChevronRight,
  Menu,
  X,
  Terminal,
  Database,
  Layout,
  Smartphone,
  Globe,
  Cpu
} from 'lucide-react';
import { submitContactForm } from './lib/firebase';

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  color: string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
}

// Data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoTrack Dashboard",
    description: "A real-time environmental monitoring dashboard using IoT sensors and data visualization.",
    tags: ["React", "D3.js", "Firebase"],
    link: "#",
    color: "bg-emerald-500"
  },
  {
    id: 2,
    title: "Pulse Social App",
    description: "A community-focused social platform featuring live chat, profile customization, and fast content delivery.",
    tags: ["Next.js", "Tailwind", "Socket.io"],
    link: "#",
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "Zenith Commerce",
    description: "A minimalist head-less e-commerce platform with stripe integration and dynamic inventory management.",
    tags: ["TypeScript", "Node.js", "Stripe"],
    link: "#",
    color: "bg-purple-500"
  }
];

const SKILLS: Skill[] = [
  { name: "Frontend Development", icon: <Layout className="w-5 h-5" />, level: 90 },
  { name: "Backend Architecture", icon: <Database className="w-5 h-5" />, level: 85 },
  { name: "Mobile Strategy", icon: <Smartphone className="w-5 h-5" />, level: 75 },
  { name: "Cloud Systems", icon: <Globe className="w-5 h-5" />, level: 80 },
  { name: "System Design", icon: <Cpu className="w-5 h-5" />, level: 85 },
  { name: "DevOps & CI/CD", icon: <Terminal className="w-5 h-5" />, level: 70 },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      await submitContactForm(formData.name, formData.email, formData.message);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all group-hover:w-full" />
    </a>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter"
          >
            STUDENT<span className="text-slate-400">.PRO</span>
          </motion.div>

          <div className="hidden md:flex space-x-8">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#skills">Skills</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-slate-100 text-slate-500 rounded-full">
              Available for Internships
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
              Building digital <br />
              <span className="text-slate-400">experiences</span> that <br />
              matter to people.
            </h1>
            <p className="max-w-2xl text-xl text-slate-500 mb-10 leading-relaxed font-light">
              I'm a passionate student developer focused on creating clean, 
              efficient, and user-centric solutions. Currently exploring the 
              intersection of elegant UI and robust backend systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all flex items-center gap-2 group shadow-lg shadow-slate-200"
              >
                View Projects 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-6 ml-4">
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-slate-200 rounded-3xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent group-hover:opacity-0 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              <User className="w-32 h-32 opacity-20" />
            </div>
            {/* Visual element */}
            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <p className="text-white text-sm font-medium">"Innovation starts with a single line of code."</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <User className="text-slate-400" /> About Me
            </h2>
            <div className="space-y-6 text-slate-500 leading-relaxed text-lg">
              <p>
                I am a final-year CS student with a deep interest in software engineering.
                My journey began with a simple "Hello World", and since then, I've been 
                constantly pushing my boundaries to learn new technologies and methodologies.
              </p>
              <p>
                I believe that good software isn't just about code—it's about solving real problems 
                and providing value to users. Whether I'm designing a database schema or polishing 
                a CSS transition, I bring a detail-oriented approach to everything I do.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="text-slate-900 font-bold text-2xl">3+</h4>
                  <p className="text-sm">Major Projects</p>
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-2xl">A+</h4>
                  <p className="text-sm">Academic Performance</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Technical Arsenal</h2>
            <p className="text-slate-400 max-w-xl mx-auto">A collection of tools and frameworks I've mastered during my academic and personal projects.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  {skill.icon}
                </div>
                <h3 className="font-bold mb-4 text-xl">{skill.name}</h3>
                <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-slate-900 h-full" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-5xl font-bold mb-4 leading-tight">Selected <br />Works</h2>
              <p className="text-slate-400 max-w-md">Highlighting some of my most challenging and rewarding development journeys.</p>
            </div>
            <a href="#" className="px-8 py-4 border border-slate-700 rounded-full hover:bg-slate-800 transition-all flex items-center gap-2 group">
              View Github <Github className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col h-full rounded-[40px] overflow-hidden bg-slate-800/50 border border-slate-700 hover:border-slate-500 transition-all group"
              >
                <div className={`h-64 ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                    <Code className="w-48 h-48" />
                  </div>
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-slate-400 mb-8 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  <a href={project.link} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-slate-400 transition-colors">
                    Case Study <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 overflow-hidden relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-5xl font-bold mb-4 tracking-tight">Let's connect</h2>
            <p className="text-slate-500 text-lg">Have a project idea or just want to chat? Drop me a message below.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 rounded-[48px] bg-slate-50 border border-slate-100 relative z-10"
          >
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all text-slate-900" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all text-slate-900" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all text-slate-900"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className={`w-full py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  formStatus === 'idle' ? 'bg-slate-900 text-white hover:bg-slate-800' :
                  formStatus === 'submitting' ? 'bg-slate-400 text-white cursor-not-allowed' :
                  formStatus === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {formStatus === 'idle' && <><Send className="w-5 h-5" /> Send Message</>}
                {formStatus === 'submitting' && <>Sending...</>}
                {formStatus === 'success' && <>Message Sent Successfully!</>}
                {formStatus === 'error' && <>Something went wrong, please try again.</>}
              </button>
            </form>
          </motion.div>
        </div>
        
        {/* Background purely decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] select-none pointer-events-none overflow-hidden">
          <div className="text-[400px] font-bold leading-none tracking-tighter whitespace-nowrap rotate-12">
            REACH OUT REACH OUT REACH OUT
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-400 text-sm">
            © 2026 Student Portfolio Pro. Built with Passion & Caffeine.
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
