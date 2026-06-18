export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'matching' | 'ordering';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: ContentBlock[];
  questions: Question[];
}

export interface ContentBlock {
  type: 'text' | 'list' | 'table' | 'highlight' | 'diagram';
  title?: string;
  body?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  variant?: 'info' | 'warning' | 'tip' | 'important';
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

export const units: Unit[] = [
  // ========== UNIT 1: OPENING & CLOSING CEREMONIES ==========
  {
    id: 'unit-1',
    title: 'Opening & Closing Ceremonies',
    description: 'Learn the official TSA opening and closing ceremony scripts, officer roles, and room setup.',
    color: '#58CC02',
    icon: '🏛️',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'The Six Officers',
        description: 'Meet the six TSA officers and their roles in ceremonies.',
        icon: '👥',
        content: [
          {
            type: 'text',
            title: 'The TSA Officer Team',
            body: 'Every TSA chapter has six elected officers who lead meetings and ceremonies. Each has a specific role and speaking part in the official opening and closing ceremonies.'
          },
          {
            type: 'list',
            title: 'The Six Officers',
            items: [
              'President — Presides over all meetings, calls the meeting to order, and adjourns. Uses the gavel.',
              'Vice President — Assists the President, presides in their absence, and oversees committee work.',
              'Secretary — Records minutes, handles correspondence, keeps attendance, and reads the minutes.',
              'Treasurer — Manages chapter finances, collects dues, and gives financial reports.',
              'Reporter — Handles publicity, writes news articles, maintains chapter history, and communicates with media.',
              'Sergeant-at-Arms — Maintains order, sets up the meeting room, manages supplies and equipment, and guards the door.'
            ]
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'Remember the order: President, Vice President, Secretary, Treasurer, Reporter, Sergeant-at-Arms. Think "Please Vote Soon To Reach Success!"'
          }
        ],
        questions: [
          {
            id: 'q-1-1-1',
            type: 'multiple-choice',
            question: 'Which officer presides over all meetings and uses the gavel?',
            options: ['Vice President', 'President', 'Sergeant-at-Arms', 'Secretary'],
            correctAnswer: 'President',
            explanation: 'The President presides over all meetings, calls the meeting to order, and uses the gavel to maintain order.'
          },
          {
            id: 'q-1-1-2',
            type: 'multiple-choice',
            question: 'Which officer is responsible for recording the minutes of a meeting?',
            options: ['Reporter', 'Treasurer', 'Secretary', 'Vice President'],
            correctAnswer: 'Secretary',
            explanation: 'The Secretary records minutes, handles correspondence, and keeps attendance records.'
          },
          {
            id: 'q-1-1-3',
            type: 'true-false',
            question: 'The Reporter is responsible for managing chapter finances.',
            correctAnswer: 'false',
            explanation: 'The Treasurer manages chapter finances. The Reporter handles publicity, news articles, and chapter history.'
          },
          {
            id: 'q-1-1-4',
            type: 'multiple-choice',
            question: 'Which officer sets up the meeting room and maintains order?',
            options: ['President', 'Sergeant-at-Arms', 'Vice President', 'Reporter'],
            correctAnswer: 'Sergeant-at-Arms',
            explanation: 'The Sergeant-at-Arms maintains order, sets up the meeting room, manages supplies, and guards the door.'
          },
          {
            id: 'q-1-1-5',
            type: 'multiple-choice',
            question: 'If the President is absent, who presides over the meeting?',
            options: ['Secretary', 'Treasurer', 'Vice President', 'Sergeant-at-Arms'],
            correctAnswer: 'Vice President',
            explanation: 'The Vice President assists the President and presides in their absence.'
          },
          {
            id: 'q-1-1-6',
            type: 'fill-blank',
            question: 'The officer who handles publicity and writes news articles is the ___.',
            correctAnswer: 'Reporter',
            explanation: 'The Reporter handles publicity, writes news articles, maintains chapter history, and communicates with media.'
          }
        ]
      },
      {
        id: 'lesson-1-2',
        title: 'Room Setup & Arrangement',
        description: 'Learn the physical setup of the officer assembly room.',
        icon: '🪑',
        content: [
          {
            type: 'text',
            title: 'Meeting Room Layout',
            body: 'The meeting room must be arranged properly for official TSA ceremonies. Officers are seated at the front facing the membership, with specific placements for each officer.'
          },
          {
            type: 'list',
            title: 'Standard Room Arrangement',
            items: [
              'The President sits at the center of the head table, facing the membership.',
              'The Vice President is seated to the President\'s right.',
              'The Secretary is seated to the President\'s left.',
              'The Treasurer is seated next to the Vice President (far right from the audience\'s view).',
              'The Reporter is seated next to the Secretary (far left from the audience\'s view).',
              'The Sergeant-at-Arms is stationed near the entrance/door.',
              'The TSA emblem/banner is displayed prominently behind the head table.',
              'The gavel and block are placed on the table in front of the President.'
            ]
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'The Sergeant-at-Arms is the only officer NOT seated at the head table during the ceremony — they stand near the door to maintain order and manage entry.'
          }
        ],
        questions: [
          {
            id: 'q-1-2-1',
            type: 'multiple-choice',
            question: 'Where does the President sit during a TSA meeting?',
            options: ['Far left of head table', 'Center of head table', 'Near the door', 'Far right of head table'],
            correctAnswer: 'Center of head table',
            explanation: 'The President sits at the center of the head table, facing the membership.'
          },
          {
            id: 'q-1-2-2',
            type: 'multiple-choice',
            question: 'Which officer is stationed near the entrance/door?',
            options: ['Reporter', 'Treasurer', 'Sergeant-at-Arms', 'Vice President'],
            correctAnswer: 'Sergeant-at-Arms',
            explanation: 'The Sergeant-at-Arms is stationed near the entrance/door to maintain order and manage entry.'
          },
          {
            id: 'q-1-2-3',
            type: 'true-false',
            question: 'The Vice President is seated to the President\'s left.',
            correctAnswer: 'false',
            explanation: 'The Vice President is seated to the President\'s RIGHT. The Secretary is to the President\'s left.'
          },
          {
            id: 'q-1-2-4',
            type: 'multiple-choice',
            question: 'What item is placed on the table in front of the President?',
            options: ['TSA emblem', 'Chapter roster', 'Gavel and block', 'Financial records'],
            correctAnswer: 'Gavel and block',
            explanation: 'The gavel and block are placed on the table in front of the President for calling the meeting to order.'
          },
          {
            id: 'q-1-2-5',
            type: 'fill-blank',
            question: 'The ___ is seated to the President\'s left at the head table.',
            correctAnswer: 'Secretary',
            explanation: 'The Secretary is seated to the President\'s left, while the Vice President is to the right.'
          }
        ]
      },
      {
        id: 'lesson-1-3',
        title: 'Gavel Signals',
        description: 'Master the meaning of every gavel tap pattern.',
        icon: '🔨',
        content: [
          {
            type: 'text',
            title: 'The Language of the Gavel',
            body: 'The gavel is the President\'s primary tool for managing a meeting. Different tap patterns communicate specific commands to the membership. All members must understand and respond appropriately to gavel signals.'
          },
          {
            type: 'table',
            title: 'Gavel Tap Meanings',
            headers: ['Taps', 'Signal', 'Meaning'],
            rows: [
              ['1 Tap', 'Single tap', 'Seat members after standing; complete disposal of a motion; adjournment (used after announcing adjournment)'],
              ['2 Taps', 'Two taps', 'Call the meeting to ORDER — all members should be seated and quiet'],
              ['3 Taps', 'Three taps', 'ALL members rise (stand up) — used during pledge, opening ceremony, etc.'],
              ['Series of Taps', 'Rapid sharp taps', 'Restore ORDER when the room is noisy or disorderly']
            ]
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'Memory trick: 1 = done/sit, 2 = "to" order, 3 = "tree" (stand tall like a tree), Series = "seriously, be quiet!"'
          }
        ],
        questions: [
          {
            id: 'q-1-3-1',
            type: 'multiple-choice',
            question: 'What does ONE tap of the gavel signal?',
            options: ['Call meeting to order', 'All members rise', 'Seat members / disposal of item / adjournment', 'Restore order'],
            correctAnswer: 'Seat members / disposal of item / adjournment',
            explanation: 'One tap signals: seat members after standing, complete disposal of a motion, or adjournment.'
          },
          {
            id: 'q-1-3-2',
            type: 'multiple-choice',
            question: 'How many gavel taps call the meeting to order?',
            options: ['1', '2', '3', '4'],
            correctAnswer: '2',
            explanation: 'Two taps of the gavel call the meeting to order.'
          },
          {
            id: 'q-1-3-3',
            type: 'multiple-choice',
            question: 'When the President gives THREE taps of the gavel, members should:',
            options: ['Sit down', 'Be quiet', 'Stand up (rise)', 'Leave the room'],
            correctAnswer: 'Stand up (rise)',
            explanation: 'Three taps signal all members to rise (stand up).'
          },
          {
            id: 'q-1-3-4',
            type: 'true-false',
            question: 'A sharp series of taps is used to call the meeting to order.',
            correctAnswer: 'false',
            explanation: 'A sharp series of taps is used to restore order when the room is noisy. Two taps call the meeting to order.'
          },
          {
            id: 'q-1-3-5',
            type: 'fill-blank',
            question: 'To signal adjournment, the President uses ___ tap(s) of the gavel.',
            correctAnswer: '1',
            hint: 'Same number used to seat members',
            explanation: 'One tap of the gavel is used for adjournment, seating members, and disposal of a motion.'
          }
        ]
      },
      {
        id: 'lesson-1-4',
        title: 'Opening Ceremony Script',
        description: 'Learn the official TSA opening ceremony line by line.',
        icon: '📜',
        content: [
          {
            type: 'text',
            title: 'The Official Opening Ceremony',
            body: 'The TSA opening ceremony is a formal procedure that begins every official meeting. Each officer has specific lines they must deliver. The ceremony establishes the purpose and values of TSA.'
          },
          {
            type: 'list',
            title: 'Opening Ceremony Script (Summary)',
            items: [
              'President: Raps gavel 2 times — "The meeting will come to order."',
              'President: "The Sergeant-at-Arms will prepare the room and close the door."',
              'Sergeant-at-Arms: Prepares room, closes door — "The room is prepared, the door is closed."',
              'President: Raps gavel 3 times — members rise.',
              'President: Leads the Pledge of Allegiance.',
              'President: Raps gavel 1 time — members seated.',
              'President: "The Secretary will call the roll."',
              'Secretary: Calls roll of officers and reports attendance.',
              'President: "The Treasurer will give the financial report."',
              'Treasurer: Gives financial report (balance, dues, etc.).',
              'President: "Are there any corrections to the minutes?"',
              'President: "The minutes stand approved as read/corrected."'
            ]
          },
          {
            type: 'highlight',
            variant: 'info',
            body: 'The opening ceremony flows in a logical order: call to order → prepare room → pledge → roll call → treasurer report → minutes approval → business.'
          }
        ],
        questions: [
          {
            id: 'q-1-4-1',
            type: 'multiple-choice',
            question: 'What is the FIRST thing the President does to start the meeting?',
            options: ['Leads the Pledge', 'Calls the Secretary', 'Raps gavel 2 times and says "The meeting will come to order"', 'Asks the Treasurer for a report'],
            correctAnswer: 'Raps gavel 2 times and says "The meeting will come to order"',
            explanation: 'The President raps the gavel 2 times and says "The meeting will come to order" to begin the meeting.'
          },
          {
            id: 'q-1-4-2',
            type: 'ordering',
            question: 'Put these opening ceremony steps in the correct order:',
            options: ['Pledge of Allegiance', 'Call to order (2 taps)', 'Secretary calls roll', 'Sergeant-at-Arms prepares room'],
            correctAnswer: ['Call to order (2 taps)', 'Sergeant-at-Arms prepares room', 'Pledge of Allegiance', 'Secretary calls roll'],
            explanation: 'The correct order is: Call to order → Prepare room → Pledge → Roll call.'
          },
          {
            id: 'q-1-4-3',
            type: 'true-false',
            question: 'The Treasurer gives the financial report before the Secretary calls the roll.',
            correctAnswer: 'false',
            explanation: 'The Secretary calls the roll BEFORE the Treasurer gives the financial report.'
          },
          {
            id: 'q-1-4-4',
            type: 'multiple-choice',
            question: 'Who says "The room is prepared, the door is closed"?',
            options: ['President', 'Vice President', 'Secretary', 'Sergeant-at-Arms'],
            correctAnswer: 'Sergeant-at-Arms',
            explanation: 'The Sergeant-at-Arms prepares the room, closes the door, and reports back to the President.'
          },
          {
            id: 'q-1-4-5',
            type: 'multiple-choice',
            question: 'How many gavel taps does the President use before the Pledge of Allegiance?',
            options: ['1 tap', '2 taps', '3 taps', 'Series of taps'],
            correctAnswer: '3 taps',
            explanation: 'Three taps signal all members to rise for the Pledge of Allegiance.'
          }
        ]
      },
      {
        id: 'lesson-1-5',
        title: 'Closing Ceremony',
        description: 'Master the official TSA closing ceremony.',
        icon: '🔚',
        content: [
          {
            type: 'text',
            title: 'The Official Closing Ceremony',
            body: 'The closing ceremony formally ends the TSA meeting. It includes final announcements, a motion to adjourn, and the President\'s closing gavel.'
          },
          {
            type: 'list',
            title: 'Closing Ceremony Steps',
            items: [
              'President: "Is there any further business to come before the assembly?"',
              'If none: "Since there is no further business..."',
              'A member moves to adjourn: "I move that we adjourn."',
              'Another member seconds: "I second the motion."',
              'President: "It has been moved and seconded that we adjourn. All in favor say \'Aye.\'"',
              'Members: "Aye."',
              'President: "All opposed say \'No.\'"',
              'President: "The ayes have it, and the meeting is adjourned." (1 tap of gavel)',
              'The single gavel tap is the LAST action of the meeting.'
            ]
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'Adjournment requires a motion, a second, and a majority vote. The President cannot simply declare the meeting over without this process (unless there is no objection under general consent).'
          }
        ],
        questions: [
          {
            id: 'q-1-5-1',
            type: 'multiple-choice',
            question: 'What does the President ask before closing the meeting?',
            options: ['"Who wants to leave?"', '"Is there any further business to come before the assembly?"', '"Should we vote to end?"', '"Does anyone have motions?"'],
            correctAnswer: '"Is there any further business to come before the assembly?"',
            explanation: 'The President asks if there is any further business before proceeding with adjournment.'
          },
          {
            id: 'q-1-5-2',
            type: 'true-false',
            question: 'The motion to adjourn requires a second.',
            correctAnswer: 'true',
            explanation: 'The motion to adjourn requires both a motion and a second before it can be voted on.'
          },
          {
            id: 'q-1-5-3',
            type: 'multiple-choice',
            question: 'How many gavel taps end the meeting after adjournment?',
            options: ['1', '2', '3', 'Series'],
            correctAnswer: '1',
            explanation: 'One tap of the gavel is the final action after the President announces adjournment.'
          },
          {
            id: 'q-1-5-4',
            type: 'fill-blank',
            question: 'The motion to adjourn requires a ___ vote to pass.',
            correctAnswer: 'majority',
            explanation: 'The motion to adjourn requires a simple majority vote (more than half of those voting).'
          }
        ]
      }
    ]
  },

  // ========== UNIT 2: CORE PARLIAMENTARY PROCEDURE ==========
  {
    id: 'unit-2',
    title: 'Core Parliamentary Procedure',
    description: 'Master the fundamental principles: quorum, floor rights, debate rules, and handling main motions.',
    color: '#CE82FF',
    icon: '⚖️',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Quorum',
        description: 'Understand the minimum members needed to conduct business.',
        icon: '👥',
        content: [
          {
            type: 'text',
            title: 'What is a Quorum?',
            body: 'A quorum is the minimum number of members who must be present at a meeting for business to be legally transacted. Without a quorum, no official decisions can be made.'
          },
          {
            type: 'list',
            title: 'Key Quorum Rules',
            items: [
              'The default quorum (per RONR) is a majority of the entire membership, unless the bylaws specify otherwise.',
              'If a quorum is not present, the only actions allowed are: Fix the Time to Which to Adjourn, Adjourn, Recess, or take measures to obtain a quorum.',
              'A quorum is always assumed to be present unless a member raises the question (a Point of Order or Parliamentary Inquiry).',
              'The chair (President) should not call a meeting to order if they know a quorum is not present.',
              'Once a quorum is established, it is presumed to continue unless the absence is noted through a count or point of order.'
            ]
          },
          {
            type: 'highlight',
            variant: 'warning',
            body: 'Any business conducted without a quorum is null and void! It has no legal standing even if everyone present agrees.'
          }
        ],
        questions: [
          {
            id: 'q-2-1-1',
            type: 'multiple-choice',
            question: 'What is a quorum?',
            options: ['All members present', 'The minimum number of members required to conduct business', 'A two-thirds majority', 'The total membership count'],
            correctAnswer: 'The minimum number of members required to conduct business',
            explanation: 'A quorum is the minimum number of members who must be present for business to be legally transacted.'
          },
          {
            id: 'q-2-1-2',
            type: 'multiple-choice',
            question: 'What is the default quorum under RONR if bylaws don\'t specify?',
            options: ['One-third of members', 'A majority of the entire membership', 'Two-thirds of members', 'Any two members'],
            correctAnswer: 'A majority of the entire membership',
            explanation: 'Under RONR, the default quorum is a majority of the entire membership unless bylaws specify otherwise.'
          },
          {
            id: 'q-2-1-3',
            type: 'true-false',
            question: 'Business conducted without a quorum is still valid if everyone present votes yes.',
            correctAnswer: 'false',
            explanation: 'Any business conducted without a quorum is null and void, regardless of the vote outcome.'
          },
          {
            id: 'q-2-1-4',
            type: 'multiple-choice',
            question: 'Which of the following CAN be done without a quorum?',
            options: ['Vote on a main motion', 'Amend the bylaws', 'Adjourn or fix the time to adjourn', 'Elect officers'],
            correctAnswer: 'Adjourn or fix the time to adjourn',
            explanation: 'Without a quorum, the assembly can only: Fix the time to which to adjourn, Adjourn, Recess, or take measures to obtain a quorum.'
          },
          {
            id: 'q-2-1-5',
            type: 'fill-blank',
            question: 'A quorum is presumed present unless a member raises a ___ of Order.',
            correctAnswer: 'Point',
            explanation: 'A quorum is assumed present unless challenged through a Point of Order or Parliamentary Inquiry.'
          }
        ]
      },
      {
        id: 'lesson-2-2',
        title: 'Obtaining the Floor',
        description: 'Learn how to properly get recognized to speak.',
        icon: '🎤',
        content: [
          {
            type: 'text',
            title: 'Securing the Floor',
            body: 'To speak in a meeting, a member must first "obtain the floor" by being recognized by the chair. This ensures orderly discussion and prevents multiple people from speaking at once.'
          },
          {
            type: 'list',
            title: 'Steps to Obtain the Floor',
            items: [
              '1. Wait until no one else has the floor (no one is speaking).',
              '2. Rise (stand up) and address the chair: "Mr./Madam President" or "Mr./Madam Chair."',
              '3. Wait for the chair to recognize you by name or by nodding.',
              '4. Once recognized, you "have the floor" and may speak.',
              '5. You must stay on topic (germane) and follow debate rules.',
              '6. When finished, you "yield the floor" by sitting down.'
            ]
          },
          {
            type: 'highlight',
            variant: 'info',
            body: 'A member who has been assigned the floor cannot be interrupted except by certain high-priority motions like Point of Order, Parliamentary Inquiry, or Question of Privilege.'
          },
          {
            type: 'list',
            title: 'Rules of Decorum in Debate',
            items: [
              'Address all remarks through the chair — never speak directly to another member.',
              'Refer to other members in the third person ("the member who just spoke"), not "you."',
              'Do not question motives or make personal attacks.',
              'Speak only to the merits of the pending question.',
              'A member may speak twice on the same question per day, but not a second time until everyone who wishes has spoken once.',
              'Each speech is limited to 10 minutes unless the assembly votes to change this.'
            ]
          }
        ],
        questions: [
          {
            id: 'q-2-2-1',
            type: 'ordering',
            question: 'Put the steps for obtaining the floor in order:',
            options: ['Wait for recognition', 'Rise and address the chair', 'Wait until no one is speaking', 'Begin speaking'],
            correctAnswer: ['Wait until no one is speaking', 'Rise and address the chair', 'Wait for recognition', 'Begin speaking'],
            explanation: 'The correct order: Wait → Rise and address → Get recognized → Speak.'
          },
          {
            id: 'q-2-2-2',
            type: 'multiple-choice',
            question: 'How should a member address the presiding officer?',
            options: ['"Hey President"', '"Mr./Madam President" or "Mr./Madam Chair"', '"Your Honor"', 'By their first name'],
            correctAnswer: '"Mr./Madam President" or "Mr./Madam Chair"',
            explanation: 'Members should formally address the chair as "Mr./Madam President" or "Mr./Madam Chair."'
          },
          {
            id: 'q-2-2-3',
            type: 'true-false',
            question: 'Under RONR, each speech is limited to 10 minutes by default.',
            correctAnswer: 'true',
            explanation: 'Each speech is limited to 10 minutes unless the assembly votes to change this limit.'
          },
          {
            id: 'q-2-2-4',
            type: 'multiple-choice',
            question: 'How many times may a member speak on the same question per day?',
            options: ['Once', 'Twice', 'Three times', 'Unlimited'],
            correctAnswer: 'Twice',
            explanation: 'A member may speak twice on the same question per day, but not a second time until everyone who wishes has spoken once.'
          },
          {
            id: 'q-2-2-5',
            type: 'true-false',
            question: 'It is proper to speak directly to another member during debate.',
            correctAnswer: 'false',
            explanation: 'All remarks must be addressed through the chair. Members should refer to others in the third person.'
          }
        ]
      },
      {
        id: 'lesson-2-3',
        title: 'Handling a Main Motion',
        description: 'The complete lifecycle of a main motion from proposal to result.',
        icon: '📋',
        content: [
          {
            type: 'text',
            title: 'The Main Motion',
            body: 'A main motion is the foundation of parliamentary procedure. It introduces a new item of business for the assembly to consider. Only ONE main motion can be pending at a time.'
          },
          {
            type: 'list',
            title: 'Six Steps of a Main Motion',
            items: [
              '1. PROPOSE: A member obtains the floor and says "I move that..." (states the motion).',
              '2. SECOND: Another member says "I second the motion" (without needing to rise or be recognized).',
              '3. STATE THE QUESTION: The chair restates the motion: "It has been moved and seconded that... Is there any discussion?"',
              '4. DEBATE: Members discuss the motion. The maker of the motion speaks first and may NOT speak against their own motion.',
              '5. VOTE: The chair puts the question: "All in favor say \'Aye.\' All opposed say \'No.\'"',
              '6. ANNOUNCE RESULT: The chair announces: "The ayes have it and the motion is adopted" OR "The noes have it and the motion is lost."'
            ]
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'A main motion requires a SECOND. If no second is received, the chair says "The motion dies for lack of a second." The motion is not considered.'
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'The maker of the motion may vote against their own motion, but may NOT speak against it in debate.'
          }
        ],
        questions: [
          {
            id: 'q-2-3-1',
            type: 'ordering',
            question: 'Put the six steps of handling a main motion in order:',
            options: ['Vote', 'Second', 'Announce result', 'Debate', 'State the question', 'Propose'],
            correctAnswer: ['Propose', 'Second', 'State the question', 'Debate', 'Vote', 'Announce result'],
            explanation: 'The six steps: Propose → Second → State the question → Debate → Vote → Announce result.'
          },
          {
            id: 'q-2-3-2',
            type: 'multiple-choice',
            question: 'What happens if a main motion does not receive a second?',
            options: ['It is debated anyway', 'The chair seconds it', 'It dies for lack of a second', 'It is tabled'],
            correctAnswer: 'It dies for lack of a second',
            explanation: 'Without a second, the chair announces the motion dies for lack of a second and it is not considered.'
          },
          {
            id: 'q-2-3-3',
            type: 'true-false',
            question: 'The maker of a motion may speak against their own motion during debate.',
            correctAnswer: 'false',
            explanation: 'The maker of a motion may NOT speak against it, but they MAY vote against it.'
          },
          {
            id: 'q-2-3-4',
            type: 'multiple-choice',
            question: 'Who speaks first during debate on a main motion?',
            options: ['The President', 'The member who seconded', 'The maker of the motion', 'Anyone who rises first'],
            correctAnswer: 'The maker of the motion',
            explanation: 'The maker of the motion has the right to speak first in debate.'
          },
          {
            id: 'q-2-3-5',
            type: 'multiple-choice',
            question: 'How many main motions can be pending at one time?',
            options: ['One', 'Two', 'Three', 'Unlimited'],
            correctAnswer: 'One',
            explanation: 'Only ONE main motion can be pending (on the floor) at a time.'
          },
          {
            id: 'q-2-3-6',
            type: 'fill-blank',
            question: 'To introduce a main motion, a member says "I ___ that..."',
            correctAnswer: 'move',
            explanation: 'The proper phrasing is "I move that..." to propose a main motion.'
          }
        ]
      }
    ]
  },

  // ========== UNIT 3: PRIVILEGED MOTIONS ==========
  {
    id: 'unit-3',
    title: 'Privileged Motions',
    description: 'The highest-priority motions that don\'t relate to pending business.',
    color: '#FF9600',
    icon: '⭐',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Overview of Privileged Motions',
        description: 'Understanding the five privileged motions and their priority.',
        icon: '🏆',
        content: [
          {
            type: 'text',
            title: 'What Are Privileged Motions?',
            body: 'Privileged motions are the highest-ranking motions in parliamentary procedure. They do NOT relate to the pending business but deal with urgent matters about the meeting itself (like adjournment or comfort of members). They take precedence over all other motions.'
          },
          {
            type: 'list',
            title: 'The Five Privileged Motions (Highest to Lowest)',
            items: [
              '1. Fix the Time to Which to Adjourn — Sets when the next meeting will be (highest privileged)',
              '2. Adjourn — Ends the current meeting',
              '3. Recess — Takes a short break during the meeting',
              '4. Raise a Question of Privilege — Addresses comfort, safety, or rights (noise, temperature, etc.)',
              '5. Call for the Orders of the Day — Demands the assembly follow its agenda/schedule (lowest privileged)'
            ]
          },
          {
            type: 'table',
            title: 'Privileged Motions Quick Reference',
            headers: ['Motion', 'Second?', 'Debatable?', 'Amendable?', 'Vote'],
            rows: [
              ['Fix Time to Adjourn', 'Yes', 'No', 'Yes', 'Majority'],
              ['Adjourn', 'Yes', 'No', 'No', 'Majority'],
              ['Recess', 'Yes', 'No', 'Yes', 'Majority'],
              ['Question of Privilege', 'No', 'No', 'No', 'Chair decides'],
              ['Orders of the Day', 'No', 'No', 'No', '2/3 to set aside']
            ]
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'Memory trick for the order: "FAR QO" — Fix, Adjourn, Recess, Question of privilege, Orders of the day.'
          }
        ],
        questions: [
          {
            id: 'q-3-1-1',
            type: 'multiple-choice',
            question: 'Which privileged motion has the HIGHEST precedence?',
            options: ['Adjourn', 'Recess', 'Fix the Time to Which to Adjourn', 'Call for Orders of the Day'],
            correctAnswer: 'Fix the Time to Which to Adjourn',
            explanation: 'Fix the Time to Which to Adjourn has the highest precedence among privileged motions.'
          },
          {
            id: 'q-3-1-2',
            type: 'true-false',
            question: 'Privileged motions relate directly to the pending business.',
            correctAnswer: 'false',
            explanation: 'Privileged motions do NOT relate to pending business. They deal with urgent matters about the meeting itself.'
          },
          {
            id: 'q-3-1-3',
            type: 'multiple-choice',
            question: 'Which privileged motion does NOT require a second?',
            options: ['Adjourn', 'Recess', 'Fix Time to Adjourn', 'Raise a Question of Privilege'],
            correctAnswer: 'Raise a Question of Privilege',
            explanation: 'Raise a Question of Privilege and Call for Orders of the Day do not require a second.'
          },
          {
            id: 'q-3-1-4',
            type: 'multiple-choice',
            question: 'The motion to Adjourn is:',
            options: ['Debatable and amendable', 'Not debatable but amendable', 'Debatable but not amendable', 'Not debatable and not amendable'],
            correctAnswer: 'Not debatable and not amendable',
            explanation: 'The motion to Adjourn is neither debatable nor amendable when privileged.'
          },
          {
            id: 'q-3-1-5',
            type: 'multiple-choice',
            question: 'Call for the Orders of the Day requires what vote to SET ASIDE?',
            options: ['Majority', 'Two-thirds', 'Unanimous', 'No vote needed'],
            correctAnswer: 'Two-thirds',
            explanation: 'A two-thirds vote is required to set aside (ignore) the Orders of the Day.'
          },
          {
            id: 'q-3-1-6',
            type: 'ordering',
            question: 'Rank the privileged motions from HIGHEST to LOWEST precedence:',
            options: ['Recess', 'Adjourn', 'Fix Time to Adjourn', 'Orders of the Day', 'Question of Privilege'],
            correctAnswer: ['Fix Time to Adjourn', 'Adjourn', 'Recess', 'Question of Privilege', 'Orders of the Day'],
            explanation: 'From highest to lowest: Fix Time → Adjourn → Recess → Question of Privilege → Orders of the Day.'
          }
        ]
      },
      {
        id: 'lesson-3-2',
        title: 'Deep Dive: Each Privileged Motion',
        description: 'Detailed rules for each privileged motion.',
        icon: '🔍',
        content: [
          {
            type: 'text',
            title: 'Fix the Time to Which to Adjourn',
            body: 'This motion sets the date and time for the next meeting (or a continuation of the current one). It is the highest-ranking privileged motion. It IS amendable (you can change the proposed time) but is NOT debatable. Requires a second and majority vote.'
          },
          {
            type: 'text',
            title: 'Adjourn',
            body: 'Ends the current meeting. When made as a privileged motion (while business is pending), it is not debatable or amendable. Requires a second and a majority vote. After adoption, the President announces adjournment and gives one tap of the gavel.'
          },
          {
            type: 'text',
            title: 'Recess',
            body: 'Takes a short intermission/break. The meeting continues after the recess. It is amendable (can change the length of the recess) but NOT debatable. Requires a second and majority vote. Example: "I move that we recess for 10 minutes."'
          },
          {
            type: 'text',
            title: 'Raise a Question of Privilege',
            body: 'Allows a member to address an urgent matter of comfort, safety, or rights — such as noise, temperature, inability to hear, or a breach of privilege. Does NOT require a second. The chair rules on it immediately. This can interrupt a speaker if urgent enough.'
          },
          {
            type: 'text',
            title: 'Call for the Orders of the Day',
            body: 'A single member can demand that the assembly follow its adopted agenda or schedule. Requires no second and no vote to enforce (unless the assembly wants to SET ASIDE the orders, which requires a 2/3 vote). One member alone can force the assembly back on track.'
          }
        ],
        questions: [
          {
            id: 'q-3-2-1',
            type: 'multiple-choice',
            question: 'A member says "I can\'t hear the speaker due to noise in the hallway." This is a:',
            options: ['Point of Order', 'Main Motion', 'Question of Privilege', 'Parliamentary Inquiry'],
            correctAnswer: 'Question of Privilege',
            explanation: 'Issues of comfort, noise, safety, or inability to hear are Questions of Privilege.'
          },
          {
            id: 'q-3-2-2',
            type: 'true-false',
            question: 'The motion to Recess is debatable.',
            correctAnswer: 'false',
            explanation: 'Recess is NOT debatable, but it IS amendable (the length of the recess can be changed).'
          },
          {
            id: 'q-3-2-3',
            type: 'multiple-choice',
            question: 'How many members does it take to Call for the Orders of the Day?',
            options: ['Majority', 'Two-thirds', 'Just one member', 'The chair decides'],
            correctAnswer: 'Just one member',
            explanation: 'A single member can demand the assembly follow its agenda by calling for the Orders of the Day.'
          },
          {
            id: 'q-3-2-4',
            type: 'fill-blank',
            question: 'Fix the Time to Which to Adjourn is the ___-ranking privileged motion.',
            correctAnswer: 'highest',
            explanation: 'Fix the Time to Which to Adjourn is the highest-ranking of all privileged motions.'
          },
          {
            id: 'q-3-2-5',
            type: 'true-false',
            question: 'A Question of Privilege can interrupt a speaker.',
            correctAnswer: 'true',
            explanation: 'If the matter is urgent enough (like safety), a Question of Privilege can interrupt a speaker.'
          }
        ]
      }
    ]
  },

  // ========== UNIT 4: SUBSIDIARY MOTIONS ==========
  {
    id: 'unit-4',
    title: 'Subsidiary Motions',
    description: 'Motions that modify, delay, or dispose of other pending motions.',
    color: '#1CB0F6',
    icon: '🔧',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Subsidiary Motions Overview',
        description: 'Understanding the seven subsidiary motions.',
        icon: '📊',
        content: [
          {
            type: 'text',
            title: 'What Are Subsidiary Motions?',
            body: 'Subsidiary motions are applied to other motions (usually the main motion) to alter them, delay action on them, or dispose of them. They are ranked in precedence between privileged motions (above) and main motions (below).'
          },
          {
            type: 'list',
            title: 'The Seven Subsidiary Motions (Highest to Lowest)',
            items: [
              '1. Lay on the Table — Temporarily sets aside business to address something more urgent',
              '2. Previous Question (Vote Immediately) — Ends debate and forces an immediate vote',
              '3. Limit or Extend Limits of Debate — Changes the time allowed for debate',
              '4. Postpone to a Certain Time (Definitely) — Delays consideration to a specific time',
              '5. Commit or Refer — Sends the motion to a committee for study',
              '6. Amend — Modifies the wording of a pending motion',
              '7. Postpone Indefinitely — Kills the motion without a direct vote on it (lowest subsidiary)'
            ]
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'Memory trick: "Lazy People Like Picking Cherries And Plums" — Lay on Table, Previous Question, Limit debate, Postpone definitely, Commit, Amend, Postpone Indefinitely.'
          }
        ],
        questions: [
          {
            id: 'q-4-1-1',
            type: 'multiple-choice',
            question: 'Which subsidiary motion has the HIGHEST precedence?',
            options: ['Amend', 'Previous Question', 'Lay on the Table', 'Postpone Definitely'],
            correctAnswer: 'Lay on the Table',
            explanation: 'Lay on the Table has the highest precedence among subsidiary motions.'
          },
          {
            id: 'q-4-1-2',
            type: 'multiple-choice',
            question: 'Subsidiary motions are applied to:',
            options: ['The meeting schedule', 'Other pending motions', 'The bylaws only', 'Officer elections'],
            correctAnswer: 'Other pending motions',
            explanation: 'Subsidiary motions are applied to other motions to alter, delay, or dispose of them.'
          },
          {
            id: 'q-4-1-3',
            type: 'multiple-choice',
            question: 'Which subsidiary motion effectively kills a motion without a direct vote?',
            options: ['Lay on the Table', 'Amend', 'Postpone Indefinitely', 'Previous Question'],
            correctAnswer: 'Postpone Indefinitely',
            explanation: 'Postpone Indefinitely kills the motion for the current session without voting directly on the motion itself.'
          },
          {
            id: 'q-4-1-4',
            type: 'ordering',
            question: 'Rank these subsidiary motions from HIGHEST to LOWEST precedence:',
            options: ['Amend', 'Lay on the Table', 'Commit/Refer', 'Previous Question'],
            correctAnswer: ['Lay on the Table', 'Previous Question', 'Commit/Refer', 'Amend'],
            explanation: 'Order: Lay on Table → Previous Question → (Limit Debate → Postpone Definitely →) Commit → Amend.'
          }
        ]
      },
      {
        id: 'lesson-4-2',
        title: 'Previous Question & Table',
        description: 'Master the most commonly tested subsidiary motions.',
        icon: '⚡',
        content: [
          {
            type: 'text',
            title: 'Previous Question (Vote Immediately)',
            body: 'The Previous Question is a motion to end debate immediately and proceed to vote on the pending question. Despite its confusing name, it does NOT mean going back to a previous topic. It means "let\'s vote NOW."'
          },
          {
            type: 'table',
            title: 'Previous Question Details',
            headers: ['Property', 'Value'],
            rows: [
              ['Requires Second?', 'Yes'],
              ['Debatable?', 'No'],
              ['Amendable?', 'No'],
              ['Vote Required', 'TWO-THIRDS (2/3) — because it limits members\' right to debate'],
              ['Can Interrupt?', 'No'],
              ['Can Reconsider?', 'Yes (before vote on main question is taken)']
            ]
          },
          {
            type: 'text',
            title: 'Lay on the Table',
            body: 'This motion temporarily sets aside the pending question to attend to more urgent business. It is NOT the same as "tabling" in common usage. The motion can be taken from the table later. It is NOT debatable, NOT amendable, and requires a majority vote.'
          },
          {
            type: 'highlight',
            variant: 'warning',
            body: 'The Previous Question requires a 2/3 vote because it limits the fundamental right of members to debate. Any motion that limits rights requires a 2/3 vote!'
          }
        ],
        questions: [
          {
            id: 'q-4-2-1',
            type: 'multiple-choice',
            question: 'What does "Previous Question" actually mean?',
            options: ['Go back to the last topic', 'Vote immediately on the pending question', 'Ask a question about the previous motion', 'Reconsider the last vote'],
            correctAnswer: 'Vote immediately on the pending question',
            explanation: 'Despite its name, Previous Question means "end debate and vote NOW on the pending question."'
          },
          {
            id: 'q-4-2-2',
            type: 'multiple-choice',
            question: 'Previous Question requires what vote?',
            options: ['Majority', 'Two-thirds', 'Unanimous', 'Plurality'],
            correctAnswer: 'Two-thirds',
            explanation: 'Previous Question requires a 2/3 vote because it limits the right to debate.'
          },
          {
            id: 'q-4-2-3',
            type: 'true-false',
            question: 'Lay on the Table permanently kills a motion.',
            correctAnswer: 'false',
            explanation: 'Lay on the Table only temporarily sets aside business. It can be brought back with "Take from the Table."'
          },
          {
            id: 'q-4-2-4',
            type: 'true-false',
            question: 'Lay on the Table is debatable.',
            correctAnswer: 'false',
            explanation: 'Lay on the Table is NOT debatable and NOT amendable.'
          },
          {
            id: 'q-4-2-5',
            type: 'fill-blank',
            question: 'Any motion that limits members\' rights requires a ___-thirds vote.',
            correctAnswer: 'two',
            explanation: 'Motions that limit rights (like debate) require a two-thirds vote to protect minority rights.'
          }
        ]
      },
      {
        id: 'lesson-4-3',
        title: 'Amend, Commit & Postpone',
        description: 'Learn how to modify, refer, and delay motions.',
        icon: '✏️',
        content: [
          {
            type: 'text',
            title: 'The Motion to Amend',
            body: 'Amend modifies the wording of a pending motion before it is voted on. There are three forms: insert/add words, strike out words, or strike out and insert words. An amendment must be germane (relevant) to the original motion.'
          },
          {
            type: 'list',
            title: 'Amendment Rules',
            items: [
              'Requires a second, IS debatable, IS amendable (amendment to the amendment = secondary amendment).',
              'Requires a majority vote.',
              'You can have a primary amendment and a secondary amendment, but NO amendment to the third degree.',
              'Amendments must be germane — they must relate to the subject of the motion being amended.',
              'A "hostile amendment" (one opposed to the intent) IS allowed as long as it\'s germane.',
              'After an amendment is adopted or rejected, the assembly votes on the main motion as amended (or not).'
            ]
          },
          {
            type: 'text',
            title: 'Commit or Refer',
            body: 'This motion sends the pending question to a committee for further study. It is debatable (limited to the committee referral, not the main motion), amendable, and requires a majority vote. The motion can specify which committee, instructions, and deadlines.'
          },
          {
            type: 'text',
            title: 'Postpone to a Certain Time (Definitely)',
            body: 'Delays consideration to a specific date/time. It IS debatable (but only about the postponement, not the main question), IS amendable (can change the time), and requires a majority vote. Cannot postpone beyond the next regular session.'
          },
          {
            type: 'text',
            title: 'Postpone Indefinitely',
            body: 'Effectively kills the main motion for the current session without a direct vote on the motion itself. It IS debatable (and debate can go into the merits of the main question), is NOT amendable, and requires a majority vote. Has the lowest subsidiary precedence.'
          }
        ],
        questions: [
          {
            id: 'q-4-3-1',
            type: 'multiple-choice',
            question: 'How many degrees of amendment are allowed?',
            options: ['One (primary only)', 'Two (primary and secondary)', 'Three', 'Unlimited'],
            correctAnswer: 'Two (primary and secondary)',
            explanation: 'You can have a primary amendment and a secondary amendment, but no amendment to the third degree.'
          },
          {
            id: 'q-4-3-2',
            type: 'true-false',
            question: 'An amendment must be germane (relevant) to the original motion.',
            correctAnswer: 'true',
            explanation: 'Amendments must be germane — they must relate to the subject of the motion being amended.'
          },
          {
            id: 'q-4-3-3',
            type: 'multiple-choice',
            question: 'What does the motion to Commit or Refer do?',
            options: ['Kills the motion', 'Sends it to a committee', 'Postpones it indefinitely', 'Forces an immediate vote'],
            correctAnswer: 'Sends it to a committee',
            explanation: 'Commit or Refer sends the pending question to a committee for further study.'
          },
          {
            id: 'q-4-3-4',
            type: 'true-false',
            question: 'Postpone Indefinitely is amendable.',
            correctAnswer: 'false',
            explanation: 'Postpone Indefinitely is NOT amendable. It is debatable but cannot be modified.'
          },
          {
            id: 'q-4-3-5',
            type: 'multiple-choice',
            question: 'Which subsidiary motion has the LOWEST precedence?',
            options: ['Amend', 'Commit', 'Lay on the Table', 'Postpone Indefinitely'],
            correctAnswer: 'Postpone Indefinitely',
            explanation: 'Postpone Indefinitely has the lowest precedence among subsidiary motions.'
          }
        ]
      }
    ]
  },

  // ========== UNIT 5: INCIDENTAL MOTIONS ==========
  {
    id: 'unit-5',
    title: 'Incidental Motions',
    description: 'Motions that arise out of business and must be dealt with immediately.',
    color: '#FF4B4B',
    icon: '🚨',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'Incidental Motions Overview',
        description: 'Understanding motions that must be handled immediately.',
        icon: '⚡',
        content: [
          {
            type: 'text',
            title: 'What Are Incidental Motions?',
            body: 'Incidental motions arise out of the pending business or other motions and must be decided IMMEDIATELY before business can proceed. They have NO order of precedence among themselves — they are dealt with as they arise.'
          },
          {
            type: 'list',
            title: 'The Incidental Motions',
            items: [
              'Point of Order — "The rules are being broken!" (Chair decides)',
              'Appeal — "I disagree with the chair\'s ruling!" (Assembly decides)',
              'Division of the Assembly — "I doubt the voice vote, let\'s do a standing count!"',
              'Division of a Question — "Let\'s split this motion into parts and vote separately."',
              'Objection to Consideration — "We shouldn\'t even consider this motion!" (2/3 against needed)',
              'Parliamentary Inquiry — "What are the rules about...?" (Asking the chair a procedural question)',
              'Point of Information / Request for Information — Asking for facts relevant to the debate',
              'Suspend the Rules — "Let\'s temporarily set aside our rules to do something specific." (2/3 vote)'
            ]
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'Key difference: Point of Order = "You\'re breaking a rule!" vs. Parliamentary Inquiry = "What is the rule?" vs. Request for Information = "What are the facts?"'
          }
        ],
        questions: [
          {
            id: 'q-5-1-1',
            type: 'multiple-choice',
            question: 'Incidental motions have:',
            options: ['Strict precedence order', 'No precedence among themselves', 'Lower precedence than main motions', 'Higher precedence than privileged motions'],
            correctAnswer: 'No precedence among themselves',
            explanation: 'Incidental motions have no order of precedence among themselves — they are dealt with as they arise.'
          },
          {
            id: 'q-5-1-2',
            type: 'multiple-choice',
            question: 'A member says "The chair is not following our bylaws!" This is a:',
            options: ['Parliamentary Inquiry', 'Appeal', 'Point of Order', 'Question of Privilege'],
            correctAnswer: 'Point of Order',
            explanation: 'A Point of Order calls attention to a violation of rules or procedures.'
          },
          {
            id: 'q-5-1-3',
            type: 'multiple-choice',
            question: 'A member asks "Can we amend this type of motion?" This is a:',
            options: ['Point of Order', 'Appeal', 'Parliamentary Inquiry', 'Request for Information'],
            correctAnswer: 'Parliamentary Inquiry',
            explanation: 'A Parliamentary Inquiry asks the chair about rules or procedures — it\'s a procedural question.'
          },
          {
            id: 'q-5-1-4',
            type: 'multiple-choice',
            question: 'Suspend the Rules requires what vote?',
            options: ['Majority', 'Two-thirds', 'Unanimous', 'Plurality'],
            correctAnswer: 'Two-thirds',
            explanation: 'Suspend the Rules requires a 2/3 vote because it temporarily sets aside the organization\'s rules.'
          },
          {
            id: 'q-5-1-5',
            type: 'true-false',
            question: 'Division of the Assembly requires a vote to be granted.',
            correctAnswer: 'false',
            explanation: 'Division of the Assembly (requesting a standing/counted vote) is a DEMAND by one member and requires no vote — it must be granted.'
          }
        ]
      },
      {
        id: 'lesson-5-2',
        title: 'Appeal & Point of Order',
        description: 'The most critical incidental motions for competition.',
        icon: '⚖️',
        content: [
          {
            type: 'text',
            title: 'Point of Order',
            body: 'A Point of Order calls the chair\'s attention to a violation of the rules. It does NOT require a second. It is NOT debatable. The chair rules on it. It CAN interrupt a speaker. A member rises and says: "Point of Order!" or "I rise to a Point of Order."'
          },
          {
            type: 'text',
            title: 'Appeal from the Decision of the Chair',
            body: 'If a member disagrees with the chair\'s ruling (including on a Point of Order), they may Appeal. This takes the decision away from the chair and gives it to the assembly. The chair\'s ruling is sustained unless a majority votes to overturn it.'
          },
          {
            type: 'table',
            title: 'Point of Order vs. Appeal',
            headers: ['Property', 'Point of Order', 'Appeal'],
            rows: [
              ['Requires Second?', 'No', 'Yes'],
              ['Debatable?', 'No', 'Yes (limited)'],
              ['Vote?', 'Chair decides', 'Majority (to overturn)'],
              ['Can Interrupt?', 'Yes', 'Must be made immediately'],
              ['Timely?', 'Must be raised promptly', 'Must be made right after ruling']
            ]
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'An Appeal must be made IMMEDIATELY after the chair\'s ruling. If any other business intervenes, the right to appeal is lost.'
          }
        ],
        questions: [
          {
            id: 'q-5-2-1',
            type: 'true-false',
            question: 'A Point of Order requires a second.',
            correctAnswer: 'false',
            explanation: 'A Point of Order does NOT require a second. The member simply states it and the chair rules.'
          },
          {
            id: 'q-5-2-2',
            type: 'multiple-choice',
            question: 'Who decides on a Point of Order?',
            options: ['The assembly votes', 'The chair rules', 'The Secretary decides', 'A committee decides'],
            correctAnswer: 'The chair rules',
            explanation: 'The chair (President) rules on Points of Order.'
          },
          {
            id: 'q-5-2-3',
            type: 'multiple-choice',
            question: 'An Appeal transfers the decision from the chair to:',
            options: ['A committee', 'The Secretary', 'The assembly', 'The Vice President'],
            correctAnswer: 'The assembly',
            explanation: 'An Appeal takes the decision away from the chair and gives it to the full assembly to vote on.'
          },
          {
            id: 'q-5-2-4',
            type: 'true-false',
            question: 'An Appeal can be made at any time during the meeting.',
            correctAnswer: 'false',
            explanation: 'An Appeal must be made IMMEDIATELY after the chair\'s ruling. If other business intervenes, the right to appeal is lost.'
          },
          {
            id: 'q-5-2-5',
            type: 'multiple-choice',
            question: 'An Appeal requires what vote to OVERTURN the chair?',
            options: ['Two-thirds', 'Majority', 'Unanimous', 'Plurality'],
            correctAnswer: 'Majority',
            explanation: 'A majority vote is needed to overturn the chair\'s ruling on an Appeal. A tie sustains the chair.'
          }
        ]
      }
    ]
  },

  // ========== UNIT 6: MOTIONS THAT BRING BACK ==========
  {
    id: 'unit-6',
    title: 'Bringing Questions Back',
    description: 'Motions that bring a question again before the assembly.',
    color: '#78C800',
    icon: '🔄',
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'Take from Table, Rescind, Reconsider',
        description: 'How to revisit previously decided business.',
        icon: '↩️',
        content: [
          {
            type: 'text',
            title: 'Motions That Bring a Question Again Before the Assembly',
            body: 'These motions allow the assembly to revisit business that has already been decided or set aside. They are essential for correcting mistakes or changing course when new information emerges.'
          },
          {
            type: 'list',
            title: 'The Three Key Motions',
            items: [
              'Take from the Table — Brings back a motion that was previously laid on the table. Can only be made when no other business is pending. Requires a majority vote, a second, and is NOT debatable.',
              'Rescind / Amend Something Previously Adopted — Changes or cancels a previous action. Requires a 2/3 vote WITHOUT previous notice, OR a majority vote WITH previous notice, OR a majority of the entire membership. IS debatable.',
              'Reconsider — Allows the assembly to reconsider a vote taken earlier in the SAME meeting (or the next day in a convention). Must be made by someone who voted on the PREVAILING side. Requires a second, IS debatable (if the motion being reconsidered is debatable).'
            ]
          },
          {
            type: 'highlight',
            variant: 'warning',
            body: 'RECONSIDER can only be moved by someone who voted on the PREVAILING (winning) side. This is one of the most commonly tested rules!'
          },
          {
            type: 'table',
            title: 'Comparison',
            headers: ['Property', 'Take from Table', 'Rescind', 'Reconsider'],
            rows: [
              ['Second?', 'Yes', 'Yes', 'Yes'],
              ['Debatable?', 'No', 'Yes', 'Yes*'],
              ['Amendable?', 'No', 'Yes', 'No'],
              ['Vote', 'Majority', '2/3 (no notice) or Majority (with notice)', 'Majority'],
              ['Who can move?', 'Any member', 'Any member', 'Prevailing side ONLY'],
              ['Time limit?', 'Same or next session', 'None', 'Same day/meeting']
            ]
          }
        ],
        questions: [
          {
            id: 'q-6-1-1',
            type: 'multiple-choice',
            question: 'Who can move to Reconsider a vote?',
            options: ['Any member', 'Only the President', 'Someone who voted on the prevailing side', 'Someone who voted on the losing side'],
            correctAnswer: 'Someone who voted on the prevailing side',
            explanation: 'Only a member who voted on the PREVAILING (winning) side can move to Reconsider.'
          },
          {
            id: 'q-6-1-2',
            type: 'multiple-choice',
            question: 'Rescind without previous notice requires what vote?',
            options: ['Majority', 'Two-thirds', 'Unanimous', 'Plurality'],
            correctAnswer: 'Two-thirds',
            explanation: 'Rescind requires a 2/3 vote without previous notice, OR a majority vote with previous notice.'
          },
          {
            id: 'q-6-1-3',
            type: 'true-false',
            question: 'Take from the Table is debatable.',
            correctAnswer: 'false',
            explanation: 'Take from the Table is NOT debatable. It simply brings back the tabled motion.'
          },
          {
            id: 'q-6-1-4',
            type: 'multiple-choice',
            question: 'Reconsider must be moved during:',
            options: ['Any future meeting', 'The same meeting/day the vote was taken', 'Within one week', 'The next session only'],
            correctAnswer: 'The same meeting/day the vote was taken',
            explanation: 'Reconsider must be moved during the same meeting (or next day at a convention).'
          },
          {
            id: 'q-6-1-5',
            type: 'fill-blank',
            question: 'To bring back a motion that was laid on the table, use the motion to ___ from the Table.',
            correctAnswer: 'Take',
            explanation: 'Take from the Table brings back a motion that was previously laid on the table.'
          }
        ]
      }
    ]
  },

  // ========== UNIT 7: TECHNICAL CHARACTERISTICS ==========
  {
    id: 'unit-7',
    title: 'Motion Characteristics',
    description: 'Master the technical properties: precedence, debatability, vote requirements, and more.',
    color: '#FF86D0',
    icon: '📐',
    lessons: [
      {
        id: 'lesson-7-1',
        title: 'Precedence of Motions',
        description: 'Which motions outrank others.',
        icon: '📊',
        content: [
          {
            type: 'text',
            title: 'The Order of Precedence',
            body: 'Motions are ranked in a strict order of precedence. A motion of higher precedence can be made while a lower-precedence motion is pending. Motions must be voted on in REVERSE order — the highest-precedence motion pending is voted on first.'
          },
          {
            type: 'list',
            title: 'Complete Precedence (Highest to Lowest)',
            items: [
              '--- PRIVILEGED MOTIONS ---',
              '13. Fix the Time to Which to Adjourn',
              '12. Adjourn',
              '11. Recess',
              '10. Raise a Question of Privilege',
              '9. Call for the Orders of the Day',
              '--- SUBSIDIARY MOTIONS ---',
              '8. Lay on the Table',
              '7. Previous Question',
              '6. Limit or Extend Limits of Debate',
              '5. Postpone to a Certain Time',
              '4. Commit or Refer',
              '3. Amend',
              '2. Postpone Indefinitely',
              '--- MAIN MOTION ---',
              '1. Main Motion (lowest precedence)'
            ]
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'Incidental motions have NO fixed precedence — they are dealt with immediately as they arise, regardless of what else is pending.'
          }
        ],
        questions: [
          {
            id: 'q-7-1-1',
            type: 'multiple-choice',
            question: 'Which motion has the LOWEST precedence in the ranking system?',
            options: ['Postpone Indefinitely', 'Main Motion', 'Amend', 'Orders of the Day'],
            correctAnswer: 'Main Motion',
            explanation: 'The Main Motion has the lowest precedence in the entire ranking system.'
          },
          {
            id: 'q-7-1-2',
            type: 'multiple-choice',
            question: 'If both an amendment and Previous Question are pending, which is voted on FIRST?',
            options: ['Amendment', 'Previous Question', 'Main Motion', 'Either one'],
            correctAnswer: 'Previous Question',
            explanation: 'Higher-precedence motions are voted on first. Previous Question outranks Amend.'
          },
          {
            id: 'q-7-1-3',
            type: 'true-false',
            question: 'Incidental motions have a fixed position in the precedence ranking.',
            correctAnswer: 'false',
            explanation: 'Incidental motions have NO fixed precedence — they are dealt with immediately as they arise.'
          },
          {
            id: 'q-7-1-4',
            type: 'multiple-choice',
            question: 'Can you make a motion to Adjourn while a motion to Recess is pending?',
            options: ['Yes, Adjourn outranks Recess', 'No, Recess outranks Adjourn', 'Only with 2/3 vote', 'Only the chair can do this'],
            correctAnswer: 'Yes, Adjourn outranks Recess',
            explanation: 'Adjourn has higher precedence than Recess, so it can be made while Recess is pending.'
          }
        ]
      },
      {
        id: 'lesson-7-2',
        title: 'Debatability & Amendability',
        description: 'Which motions can be debated or amended.',
        icon: '💬',
        content: [
          {
            type: 'text',
            title: 'Debatability Rules',
            body: 'Not all motions can be debated. Generally, the higher a motion\'s precedence, the less likely it is to be debatable (because high-precedence motions need to be resolved quickly).'
          },
          {
            type: 'table',
            title: 'Debatability Chart',
            headers: ['Motion', 'Debatable?'],
            rows: [
              ['Main Motion', 'Yes — fully debatable'],
              ['Amend', 'Yes — but only the amendment, not the main motion'],
              ['Postpone Indefinitely', 'Yes — debate can go into the main question'],
              ['Commit/Refer', 'Yes — limited to the referral question'],
              ['Postpone Definitely', 'Yes — limited to the postponement'],
              ['Appeal', 'Yes — limited'],
              ['Rescind', 'Yes'],
              ['Reconsider', 'Yes — if the motion to be reconsidered is debatable'],
              ['Lay on the Table', 'NO'],
              ['Previous Question', 'NO'],
              ['Limit Debate', 'NO'],
              ['Adjourn', 'NO'],
              ['Recess', 'NO'],
              ['All Privileged (except noted)', 'NO'],
              ['Point of Order', 'NO'],
              ['Division', 'NO']
            ]
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'Quick rule: If a motion limits what the assembly can do or needs quick resolution, it\'s probably NOT debatable.'
          }
        ],
        questions: [
          {
            id: 'q-7-2-1',
            type: 'true-false',
            question: 'The motion to Amend is debatable.',
            correctAnswer: 'true',
            explanation: 'The motion to Amend IS debatable, but debate must be limited to the amendment itself.'
          },
          {
            id: 'q-7-2-2',
            type: 'true-false',
            question: 'The Previous Question is debatable.',
            correctAnswer: 'false',
            explanation: 'The Previous Question is NOT debatable — it would defeat its purpose of ending debate immediately.'
          },
          {
            id: 'q-7-2-3',
            type: 'multiple-choice',
            question: 'Which motion allows debate to go into the merits of the main question?',
            options: ['Amend', 'Commit', 'Postpone Indefinitely', 'Previous Question'],
            correctAnswer: 'Postpone Indefinitely',
            explanation: 'Postpone Indefinitely uniquely allows debate on the main question itself, not just the postponement.'
          },
          {
            id: 'q-7-2-4',
            type: 'true-false',
            question: 'The motion to Lay on the Table is debatable.',
            correctAnswer: 'false',
            explanation: 'Lay on the Table is NOT debatable to prevent misuse as a way to kill motions through extended debate.'
          },
          {
            id: 'q-7-2-5',
            type: 'multiple-choice',
            question: 'Is the motion to Recess amendable?',
            options: ['Yes', 'No'],
            correctAnswer: 'Yes',
            explanation: 'Recess IS amendable — you can change the length of the recess. But it is NOT debatable.'
          }
        ]
      },
      {
        id: 'lesson-7-3',
        title: 'Vote Requirements',
        description: 'Majority vs. two-thirds — when each is needed.',
        icon: '🗳️',
        content: [
          {
            type: 'text',
            title: 'Understanding Vote Requirements',
            body: 'Most motions require a simple majority vote (more than half of those voting). However, motions that limit or take away members\' rights require a two-thirds (2/3) vote to protect the minority.'
          },
          {
            type: 'list',
            title: 'Motions Requiring a TWO-THIRDS Vote',
            items: [
              'Previous Question (limits right to debate)',
              'Limit or Extend Limits of Debate (limits right to debate)',
              'Suspend the Rules (takes away rules protection)',
              'Objection to the Consideration of a Question (limits right to have motion considered)',
              'Rescind without previous notice (takes away a previous decision)',
              'Close nominations / close polls',
              'Any motion that changes rules already adopted or limits members\' rights'
            ]
          },
          {
            type: 'list',
            title: 'Motions Requiring MAJORITY Vote',
            items: [
              'Main Motion',
              'Amend',
              'Commit/Refer',
              'Postpone (Definitely or Indefinitely)',
              'Lay on the Table / Take from the Table',
              'Adjourn',
              'Recess',
              'Fix Time to Adjourn',
              'Appeal',
              'Reconsider',
              'Rescind WITH previous notice'
            ]
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'The KEY PRINCIPLE: A 2/3 vote is required whenever a motion limits or takes away the rights of members. This protects the minority from being silenced by a bare majority.'
          }
        ],
        questions: [
          {
            id: 'q-7-3-1',
            type: 'multiple-choice',
            question: 'Why do some motions require a 2/3 vote?',
            options: ['They are more important', 'They limit or take away members\' rights', 'The chair prefers it', 'They involve money'],
            correctAnswer: 'They limit or take away members\' rights',
            explanation: 'A 2/3 vote protects the minority by requiring strong consensus before limiting anyone\'s rights.'
          },
          {
            id: 'q-7-3-2',
            type: 'multiple-choice',
            question: 'Which requires a 2/3 vote?',
            options: ['Main Motion', 'Amend', 'Previous Question', 'Adjourn'],
            correctAnswer: 'Previous Question',
            explanation: 'Previous Question requires 2/3 because it limits the right to debate.'
          },
          {
            id: 'q-7-3-3',
            type: 'true-false',
            question: 'The motion to Amend requires a 2/3 vote.',
            correctAnswer: 'false',
            explanation: 'Amend requires only a majority vote. It modifies wording but does not limit rights.'
          },
          {
            id: 'q-7-3-4',
            type: 'multiple-choice',
            question: 'Suspend the Rules requires:',
            options: ['Majority', 'Two-thirds', 'Unanimous', 'No vote'],
            correctAnswer: 'Two-thirds',
            explanation: 'Suspend the Rules requires a 2/3 vote because it temporarily takes away the protection of rules.'
          },
          {
            id: 'q-7-3-5',
            type: 'true-false',
            question: 'Rescind always requires a 2/3 vote.',
            correctAnswer: 'false',
            explanation: 'Rescind requires 2/3 WITHOUT notice, but only a majority WITH previous notice or with a majority of the entire membership.'
          }
        ]
      }
    ]
  },

  // ========== UNIT 8: WRITTEN EXAM KNOWLEDGE ==========
  {
    id: 'unit-8',
    title: 'Written Exam Prep',
    description: 'Terminology, voting methods, minutes, and technical knowledge for the written test.',
    color: '#4B4BFF',
    icon: '📝',
    lessons: [
      {
        id: 'lesson-8-1',
        title: 'Parliamentary Terminology',
        description: 'Key definitions every competitor must know.',
        icon: '📖',
        content: [
          {
            type: 'text',
            title: 'Essential Definitions',
            body: 'The written exam tests precise knowledge of parliamentary terminology. Here are the most important terms you need to know cold.'
          },
          {
            type: 'list',
            title: 'Key Terms',
            items: [
              'Majority — More than half of the votes cast (NOT just "the most votes"). Example: If 20 vote, majority = 11+.',
              'Plurality — The most votes received, even if not a majority. Used in elections with 3+ candidates where no one gets 50%+. NOT the same as majority.',
              'Ex-officio — "By virtue of office." A person who serves on a committee because of their position (e.g., the President is often ex-officio member of all committees). They have FULL voting rights unless bylaws say otherwise.',
              'Pro tem (pro tempore) — "For the time being." A temporary officer filling in. Example: Secretary Pro Tem.',
              'General consent (unanimous consent) — The chair assumes agreement without a formal vote: "If there is no objection... [pause]... hearing none, it is so ordered."',
              'Germane — Relevant to the topic. Amendments must be germane to the motion they modify.',
              'Pending — A motion that has been stated by the chair but not yet disposed of (voted on, tabled, etc.).',
              'Immediately pending — The motion currently being directly considered (if multiple motions are pending, the last one made).',
              'Filibuster — Using parliamentary procedure to deliberately delay or prevent action (e.g., speaking the maximum time, making procedural motions). NOT a formal term in RONR but a recognized tactic.',
              'Sine die — "Without day." Adjournment without setting a future meeting date. The final adjournment of a convention.',
              'Seriatim — Considering a document section by section (paragraph by paragraph).',
              'Division — Can mean Division of the Assembly (standing vote) OR Division of a Question (splitting a motion).'
            ]
          }
        ],
        questions: [
          {
            id: 'q-8-1-1',
            type: 'multiple-choice',
            question: 'What is the difference between "majority" and "plurality"?',
            options: [
              'They mean the same thing',
              'Majority = more than half; Plurality = the most votes (even if under 50%)',
              'Plurality = more than half; Majority = the most votes',
              'Majority requires 2/3; Plurality requires 50%'
            ],
            correctAnswer: 'Majority = more than half; Plurality = the most votes (even if under 50%)',
            explanation: 'Majority means more than half. Plurality means the most votes, which could be less than 50% in a multi-candidate race.'
          },
          {
            id: 'q-8-1-2',
            type: 'multiple-choice',
            question: 'What does "ex-officio" mean?',
            options: ['Former officer', 'By virtue of office', 'Without voting rights', 'Temporary position'],
            correctAnswer: 'By virtue of office',
            explanation: 'Ex-officio means "by virtue of office" — serving because of your position, with full voting rights unless stated otherwise.'
          },
          {
            id: 'q-8-1-3',
            type: 'fill-blank',
            question: '"Pro tem" means "for the time being" and describes a ___ officer.',
            correctAnswer: 'temporary',
            explanation: 'Pro tempore (pro tem) means "for the time being" — a temporary replacement.'
          },
          {
            id: 'q-8-1-4',
            type: 'multiple-choice',
            question: 'What does "germane" mean in parliamentary procedure?',
            options: ['German-style voting', 'Relevant to the topic', 'Required by law', 'Unanimous'],
            correctAnswer: 'Relevant to the topic',
            explanation: 'Germane means relevant to the topic. Amendments must be germane to the motion they modify.'
          },
          {
            id: 'q-8-1-5',
            type: 'multiple-choice',
            question: '"General consent" is also known as:',
            options: ['Majority consent', 'Unanimous consent', 'Chair consent', 'Committee consent'],
            correctAnswer: 'Unanimous consent',
            explanation: 'General consent (unanimous consent) is when the chair assumes agreement without a formal vote.'
          },
          {
            id: 'q-8-1-6',
            type: 'multiple-choice',
            question: 'What does "sine die" mean?',
            options: ['Without debate', 'Without day (final adjournment)', 'Without a vote', 'Without officers'],
            correctAnswer: 'Without day (final adjournment)',
            explanation: 'Sine die means "without day" — adjournment without setting a future meeting date.'
          }
        ]
      },
      {
        id: 'lesson-8-2',
        title: 'Voting Methods',
        description: 'All the ways an assembly can vote.',
        icon: '🗳️',
        content: [
          {
            type: 'text',
            title: 'Methods of Voting',
            body: 'Parliamentary procedure provides several methods of voting. The chair typically chooses voice vote first, but members can request other methods.'
          },
          {
            type: 'list',
            title: 'The Five Main Voting Methods',
            items: [
              'Voice Vote (viva voce) — "All in favor say Aye; all opposed say No." The most common method. The chair judges which side is louder.',
              'Rising/Standing Vote — Members stand to vote. Used when the chair is uncertain of a voice vote, when a 2/3 vote is needed, or when a member calls "Division!" A counted rising vote gives exact numbers.',
              'Ballot Vote — Secret written vote. Required for elections in most organizations. Protects voter privacy. Cannot be ordered by a simple majority if bylaws don\'t require it — requires a special rule.',
              'Roll Call Vote — Each member\'s name is called and they respond "Aye" or "No." Each vote is recorded in the minutes. Used in legislative bodies. Requires a special rule or bylaws provision in most organizations.',
              'Unanimous Consent (General Consent) — "If there is no objection..." If anyone objects, a formal vote must be taken. Used for routine, non-controversial matters.'
            ]
          },
          {
            type: 'highlight',
            variant: 'info',
            body: 'Any member can demand a Division of the Assembly (standing vote) if they doubt the result of a voice vote. This is a DEMAND — it requires no second and no vote.'
          },
          {
            type: 'highlight',
            variant: 'tip',
            body: 'The chair ALWAYS votes by ballot (secret vote) but normally does not vote in other methods unless the vote would change the result (tie-breaking or creating a tie).'
          }
        ],
        questions: [
          {
            id: 'q-8-2-1',
            type: 'multiple-choice',
            question: 'What is the most common voting method?',
            options: ['Ballot', 'Roll call', 'Voice vote (viva voce)', 'Standing vote'],
            correctAnswer: 'Voice vote (viva voce)',
            explanation: 'Voice vote (viva voce) is the most common method — "All in favor say Aye; all opposed say No."'
          },
          {
            id: 'q-8-2-2',
            type: 'multiple-choice',
            question: 'When a member doubts the result of a voice vote, they can demand:',
            options: ['A recount', 'Division of the Assembly', 'A ballot vote', 'A roll call'],
            correctAnswer: 'Division of the Assembly',
            explanation: 'Division of the Assembly (standing vote) can be demanded by any one member without a second.'
          },
          {
            id: 'q-8-2-3',
            type: 'true-false',
            question: 'The chair always has the right to vote in all voting methods.',
            correctAnswer: 'false',
            explanation: 'The chair normally votes only by ballot or when the vote would change the result (tie-breaking or creating a tie).'
          },
          {
            id: 'q-8-2-4',
            type: 'multiple-choice',
            question: 'Which voting method records each member\'s individual vote in the minutes?',
            options: ['Voice vote', 'Standing vote', 'Ballot vote', 'Roll call vote'],
            correctAnswer: 'Roll call vote',
            explanation: 'In a roll call vote, each member\'s name and vote are recorded in the minutes.'
          },
          {
            id: 'q-8-2-5',
            type: 'fill-blank',
            question: 'A ballot vote is also called a ___ vote because it protects voter privacy.',
            correctAnswer: 'secret',
            explanation: 'A ballot vote is a secret written vote that protects voter privacy.'
          }
        ]
      },
      {
        id: 'lesson-8-3',
        title: 'Minutes of a Meeting',
        description: 'What must be included, corrections, and approval.',
        icon: '📄',
        content: [
          {
            type: 'text',
            title: 'The Minutes',
            body: 'Minutes are the official written record of the proceedings of a meeting. They are prepared by the Secretary and are a legal document of what was DONE, not what was SAID.'
          },
          {
            type: 'list',
            title: 'What MUST Be Included in Minutes',
            items: [
              'Name of the organization and type of meeting (regular, special, etc.)',
              'Date, time, and place of the meeting',
              'Name of the presiding officer and Secretary (or their substitutes)',
              'Whether a quorum was present',
              'Approval of (or corrections to) the previous minutes',
              'All main motions: exact wording, who made them, and the result (adopted/lost)',
              'All points of order and appeals, with the chair\'s ruling',
              'The time of adjournment',
              'Signature of the Secretary'
            ]
          },
          {
            type: 'list',
            title: 'What Should NOT Be in Minutes',
            items: [
              'Personal opinions of the Secretary',
              'Detailed summaries of debate or what members said',
              'The name of who seconded a motion (unless in a small board)',
              'Motions that were withdrawn',
              'Flowery language or editorializing'
            ]
          },
          {
            type: 'text',
            title: 'Correcting and Approving Minutes',
            body: 'Minutes are usually read (or distributed) at the next meeting. The President asks: "Are there any corrections to the minutes?" Corrections are made by general consent. Then: "The minutes stand approved as read" (or "as corrected"). Minutes can be corrected at ANY time, even years later, by a motion to Amend Something Previously Adopted (2/3 vote or majority with notice).'
          },
          {
            type: 'highlight',
            variant: 'important',
            body: 'Minutes record what was DONE, not what was SAID. They are a record of actions, not a transcript of discussion.'
          }
        ],
        questions: [
          {
            id: 'q-8-3-1',
            type: 'true-false',
            question: 'Minutes should include detailed summaries of what members said during debate.',
            correctAnswer: 'false',
            explanation: 'Minutes record what was DONE, not what was SAID. They should not include debate summaries.'
          },
          {
            id: 'q-8-3-2',
            type: 'multiple-choice',
            question: 'Who prepares the minutes?',
            options: ['President', 'Vice President', 'Secretary', 'Reporter'],
            correctAnswer: 'Secretary',
            explanation: 'The Secretary is responsible for preparing the minutes of the meeting.'
          },
          {
            id: 'q-8-3-3',
            type: 'multiple-choice',
            question: 'Which of the following MUST be in the minutes?',
            options: ['Who seconded each motion', 'Detailed debate summaries', 'Exact wording of main motions and their results', 'Secretary\'s personal opinions'],
            correctAnswer: 'Exact wording of main motions and their results',
            explanation: 'Minutes must include all main motions with exact wording, who made them, and the result.'
          },
          {
            id: 'q-8-3-4',
            type: 'true-false',
            question: 'Minutes can be corrected at any time, even years later.',
            correctAnswer: 'true',
            explanation: 'Minutes can be corrected at any time using Amend Something Previously Adopted (2/3 vote or majority with notice).'
          },
          {
            id: 'q-8-3-5',
            type: 'fill-blank',
            question: 'After corrections, the President says "The minutes stand ___ as corrected."',
            correctAnswer: 'approved',
            explanation: 'The President declares "The minutes stand approved as read" or "as corrected."'
          },
          {
            id: 'q-8-3-6',
            type: 'multiple-choice',
            question: 'Which of the following should NOT be included in minutes?',
            options: ['Date and time of meeting', 'Whether quorum was present', 'The name of who seconded a motion', 'Exact wording of main motions'],
            correctAnswer: 'The name of who seconded a motion',
            explanation: 'The name of who seconded a motion is generally NOT included in minutes (except in small boards).'
          }
        ]
      }
    ]
  }
];

export const totalLessons = units.reduce((sum, unit) => sum + unit.lessons.length, 0);
export const totalQuestions = units.reduce(
  (sum, unit) => sum + unit.lessons.reduce((lSum, lesson) => lSum + lesson.questions.length, 0),
  0
);
