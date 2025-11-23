import React from 'react';
import { TemplateProps } from '../../types';
import { IconMail, IconLink, IconPhone, IconMapPin, IconInstagram, IconTwitter, IconDribbble, IconLinkedin, IconGlobe, IconGithub, IconFacebook, IconBriefcase, IconPalette, IconCode } from '../Icons';

const ModernSidebar: React.FC<TemplateProps> = ({ data, scale = 1, theme }) => {

  const getIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('instagram')) return <IconInstagram className="w-4 h-4" />;
    if (lower.includes('twitter')) return <IconTwitter className="w-4 h-4" />;
    if (lower.includes('facebook')) return <IconFacebook className="w-4 h-4" />;
    if (lower.includes('dribbble')) return <IconDribbble className="w-4 h-4" />;
    if (lower.includes('linkedin')) return <IconLinkedin className="w-4 h-4" />;
    if (lower.includes('github')) return <IconGithub className="w-4 h-4" />;
    if (lower.includes('website')) return <IconGlobe className="w-4 h-4" />;
    return <IconLink className="w-4 h-4" />;
  };

  const getFlag = (code: string) => {
    if (!code) return <span className="text-lg">🏳️</span>;
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    const emoji = String.fromCodePoint(...codePoints);
    return <span className="text-lg">{emoji}</span>;
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div
        id="resume-preview"
        className="w-[280mm] min-h-[297mm] bg-white dark:bg-dark-900 text-slate-800 dark:text-text-main relative overflow-hidden shadow-2xl flex origin-top transition-transform duration-300 ease-in-out"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {/* Left Sidebar */}
        <aside className="w-[25%] bg-slate-50 dark:bg-dark-900 flex flex-col pt-16 pb-8 px-8 border-r border-slate-200 dark:border-white/20 relative z-10">

          {/* Avatar */}
          <div className="mb-8 relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-dark-800 shadow-glow mx-auto">
              <img src={data.personal.avatar} alt="Profile" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>

          {/* Name & Role */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight leading-tight">{data.personal.fullName}</h1>
            <p className="text-accent-purple font-medium text-lg tracking-wide">{data.personal.role}</p>
          </div>

          {/* Quote */}
          <div className="mb-12 relative px-2">
            <div className="text-4xl absolute -top-4 -left-2 text-dark-600 font-serif">“</div>
            <p className="text-sm font-medium text-slate-600 dark:text-gray-300 italic relative z-10 leading-relaxed">
              {data.personal.quote}
            </p>
            <div className="text-4xl absolute -bottom-8 right-0 text-dark-600 font-serif">”</div>
            <p className="text-xs text-text-dim mt-3 text-right">— {data.personal.quoteAuthor}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-dark-700 transition-colors">
                <IconMail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Email</p>
                <p className="text-sm font-medium text-slate-700 dark:text-gray-300 break-all">{data.personal.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-dark-700 transition-colors">
                <IconGlobe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Website</p>
                <p className="text-sm font-medium text-slate-700 dark:text-gray-300 break-all">{data.personal.website}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-dark-700 transition-colors">
                <IconPhone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Phone</p>
                <p className="text-sm font-medium text-slate-700 dark:text-gray-300">{data.personal.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-white dark:bg-dark-800 flex items-center justify-center text-text-muted group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-dark-700 transition-colors">
                <IconMapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-text-dim uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-sm font-medium text-slate-700 dark:text-gray-300">{data.personal.location}</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="mb-12">
            <p className="text-xs text-text-dim uppercase tracking-wider mb-6">Socials</p>
            <div className="space-y-5">
              {data.socials.map(social => (
                <div key={social.id} className="flex items-center space-x-4 group">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 p-[1px]">
                    <div className="w-full h-full bg-slate-50 dark:bg-dark-900 rounded-full flex items-center justify-center">
                      {getIcon(social.platform)}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-dim mb-0.5">{social.platform}</p>
                    <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-900 dark:text-white hover:text-accent-purple transition-colors">
                      {social.username}
                    </a>
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
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{lang.language}</p>
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

            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 flex items-center">
              Experience
            </h2>

            <div className="space-y-4">
              {data.experience.map(exp => (
                <div key={exp.id} className="group relative">
                  {/* Timeline Item Dot - Independent of card hover transform */}
                  {/* Size w-3 (12px) matches title dot for alignment. Position -70px (64px padding + 6px offset) aligns center to border */}
                  <div className="absolute -left-[70px] top-[26px] w-3 h-3 rounded-full bg-white dark:bg-dark-900 border-[2px] border-slate-300 dark:border-dark-600 group-hover:border-accent-purple group-hover:bg-accent-purple transition-all duration-300 z-20 hidden md:block"></div>

                  <div className="bg-white dark:bg-dark-800 rounded-lg p-5 transition-all group-hover:bg-slate-50 dark:group-hover:bg-dark-700 group-hover:translate-x-1 duration-300 border border-slate-200 dark:border-transparent dark:group-hover:border-white/5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded bg-slate-100 dark:bg-dark-900 flex items-center justify-center overflow-hidden">
                          {exp.logo ? (
                            <img src={exp.logo} className="w-full h-full object-cover" alt={exp.company} />
                          ) : (
                            <IconBriefcase className="w-5 h-5 text-text-muted" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-slate-900 dark:text-white font-medium text-base">{exp.role}</h3>
                          <p className="text-text-main text-sm">{exp.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {exp.current ? (
                          <span className="inline-flex items-center justify-center px-3 h-[22px] rounded-md bg-accent-purple text-[10px] font-bold text-white uppercase tracking-wider mb-1 leading-none">Present</span>
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
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">Skills</h2>

            <div className="space-y-8">
              {data.skills.map(skillGroup => (
                <div key={skillGroup.id} className="flex items-start gap-6">
                  {/* Left: Category */}
                  <div className="w-24 flex flex-col items-center text-center pt-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${skillGroup.category === 'Design' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {skillGroup.category === 'Design' ? <IconPalette className="w-5 h-5" /> : <IconCode className="w-5 h-5" />}
                    </div>
                    <h3 className="text-gray-300 font-medium text-sm">{skillGroup.category}</h3>
                  </div>

                  {/* Right: Skills Grid */}
                  <div className="flex-1 grid grid-cols-3 gap-3">
                    {skillGroup.skills.map((skill, idx) => (
                      <div
                        key={idx}
                        className={`
                        bg-transparent rounded-lg p-4 flex items-center justify-center text-center min-h-[80px] 
                        border border-white/10 transition-all duration-300
                        ${skillGroup.category === 'Design'
                            ? 'text-purple-300 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                            : 'text-blue-300 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                          }
                      `}
                      >
                        <span className="text-sm font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Education */}
          <section className="mb-14 relative">
            <div className="absolute -left-[70px] top-2.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20 hidden md:block"></div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">Education</h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-5">
              {data.education.map(edu => (
                <div
                  key={edu.id}
                  className="group relative bg-white dark:bg-dark-800/40 backdrop-blur-sm rounded-[18px] p-5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(124,58,237,0.12)] hover:translate-y-[-2px]"
                >
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 rounded-[18px] bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Icon/Logo Container */}
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-dark-900/80 border border-slate-200 dark:border-white/5 flex items-center justify-center overflow-hidden group-hover:border-slate-300 dark:group-hover:border-white/10 transition-colors">
                      {edu.logo ? (
                        <img src={edu.logo} className="w-full h-full object-cover" alt={edu.institution} />
                      ) : (
                        <div className="w-6 h-6 rounded bg-accent-purple/20 flex items-center justify-center">
                          <span className="text-accent-purple text-xs font-bold">{edu.institution.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-1.5 leading-tight break-words">{edu.degree}</h3>
                      <p className="text-xs text-text-main mb-2 leading-relaxed break-words">{edu.institution}</p>
                      <p className="text-[11px] text-text-dim font-medium">{edu.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Latest Projects */}
          <section className="relative">
            <div className="absolute -left-[70px] top-2.5 w-3 h-3 rounded-full bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.5)] z-20 hidden md:block"></div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">Latest projects</h2>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              {data.projects.map(proj => (
                <div key={proj.id} className="group bg-white dark:bg-dark-800 rounded-xl p-4 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-dark-700 transition-all">
                  <div className="h-32 w-full rounded-lg bg-slate-100 dark:bg-dark-900 mb-4 overflow-hidden relative">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-medium mb-1">{proj.title}</h3>
                  <p className="text-xs text-text-muted mb-3 line-clamp-4">{proj.description}</p>
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
    </div>
  );
};

export default ModernSidebar;