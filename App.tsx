import React, { useState, useRef } from 'react';
import Editor from './components/Editor';
import ResumePreview from './components/ResumePreview';
import { INITIAL_RESUME_DATA } from './constants';
import { ResumeData } from './types';
import { IconDownload, IconEdit } from './components/Icons';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [scale, setScale] = useState(0.8);
  const [isEditorOpen, setIsEditorOpen] = useState(true);

  const printRef = useRef<HTMLDivElement>(null);

  // In a real app, we would use html2canvas + jsPDF. 
  // Since we cannot install packages, we simulate the export or use window.print()
  const handlePrint = () => {
      window.print();
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-dark-900 font-sans text-text-main">
      
      {/* Top Mobile Header */}
      <div className="md:hidden p-4 bg-dark-800 border-b border-white/5 flex justify-between items-center z-50">
        <h1 className="font-bold text-white">Resume Architect</h1>
        <button onClick={() => setIsEditorOpen(!isEditorOpen)} className="p-2 bg-dark-700 rounded text-white">
            <IconEdit className="w-5 h-5" />
        </button>
      </div>

      {/* Left Editor Panel */}
      <div className={`
        fixed md:relative z-40 inset-y-0 left-0 w-full md:w-[400px] lg:w-[450px] bg-dark-800 transform transition-transform duration-300 ease-in-out
        ${isEditorOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex flex-col border-r border-white/5 shadow-2xl
      `}>
         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-dark-900/50 backdrop-blur-md">
            <div>
               <h1 className="text-xl font-bold text-white tracking-tight">Resume Architect</h1>
               <p className="text-xs text-text-muted mt-1">Create design-focused resumes</p>
            </div>
            <button 
                onClick={() => setIsEditorOpen(false)} 
                className="md:hidden p-2 text-gray-400 hover:text-white"
            >
                ✕
            </button>
         </div>
         
         <Editor data={resumeData} onChange={setResumeData} />

         {/* Editor Footer */}
         <div className="p-4 border-t border-white/5 bg-dark-900/50 backdrop-blur-md">
             <button 
                onClick={handlePrint}
                className="w-full py-3 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-glow"
             >
                 <IconDownload className="w-4 h-4" /> Export to PDF
             </button>
         </div>
      </div>

      {/* Right Preview Area */}
      <div className="flex-1 bg-[#0f0f16] relative overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="absolute top-6 right-6 z-30 flex items-center space-x-4 bg-dark-800/80 backdrop-blur p-2 rounded-full border border-white/5 shadow-xl no-print">
           <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full">-</button>
           <span className="text-xs font-mono text-gray-300 w-12 text-center">{Math.round(scale * 100)}%</span>
           <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full">+</button>
        </div>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-auto flex justify-center p-8 md:p-16 custom-scrollbar">
           <div className="print-container">
             <ResumePreview data={resumeData} scale={scale} />
           </div>
        </div>

      </div>

      {/* Overlay for mobile when editor is open */}
      {isEditorOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsEditorOpen(false)}
        />
      )}

    </div>
  );
};

export default App;
