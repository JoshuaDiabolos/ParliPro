import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  color = '#58CC02',
  height = 12,
  showLabel = false,
  animated = true,
}) => {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{current}/{total}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-gray-200 overflow-hidden"
        style={{ height }}
      >
        <div
          className={`h-full rounded-full ${animated ? 'transition-all duration-700 ease-out' : ''}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: percentage > 0 ? `0 2px 4px ${color}40` : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
