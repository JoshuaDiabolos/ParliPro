import React, { useState, useCallback, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { units } from '../data/units';
import type { Question, Lesson } from '../data/units';
import ProgressBar from './ProgressBar';
import Hearts from './Hearts';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  Star,
  RotateCcw,
  Home,
  Zap,
  GripVertical,
} from 'lucide-react';

const QuizView: React.FC = () => {
  const {
    currentLessonId,
    currentQuestionIndex,
    showExplanation,
    hearts,
    maxHearts,
    answerQuestion,
    nextQuestion,
    completeLesson,
    goHome,
    startLesson,
    setShowExplanation,
    updateStreak,
  } = useStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [fillBlankInput, setFillBlankInput] = useState('');
  const [orderItems, setOrderItems] = useState<string[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const lesson = findLesson(currentLessonId!);
  if (!lesson) return null;

  const questions = lesson.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  // Initialize ordering items
  useEffect(() => {
    if (currentQuestion?.type === 'ordering' && currentQuestion.options) {
      setOrderItems(shuffleArray([...currentQuestion.options]));
    }
  }, [currentQuestionIndex, currentQuestion?.type]);

  const checkAnswer = useCallback(() => {
    if (!currentQuestion) return;

    let correct = false;
    let answer: string | string[] = '';

    switch (currentQuestion.type) {
      case 'multiple-choice':
        answer = selectedAnswer as string;
        correct = answer === currentQuestion.correctAnswer;
        break;
      case 'true-false':
        answer = selectedAnswer as string;
        correct = answer === currentQuestion.correctAnswer;
        break;
      case 'fill-blank':
        answer = fillBlankInput.trim();
        correct = answer.toLowerCase() === (currentQuestion.correctAnswer as string).toLowerCase();
        break;
      case 'ordering':
        answer = orderItems;
        correct = JSON.stringify(orderItems) === JSON.stringify(currentQuestion.correctAnswer);
        break;
      case 'matching':
        answer = selectedAnswer as string;
        correct = answer === currentQuestion.correctAnswer;
        break;
    }

    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    answerQuestion(currentQuestion.id, answer, correct);
  }, [currentQuestion, selectedAnswer, fillBlankInput, orderItems, answerQuestion]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const finalScore = score;
      completeLesson(finalScore, questions.length);
      updateStreak();
      setShowResults(true);
    } else {
      nextQuestion();
      setSelectedAnswer(null);
      setIsCorrect(null);
      setFillBlankInput('');
      setShowExplanation(false);
    }
  }, [isLastQuestion, score, questions.length, completeLesson, nextQuestion, setShowExplanation, updateStreak]);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newItems = [...orderItems];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setOrderItems(newItems);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= orderItems.length) return;
    const newItems = [...orderItems];
    const [item] = newItems.splice(from, 1);
    newItems.splice(to, 0, item);
    setOrderItems(newItems);
  };

  // No hearts left
  if (hearts <= 0 && !showResults) {
    return (
      <div className="min-h-screen bg-[#131F24] text-white flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-extrabold mb-2">Out of Hearts!</h2>
        <p className="text-gray-400 text-center mb-6">
          You've run out of hearts. Review the material and try again!
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              useStore.getState().refillHearts();
              startLesson(lesson.id, 'study');
            }}
            className="px-6 py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Study First
          </button>
          <button
            onClick={() => {
              useStore.getState().refillHearts();
              goHome();
            }}
            className="px-6 py-3 rounded-xl bg-[#2A3F4A] text-gray-300 font-bold hover:bg-[#3A5F6A] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPerfect = score === questions.length;
    const xpEarned = score * 10 + (isPerfect ? 20 : 0);

    return (
      <div className="min-h-screen bg-[#131F24] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4">
            {isPerfect ? '🏆' : percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
          </div>
          <h2 className="text-3xl font-extrabold mb-2">
            {isPerfect
              ? 'Perfect Score!'
              : percentage >= 70
              ? 'Great Job!'
              : percentage >= 50
              ? 'Good Effort!'
              : 'Keep Studying!'}
          </h2>
          <p className="text-gray-400 mb-6">{lesson.title}</p>

          {/* Score Ring */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#2A3F4A"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={isPerfect ? '#FFD700' : percentage >= 70 ? '#58CC02' : percentage >= 50 ? '#FF9600' : '#FF4B4B'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 264} 264`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold">{percentage}%</span>
              <span className="text-sm text-gray-400">{score}/{questions.length}</span>
            </div>
          </div>

          {/* XP Earned */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">+{xpEarned} XP</span>
            {isPerfect && (
              <span className="ml-2 text-sm bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-bold">
                +20 BONUS
              </span>
            )}
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map(star => {
              const threshold = star === 1 ? 30 : star === 2 ? 60 : 90;
              const earned = percentage >= threshold;
              return (
                <Star
                  key={star}
                  className={`w-10 h-10 transition-all duration-500 ${
                    earned ? 'text-yellow-400 fill-yellow-400 scale-100' : 'text-gray-600 scale-75'
                  }`}
                  style={{ transitionDelay: `${star * 200}ms` }}
                />
              );
            })}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {!isPerfect && (
              <button
                onClick={() => {
                  useStore.getState().refillHearts();
                  setScore(0);
                  setShowResults(false);
                  setSelectedAnswer(null);
                  setIsCorrect(null);
                  setFillBlankInput('');
                  startLesson(lesson.id, 'quiz');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#58CC02] hover:bg-[#4CAF00] text-white font-bold shadow-lg shadow-[#58CC02]/20 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            )}
            <button
              onClick={goHome}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2A3F4A] hover:bg-[#3A5F6A] text-gray-300 font-bold transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131F24] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1A2C34] border-b border-[#2A3F4A] px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button onClick={goHome} className="p-2 -ml-2 hover:bg-[#2A3F4A] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <Hearts hearts={hearts} maxHearts={maxHearts} />
          </div>
          <ProgressBar
            current={currentQuestionIndex}
            total={questions.length}
            color="#58CC02"
            height={8}
          />
        </div>
      </header>

      {/* Question */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {/* Question Number */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#2A3F4A] text-gray-400">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 uppercase">
            {currentQuestion.type.replace('-', ' ')}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-xl font-bold mb-6 leading-relaxed">{currentQuestion.question}</h2>

        {/* Answer Options */}
        {currentQuestion.type === 'multiple-choice' && (
          <MultipleChoice
            question={currentQuestion}
            selected={selectedAnswer as string | null}
            onSelect={setSelectedAnswer}
            showResult={showExplanation}
            isCorrect={isCorrect}
          />
        )}

        {currentQuestion.type === 'true-false' && (
          <TrueFalse
            question={currentQuestion}
            selected={selectedAnswer as string | null}
            onSelect={setSelectedAnswer}
            showResult={showExplanation}
            isCorrect={isCorrect}
          />
        )}

        {currentQuestion.type === 'fill-blank' && (
          <FillBlank
            question={currentQuestion}
            value={fillBlankInput}
            onChange={setFillBlankInput}
            showResult={showExplanation}
            isCorrect={isCorrect}
            onSubmit={checkAnswer}
          />
        )}

        {currentQuestion.type === 'ordering' && (
          <Ordering
            items={orderItems}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onMove={moveItem}
            showResult={showExplanation}
            isCorrect={isCorrect}
            correctOrder={currentQuestion.correctAnswer as string[]}
          />
        )}

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`mt-6 p-4 rounded-2xl border ${
              isCorrect
                ? 'bg-[#58CC02]/10 border-[#58CC02]/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-[#58CC02]" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className={`font-bold ${isCorrect ? 'text-[#58CC02]' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{currentQuestion.explanation}</p>
            {!isCorrect && currentQuestion.type !== 'ordering' && (
              <p className="text-sm mt-2 text-gray-400">
                Correct answer:{' '}
                <span className="text-[#58CC02] font-semibold">
                  {Array.isArray(currentQuestion.correctAnswer)
                    ? currentQuestion.correctAnswer.join(' → ')
                    : currentQuestion.correctAnswer}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="sticky bottom-0 bg-[#1A2C34] border-t border-[#2A3F4A] px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {!showExplanation ? (
            <button
              onClick={checkAnswer}
              disabled={
                (currentQuestion.type === 'multiple-choice' && !selectedAnswer) ||
                (currentQuestion.type === 'true-false' && !selectedAnswer) ||
                (currentQuestion.type === 'fill-blank' && !fillBlankInput.trim())
              }
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-[#58CC02] hover:bg-[#4CAF00] text-white shadow-lg shadow-[#58CC02]/20"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            >
              {isLastQuestion ? (
                <>
                  <Trophy className="w-4 h-4" />
                  See Results
                </>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== QUESTION TYPE COMPONENTS ==========

const MultipleChoice: React.FC<{
  question: Question;
  selected: string | null;
  onSelect: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean | null;
}> = ({ question, selected, onSelect, showResult, isCorrect: _isCorrect }) => {
  return (
    <div className="space-y-3">
      {question.options?.map((option, i) => {
        const isSelected = selected === option;
        const isCorrectOption = option === question.correctAnswer;
        let borderColor = '#2A3F4A';
        let bgColor = 'transparent';

        if (showResult) {
          if (isCorrectOption) {
            borderColor = '#58CC02';
            bgColor = 'rgba(88, 204, 2, 0.1)';
          } else if (isSelected && !isCorrectOption) {
            borderColor = '#FF4B4B';
            bgColor = 'rgba(255, 75, 75, 0.1)';
          }
        } else if (isSelected) {
          borderColor = '#1CB0F6';
          bgColor = 'rgba(28, 176, 246, 0.1)';
        }

        return (
          <button
            key={i}
            onClick={() => !showResult && onSelect(option)}
            disabled={showResult}
            className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3"
            style={{ borderColor, backgroundColor: bgColor }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{
                backgroundColor: isSelected || (showResult && isCorrectOption) ? borderColor + '30' : '#2A3F4A',
                color: isSelected || (showResult && isCorrectOption) ? borderColor : '#9CA3AF',
              }}
            >
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-[15px]">{option}</span>
            {showResult && isCorrectOption && (
              <CheckCircle2 className="w-5 h-5 text-[#58CC02] ml-auto flex-shrink-0" />
            )}
            {showResult && isSelected && !isCorrectOption && (
              <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
};

const TrueFalse: React.FC<{
  question: Question;
  selected: string | null;
  onSelect: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean | null;
}> = ({ question, selected, onSelect, showResult, isCorrect: _isCorrect }) => {
  const options = ['true', 'false'];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map(option => {
        const isSelected = selected === option;
        const isCorrectOption = option === question.correctAnswer;
        let borderColor = '#2A3F4A';
        let bgColor = 'transparent';

        if (showResult) {
          if (isCorrectOption) {
            borderColor = '#58CC02';
            bgColor = 'rgba(88, 204, 2, 0.1)';
          } else if (isSelected && !isCorrectOption) {
            borderColor = '#FF4B4B';
            bgColor = 'rgba(255, 75, 75, 0.1)';
          }
        } else if (isSelected) {
          borderColor = '#1CB0F6';
          bgColor = 'rgba(28, 176, 246, 0.1)';
        }

        return (
          <button
            key={option}
            onClick={() => !showResult && onSelect(option)}
            disabled={showResult}
            className="p-6 rounded-xl border-2 transition-all duration-200 text-center"
            style={{ borderColor, backgroundColor: bgColor }}
          >
            <span className="text-3xl mb-2 block">{option === 'true' ? '✅' : '❌'}</span>
            <span className="font-bold text-lg capitalize">{option}</span>
          </button>
        );
      })}
    </div>
  );
};

const FillBlank: React.FC<{
  question: Question;
  value: string;
  onChange: (value: string) => void;
  showResult: boolean;
  isCorrect: boolean | null;
  onSubmit?: () => void;
}> = ({ question: _question, value, onChange, showResult, isCorrect, onSubmit }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={showResult}
        placeholder="Type your answer..."
        autoFocus
        className={`w-full px-5 py-4 rounded-xl border-2 bg-[#1A2C34] text-white text-lg font-medium placeholder-gray-500 outline-none transition-all duration-200 ${
          showResult
            ? isCorrect
              ? 'border-[#58CC02]'
              : 'border-red-500'
            : 'border-[#2A3F4A] focus:border-[#1CB0F6]'
        }`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !showResult && value.trim() && onSubmit) {
            onSubmit();
          }
        }}
      />
      {showResult && (
        <div className="flex items-center gap-2 mt-3">
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-[#58CC02]" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      )}
    </div>
  );
};

const Ordering: React.FC<{
  items: string[];
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onMove: (from: number, to: number) => void;
  showResult: boolean;
  isCorrect: boolean | null;
  correctOrder: string[];
}> = ({ items, onDragStart, onDragOver, onDragEnd, onMove, showResult, isCorrect: _isCorrect, correctOrder }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400 mb-3">Drag to reorder, or use the arrows:</p>
      {items.map((item, index) => {
        const isInCorrectPosition = showResult && item === correctOrder[index];
        let borderColor = '#2A3F4A';
        let bgColor = '#1A2C34';

        if (showResult) {
          if (isInCorrectPosition) {
            borderColor = '#58CC02';
            bgColor = 'rgba(88, 204, 2, 0.1)';
          } else {
            borderColor = '#FF4B4B';
            bgColor = 'rgba(255, 75, 75, 0.1)';
          }
        }

        return (
          <div
            key={item}
            draggable={!showResult}
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            className="flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 cursor-grab active:cursor-grabbing"
            style={{ borderColor, backgroundColor: bgColor }}
          >
            <GripVertical className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="w-7 h-7 rounded-lg bg-[#2A3F4A] flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-[15px] flex-1">{item}</span>
            {!showResult && (
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button
                  onClick={() => onMove(index, index - 1)}
                  disabled={index === 0}
                  className="p-1 rounded hover:bg-[#2A3F4A] disabled:opacity-30 transition-colors"
                >
                  <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L6 10M6 2L2 6M6 2L10 6" />
                  </svg>
                </button>
                <button
                  onClick={() => onMove(index, index + 1)}
                  disabled={index === items.length - 1}
                  className="p-1 rounded hover:bg-[#2A3F4A] disabled:opacity-30 transition-colors"
                >
                  <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 10L6 2M6 10L2 6M6 10L10 6" />
                  </svg>
                </button>
              </div>
            )}
            {showResult && (
              isInCorrectPosition
                ? <CheckCircle2 className="w-5 h-5 text-[#58CC02] flex-shrink-0" />
                : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            )}
          </div>
        );
      })}
      {showResult && !items.every((item, i) => item === correctOrder[i]) && (
        <div className="mt-3 p-3 bg-[#2A3F4A] rounded-xl">
          <p className="text-xs text-gray-400 mb-2 font-semibold">Correct order:</p>
          {correctOrder.map((item, i) => (
            <div key={i} className="text-sm text-[#58CC02] flex items-center gap-2 py-1">
              <span className="font-bold">{i + 1}.</span> {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function findLesson(lessonId: string): Lesson | null {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      if (lesson.id === lessonId) return lesson;
    }
  }
  return null;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Make sure it's not already in the correct order
  if (JSON.stringify(shuffled) === JSON.stringify(array)) {
    return shuffleArray(array);
  }
  return shuffled;
}

export default QuizView;
