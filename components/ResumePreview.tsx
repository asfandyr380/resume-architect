import React from 'react';
import { ResumeData } from '../types';
import { IconMail, IconLink, IconPhone, IconMapPin, IconInstagram, IconTwitter, IconDribbble, IconLinkedin } from './Icons';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, scale = 1 }) => {
  
  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('instagram')) return <IconInstagram className="w-4 h-4" />;
    if (lower.includes('twitter')) return <IconTwitter className="w-4 h-4" />;
    if (lower.includes('dribbble')) return <IconDribbble className="w-4 h-4" />;
    if (lower.includes('linkedin')) return <IconLinkedin className="w-4 h-4" />;
    return <div className="w-4 h-4 bg-gray-500 rounded-full" />;
  };

  const getFlag = (code: string) => {
    const colors: Record<string, string> = {
      'IT': 'bg-green-500',
      'GR': 'bg-blue-400',
      'GB': 'bg-red-500',
      'ES': 'bg-yellow-500'
    };
    return <div className={`w-6 h-4 rounded-sm ${colors[code] || 'bg-gray-400'}`}></div>
  }

  return (
    <div 
      id="resume-preview"
      className="w-[210mm] min-h-[297mm] bg-dark-900 text-text-main relative overflow-hidden shadow-2xl flex origin-top"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* Left Sidebar */}
      <aside className="w-[32%] bg-dark-900 flex flex-col pt-16 pb-8 px-8 border-r border-white/20 relative z-10">
        
        {/* Avatar */}
        <div className="mb-8 relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-dark-800 shadow-glow mx-auto">
            <img src={data.personal.avatar} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Name & Role */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight leading-tight">{data.personal.fullName}</h1>
          <p className="text-accent-purple font-medium text-lg tracking-wide">{data.personal.role}</p>
        </div>

        {/* Quote */}
        <div className="mb-12 relative px-2">
          <div className="text-4xl absolute -top-4 -left-2 text-dark-600 font-serif">“</div>
          <p className="text-sm font-medium text-gray-300 italic relative z-10 leading-relaxed">
            {data.personal.quote}
          </p>
          <div className="text-4xl absolute -bottom-8 right-0 text-dark-600 font-serif">”</div>
          <p className="text-xs text-text-dim mt-3 text-right">— {data.personal.quoteAuthor}</p>
        </div>

        {/* Contact Info */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-dark-700 transition-colors">
              <IconMail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Email</p>
              <p className="text-sm font-medium text-gray-300 break-all">{data.personal.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-dark-700 transition-colors">
              <IconLink className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Website</p>
              <p className="text-sm font-medium text-gray-300">{data.personal.website}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-dark-700 transition-colors">
              <IconPhone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Phone</p>
              <p className="text-sm font-medium text-gray-300">{data.personal.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 group">
            <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-dark-700 transition-colors">
              <IconMapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Address</p>
              <p className="text-sm font-medium text-gray-300">{data.personal.location}</p>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="mb-12">
            <p className="text-xs text-text-dim uppercase tracking-wider mb-6">Socials</p>
            <div className="space-y-5">
                {data.socials.map(social => (
                    <div key={social.id} className="flex items-center space-x-4 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 p-[1px]">
                           <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center">
                              {getIcon(social.platform)}
                           </div>
                        </div>
                        <div>
                             <p className="text-xs text-text-dim mb-0.5">{social.platform}</p>
                             <p className="text-sm font-medium text-white">{social.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Languages */}
        <div>
            <p className="text-xs text-text-dim uppercase tracking-wider mb-6">Languages</p>
            <div className="space-y-6">
                {data.languages.map(lang => (
                    <div key={lang.id} className="flex items-center space-x-4">
                        {getFlag(lang.flag)}
                        <div>
                            <p className="text-sm font-bold text-white">{lang.language}</p>
                            <p className="text-xs text-text-muted">{lang.level}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-16 pt-16 relative">
        
        {/* Section: Experience */}
        <section className="mb-14 relative">
          {/* Section Title Timeline Dot - Perfectly centered on border */}
          <div className="absolute -left-[70px] top-2.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20 hidden md:block"></div>
          
          <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
            Experience
          </h2>

          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id} className="group relative">
                {/* Timeline Item Dot - Independent of card hover transform */}
                {/* Size w-3 (12px) matches title dot for alignment. Position -70px (64px padding + 6px offset) aligns center to border */}
                <div className="absolute -left-[70px] top-[26px] w-3 h-3 rounded-full bg-dark-900 border-[2px] border-dark-600 group-hover:border-accent-purple group-hover:bg-accent-purple transition-all duration-300 z-20 hidden md:block"></div>
                
                <div className="bg-dark-800 rounded-lg p-5 transition-all group-hover:bg-dark-700 group-hover:translate-x-1 duration-300 border border-transparent group-hover:border-white/5">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded bg-dark-900 flex items-center justify-center overflow-hidden">
                             {exp.logo && <img src={exp.logo} className="w-full h-full object-cover" alt={exp.company} />}
                          </div>
                          <div>
                            <h3 className="text-white font-medium text-base">{exp.role}</h3>
                            <p className="text-text-main text-sm">{exp.company}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          {exp.current ? (
                              <span className="inline-block px-3 py-1 rounded-md bg-accent-purple text-[10px] font-bold text-white uppercase tracking-wider mb-1">Present</span>
                          ) : (
                            <p className="text-xs text-text-dim font-medium">{exp.endDate}</p>
                          )}
                          <p className="text-xs text-text-dim">{exp.location}</p>
                       </div>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed mt-3 pl-14">
                      {exp.description}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Skills */}
        <section className="mb-14 relative">
           <div className="absolute -left-[70px] top-2.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20 hidden md:block"></div>
           <h2 className="text-2xl font-semibold text-white mb-8">Skills</h2>
           
           <div className="grid grid-cols-2 gap-6">
              {data.skills.map(skillGroup => (
                  <div key={skillGroup.id} className="bg-dark-800 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center space-x-3 mb-5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${skillGroup.category === 'Design' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                              <div className="w-3 h-3 rounded-full bg-current"></div>
                          </div>
                          <h3 className="text-white font-medium">{skillGroup.category}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                          {skillGroup.skills.map((skill, idx) => (
                              <span key={idx} className="text-xs text-gray-300 bg-dark-900 px-3 py-1.5 rounded border border-white/5">
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </div>
              ))}
           </div>
        </section>

        {/* Section: Education */}
        <section className="mb-14 relative">
            <div className="absolute -left-[70px] top-2.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20 hidden md:block"></div>
            <h2 className="text-2xl font-semibold text-white mb-8">Education</h2>
            
            <div className="grid grid-cols-3 gap-4">
                {data.education.map(edu => (
                    <div key={edu.id} className="bg-dark-800 p-5 rounded-lg border border-white/5 hover:border-accent-purple/30 transition-colors">
                        <div className="w-10 h-10 rounded bg-dark-900 mb-4 flex items-center justify-center overflow-hidden">
                            {edu.logo && <img src={edu.logo} className="w-full h-full object-cover" alt="Uni" />}
                        </div>
                        <h3 className="text-white font-medium text-sm mb-1">{edu.degree}</h3>
                        <p className="text-xs text-text-muted mb-3">{edu.institution}</p>
                        <p className="text-[10px] text-text-dim uppercase tracking-wider">{edu.year}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Section: Latest Projects */}
        <section className="relative">
            <div className="absolute -left-[70px] top-2.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20 hidden md:block"></div>
            <h2 className="text-2xl font-semibold text-white mb-8">Latest projects</h2>

            <div className="grid grid-cols-2 gap-6">
                {data.projects.map(proj => (
                    <div key={proj.id} className="group bg-dark-800 rounded-xl p-4 border border-white/5 hover:bg-dark-700 transition-all">
                         <div className="h-32 w-full rounded-lg bg-dark-900 mb-4 overflow-hidden relative">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                         </div>
                         <h3 className="text-white font-medium mb-1">{proj.title}</h3>
                         <p className="text-xs text-text-muted mb-3 line-clamp-2">{proj.description}</p>
                         <a href={proj.link} className="flex items-center text-xs text-accent-blue hover:text-blue-300">
                             <IconLink className="w-3 h-3 mr-1" />
                             {proj.link?.replace('https://', '')}
                         </a>
                    </div>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
};

export default ResumePreview;