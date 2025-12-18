import React from 'react';
import { TemplateProps } from '../../types';
import { IconMail, IconPhone, IconMapPin, IconGlobe, IconLink, IconInstagram, IconTwitter, IconDribbble, IconLinkedin, IconGithub, IconFacebook } from '../Icons';

const Minimalist: React.FC<TemplateProps> = ({ data, scale = 1, theme }) => {
    const getIcon = (name: string) => {
        const lower = name.toLowerCase();
        const props = { className: "w-3.5 h-3.5" };
        if (lower.includes('instagram')) return <IconInstagram {...props} />;
        if (lower.includes('twitter')) return <IconTwitter {...props} />;
        if (lower.includes('facebook')) return <IconFacebook {...props} />;
        if (lower.includes('dribbble')) return <IconDribbble {...props} />;
        if (lower.includes('linkedin')) return <IconLinkedin {...props} />;
        if (lower.includes('github')) return <IconGithub {...props} />;
        if (lower.includes('website')) return <IconGlobe {...props} />;
        return <IconLink {...props} />;
    };

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div
                id="resume-preview"
                className="w-[280mm] min-h-[297mm] bg-white dark:bg-dark-900 text-slate-800 dark:text-text-main relative overflow-hidden shadow-2xl origin-top"
                style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
            >
                <div className="p-16 max-w-4xl mx-auto h-full flex flex-col font-serif">

                    {/* Header */}
                    <header className="mb-12 text-center border-b border-gray-200 dark:border-gray-700 pb-12">
                        <h1 className="text-4xl font-normal tracking-wide text-gray-900 dark:text-white mb-3 uppercase">{data.personal.fullName}</h1>
                        <p className="text-sm font-medium tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase mb-8">{data.personal.role}</p>

                        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 dark:text-gray-400 font-sans tracking-wide">
                            {data.personal.email && (
                                <div className="flex items-center gap-2">
                                    <IconMail className="w-3 h-3 opacity-60" />
                                    <span>{data.personal.email}</span>
                                </div>
                            )}
                            {data.personal.phone && (
                                <div className="flex items-center gap-2">
                                    <IconPhone className="w-3 h-3 opacity-60" />
                                    <span>{data.personal.phone}</span>
                                </div>
                            )}
                            {data.personal.location && (
                                <div className="flex items-center gap-2">
                                    <IconMapPin className="w-3 h-3 opacity-60" />
                                    <span>{data.personal.location}</span>
                                </div>
                            )}
                            {data.personal.website && (
                                <div className="flex items-center gap-2">
                                    <IconGlobe className="w-3 h-3 opacity-60" />
                                    <span>{data.personal.website}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-12 flex-1">
                        {/* Main Content */}
                        <div className="col-span-8 flex flex-col gap-12">

                            {/* Profile / About */}
                            <section>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-sans text-sm">{data.personal.quote}</p>
                            </section>

                            {/* Experience */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Experience</h3>
                                <div className="space-y-8">
                                    {data.experience.map(exp => (
                                        <div key={exp.id} className="relative pl-6 border-l border-gray-200 dark:border-gray-700">
                                            <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="text-gray-900 dark:text-white font-medium">{exp.role}</h4>
                                                <span className="text-xs text-gray-400 font-sans tabular-nums">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">{exp.company}</div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-sans">{exp.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Projects</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {data.projects.map(proj => (
                                        <div key={proj.id} className="group">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="text-gray-900 dark:text-white font-medium">{proj.title}</h4>
                                                {proj.link && (
                                                    <a href={proj.link} className="text-xs text-blue-500 hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        View <IconLink className="w-2.5 h-2.5" />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">{proj.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Right Column */}
                        <div className="col-span-4 flex flex-col gap-10 font-sans">

                            {/* Education */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Education</h3>
                                <div className="space-y-6">
                                    {data.education.map(edu => (
                                        <div key={edu.id}>
                                            <h4 className="text-gray-900 dark:text-white text-sm font-medium">{edu.degree}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{edu.institution}</p>
                                            <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Skills */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Skills</h3>
                                <div className="space-y-6">
                                    {data.skills.map(cat => (
                                        <div key={cat.id}>
                                            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">{cat.category}</h4>
                                            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                {cat.skills.map(skill => (
                                                    <span key={skill} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Socials */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Connect</h3>
                                <div className="space-y-3">
                                    {data.socials.map(social => (
                                        <a key={social.id} href={social.url} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                            <span className="w-5 flex justify-center">{getIcon(social.platform)}</span>
                                            <span>{social.platform}</span>
                                        </a>
                                    ))}
                                </div>
                            </section>

                            {/* Languages */}
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Languages</h3>
                                <div className="space-y-2">
                                    {data.languages.map(lang => (
                                        <div key={lang.id} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-700 dark:text-gray-300">{lang.language}</span>
                                            <span className="text-xs text-gray-400">{lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Minimalist;
