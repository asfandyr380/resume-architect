import React from 'react';
import { TemplateProps } from '../../types';
import { IconMail, IconPhone, IconGlobe, IconLink, IconMapPin } from '../Icons';

const Executive: React.FC<TemplateProps> = ({ data, scale = 1, theme }) => {
    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div
                id="resume-preview"
                className="w-[280mm] min-h-[297mm] bg-white dark:bg-dark-900 text-slate-800 dark:text-text-main relative overflow-hidden shadow-2xl origin-top font-sans"
                style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
            >
                {/* Top Header Bar */}
                <div className="bg-slate-900 dark:bg-dark-800 text-white p-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{data.personal.fullName}</h1>
                        <p className="text-xl text-slate-300 uppercase tracking-widest font-light">{data.personal.role}</p>
                    </div>
                    {/* Optional: Add a logo or initials here if desired, otherwise keeping it clean */}
                    <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center font-serif text-2xl font-bold border border-white/20">
                        {data.personal.fullName.charAt(0)}
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="bg-slate-800 dark:bg-dark-700 text-slate-300 py-4 px-12 flex flex-wrap justify-between gap-6 text-sm border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <IconMail className="w-4 h-4 text-slate-400" /> {data.personal.email}
                    </div>
                    <div className="flex items-center gap-2">
                        <IconPhone className="w-4 h-4 text-slate-400" /> {data.personal.phone}
                    </div>
                    <div className="flex items-center gap-2">
                        <IconGlobe className="w-4 h-4 text-slate-400" /> {data.personal.website}
                    </div>
                    <div className="flex items-center gap-2">
                        <IconMapPin className="w-4 h-4 text-slate-400" /> {data.personal.location}
                    </div>
                </div>

                <div className="grid grid-cols-3 h-full min-h-[calc(297mm-150px)]">

                    {/* Left Column (Sidebar-ish) */}
                    <div className="col-span-1 bg-slate-100 dark:bg-dark-900/50 p-10 border-r border-slate-200 dark:border-white/10">

                        {/* Education */}
                        <section className="mb-10">
                            <h3 className="text-lg font-bold uppercase text-slate-800 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-6">Education</h3>
                            <div className="space-y-6">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-slate-900 dark:text-slate-100">{edu.degree}</div>
                                        <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">{edu.institution}</div>
                                        <div className="text-slate-500 dark:text-slate-500 text-xs italic">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="mb-10">
                            <h3 className="text-lg font-bold uppercase text-slate-800 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-6">Expertise</h3>
                            <div className="space-y-6">
                                {data.skills.map(cat => (
                                    <div key={cat.id}>
                                        <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">{cat.category}</h4>
                                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                            {cat.skills.slice(0, 5).map(skill => (
                                                <li key={skill}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Languages */}
                        <section>
                            <h3 className="text-lg font-bold uppercase text-slate-800 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-6">Languages</h3>
                            <ul className="space-y-3">
                                {data.languages.map(lang => (
                                    <li key={lang.id} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-700 dark:text-slate-300 font-medium">{lang.language}</span>
                                        <span className="text-slate-500 text-xs uppercase">{lang.level}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Right Main Column */}
                    <div className="col-span-2 p-10">

                        {/* Summary */}
                        <section className="mb-10">
                            <h3 className="text-lg font-bold uppercase text-slate-800 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-6">Professional Profile</h3>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                                {data.personal.description || data.personal.quote}
                            </p>
                        </section>

                        {/* Experience */}
                        <section className="mb-10">
                            <h3 className="text-lg font-bold uppercase text-slate-800 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-6">Work Experience</h3>
                            <div className="space-y-8">
                                {data.experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                                            <span className="text-sm font-semibold text-slate-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                                        </div>
                                        <div className="text-base text-accent-blue font-medium mb-3">{exp.company} | <span className="text-slate-400 font-normal">{exp.location}</span></div>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h3 className="text-lg font-bold uppercase text-slate-800 dark:text-white border-b-2 border-slate-300 dark:border-slate-600 pb-2 mb-6">Key Projects</h3>
                            <div className="space-y-5">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="border-l-4 border-slate-200 dark:border-slate-700 pl-4">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{proj.description}</p>
                                        {proj.link && (
                                            <a href={proj.link} className="text-xs text-blue-600 hover:underline mt-2 inline-flex items-center gap-1">
                                                <IconLink className="w-3 h-3" /> Project Link
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Executive;
