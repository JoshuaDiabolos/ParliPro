import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { units } from '../data/units';
import type { ContentBlock, Lesson } from '../data/units';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Info,
  Star,
  Play,
} from 'lucide-react';

const StudyView: React.FC = () => {
  const { currentLessonId, goHome, startLesson } = useStore();
  const [currentPage, setCurrentPage] = useState(0);

  const lesson = findLesson(currentLessonId!);
  if (!lesson) return null;

  const totalPages = lesson.content.length;

  return (
    <div className="min-h-screen bg-[#131F24] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1A2C34] border-b border-[#2A3F4A] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={goHome} className="p-2 -ml-2 hover:bg-[#2A3F4A] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-sm text-gray-300">Study Mode</span>
          </div>
          <div className="text-sm text-gray-500">
            {currentPage + 1}/{totalPages}
          </div>
        </div>
        {/* Progress dots */}
        <div className="max-w-2xl mx-auto flex gap-1 mt-2">
          {lesson.content.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i <= currentPage ? 'bg-blue-500' : 'bg-[#2A3F4A]'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-extrabold mb-1">{lesson.title}</h1>
          <p className="text-gray-400 text-sm">{lesson.description}</p>
        </div>

        <ContentRenderer block={lesson.content[currentPage]} />
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-[#1A2C34] border-t border-[#2A3F4A] px-4 py-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-[#2A3F4A] hover:bg-[#3A5F6A] text-gray-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          {currentPage < totalPages - 1 ? (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => startLesson(lesson.id, 'quiz')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 bg-[#58CC02] hover:bg-[#4CAF00] text-white shadow-lg shadow-[#58CC02]/20"
            >
              <Play className="w-4 h-4" />
              Start Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ContentRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <div className="bg-[#1A2C34] rounded-2xl p-5 border border-[#2A3F4A] mb-4">
          {block.title && (
            <h2 className="text-lg font-bold mb-3 text-white">{block.title}</h2>
          )}
          {block.body && (
            <p className="text-gray-300 leading-relaxed text-[15px]">{block.body}</p>
          )}
        </div>
      );

    case 'list':
      return (
        <div className="bg-[#1A2C34] rounded-2xl p-5 border border-[#2A3F4A] mb-4">
          {block.title && (
            <h2 className="text-lg font-bold mb-3 text-white">{block.title}</h2>
          )}
          <ul className="space-y-2.5">
            {block.items?.map((item, i) => (
              <li key={i} className="flex gap-3 text-[15px]">
                <span className="text-[#58CC02] font-bold mt-0.5 flex-shrink-0">•</span>
                <span className="text-gray-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'table':
      return (
        <div className="bg-[#1A2C34] rounded-2xl p-5 border border-[#2A3F4A] mb-4 overflow-x-auto">
          {block.title && (
            <h2 className="text-lg font-bold mb-3 text-white">{block.title}</h2>
          )}
          <table className="w-full text-sm">
            {block.headers && (
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="text-left py-2.5 px-3 text-[#58CC02] font-bold border-b border-[#2A3F4A] text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows?.map((row, i) => (
                <tr key={i} className="border-b border-[#2A3F4A]/50 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2.5 px-3 text-gray-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'highlight':
      const variants = {
        info: {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          icon: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
          text: 'text-blue-200',
        },
        warning: {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
          text: 'text-amber-200',
        },
        tip: {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          icon: <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0" />,
          text: 'text-green-200',
        },
        important: {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/30',
          icon: <Star className="w-5 h-5 text-purple-400 flex-shrink-0" />,
          text: 'text-purple-200',
        },
      };
      const v = variants[block.variant || 'info'];
      return (
        <div className={`${v.bg} border ${v.border} rounded-2xl p-4 mb-4 flex gap-3`}>
          {v.icon}
          <p className={`${v.text} text-[15px] leading-relaxed`}>{block.body}</p>
        </div>
      );

    case 'diagram':
      return (
        <div className="bg-[#1A2C34] rounded-2xl p-5 border border-[#2A3F4A] mb-4">
          {block.title && <h2 className="text-lg font-bold mb-3">{block.title}</h2>}
          {block.body && <p className="text-gray-300">{block.body}</p>}
        </div>
      );

    default:
      return null;
  }
};

function findLesson(lessonId: string): Lesson | null {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (lesson.id === lessonId) return lesson;
    }
  }
  return null;
}

export default StudyView;
