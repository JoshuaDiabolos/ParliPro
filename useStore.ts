import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LessonProgress {
  completed: boolean;
  score: number;
  bestScore: number;
  attempts: number;
  lastAttempt: number | null;
  correctAnswers: string[]; // question IDs answered correctly
}

interface UserStats {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  lessonsCompleted: number;
  perfectLessons: number;
  level: number;
}

interface AppState {
  // Progress
  lessonProgress: Record<string, LessonProgress>;
  stats: UserStats;
  hearts: number;
  maxHearts: number;
  
  // UI State
  currentView: 'home' | 'lesson-study' | 'lesson-quiz' | 'review' | 'reference';
  currentLessonId: string | null;
  currentQuestionIndex: number;
  quizAnswers: Record<string, string | string[]>;
  showExplanation: boolean;
  
  // Actions
  startLesson: (lessonId: string, mode: 'study' | 'quiz') => void;
  answerQuestion: (questionId: string, answer: string | string[], isCorrect: boolean) => void;
  nextQuestion: () => void;
  completeLesson: (score: number, total: number) => void;
  goHome: () => void;
  goToReference: () => void;
  loseHeart: () => void;
  refillHearts: () => void;
  setShowExplanation: (show: boolean) => void;
  resetProgress: () => void;
  isLessonUnlocked: (lessonId: string, unitId: string, lessonIndex: number, unitIndex: number) => boolean;
  updateStreak: () => void;
}

const defaultStats: UserStats = {
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  lessonsCompleted: 0,
  perfectLessons: 0,
  level: 1,
};

const XP_PER_LEVEL = 100;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      lessonProgress: {},
      stats: { ...defaultStats },
      hearts: 5,
      maxHearts: 5,
      
      currentView: 'home',
      currentLessonId: null,
      currentQuestionIndex: 0,
      quizAnswers: {},
      showExplanation: false,

      startLesson: (lessonId, mode) => {
        set({
          currentView: mode === 'study' ? 'lesson-study' : 'lesson-quiz',
          currentLessonId: lessonId,
          currentQuestionIndex: 0,
          quizAnswers: {},
          showExplanation: false,
        });
      },

      answerQuestion: (questionId, answer, isCorrect) => {
        set((state) => {
          const newAnswers = { ...state.quizAnswers, [questionId]: answer };
          const progress = state.lessonProgress[state.currentLessonId!] || {
            completed: false,
            score: 0,
            bestScore: 0,
            attempts: 0,
            lastAttempt: null,
            correctAnswers: [],
          };
          
          let newCorrect = [...progress.correctAnswers];
          if (isCorrect && !newCorrect.includes(questionId)) {
            newCorrect.push(questionId);
          }
          
          return {
            quizAnswers: newAnswers,
            showExplanation: true,
            lessonProgress: {
              ...state.lessonProgress,
              [state.currentLessonId!]: {
                ...progress,
                correctAnswers: newCorrect,
              },
            },
            hearts: isCorrect ? state.hearts : Math.max(0, state.hearts - 1),
          };
        });
      },

      nextQuestion: () => {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
          showExplanation: false,
        }));
      },

      completeLesson: (score, total) => {
        set((state) => {
          const lessonId = state.currentLessonId!;
          const existing = state.lessonProgress[lessonId];
          const xpEarned = score * 10 + (score === total ? 20 : 0); // bonus for perfect
          const newTotalXP = state.stats.totalXP + xpEarned;
          const isPerfect = score === total;
          
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                completed: true,
                score,
                bestScore: Math.max(score, existing?.bestScore || 0),
                attempts: (existing?.attempts || 0) + 1,
                lastAttempt: Date.now(),
                correctAnswers: existing?.correctAnswers || [],
              },
            },
            stats: {
              ...state.stats,
              totalXP: newTotalXP,
              lessonsCompleted: state.stats.lessonsCompleted + (existing?.completed ? 0 : 1),
              perfectLessons: state.stats.perfectLessons + (isPerfect && !existing?.completed ? 1 : 0),
              level: Math.floor(newTotalXP / XP_PER_LEVEL) + 1,
            },
          };
        });
      },

      goHome: () => {
        set({
          currentView: 'home',
          currentLessonId: null,
          currentQuestionIndex: 0,
          quizAnswers: {},
          showExplanation: false,
        });
      },

      goToReference: () => {
        set({ currentView: 'reference' });
      },

      loseHeart: () => {
        set((state) => ({ hearts: Math.max(0, state.hearts - 1) }));
      },

      refillHearts: () => {
        set((state) => ({ hearts: state.maxHearts }));
      },

      setShowExplanation: (show) => {
        set({ showExplanation: show });
      },

      resetProgress: () => {
        set({
          lessonProgress: {},
          stats: { ...defaultStats },
          hearts: 5,
          currentView: 'home',
          currentLessonId: null,
          currentQuestionIndex: 0,
          quizAnswers: {},
        });
      },

      isLessonUnlocked: (lessonId, _unitId, lessonIndex, unitIndex) => {
        const state = get();
        // First lesson of first unit is always unlocked
        if (unitIndex === 0 && lessonIndex === 0) return true;
        
        // Check if already completed
        if (state.lessonProgress[lessonId]?.completed) return true;
        
        // Otherwise need previous lesson completed
        return true; // Allow all for now — users can access any lesson
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toDateString();
          const lastDate = state.stats.lastPracticeDate;
          
          if (lastDate === today) return state;
          
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const isConsecutive = lastDate === yesterday.toDateString();
          
          const newStreak = isConsecutive ? state.stats.currentStreak + 1 : 1;
          
          return {
            stats: {
              ...state.stats,
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, state.stats.longestStreak),
              lastPracticeDate: today,
            },
          };
        });
      },
    }),
    {
      name: 'tsa-parlipro-storage',
      partialize: (state) => ({
        lessonProgress: state.lessonProgress,
        stats: state.stats,
        hearts: state.hearts,
      }),
    }
  )
);
