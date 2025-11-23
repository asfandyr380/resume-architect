import React, { useState } from 'react';
import { ResumeData, ExperienceItem, TemplateId } from '../types';
import { IconSparkles, IconPlus, IconTrash, IconInstagram, IconTwitter, IconDribbble, IconLinkedin, IconGithub, IconGlobe, IconFacebook } from './Icons';
import { enhanceText, generateBulletPoint } from '../services/gemini';
import { LANGUAGES_LIST, LANGUAGE_LEVELS, SKILL_CATEGORIES } from '../constants';
import TemplateSelector from './TemplateSelector';
import { trackEditorTabChange, trackAIUsage } from '../services/analytics';

interface EditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

const SOCIAL_PLATFORMS = [
  { id: 'Instagram', icon: IconInstagram },
  { id: 'Twitter', icon: IconTwitter },
  { id: 'Facebook', icon: IconFacebook },
  { id: 'LinkedIn', icon: IconLinkedin },
  { id: 'Dribbble', icon: IconDribbble },
  { id: 'GitHub', icon: IconGithub },
  { id: 'Website', icon: IconGlobe },
];

const Editor: React.FC<EditorProps> = ({ data, onChange, selectedTemplate, onSelectTemplate }) => {
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [loadingAI, setLoadingAI] = useState<string | null>(null);

  const updatePersonal = (field: string, value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        {
          id: Date.now().toString(),
          role: 'New Role',
          company: 'Company Name',
          location: 'Location',
          startDate: '2024',
          endDate: 'Present',
          current: true,
          description: 'Description of your role...'
        },
        ...data.experience
      ]
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(item => item.id !== id)
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    let newData = { ...data };
    if (field === 'language') {
      const selectedLang = LANGUAGES_LIST.find(l => l.name === value);
      newData.languages = data.languages.map(l => l.id === id ? { ...l, language: value, flag: selectedLang?.code || '' } : l);
    } else {
      newData.languages = data.languages.map(l => l.id === id ? { ...l, [field]: value } : l);
    }
    onChange(newData);
  };

  const addLanguage = () => {
    onChange({
      ...data,
      languages: [
        ...data.languages,
        {
          id: Date.now().toString(),
          language: 'English',
          level: 'Native',
          flag: 'GB'
        }
      ]
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(l => l.id !== id)
    });
  };

  const addSkillGroup = () => {
    onChange({
      ...data,
      skills: [
        ...data.skills,
        {
          id: Date.now().toString(),
          category: 'Design',
          skills: ['New Skill']
        }
      ]
    });
  };

  const removeSkillGroup = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(s => s.id !== id)
    });
  };

  const updateSkillGroup = (id: string, category: string) => {
    onChange({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, category } : s)
    });
  };

  const addSkillToGroup = (groupId: string, skill: string) => {
    if (!skill.trim()) return;
    onChange({
      ...data,
      skills: data.skills.map(s => {
        if (s.id === groupId) {
          return { ...s, skills: [...s.skills, skill] };
        }
        return s;
      })
    });
  };

  const removeSkillFromGroup = (groupId: string, skillToRemove: string) => {
    onChange({
      ...data,
      skills: data.skills.map(s => {
        if (s.id === groupId) {
          return { ...s, skills: s.skills.filter(skill => skill !== skillToRemove) };
        }
        return s;
      })
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          degree: 'Degree Name',
          institution: 'Institution Name',
          year: '2024',
          logo: ''
        }
      ]
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(item => item.id !== id)
    });
  };

  const updateProject = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          title: 'New Project',
          description: 'Project description...',
          link: 'https://github.com/username/project',
          image: 'https://via.placeholder.com/300'
        }
      ]
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(item => item.id !== id)
    });
  };

  const handleAIEnhance = async (text: string, field: string, context: string) => {
    if (!text) return;
    setLoadingAI(field);
    const enhanced = await enhanceText(text, context);
    if (field === 'quote') updatePersonal('quote', enhanced);
    trackAIUsage('enhance', context);
    setLoadingAI(null);
  };

  const handleAIBullet = async (id: string, role: string, company: string) => {
    setLoadingAI(`exp-${id}`);
    const bullet = await generateBulletPoint(role, company);
    updateExperience(id, 'description', bullet);
    trackAIUsage('bullet', `${role} at ${company}`);
    setLoadingAI(null);
  }

  // Wrapper function for tab changes with analytics
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    trackEditorTabChange(tabId);
  };

  const tabs = [
    { id: 'templates', label: 'Templates' },
    { id: 'personal', label: 'Personal' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'socials', label: 'Socials' },
    { id: 'languages', label: 'Languages' },
  ];

  const updateSocial = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      socials: data.socials.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const addSocial = () => {
    onChange({
      ...data,
      socials: [
        ...data.socials,
        {
          id: Date.now().toString(),
          platform: 'Instagram',
          username: '@username',
          url: 'https://'
        }
      ]
    });
  };

  const removeSocial = (id: string) => {
    onChange({
      ...data,
      socials: data.socials.filter(s => s.id !== id)
    });
  };

  const getPlatformIcon = (platformName: string) => {
    const platform = SOCIAL_PLATFORMS.find(p => p.id.toLowerCase() === platformName.toLowerCase());
    const Icon = platform ? platform.icon : IconGlobe;
    return <Icon className="w-4 h-4 text-text-muted" />;
  };

  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '🏳️';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-dark-800">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-white/5 px-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab.id
              ? 'text-accent-purple border-accent-purple'
              : 'text-text-muted border-transparent hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

        {activeTab === 'templates' && (
          <div className="animate-fadeIn">
            <h3 className="text-white font-medium mb-4">Choose Template</h3>
            <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={onSelectTemplate} />
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-white font-medium mb-4">Personal Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" value={data.personal.fullName} onChange={v => updatePersonal('fullName', v)} />
              <Input label="Current Role" value={data.personal.role} onChange={v => updatePersonal('role', v)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Email" value={data.personal.email} onChange={v => updatePersonal('email', v)} />
              <Input label="Phone" value={data.personal.phone} onChange={v => updatePersonal('phone', v)} />
            </div>

            <Input label="Location" value={data.personal.location} onChange={v => updatePersonal('location', v)} />
            <Input label="Website" value={data.personal.website} onChange={v => updatePersonal('website', v)} />

            <div className="relative">
              <Input
                label="Profile Quote"
                value={data.personal.quote}
                onChange={v => updatePersonal('quote', v)}
                multiline
              />
              <button
                onClick={() => handleAIEnhance(data.personal.quote, 'quote', 'personal quote')}
                className="absolute right-2 top-8 p-1.5 bg-accent-purple/20 hover:bg-accent-purple text-accent-purple hover:text-white rounded transition-all"
                title="Enhance with AI"
              >
                {loadingAI === 'quote' ? <span className="animate-spin block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <IconSparkles className="w-4 h-4" />}
              </button>
            </div>
            <Input label="Quote Author" value={data.personal.quoteAuthor} onChange={v => updatePersonal('quoteAuthor', v)} />
            <div className="space-y-2">
              <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5">Avatar Image</label>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded text-white flex items-center gap-2 transition-colors border border-white/5 w-full justify-center">
                  <IconPlus className="w-3 h-3" /> Upload Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          updatePersonal('avatar', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Work History</h3>
              <button
                onClick={addExperience}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1"
              >
                <IconPlus className="w-3 h-3" /> Add
              </button>
            </div>

            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Role" value={exp.role} onChange={v => updateExperience(exp.id, 'role', v)} />
                  <Input label="Company" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Location" value={exp.location} onChange={v => updateExperience(exp.id, 'location', v)} />
                  <div className="space-y-2">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5">Company Logo</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded text-white flex items-center gap-2 transition-colors border border-white/5 w-full justify-center">
                        <IconPlus className="w-3 h-3" /> Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateExperience(exp.id, 'logo', reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Start Date" value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} />
                  <div className="flex items-end gap-2">
                    <Input label="End Date" value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} disabled={exp.current} />
                    <label className="flex items-center mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                        className="mr-2 accent-accent-purple"
                      />
                      <span className="text-xs text-text-muted">Current</span>
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    label="Description"
                    value={exp.description}
                    onChange={v => updateExperience(exp.id, 'description', v)}
                    multiline
                  />
                  <button
                    onClick={() => handleAIBullet(exp.id, exp.role, exp.company)}
                    className="absolute right-2 top-8 p-1.5 bg-accent-purple/20 hover:bg-accent-purple text-accent-purple hover:text-white rounded transition-all"
                    title="Generate AI Bullet Point"
                  >
                    {loadingAI === `exp-${exp.id}` ? <span className="animate-spin block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <IconSparkles className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'socials' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Social Profiles</h3>
              <button
                onClick={addSocial}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1"
              >
                <IconPlus className="w-3 h-3" /> Add
              </button>
            </div>

            {data.socials.map((social) => (
              <div key={social.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                <button
                  onClick={() => removeSocial(social.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="w-full">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      Platform
                      {getPlatformIcon(social.platform)}
                    </label>
                    <select
                      value={social.platform}
                      onChange={e => updateSocial(social.id, 'platform', e.target.value)}
                      className="w-full bg-dark-700 border border-white/5 rounded p-2.5 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all appearance-none"
                    >
                      {SOCIAL_PLATFORMS.map(p => (
                        <option key={p.id} value={p.id}>{p.id}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <Input label="Username" value={social.username} onChange={v => updateSocial(social.id, 'username', v)} />
                </div>
                <Input label="URL" value={social.url} onChange={v => updateSocial(social.id, 'url', v)} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Languages</h3>
              <button
                onClick={addLanguage}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1"
              >
                <IconPlus className="w-3 h-3" /> Add
              </button>
            </div>

            {data.languages.map((lang) => (
              <div key={lang.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-full">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      Language
                      <span className="text-base">{getFlagEmoji(lang.flag)}</span>
                    </label>
                    <select
                      value={lang.language}
                      onChange={e => updateLanguage(lang.id, 'language', e.target.value)}
                      className="w-full bg-dark-700 border border-white/5 rounded p-2.5 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all appearance-none"
                    >
                      {LANGUAGES_LIST.map(l => (
                        <option key={l.code} value={l.name}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5 flex items-center h-6">
                      Proficiency
                    </label>
                    <select
                      value={lang.level}
                      onChange={e => updateLanguage(lang.id, 'level', e.target.value)}
                      className="w-full bg-dark-700 border border-white/5 rounded p-2.5 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all appearance-none"
                    >
                      {LANGUAGE_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Skills</h3>
              <button
                onClick={addSkillGroup}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1"
              >
                <IconPlus className="w-3 h-3" /> Add Category
              </button>
            </div>

            {data.skills.map((group) => {
              const categoryData = SKILL_CATEGORIES.find(c => c.name === group.category) || SKILL_CATEGORIES[0];
              return (
                <div key={group.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                  <button
                    onClick={() => removeSkillGroup(group.id)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconTrash className="w-4 h-4" />
                  </button>

                  <div className="mb-4">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5">Category</label>
                    <select
                      value={group.category}
                      onChange={e => updateSkillGroup(group.id, e.target.value)}
                      className="w-full bg-dark-700 border border-white/5 rounded p-2.5 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all appearance-none"
                    >
                      {SKILL_CATEGORIES.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-2">Skills List</label>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-dark-700 border border-white/5 text-xs text-gray-300">
                          {skill}
                          <button
                            onClick={() => removeSkillFromGroup(group.id, skill)}
                            className="hover:text-red-400 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a skill..."
                        className="flex-1 bg-dark-700 border border-white/5 rounded p-2 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addSkillToGroup(group.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                        list={`suggestions-${group.id}`}
                      />
                      <datalist id={`suggestions-${group.id}`}>
                        {categoryData.suggestedSkills.map(s => (
                          <option key={s} value={s} />
                        ))}
                      </datalist>
                      <button
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling?.previousElementSibling as HTMLInputElement;
                          if (input) {
                            addSkillToGroup(group.id, input.value);
                            input.value = '';
                          }
                        }}
                        className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded text-white transition-colors"
                      >
                        <IconPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Education</h3>
              <button
                onClick={addEducation}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1"
              >
                <IconPlus className="w-3 h-3" /> Add
              </button>
            </div>

            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Degree / Course" value={edu.degree} onChange={v => updateEducation(edu.id, 'degree', v)} />
                  <Input label="Institution" value={edu.institution} onChange={v => updateEducation(edu.id, 'institution', v)} />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Year" value={edu.year} onChange={v => updateEducation(edu.id, 'year', v)} />
                  <div className="space-y-2">
                    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5">Institution Logo</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded text-white flex items-center gap-2 transition-colors border border-white/5 w-full justify-center">
                        <IconPlus className="w-3 h-3" /> Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateEducation(edu.id, 'logo', reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Projects</h3>
              <button
                onClick={addProject}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1"
              >
                <IconPlus className="w-3 h-3" /> Add
              </button>
            </div>

            {data.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                <button
                  onClick={() => removeProject(proj.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input label="Project Title" value={proj.title} onChange={v => updateProject(proj.id, 'title', v)} />
                  <Input label="Link" value={proj.link || ''} onChange={v => updateProject(proj.id, 'link', v)} />
                </div>
                <div className="mb-3">
                  <Input label="Description" value={proj.description} onChange={v => updateProject(proj.id, 'description', v)} multiline />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5">Project Image</label>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer text-xs bg-white/5 hover:bg-white/10 px-3 py-2 rounded text-white flex items-center gap-2 transition-colors border border-white/5 w-full justify-center">
                      <IconPlus className="w-3 h-3" /> Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              updateProject(proj.id, 'image', reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, multiline = false, disabled = false }: { label: string, value: string, onChange: (v: string) => void, multiline?: boolean, disabled?: boolean }) => (
  <div className="w-full">
    <label className="block text-xs text-text-dim uppercase tracking-wider mb-1.5">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        rows={3}
        className="w-full bg-dark-700 border border-white/5 rounded p-2.5 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-dark-700 border border-white/5 rounded p-2.5 text-sm text-white focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    )}
  </div>
);

export default Editor;
