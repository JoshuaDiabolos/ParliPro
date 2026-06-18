import React from 'react';
import { Heart } from 'lucide-react';

interface HeartsProps {
  hearts: number;
  maxHearts: number;
}

const Hearts: React.FC<HeartsProps> = ({ hearts, maxHearts }) => {
  return (
    <div className="flex items-center gap-1">
      <Heart
        className={`w-5 h-5 ${hearts > 0 ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
      />
      <span className={`text-sm font-bold ${hearts > 0 ? 'text-red-500' : 'text-gray-400'}`}>
        {hearts}/{maxHearts}
      </span>
    </div>
  );
};

export default Hearts;
