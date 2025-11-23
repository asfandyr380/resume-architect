import React from 'react';
import { TemplateProps } from '../../types';
import { IconMail, IconLink, IconPhone, IconMapPin, IconInstagram, IconTwitter, IconDribbble, IconLinkedin, IconGlobe, IconGithub, IconFacebook, IconBriefcase, IconPalette, IconCode } from '../Icons';

const ClassicVertical: React.FC<TemplateProps> = ({ data, scale = 1, theme }) => {

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
        className="w-[280mm] min-h-[297mm] bg-white dark:bg-dark-900 text-slate-800 dark:text-text-main relative overflow-hidden shadow-2xl flex flex-col p-16 origin-top transition-transform duration-300 ease-in-out"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-12 border-b border-slate-200 dark:border-white/10 pb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-dark-800 shadow-glow mb-6">
            <img src={data.personal.avatar} alt="Profile" crossOrigin="anonymous" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{data.personal.fullName}</h1>
          <p className="text-accent-purple font-medium text-xl tracking-wide mb-6">{data.personal.role}</p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-text-muted mb-8">
            {data.personal.email && (
              <div className="flex items-center gap-2">
                <IconMail className="w-4 h-4" />
                <span>{data.personal.email}</span>
              </div>
            )}
            {data.personal.phone && (
              <div className="flex items-center gap-2">
                <IconPhone className="w-4 h-4" />
                <span>{data.personal.phone}</span>
              </div>
            )}
            {data.personal.location && (
              <div className="flex items-center gap-2">
                <IconMapPin className="w-4 h-4" />
                <span>{data.personal.location}</span>
              </div>
            )}
            {data.personal.website && (
              <div className="flex items-center gap-2">
                <IconGlobe className="w-4 h-4" />
                <span>{data.personal.website}</span>
              </div>
            )}
          </div>

          <div className="max-w-2xl relative">
            <span className="text-4xl text-slate-300 dark:text-dark-700 absolute -top-4 -left-6 font-serif">“</span>
            <p className="text-slate-600 dark:text-gray-300 italic leading-relaxed">{data.personal.quote}</p>
            <span className="text-4xl text-slate-300 dark:text-dark-700 absolute -bottom-4 -right-6 font-serif">”</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12">

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-accent-purple rounded-full"></span>
              Experience
            </h2>
            <div className="space-y-8 pl-4 border-l-2 border-slate-200 dark:border-dark-700 ml-3">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-8">
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white dark:bg-dark-900 border-4 border-accent-purple"></div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <span className="text-sm font-medium text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-slate-600 dark:text-text-muted font-medium mb-3 flex items-center gap-2">
                    {exp.company} • {exp.location}
                  </div>
                  <p className="text-slate-600 dark:text-text-dim leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Skills Grid */}
          <div className="grid grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-accent-purple rounded-full"></span>
                Education
              </h2>
              <div className="space-y-6">
                {data.education.map(edu => (
                  <div key={edu.id} className="bg-slate-50 dark:bg-dark-800 p-6 rounded-xl border border-slate-200 dark:border-white/5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</h3>
                    <p className="text-accent-purple font-medium mb-2">{edu.institution}</p>
                    <p className="text-sm text-slate-500 dark:text-text-dim">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-accent-purple rounded-full"></span>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.flatMap(g => g.skills).map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-accent-purple rounded-full"></span>
              Projects
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {data.projects.map(proj => (
                <div key={proj.id} className="group bg-slate-50 dark:bg-dark-800 rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 hover:shadow-lg transition-all">
                  <div className="h-32 overflow-hidden">
                    <img src={proj.image} alt={proj.title} crossOrigin="anonymous" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-text-muted line-clamp-3 mb-3">{proj.description}</p>
                    <a href={proj.link} className="text-xs font-bold text-accent-purple hover:underline">View Project →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ClassicVertical;