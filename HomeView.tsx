import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { units } from '../data/units';
import ProgressBar from './ProgressBar';
import Hearts from './Hearts';
import {
  Trophy,
  Flame,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  Zap,
  RotateCcw,
  BookMarked,
} from 'lucide-react';

const HomeView: React.FC = () => {
  const { stats, hearts, maxHearts, lessonProgress, startLesson, goToReference, resetProgress, refillHearts, updateStreak } = useStore();
  const [expandedUnit, setExpandedUnit] = useState<string | null>(units[0].id);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  React.useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const totalCompleted = Object.values(lessonProgress).filter(p => p.completed).length;
  const totalLessonsCount = units.reduce((s, u) => s + u.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#131F24] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#1A2C34] border-b border-[#2A3F4A] px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#58CC02] to-[#78E018] bg-clip-text text-transparent">
              TSA ParliPro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-orange-400">
              <Flame className="w-5 h-5 fill-orange-400" />
              <span className="text-sm font-bold">{stats.currentStreak}</span>
            </div>
            <Hearts hearts={hearts} maxHearts={maxHearts} />
            <div className="flex items-center gap-1 text-yellow-400">
              <Zap className="w-5 h-5 fill-yellow-400" />
              <span className="text-sm font-bold">{stats.totalXP}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard icon={<Star className="w-5 h-5 text-yellow-400" />} label="Level" value={stats.level} />
          <StatCard icon={<Trophy className="w-5 h-5 text-amber-400" />} label="Lessons" value={`${totalCompleted}/${totalLessonsCount}`} />
          <StatCard icon={<Flame className="w-5 h-5 text-orange-400" />} label="Streak" value={`${stats.currentStreak}d`} />
          <StatCard icon={<CheckCircle2 className="w-5 h-5 text-green-400" />} label="Perfect" value={stats.perfectLessons} />
        </div>

        {/* Overall Progress */}
        <div className="mb-8 bg-[#1A2C34] rounded-2xl p-4 border border-[#2A3F4A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-400">Overall Progress</span>
            <span className="text-sm font-bold text-[#58CC02]">
              {Math.round((totalCompleted / totalLessonsCount) * 100)}%
            </span>
          </div>
          <ProgressBar current={totalCompleted} total={totalLessonsCount} />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={goToReference}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1A2C34] border border-[#2A3F4A] hover:border-[#58CC02] text-gray-300 hover:text-[#58CC02] rounded-xl py-3 px-4 transition-all duration-200 text-sm font-semibold"
          >
            <BookMarked className="w-4 h-4" />
            Reference Guide
          </button>
          {hearts < maxHearts && (
            <button
              onClick={refillHearts}
              className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-xl py-3 px-4 transition-all duration-200 text-sm font-semibold"
            >
              <Heart className="w-4 h-4" />
              Refill
            </button>
          )}
        </div>

        {/* Unit Path */}
        <div className="space-y-4">
          {units.map((unit, _unitIndex) => {
            const isExpanded = expandedUnit === unit.id;
            const completedInUnit = unit.lessons.filter(l => lessonProgress[l.id]?.completed).length;
            const allComplete = completedInUnit === unit.lessons.length;

            return (
              <div
                key={unit.id}
                className="rounded-2xl overflow-hidden border transition-all duration-300"
                style={{
                  borderColor: isExpanded ? unit.color + '60' : '#2A3F4A',
                  backgroundColor: isExpanded ? '#1A2C34' : '#1A2C3480',
                }}
              >
                {/* Unit Header */}
                <button
                  onClick={() => setExpandedUnit(isExpanded ? null : unit.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-[#1A2C34] transition-colors"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                    style={{
                      backgroundColor: unit.color + '20',
                      border: `2px solid ${unit.color}`,
                    }}
                  >
                    {allComplete ? '✅' : unit.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base">{unit.title}</h3>
                      {allComplete && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#58CC02]/20 text-[#58CC02]">
                          COMPLETE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5 line-clamp-1">{unit.description}</p>
                    <div className="mt-2">
                      <ProgressBar
                        current={completedInUnit}
                        total={unit.lessons.length}
                        color={unit.color}
                        height={6}
                      />
                    </div>
                  </div>
                  <div className="text-gray-500">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Lessons */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2">
                    {unit.lessons.map((lesson, _lessonIndex) => {
                      const progress = lessonProgress[lesson.id];
                      const isCompleted = progress?.completed;
                      const isPerfect = progress?.bestScore === lesson.questions.length;
                      const isLocked = false; // All unlocked

                      return (
                        <div
                          key={lesson.id}
                          className={`relative rounded-xl border transition-all duration-200 ${
                            isLocked
                              ? 'opacity-50 cursor-not-allowed border-[#2A3F4A]'
                              : 'border-[#2A3F4A] hover:border-[#3A5F6A] cursor-pointer'
                          }`}
                        >
                          <div className="p-3 flex items-center gap-3">
                            {/* Lesson icon */}
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                                isCompleted
                                  ? isPerfect
                                    ? 'bg-yellow-500/20 border-2 border-yellow-500'
                                    : 'bg-[#58CC02]/20 border-2 border-[#58CC02]'
                                  : 'bg-[#2A3F4A] border-2 border-[#3A5F6A]'
                              }`}
                            >
                              {isLocked ? (
                                <Lock className="w-5 h-5 text-gray-500" />
                              ) : isCompleted ? (
                                isPerfect ? '⭐' : '✅'
                              ) : (
                                lesson.icon
                              )}
                            </div>
                            
                            {/* Lesson info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{lesson.title}</h4>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{lesson.description}</p>
                              {isCompleted && (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs text-gray-500">
                                    Best: {progress.bestScore}/{lesson.questions.length}
                                  </span>
                                  {isPerfect && (
                                    <span className="text-xs text-yellow-500 font-bold">★ PERFECT</span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Action buttons */}
                            {!isLocked && (
                              <div className="flex gap-2 flex-shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startLesson(lesson.id, 'study');
                                  }}
                                  className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                                  title="Study"
                                >
                                  <BookOpen className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startLesson(lesson.id, 'quiz');
                                  }}
                                  className="px-3 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                                  style={{
                                    backgroundColor: isCompleted ? unit.color + '20' : unit.color,
                                    color: isCompleted ? unit.color : '#fff',
                                    border: isCompleted ? `1px solid ${unit.color}` : 'none',
                                  }}
                                >
                                  {isCompleted ? 'Redo' : 'Start'}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reset Progress */}
        <div className="mt-12 mb-8 flex justify-center">
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Progress
            </button>
          ) : (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <p className="text-sm text-red-400 mb-3">Are you sure? This will erase all progress.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-[#2A3F4A] text-gray-300 hover:bg-[#3A5F6A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-bold"
                >
                  Reset Everything
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Heart: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({
  icon,
  label,
  value,
}) => (
  <div className="bg-[#1A2C34] rounded-xl p-3 border border-[#2A3F4A] text-center">
    <div className="flex justify-center mb-1">{icon}</div>
    <div className="text-lg font-extrabold">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

export default HomeView;
