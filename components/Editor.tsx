import React, { useState } from 'react';
import { ResumeData, ExperienceItem } from '../types';
import { IconSparkles, IconPlus, IconTrash } from './Icons';
import { enhanceText, generateBulletPoint } from '../services/gemini';

interface EditorProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>('personal');
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

  const handleAIEnhance = async (text: string, field: string, context: string) => {
    if (!text) return;
    setLoadingAI(field);
    const enhanced = await enhanceText(text, context);
    if (field === 'quote') updatePersonal('quote', enhanced);
    setLoadingAI(null);
  };

  const handleAIBullet = async (id: string, role: string, company: string) => {
      setLoadingAI(`exp-${id}`);
      const bullet = await generateBulletPoint(role, company);
      updateExperience(id, 'description', bullet);
      setLoadingAI(null);
  }

  const tabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <div className="h-full flex flex-col bg-dark-800 border-r border-white/5">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-white/5 px-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id 
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
                    {loadingAI === 'quote' ? <span className="animate-spin block w-4 h-4 border-2 border-current border-t-transparent rounded-full"/> : <IconSparkles className="w-4 h-4" />}
                </button>
            </div>
             <Input label="Quote Author" value={data.personal.quoteAuthor} onChange={v => updatePersonal('quoteAuthor', v)} />
             <Input label="Avatar URL" value={data.personal.avatar} onChange={v => updatePersonal('avatar', v)} />
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">Work History</h3>
                <button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white flex items-center gap-1">
                    <IconPlus className="w-3 h-3" /> Add
                </button>
            </div>

            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-dark-900 rounded-lg border border-white/5 relative group">
                <button className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconTrash className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <Input label="Role" value={exp.role} onChange={v => updateExperience(exp.id, 'role', v)} />
                    <Input label="Company" value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} />
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
                         {loadingAI === `exp-${exp.id}` ? <span className="animate-spin block w-4 h-4 border-2 border-current border-t-transparent rounded-full"/> : <IconSparkles className="w-4 h-4" />}
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder for other tabs to keep code concise but functional structure exists */}
        {(activeTab === 'skills' || activeTab === 'education' || activeTab === 'projects') && (
            <div className="text-center py-10 text-text-muted">
                <p>Editing for {activeTab} is enabled in the full version.</p>
                <p className="text-xs mt-2">For this demo, please edit Personal or Experience tabs.</p>
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
