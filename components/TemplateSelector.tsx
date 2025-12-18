import React from 'react';
import { TemplateId } from '../types';

interface TemplateSelectorProps {
    selectedTemplate: TemplateId;
    onSelectTemplate: (id: TemplateId) => void;
}

const templates: { id: TemplateId; name: string; description: string }[] = [
    { id: 'modern-sidebar', name: 'Modern Sidebar', description: 'Two-column layout with sidebar emphasis' },
    { id: 'classic', name: 'Classic Vertical', description: 'Strong section hierarchy, centered header' },
    { id: 'minimal', name: 'Minimalist', description: 'Clean, lots of whitespace' },
    { id: 'executive', name: 'Executive', description: 'Bold headers, clean grids' },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {templates.map(t => (
                <button
                    key={t.id}
                    onClick={() => onSelectTemplate(t.id)}
                    className={`
            relative group p-4 rounded-xl border transition-all text-left
            ${selectedTemplate === t.id
                            ? 'bg-accent-purple/10 border-accent-purple shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                            : 'bg-dark-800 border-white/5 hover:border-white/20 hover:bg-dark-700'}
          `}
                >
                    <div className="aspect-[210/297] bg-dark-900 rounded-lg mb-3 overflow-hidden relative border border-white/5">
                        {/* Mini Preview Logic based on ID */}
                        {t.id === 'modern-sidebar' && (
                            <div className="flex h-full">
                                <div className="w-1/3 bg-white/5 h-full flex flex-col items-center pt-4 gap-2">
                                    <div className="w-6 h-6 rounded-full bg-white/10"></div>
                                    <div className="w-8 h-1 bg-white/10 rounded"></div>
                                    <div className="w-6 h-1 bg-white/5 rounded"></div>
                                </div>
                                <div className="w-2/3 h-full p-3 space-y-2">
                                    <div className="w-1/2 h-2 bg-white/10 rounded mb-4"></div>
                                    <div className="w-full h-8 bg-white/5 rounded"></div>
                                    <div className="w-full h-8 bg-white/5 rounded"></div>
                                </div>
                            </div>
                        )}
                        {t.id === 'classic' && (
                            <div className="flex flex-col h-full p-3 items-center space-y-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 mb-1"></div>
                                <div className="w-1/2 h-2 bg-white/10 rounded"></div>
                                <div className="w-1/3 h-1 bg-white/5 rounded mb-2"></div>
                                <div className="w-full h-px bg-white/5 my-2"></div>
                                <div className="w-full h-6 bg-white/5 rounded"></div>
                                <div className="w-full h-6 bg-white/5 rounded"></div>
                            </div>
                        )}
                        {t.id === 'minimal' && (
                            <div className="flex flex-col h-full p-4 space-y-3">
                                <div className="w-1/3 h-3 bg-white/10 rounded mb-2"></div>
                                <div className="w-full h-px bg-white/5"></div>
                                <div className="w-full h-4 bg-white/5 rounded"></div>
                                <div className="w-full h-4 bg-white/5 rounded"></div>
                            </div>
                        )}
                        {t.id === 'executive' && (
                            <div className="flex flex-col h-full p-3 space-y-2">
                                <div className="w-full h-8 bg-white/10 rounded mb-1"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-12 bg-white/5 rounded"></div>
                                    <div className="h-12 bg-white/5 rounded"></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <h3 className={`font-medium text-sm ${selectedTemplate === t.id ? 'text-accent-purple' : 'text-white'}`}>{t.name}</h3>
                    <p className="text-[10px] text-text-muted mt-1 leading-tight">{t.description}</p>
                </button>
            ))}
        </div>
    );
};

export default TemplateSelector;
