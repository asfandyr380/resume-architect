import React, { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor';
import ResumePreview from './components/ResumePreview';
import { INITIAL_RESUME_DATA } from './constants';
import { ResumeData } from './types';
import { IconDownload, IconEdit } from './components/Icons';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [scale, setScale] = useState(0.8);
  const [isEditorOpen, setIsEditorOpen] = useState(true);

  const [downloadingType, setDownloadingType] = useState<'pdf' | 'png' | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch and inject Google Fonts CSS locally to avoid CORS issues with html-to-image
    const loadFonts = async () => {
      const fontUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      try {
        // Check if already replaced
        if (document.getElementById('local-google-fonts')) return;

        const resp = await fetch(fontUrl);
        const css = await resp.text();

        const style = document.createElement('style');
        style.id = 'local-google-fonts';
        style.textContent = css;
        document.head.appendChild(style);

        // Remove the external link tag to prevent html-to-image from trying to read it
        const linkTag = document.querySelector(`link[href="${fontUrl}"]`);
        if (linkTag) {
          linkTag.remove();
        }
      } catch (e) {
        console.error('Failed to load local fonts', e);
      }
    };

    loadFonts();
  }, []);

  const handleDownloadPDF = async () => {
    if (downloadingType) return;
    setDownloadingType('pdf');
    const element = document.getElementById('resume-preview');
    if (!element) {
      setDownloadingType(null);
      return;
    }

    // Save current transform
    const originalTransform = element.style.transform;
    // Reset transform for capture to get full size/resolution
    element.style.transform = 'none';

    try {
      // Use html-to-image instead of html2canvas
      const imgData = await toPng(element, {
        backgroundColor: '#13131f',
        pixelRatio: 2 // Higher quality
      });

      // A4 size in mm: 210 x 297
      // Our resume is 280mm wide. We'll set the PDF size to match the content.
      const pdfWidth = 280;
      // Calculate height based on element aspect ratio
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('PDF generation failed', error);
    } finally {
      // Restore transform
      element.style.transform = originalTransform;
      setDownloadingType(null);
    }
  };

  const handleDownloadPNG = async () => {
    if (downloadingType) return;
    setDownloadingType('png');
    const element = document.getElementById('resume-preview');
    if (!element) {
      setDownloadingType(null);
      return;
    }

    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    try {
      const dataUrl = await toPng(element, {
        backgroundColor: '#13131f',
        pixelRatio: 2
      });

      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log(error)
    } finally {
      element.style.transform = originalTransform;
      setDownloadingType(null);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row bg-dark-900 font-sans text-text-main">

      {/* Top Mobile Header */}
      <div className="md:hidden p-4 bg-dark-800 border-b border-white/5 flex justify-between items-center z-50 no-print">
        <h1 className="font-bold text-white">Resume Architect</h1>
        <button onClick={() => setIsEditorOpen(!isEditorOpen)} className="p-2 bg-dark-700 rounded text-white">
          <IconEdit className="w-5 h-5" />
        </button>
      </div>

      {/* Left Editor Panel */}
      <div className={`
        fixed md:relative z-40 inset-y-0 left-0 w-full md:w-[400px] lg:w-[450px] bg-dark-800 transform transition-transform duration-300 ease-in-out
        ${isEditorOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex flex-col border-r border-white/5 shadow-2xl no-print
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
        <div className="p-4 border-t border-white/5 bg-dark-900/50 backdrop-blur-md space-y-3">
          <button
            onClick={handleDownloadPDF}
            disabled={!!downloadingType}
            className="w-full py-3 bg-accent-purple hover:bg-accent-purple/90 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-glow"
          >
            {downloadingType === 'pdf' ? (
              <>
                <span className="animate-spin block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <IconDownload className="w-4 h-4" /> Save as PDF
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={!!downloadingType}
            className="w-full py-3 bg-dark-700 hover:bg-dark-600 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-white/20"
          >
            {downloadingType === 'png' ? (
              <>
                <span className="animate-spin block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <IconDownload className="w-4 h-4" /> Save as PNG
              </>
            )}
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
