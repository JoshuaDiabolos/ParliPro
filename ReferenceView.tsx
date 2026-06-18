import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface MotionRef {
  name: string;
  category: string;
  precedence: number | null;
  second: boolean;
  debatable: boolean;
  amendable: boolean;
  vote: string;
  interrupt: boolean;
  reconsider: boolean;
  notes: string;
}

const motions: MotionRef[] = [
  // Privileged
  { name: 'Fix Time to Adjourn', category: 'Privileged', precedence: 13, second: true, debatable: false, amendable: true, vote: 'Majority', interrupt: false, reconsider: true, notes: 'Sets date/time for next meeting. Highest privileged motion.' },
  { name: 'Adjourn', category: 'Privileged', precedence: 12, second: true, debatable: false, amendable: false, vote: 'Majority', interrupt: false, reconsider: false, notes: 'Ends the meeting. One gavel tap after.' },
  { name: 'Recess', category: 'Privileged', precedence: 11, second: true, debatable: false, amendable: true, vote: 'Majority', interrupt: false, reconsider: false, notes: 'Takes a break. Can amend length of recess.' },
  { name: 'Question of Privilege', category: 'Privileged', precedence: 10, second: false, debatable: false, amendable: false, vote: 'Chair', interrupt: true, reconsider: false, notes: 'Urgent comfort/safety/rights issue. Chair rules.' },
  { name: 'Orders of the Day', category: 'Privileged', precedence: 9, second: false, debatable: false, amendable: false, vote: '2/3 to set aside', interrupt: true, reconsider: false, notes: 'Demand assembly follow its agenda. One member can enforce.' },
  // Subsidiary
  { name: 'Lay on the Table', category: 'Subsidiary', precedence: 8, second: true, debatable: false, amendable: false, vote: 'Majority', interrupt: false, reconsider: false, notes: 'Temporarily sets aside. Use "Take from Table" to bring back.' },
  { name: 'Previous Question', category: 'Subsidiary', precedence: 7, second: true, debatable: false, amendable: false, vote: '2/3', interrupt: false, reconsider: true, notes: 'Ends debate, forces immediate vote. 2/3 because it limits rights.' },
  { name: 'Limit/Extend Debate', category: 'Subsidiary', precedence: 6, second: true, debatable: false, amendable: true, vote: '2/3', interrupt: false, reconsider: true, notes: 'Changes debate time. 2/3 because it limits rights.' },
  { name: 'Postpone Definitely', category: 'Subsidiary', precedence: 5, second: true, debatable: true, amendable: true, vote: 'Majority', interrupt: false, reconsider: true, notes: 'Delays to specific time. Debate limited to postponement.' },
  { name: 'Commit/Refer', category: 'Subsidiary', precedence: 4, second: true, debatable: true, amendable: true, vote: 'Majority', interrupt: false, reconsider: true, notes: 'Sends to committee. Debate limited to referral.' },
  { name: 'Amend', category: 'Subsidiary', precedence: 3, second: true, debatable: true, amendable: true, vote: 'Majority', interrupt: false, reconsider: true, notes: 'Modifies wording. Max 2 degrees. Must be germane.' },
  { name: 'Postpone Indefinitely', category: 'Subsidiary', precedence: 2, second: true, debatable: true, amendable: false, vote: 'Majority', interrupt: false, reconsider: true, notes: 'Kills motion for session. Debate can go into main question.' },
  // Main
  { name: 'Main Motion', category: 'Main', precedence: 1, second: true, debatable: true, amendable: true, vote: 'Majority', interrupt: false, reconsider: true, notes: 'Introduces new business. Only one pending at a time.' },
  // Incidental
  { name: 'Point of Order', category: 'Incidental', precedence: null, second: false, debatable: false, amendable: false, vote: 'Chair', interrupt: true, reconsider: false, notes: 'Rules violation. Chair decides. Must be raised promptly.' },
  { name: 'Appeal', category: 'Incidental', precedence: null, second: true, debatable: true, amendable: false, vote: 'Majority to overturn', interrupt: false, reconsider: true, notes: 'Challenges chair\'s ruling. Must be immediate. Tie sustains chair.' },
  { name: 'Division of Assembly', category: 'Incidental', precedence: null, second: false, debatable: false, amendable: false, vote: 'Demand', interrupt: true, reconsider: false, notes: 'Demands standing vote. One member can demand. No vote needed.' },
  { name: 'Division of Question', category: 'Incidental', precedence: null, second: true, debatable: false, amendable: true, vote: 'Majority', interrupt: false, reconsider: false, notes: 'Splits motion into parts for separate votes.' },
  { name: 'Objection to Consideration', category: 'Incidental', precedence: null, second: false, debatable: false, amendable: false, vote: '2/3 against', interrupt: true, reconsider: true, notes: 'Prevents consideration. Must be raised before debate.' },
  { name: 'Parliamentary Inquiry', category: 'Incidental', precedence: null, second: false, debatable: false, amendable: false, vote: 'Chair', interrupt: true, reconsider: false, notes: 'Asks procedural question. Chair answers.' },
  { name: 'Suspend the Rules', category: 'Incidental', precedence: null, second: true, debatable: false, amendable: false, vote: '2/3', interrupt: false, reconsider: false, notes: 'Temporarily sets aside rules. Cannot suspend bylaws.' },
  { name: 'Request for Information', category: 'Incidental', precedence: null, second: false, debatable: false, amendable: false, vote: 'Chair', interrupt: true, reconsider: false, notes: 'Asks for facts. Directed through the chair.' },
  // Bring Back
  { name: 'Take from the Table', category: 'Bring Back', precedence: null, second: true, debatable: false, amendable: false, vote: 'Majority', interrupt: false, reconsider: false, notes: 'Brings back tabled motion. No other business can be pending.' },
  { name: 'Rescind', category: 'Bring Back', precedence: null, second: true, debatable: true, amendable: true, vote: '2/3 (no notice) / Maj (with notice)', interrupt: false, reconsider: false, notes: 'Cancels previous action.' },
  { name: 'Reconsider', category: 'Bring Back', precedence: null, second: true, debatable: true, amendable: false, vote: 'Majority', interrupt: true, reconsider: false, notes: 'Revisits vote. Must be moved by prevailing side. Same meeting.' },
];

const categories = ['Privileged', 'Subsidiary', 'Main', 'Incidental', 'Bring Back'];
const categoryColors: Record<string, string> = {
  'Privileged': '#FF9600',
  'Subsidiary': '#1CB0F6',
  'Main': '#58CC02',
  'Incidental': '#FF4B4B',
  'Bring Back': '#78C800',
};

const ReferenceView: React.FC = () => {
  const { goHome } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Privileged');
  const [expandedMotion, setExpandedMotion] = useState<string | null>(null);

  const filteredMotions = searchQuery
    ? motions.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : motions;

  return (
    <div className="min-h-screen bg-[#131F24] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1A2C34] border-b border-[#2A3F4A] px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button onClick={goHome} className="p-2 -ml-2 hover:bg-[#2A3F4A] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <h1 className="font-bold text-lg">📋 Quick Reference</h1>
            <div className="w-9" />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search motions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D1A20] border border-[#2A3F4A] text-sm text-white placeholder-gray-500 outline-none focus:border-[#1CB0F6] transition-colors"
            />
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Gavel Quick Reference */}
        <div className="bg-[#1A2C34] rounded-2xl p-4 border border-[#2A3F4A] mb-6">
          <h2 className="font-bold text-base mb-3 flex items-center gap-2">🔨 Gavel Signals</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-[#0D1A20] rounded-lg p-2.5 text-center">
              <div className="text-xl font-extrabold text-yellow-400">1 Tap</div>
              <div className="text-xs text-gray-400 mt-1">Seat / Dispose / Adjourn</div>
            </div>
            <div className="bg-[#0D1A20] rounded-lg p-2.5 text-center">
              <div className="text-xl font-extrabold text-blue-400">2 Taps</div>
              <div className="text-xs text-gray-400 mt-1">Call to Order</div>
            </div>
            <div className="bg-[#0D1A20] rounded-lg p-2.5 text-center">
              <div className="text-xl font-extrabold text-green-400">3 Taps</div>
              <div className="text-xs text-gray-400 mt-1">All Rise</div>
            </div>
            <div className="bg-[#0D1A20] rounded-lg p-2.5 text-center">
              <div className="text-xl font-extrabold text-red-400">Series</div>
              <div className="text-xs text-gray-400 mt-1">Restore Order</div>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="bg-[#1A2C34] rounded-2xl p-4 border border-[#2A3F4A] mb-6">
          <h2 className="font-bold text-base mb-3 flex items-center gap-2">⚖️ Key Principles</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• <strong className="text-white">2/3 vote</strong> = Any motion that limits or takes away rights</p>
            <p>• <strong className="text-white">Majority</strong> = More than half of votes cast</p>
            <p>• <strong className="text-white">Plurality</strong> = Most votes (not necessarily majority)</p>
            <p>• <strong className="text-white">Quorum</strong> = Majority of entire membership (default)</p>
            <p>• <strong className="text-white">Germane</strong> = Relevant to the topic</p>
            <p>• <strong className="text-white">Reconsider</strong> = Only by prevailing side, same meeting</p>
            <p>• <strong className="text-white">Max 2 degrees</strong> of amendment (primary + secondary)</p>
            <p>• <strong className="text-white">10 minutes</strong> per speech, <strong className="text-white">2x per question</strong></p>
          </div>
        </div>

        {/* Motions by Category */}
        {searchQuery ? (
          <div className="space-y-2">
            <h2 className="font-bold text-sm text-gray-400 mb-3">
              {filteredMotions.length} result{filteredMotions.length !== 1 ? 's' : ''}
            </h2>
            {filteredMotions.map(motion => (
              <MotionCard
                key={motion.name}
                motion={motion}
                expanded={expandedMotion === motion.name}
                onToggle={() => setExpandedMotion(expandedMotion === motion.name ? null : motion.name)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map(category => {
              const categoryMotions = motions.filter(m => m.category === category);
              const isExpanded = expandedCategory === category;

              return (
                <div key={category} className="rounded-2xl border border-[#2A3F4A] overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="w-full flex items-center justify-between p-4 bg-[#1A2C34] hover:bg-[#1E333D] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoryColors[category] }}
                      />
                      <span className="font-bold">{category} Motions</span>
                      <span className="text-xs text-gray-500">({categoryMotions.length})</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="p-3 space-y-2 bg-[#131F24]">
                      {categoryMotions.map(motion => (
                        <MotionCard
                          key={motion.name}
                          motion={motion}
                          expanded={expandedMotion === motion.name}
                          onToggle={() => setExpandedMotion(expandedMotion === motion.name ? null : motion.name)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const MotionCard: React.FC<{
  motion: MotionRef;
  expanded: boolean;
  onToggle: () => void;
}> = ({ motion, expanded, onToggle }) => {

  return (
    <div className="rounded-xl border border-[#2A3F4A] overflow-hidden bg-[#1A2C34]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-[#1E333D] transition-colors"
      >
        <div className="flex items-center gap-2">
          {motion.precedence && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#2A3F4A] text-gray-400 min-w-[24px]">
              #{motion.precedence}
            </span>
          )}
          <span className="font-semibold text-sm">{motion.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Quick badges */}
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            motion.vote.includes('2/3') ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {motion.vote.includes('2/3') ? '2/3' : motion.vote.includes('Chair') ? 'CHAIR' : motion.vote.includes('Demand') ? 'DEMAND' : 'MAJ'}
          </span>
          {expanded ? <ChevronUp className="w-3 h-3 text-gray-500" /> : <ChevronDown className="w-3 h-3 text-gray-500" />}
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-[#2A3F4A]">
          <div className="grid grid-cols-3 gap-2 mt-3 mb-3">
            <PropertyBadge label="Second" value={motion.second} />
            <PropertyBadge label="Debatable" value={motion.debatable} />
            <PropertyBadge label="Amendable" value={motion.amendable} />
            <PropertyBadge label="Interrupt" value={motion.interrupt} />
            <PropertyBadge label="Reconsider" value={motion.reconsider} />
            <div className="bg-[#0D1A20] rounded-lg p-2 text-center">
              <div className="text-[10px] text-gray-500 uppercase font-bold">Vote</div>
              <div className="text-xs font-bold text-white mt-0.5">{motion.vote}</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{motion.notes}</p>
        </div>
      )}
    </div>
  );
};

const PropertyBadge: React.FC<{ label: string; value: boolean }> = ({ label, value }) => (
  <div className="bg-[#0D1A20] rounded-lg p-2 text-center">
    <div className="text-[10px] text-gray-500 uppercase font-bold">{label}</div>
    <div className={`text-xs font-bold mt-0.5 ${value ? 'text-[#58CC02]' : 'text-red-400'}`}>
      {value ? 'Yes' : 'No'}
    </div>
  </div>
);

export default ReferenceView;
