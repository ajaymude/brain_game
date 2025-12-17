import { useState } from 'react';
import { GameContext } from './context/GameContext';
import GameCard from './components/GameCard';
import MemoryGame from './games/MemoryGame';
import NumberSequence from './games/NumberSequence';
import ColorRush from './games/ColorRush';
import MathSprint from './games/MathSprint';
import TowerOfHanoi from './games/TowerOfHanoi';
import ReactionTime from './games/ReactionTime';
import NBackGame from './games/NBackGame';
import SlidingPuzzle from './games/SlidingPuzzle';
import FindOddOne from './games/FindOddOne';
import SimonSays from './games/SimonSays';
import WhackAMole from './games/WhackAMole';
import AnagramSolver from './games/AnagramSolver';
import VisualSearch from './games/VisualSearch';
import ProgressiveMemory from './games/ProgressiveMemory';
import Sudoku from './games/Sudoku';
import WordLadder from './games/WordLadder';
import GoNoGo from './games/GoNoGo';
import DigitSpan from './games/DigitSpan';
import PatternRecognition from './games/PatternRecognition';
import CardMemory from './games/CardMemory';
import StroopTest from './games/StroopTest';
import WordMemory from './games/WordMemory';
import MentalRotation from './games/MentalRotation';
import RhymeMatch from './games/RhymeMatch';
import MissingNumbers from './games/MissingNumbers';
import ColorMatching from './games/ColorMatching';
import VerbalFluency from './games/VerbalFluency';
import QuickMath from './games/QuickMath';
import TypingSpeed from './games/TypingSpeed';
import TaskSwitching from './games/TaskSwitching';
import DualNBack from './games/DualNBack';
import SynonymFinder from './games/SynonymFinder';
import SpeedClick from './games/SpeedClick';
import NumberBonds from './games/NumberBonds';
import LetterSequence from './games/LetterSequence';
import MemoryGrid from './games/MemoryGrid';
import VisualComparison from './games/VisualComparison';
import SymbolMatch from './games/SymbolMatch';
import ShapeShifter from './games/ShapeShifter';
import EquationSolver from './games/EquationSolver';
import MazeRunner from './games/MazeRunner';
import Concentration from './games/Concentration';
import OddEvenSort from './games/OddEvenSort';
import CopyPattern from './games/CopyPattern';
import PrimeNumbers from './games/PrimeNumbers';
import Fractions from './games/Fractions';
import WordAssociation from './games/WordAssociation';
import PercentageCalc from './games/PercentageCalc';
import SameOrDifferent from './games/SameOrDifferent';
import CountingGame from './games/CountingGame';
import Comparisons from './games/Comparisons';
import BackwardsSpelling from './games/BackwardsSpelling';
import Multiples from './games/Multiples';
import FlashMemory from './games/FlashMemory';
import AlphaOrder from './games/AlphaOrder';
import DigitReversal from './games/DigitReversal';
import FractionCompare from './games/FractionCompare';
import WordChain from './games/WordChain';
import ShapeCounter from './games/ShapeCounter';
import LogicGates from './games/LogicGates';
import ColorSequence from './games/ColorSequence';
import ImpulseControl from './games/ImpulseControl';
import MirrorMatch from './games/MirrorMatch';
import SequenceRecall from './games/SequenceRecall';
import SpotChanges from './games/SpotChanges';
import ClockReading from './games/ClockReading';
import GreaterSum from './games/GreaterSum';
import MentalMath from './games/MentalMath';
import BlinkFocus from './games/BlinkFocus';
import Divisibility from './games/Divisibility';
import RapidAddition from './games/RapidAddition';
import TimeTables from './games/TimeTables';
import RhythmTapper from './games/RhythmTapper';
import Factorials from './games/Factorials';
import SquareRoots from './games/SquareRoots';
import OrderedRecall from './games/OrderedRecall';
import HigherLower from './games/HigherLower';
import PatternMatch from './games/PatternMatch';
import RomanNumerals from './games/RomanNumerals';
import Averages from './games/Averages';
import SymmetryTest from './games/SymmetryTest';
import DirectionMemory from './games/DirectionMemory';
import QuickSort from './games/QuickSort';
import QuickCount from './games/QuickCount';
import AngleMath from './games/AngleMath';
import EvenOdd from './games/EvenOdd';
import LetterCount from './games/LetterCount';
import NumberRange from './games/NumberRange';
import PositionMemory from './games/PositionMemory';
import SpeedReading from './games/SpeedReading';
import ColorMixer from './games/ColorMixer';
import DoubleDigits from './games/DoubleDigits';
import TrueFalse from './games/TrueFalse';
import MissingLetter from './games/MissingLetter';
import ShapeFinder from './games/ShapeFinder';
import MoneyMath from './games/MoneyMath';
import SkipCount from './games/SkipCount';
import Rounding from './games/Rounding';
import BigSmall from './games/BigSmall';
import OddOneOut from './games/OddOneOut';
import SequenceNext from './games/SequenceNext';
import VowelCount from './games/VowelCount';
import FastFingers from './games/FastFingers';
import NextNumber from './games/NextNumber';
import './App.css';

const games = [
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards',
    category: 'Memory',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: MemoryGame,
    benefits: {
      skills: 'Visual memory, Concentration, Pattern recognition',
      brainAreas: 'Hippocampus (memory formation), Prefrontal cortex (focus), Visual cortex',
      howToPlay: 'Click cards to reveal them, find matching pairs by remembering their positions',
      importance: 'Strengthens short-term memory and concentration - essential for learning, work tasks, and daily activities'
    }
  },
  {
    id: 'sequence',
    title: 'Number Sequence',
    description: 'Find the pattern and complete the sequence',
    category: 'Logic',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: NumberSequence,
    benefits: {
      skills: 'Pattern recognition, Logical reasoning, Analytical thinking',
      brainAreas: 'Prefrontal cortex (problem solving), Parietal lobe (number processing)',
      howToPlay: 'Analyze the number sequence, identify the pattern, predict the next number',
      importance: 'Develops logical thinking and pattern detection - critical for math, programming, and strategic planning'
    }
  },
  {
    id: 'color',
    title: 'Color Rush',
    description: 'Quick! Does the word match the color?',
    category: 'Speed',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: ColorRush,
    benefits: {
      skills: 'Cognitive flexibility, Attention control, Processing speed',
      brainAreas: 'Anterior cingulate cortex (conflict resolution), Prefrontal cortex (inhibition)',
      howToPlay: 'Quickly identify if the word name matches its color, ignore conflicting information',
      importance: 'Trains the Stroop effect - improves focus, reduces distractions, enhances multitasking ability'
    }
  },
  {
    id: 'math',
    title: 'Math Sprint',
    description: 'Solve math problems before time runs out',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: MathSprint,
    benefits: {
      skills: 'Mental arithmetic, Processing speed, Quick decision making, Numerical fluency',
      brainAreas: 'Parietal lobe (mathematical thinking), Prefrontal cortex (executive function)',
      howToPlay: 'Solve arithmetic problems as quickly as possible under time pressure',
      importance: 'Sharpens mental math skills - useful for finance, shopping, engineering, and everyday calculations'
    }
  },
  {
    id: 'hanoi',
    title: 'Tower of Hanoi',
    description: 'Classic puzzle - move all disks to the right tower',
    category: 'Problem Solving',
    icon: '🗼',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: TowerOfHanoi,
    benefits: {
      skills: 'Strategic planning, Problem solving, Recursive thinking, Spatial reasoning',
      brainAreas: 'Prefrontal cortex (planning), Parietal lobe (spatial processing)',
      howToPlay: 'Move all disks from left to right tower, one at a time, never placing larger disk on smaller',
      importance: 'Classic algorithm training - builds systematic thinking used in computer science and complex problem solving'
    }
  },
  {
    id: 'reaction',
    title: 'Reaction Time',
    description: 'Test how fast you can react to visual stimuli',
    category: 'Speed',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: ReactionTime,
    benefits: {
      skills: 'Visual processing speed, Motor response time, Alertness, Quick reflexes',
      brainAreas: 'Visual cortex, Motor cortex, Cerebellum (coordination)',
      howToPlay: 'Click as fast as possible when you see the stimulus appear on screen',
      importance: 'Improves reflexes and response time - essential for driving, sports, gaming, and emergency situations'
    }
  },
  {
    id: 'nback',
    title: 'N-Back Memory',
    description: 'Scientific working memory training game',
    category: 'Working Memory',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: NBackGame,
    benefits: {
      skills: 'Working memory capacity, Sustained attention, Cognitive control, Information updating',
      brainAreas: 'Dorsolateral prefrontal cortex (working memory), Parietal cortex',
      howToPlay: 'Remember if current stimulus matches the one N steps back in the sequence',
      importance: 'Scientifically proven to increase fluid intelligence and working memory - crucial for learning and cognition'
    }
  },
  {
    id: 'sliding',
    title: 'Sliding Puzzle',
    description: 'Arrange tiles in order by sliding them',
    category: 'Problem Solving',
    icon: '🧩',
    gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    component: SlidingPuzzle,
    benefits: {
      skills: 'Spatial reasoning, Strategic planning, Visual-spatial processing, Problem solving',
      brainAreas: 'Parietal lobe (spatial awareness), Prefrontal cortex (planning)',
      howToPlay: 'Slide tiles into the empty space to arrange them in numerical order',
      importance: 'Develops spatial thinking and sequential planning - useful for navigation, architecture, and logistics'
    }
  },
  {
    id: 'findodd',
    title: 'Find the Odd One',
    description: 'Quickly spot the item that doesn\'t belong',
    category: 'Attention',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    component: FindOddOne,
    benefits: {
      skills: 'Visual attention, Pattern detection, Selective attention, Anomaly detection',
      brainAreas: 'Visual cortex, Parietal lobe (attention networks)',
      howToPlay: 'Scan the grid quickly and click on the item that is different from the others',
      importance: 'Sharpens attention to detail - critical for quality control, proofreading, and detecting errors'
    }
  },
  {
    id: 'simon',
    title: 'Simon Says',
    description: 'Repeat the pattern of lights and sounds',
    category: 'Memory',
    icon: '💡',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: SimonSays,
    benefits: {
      skills: 'Auditory memory, Pattern retention, Sequential processing',
      brainAreas: 'Hippocampus (memory encoding), Auditory cortex, Prefrontal cortex',
      howToPlay: 'Watch and listen to the sequence, then repeat it exactly by clicking the colors',
      importance: 'Enhances sequential memory and attention - vital for following instructions and learning language'
    }
  },
  {
    id: 'progressive',
    title: 'Progressive Grid Memory',
    description: 'Remember sequences on expanding grids',
    category: 'Memory',
    icon: '📈',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    component: ProgressiveMemory,
    benefits: {
      skills: 'Visuospatial memory, Grid navigation, Pattern recall',
      brainAreas: 'Parietal lobe (spatial processing), Hippocampus (spatial map), Prefrontal cortex',
      howToPlay: 'Memorize the order of lighted grid squares and click them in the same sequence',
      importance: 'Strengthens spatial memory - useful for navigation, sports, and visualizing spatial relationships'
    }
  },
  {
    id: 'whack',
    title: 'Whack-a-Mole',
    description: 'Click the targets as fast as you can!',
    category: 'Speed',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: WhackAMole,
    benefits: {
      skills: 'Reaction time, Motor control, Visual vigilance, Hand-eye coordination',
      brainAreas: 'Motor cortex, Visual cortex, Cerebellum (fine motor control)',
      howToPlay: 'Click the moles immediately as they pop up, but avoid clicking bombs or empty holes',
      importance: 'Improves reflex speed and motor coordination - critical for gaming, driving, and quick physical responses'
    }
  },
  {
    id: 'anagram',
    title: 'Anagram Solver',
    description: 'Unscramble the letters to find words',
    category: 'Language',
    icon: '🔤',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: AnagramSolver,
    benefits: {
      skills: 'Vocabulary, Phonological processing, Verbal fluency, Pattern manipulation',
      brainAreas: 'Broca\'s area (speech production), Wernicke\'s area (comprehension), Temporal lobe',
      howToPlay: 'Rearrange the scrambled letters to form a valid dictionary word',
      importance: 'Expands vocabulary and linguistic flexibility - enhances communication, writing, and reading comprehension'
    }
  },
  {
    id: 'visual',
    title: 'Visual Search',
    description: 'Find all target symbols in the grid',
    category: 'Attention',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: VisualSearch,
    benefits: {
      skills: 'Selective attention, Visual scanning, Pattern recognition, Distractor suppression',
      brainAreas: 'Visual cortex, Parietal lobe (spatial attention), Frontal eye fields',
      howToPlay: 'Scan the grid to find specific target items while ignoring similar-looking distractors',
      importance: 'Improves ability to filter information - key for finding lost items, reading, and analyzing data'
    }
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Fill the 9×9 grid with logic and strategy',
    category: 'Logic',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Sudoku,
    benefits: {
      skills: 'Logical deduction, Strategic planning, Working memory, Problem solving',
      brainAreas: 'Prefrontal cortex (logic & planning), Parietal lobe (numerical processing)',
      howToPlay: 'Fill the grid so every row, column, and block contains digits 1-9 without repetition',
      importance: 'Builds strong logical reasoning frameworks - exercises the brain\'s executive functions'
    }
  },
  {
    id: 'wordladder',
    title: 'Word Ladder',
    description: 'Transform one word into another, one letter at a time',
    category: 'Language',
    icon: '🪜',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: WordLadder,
    benefits: {
      skills: 'Vocabulary, Semantic flexibility, Planning, Verbal reasoning',
      brainAreas: 'Language centers, Prefrontal cortex (planning sequence)',
      howToPlay: 'Change one letter at a time to create a new valid word, linking start word to end word',
      importance: 'Enhances verbal problem solving and planning - helps in finding connections between concepts'
    }
  },
  {
    id: 'gonogo',
    title: 'Go / No-Go Task',
    description: 'Test your response inhibition and control',
    category: 'Executive Function',
    icon: '🚦',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: GoNoGo,
    benefits: {
      skills: 'Inhibitory control, Impulse regulation, Attention, Decision making',
      brainAreas: 'Prefrontal cortex (inhibition), Basal ganglia (action selection)',
      howToPlay: 'Press space/click for "Go" signals, but do nothing for "No-Go" signals',
      importance: 'Critical for self-regulation and impulse control - aids in patience and thoughtful decision making'
    }
  },
  {
    id: 'digitspan',
    title: 'Digit Span',
    description: 'Test how many digits you can remember',
    category: 'Working Memory',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: DigitSpan,
    benefits: {
      skills: 'Auditory/Visual working memory, Sequencing, Concentration',
      brainAreas: 'Dorsolateral prefrontal cortex, Inferior parietal lobule',
      howToPlay: 'Memorize the sequence of digits shown and recall them in correct order',
      importance: 'A core measure of fluid intelligence and working memory capacity - essential for complex thinking'
    }
  },
  {
    id: 'pattern',
    title: 'Pattern Recognition',
    description: 'Identify the next item in visual patterns',
    category: 'Logic',
    icon: '🔮',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: PatternRecognition,
    benefits: {
      skills: 'Inductive reasoning, Rule detection, Fluid intelligence, Visual analysis',
      brainAreas: 'Prefrontal cortex (rule inference), Parietal cortex (integration)',
      howToPlay: 'Analyze the sequence of shapes to identify the rule, then select the next shape',
      importance: 'Fundamental for math, science, and understanding complex systems and relationships'
    }
  },
  {
    id: 'cardmemory',
    title: 'Card Memory',
    description: 'Remember which cards were shown from a deck',
    category: 'Memory',
    icon: '🃏',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: CardMemory,
    benefits: {
      skills: 'Short-term visual memory, Concentration, Serial recall',
      brainAreas: 'Hippocampus (encoding), Prefrontal cortex (maintenance), Visual cortex',
      howToPlay: 'Watch the sequence of cards shown from the deck, then identify which ones appeared',
      importance: 'Tests limits of short-term memory - crucial for learning new information and everyday tasks'
    }
  },
  {
    id: 'stroop',
    title: 'Stroop Test',
    description: 'Select the color, not the word - test cognitive interference!',
    category: 'Attention',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: StroopTest,
    benefits: {
      skills: 'Cognitive control, Selective attention, Response inhibition, Conflict resolution',
      brainAreas: 'Anterior cingulate cortex (conflict monitoring), Dorsolateral prefrontal cortex',
      howToPlay: 'Identify the ink color of the word while ignoring the word\'s meaning (e.g., word "BLUE" in red ink)',
      importance: 'The gold standard for testing executive function and ability to inhibit automatic responses'
    }
  },
  {
    id: 'wordmemory',
    title: 'Word Memory',
    description: 'Memorize and recall a list of words',
    category: 'Memory',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: WordMemory,
    benefits: {
      skills: 'Verbal memory, Semantic encoding, Rehearsal strategies',
      brainAreas: 'Hippocampus, Temporal lobe (semantic memory), Left prefrontal cortex',
      howToPlay: 'Read and memorize the list of words, then recall or identify them correctly',
      importance: 'Strengthens verbal recall - essential for academic success and language learning'
    }
  },
  {
    id: 'mentalrotation',
    title: 'Mental Rotation',
    description: 'Visualize shapes rotated in space',
    category: 'Visual & Spatial',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: MentalRotation,
    benefits: {
      skills: 'Spatial manipulation, Visualization, Mental transformation',
      brainAreas: 'Parietal lobes (superior parietal lobule), Motor cortex (mental simulation)',
      howToPlay: 'Compare two shapes and determine if they are the same shape rotated or different shapes',
      importance: 'Predicts success in STEM fields - vital for engineering, architecture, and navigation'
    }
  },
  {
    id: 'rhymematch',
    title: 'Rhyme Match',
    description: 'Find words that rhyme with the target',
    category: 'Language',
    icon: '🎵',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: RhymeMatch,
    benefits: {
      skills: 'Phonological awareness, Auditory processing, Verbal similarity detection',
      brainAreas: 'Superior temporal gyrus (auditory processing), Inferior frontal gyrus',
      howToPlay: 'Select words from the options that rhyme with the target word',
      importance: 'Fundamental for reading acquisition and language development'
    }
  },
  {
    id: 'missingnumbers',
    title: 'Missing Numbers',
    description: 'Find the missing number in the sequence',
    category: 'Logic',
    icon: '🔍',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: MissingNumbers,
    benefits: {
      skills: 'Numerical reasoning, Pattern completion, Quantitative analysis',
      brainAreas: 'Intraparietal sulcus (number magnitude), Prefrontal cortex',
      howToPlay: 'Analyze the numerical sequence to determine the rule and fill in the missing gap',
      importance: 'Enhances mathematical logic and problem-solving patterns'
    }
  },
  {
    id: 'colormatching',
    title: 'Color Matching',
    description: 'Find all instances of the target color',
    category: 'Attention',
    icon: '🌈',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: ColorMatching,
    benefits: {
      skills: 'Visual discrimination, Perceptual speed, Feature search',
      brainAreas: 'Visual cortex (V4 color area), Fusiform gyrus, Parietal cortex',
      howToPlay: 'Quickly click all items that match the specific target shade of color',
      importance: 'Trains fine visual discrimination - useful for art, design, and detailed visual work'
    }
  },
  {
    id: 'verbalfluency',
    title: 'Verbal Fluency',
    description: 'Name as many items in a category as you can',
    category: 'Language',
    icon: '💬',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: VerbalFluency,
    benefits: {
      skills: 'Lexical retrieval, Semantic memory acess, Executive function',
      brainAreas: 'Left frontal lobe, Temporal lobe, Anterior cingulate',
      howToPlay: 'Type as many words as you can that belong to the given category within the time limit',
      importance: 'Measure of executive control over memory - improves ability to access vocabulary under pressure'
    }
  },
  {
    id: 'quickmath',
    title: 'Quick Math',
    description: 'Solve arithmetic problems rapidly',
    category: 'Math',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: QuickMath,
    benefits: {
      skills: 'Arithmetic fluency, Speed of processing, Numerical facts retrieval',
      brainAreas: 'Angular gyrus, Intraparietal sulcus, Prefrontal cortex',
      howToPlay: 'Solve simple math equations as fast as possible',
      importance: 'Builds automaticity in math facts - frees up working memory for complex problem solving'
    }
  },
  {
    id: 'typingspeed',
    title: 'Typing Speed',
    description: 'Test your typing speed and accuracy',
    category: 'Speed',
    icon: '⌨️',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: TypingSpeed,
    benefits: {
      skills: 'Fine motor skills, Psychomotor speed, Visuomotor integration',
      brainAreas: 'Motor cortex, Basal ganglia, Cerebellum',
      howToPlay: 'Type the displayed text accurately and quickly',
      importance: 'Essential modern skill - efficiency in digital communication and work'
    }
  },
  {
    id: 'taskswitching',
    title: 'Task Switching',
    description: 'Switch between different cognitive tasks',
    category: 'Executive Function',
    icon: '🔀',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: TaskSwitching,
    benefits: {
      skills: 'Cognitive flexibility, Set shifting, Multitasking ability, Executive control',
      brainAreas: 'Prefrontal cortex (rule maintenance), Parietal cortex, Basal ganglia',
      howToPlay: 'Switch sorting rules (e.g., color vs. shape) rapidly based on the changing cue',
      importance: 'Essential for multitasking and adapting to changing environments or requirements'
    }
  },
  {
    id: 'dualnback',
    title: 'Dual N-Back',
    description: 'Advanced working memory training with dual stimuli',
    category: 'Working Memory',
    icon: '🧬',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: DualNBack,
    benefits: {
      skills: 'Working memory upgrading, Divided attention, Fluid intelligence, Focus',
      brainAreas: 'Dorsolateral prefrontal cortex, Frontoparietal attention network',
      howToPlay: 'Track positions and sounds simultaneously, identifying matches N steps back in the sequence',
      importance: 'Scientifically linked to improvements in fluid intelligence and focus - highly challenging'
    }
  },
  {
    id: 'synonymfinder',
    title: 'Synonym Finder',
    description: 'Find words with similar meanings',
    category: 'Language',
    icon: '📖',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: SynonymFinder,
    benefits: {
      skills: 'Vocabulary depth, Semantic relations, Verbal fluency, Nuance understanding',
      brainAreas: 'Wernicke\'s area (language comprehension), Temporal lobe',
      howToPlay: 'Select the word from the options that has the most similar meaning to the target word',
      importance: 'Refines vocabulary usage and reading comprehension - aids in precise communication'
    }
  },
  {
    id: 'speedclick',
    title: 'Speed Click',
    description: 'Click the target as fast as you can',
    category: 'Speed',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: SpeedClick,
    benefits: {
      skills: 'Motor processing speed, Reaction time, Sustained attention',
      brainAreas: 'Motor cortex, Premotor cortex, Basal ganglia',
      howToPlay: 'Click the target button as many times as possible within the time limit',
      importance: 'Enhances pure psychomotor speed and endurance'
    }
  },
  {
    id: 'numberbonds',
    title: 'Number Bonds',
    description: 'Find pairs of numbers that make a target sum',
    category: 'Math',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: NumberBonds,
    benefits: {
      skills: 'Mental math, Numerical relations, Arithmetic automaticity, Composition of numbers',
      brainAreas: 'Intraparietal sulcus (numerical processing), Angular gyrus',
      howToPlay: 'Identify the missing number that, when added to the given number, equals the target sum',
      importance: 'Builds a solid foundation for complex arithmetic and algebra'
    }
  },
  {
    id: 'lettersequence',
    title: 'Letter Sequence',
    description: 'Complete the alphabetical pattern',
    category: 'Logic',
    icon: '🔤',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: LetterSequence,
    benefits: {
      skills: 'Inductive reasoning, Pattern recognition, Alphabetical knowledge',
      brainAreas: 'Prefrontal cortex (rule generation), Language processing areas',
      howToPlay: 'Determine the rule governing the sequence of letters and select the next one',
      importance: 'Enhances logical reasoning applied to verbal/symbolic material'
    }
  },
  {
    id: 'memorygrid',
    title: 'Memory Grid',
    description: 'Remember positions in an expanding grid',
    category: 'Memory',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: MemoryGrid,
    benefits: {
      skills: 'Visuospatial short-term memory, Pattern recall, Spatial attention',
      brainAreas: 'Right parietal lobe (spatial processing), Hippocampus',
      howToPlay: 'Memorize the locations of highlighted squares and click them after they disappear',
      importance: 'Critical for spatial navigation and remembering the location of objects'
    }
  },
  {
    id: 'visualcomparison',
    title: 'Visual Comparison',
    description: 'Compare sizes and make quick judgments',
    category: 'Visual & Spatial',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: VisualComparison,
    benefits: {
      skills: 'Size discrimination, Visual judgment, Decision speed, spatial estimation',
      brainAreas: 'Visual cortex, Parietal lobe (magnitude processing)',
      howToPlay: 'Quickly decide which of the two displayed shapes is larger or smaller',
      importance: 'Trains rapid visual assessment and judgment - useful for driving and sports'
    }
  },
  {
    id: 'symbolmatch',
    title: 'Symbol Match',
    description: 'Find all matching symbols in the grid',
    category: 'Attention',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: SymbolMatch,
    benefits: {
      skills: 'Visual scanning, Attention to detail, Pattern matching',
      brainAreas: 'Occipital lobe (visual processing), Fusiform gyrus',
      howToPlay: 'Scan the grid to find and select all instances of the specific target symbol',
      importance: 'Improves ability to finding visual details - helpful for proofreading and inspection tasks'
    }
  },
  {
    id: 'shapeshifter',
    title: 'Shape Shifter',
    description: 'Match shapes or colors based on instructions',
    category: 'Executive Function',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: ShapeShifter,
    benefits: {
      skills: 'Mental flexibility, Rule switching, Inhibition of old rules',
      brainAreas: 'Prefrontal cortex, Anterior cingulate cortex',
      howToPlay: 'Sort the falling object based on changing rules - sometimes by color, sometimes by shape',
      importance: 'Trains cognitive flexibility - key for adjusting to new situations and changing plans'
    }
  },
  {
    id: 'equationsolver',
    title: 'Equation Solver',
    description: 'Solve simple algebraic equations',
    category: 'Math',
    icon: '🧮',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: EquationSolver,
    benefits: {
      skills: 'Algebraic thinking, Problem solving, Logical deduction',
      brainAreas: 'Parietal lobe (calculation), Prefrontal cortex (rule application)',
      howToPlay: 'Find the value of the unknown variable X in simple algebraic equations',
      importance: 'Develops algebraic handling - essential for advanced math and logical problem solving'
    }
  },
  {
    id: 'mazerunner',
    title: 'Maze Runner',
    description: 'Navigate to the goal using arrow keys',
    category: 'Problem Solving',
    icon: '🗺️',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: MazeRunner,
    benefits: {
      skills: 'Spatial navigation, Planning, Foresight, Visuomotor control',
      brainAreas: 'Hippocampus (spatial map), Parietal lobe, Prefrontal cortex (path planning)',
      howToPlay: 'Navigate through the maze to reach the goal using the directional keys',
      importance: 'Enhances spatial reasoning and ability to plan paths - useful for driving and navigation'
    }
  },
  {
    id: 'concentration',
    title: 'Concentration',
    description: 'Match pairs by remembering card positions',
    category: 'Memory',
    icon: '🎴',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Concentration,
    benefits: {
      skills: 'Visual spatial memory, Location recall, Attention',
      brainAreas: 'Hippocampus (spatial memory), Right parietal cortex',
      howToPlay: 'Flip cards to find matching pairs, remembering location of seen cards',
      importance: 'Strengthens association between object and location - key for organizing items'
    }
  },
  {
    id: 'oddevensort',
    title: 'Odd/Even Sort',
    description: 'Sort numbers by odd or even',
    category: 'Logic',
    icon: '🔀',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: OddEvenSort,
    benefits: {
      skills: 'Number classification, Processing speed, Rapid decision making',
      brainAreas: 'Intraparietal sulcus (number sense), Prefrontal cortex (categorization)',
      howToPlay: 'Quickly sort the falling numbers into "Odd" or "Even" buckets',
      importance: 'Improves numerical fluency and rapid categorization skills'
    }
  },
  {
    id: 'copypattern',
    title: 'Copy Pattern',
    description: 'Watch and recreate visual patterns',
    category: 'Memory',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: CopyPattern,
    benefits: {
      skills: 'Visual reproduction, Short-term memory, Attention to detail',
      brainAreas: 'Occipital lobe (visual processing), Hand-eye coordination networks',
      howToPlay: 'Observe the grid pattern and then draw it exactly on the blank grid',
      importance: 'Enhances visual construction abilities and faithful reproduction of visual information'
    }
  },
  {
    id: 'primenumbers',
    title: 'Prime Numbers',
    description: 'Identify prime vs composite numbers',
    category: 'Math',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: PrimeNumbers,
    benefits: {
      skills: 'Number theory, Mental division, Mathematical reasoning',
      brainAreas: 'Prefrontal cortex (rule application), Parietal lobe',
      howToPlay: 'Decide if the displayed number is Prime (only divisible by 1 and self) or Composite',
      importance: 'Deepens understanding of number properties and multiplication/division facts'
    }
  },
  {
    id: 'fractions',
    title: 'Simplify Fractions',
    description: 'Reduce fractions to simplest form',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Fractions,
    benefits: {
      skills: 'Proportional reasoning, Division, Greatest Common Divisor',
      brainAreas: 'Intraparietal sulcus (magnitude comparison), Prefrontal cortex',
      howToPlay: 'Find the lowest common terms for the given fraction',
      importance: 'Essential for understanding ratios, proportions, and fair division in real life'
    }
  },
  {
    id: 'wordassociation',
    title: 'Word Association',
    description: 'Identify word relationships',
    category: 'Language',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: WordAssociation,
    benefits: {
      skills: 'Semantic association, Conceptual linking, Verbal creativity',
      brainAreas: 'Temporal lobe (semantic network), Inferior frontal gyrus',
      howToPlay: 'Choose the word that has the strongest or most logical connection to the prompt word',
      importance: 'Strengthens semantic networks - improves ability to link related concepts and ideas'
    }
  },
  {
    id: 'percentagecalc',
    title: 'Percentage Calculator',
    description: 'Calculate percentages quickly',
    category: 'Math',
    icon: '%',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: PercentageCalc,
    benefits: {
      skills: 'Mental calculation, Proportional thinking, Arithmetic speed',
      brainAreas: 'Parietal lobe (quantitative reasoning)',
      howToPlay: 'Calculate the percentage value of a number (e.g., 20% of 50)',
      importance: 'Highly practical skill for finance, shopping discounts, and tips'
    }
  },
  {
    id: 'sameordifferent',
    title: 'Same or Different',
    description: 'Compare shapes and colors rapidly',
    category: 'Visual & Spatial',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: SameOrDifferent,
    benefits: {
      skills: 'Perceptual speed, Visual comparison, Error checking',
      brainAreas: 'Visual cortex, Prefrontal cortex (decision making)',
      howToPlay: 'Look at two images and instantly decide if they are identical or different',
      importance: 'Enhances rapid visual processing and ability to spot errors/differences'
    }
  },
  {
    id: 'countinggame',
    title: 'Counting Game',
    description: 'Count the objects quickly',
    category: 'Math',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: CountingGame,
    benefits: {
      skills: 'Enumeration, Subitizing, Visual attention, Cardinality',
      brainAreas: 'Intraparietal sulcus (numerosity), Visual cortex',
      howToPlay: 'Count the displayed objects as fast as possible and enter the total',
      importance: 'Foundation for all numerical ability and mathematical confidence'
    }
  },
  {
    id: 'comparisons',
    title: 'Number Comparisons',
    description: 'Compare the numbers using >, <, or =',
    category: 'Math',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: Comparisons,
    benefits: {
      skills: 'Magnitude comparison, Symbolic reasoning, Quantitative judgment',
      brainAreas: 'Parietal lobe (magnitude processing), Prefrontal cortex',
      howToPlay: 'Determine relationships between numbers: Greater than, Less than, or Equal',
      importance: 'Builds intuition for number size and value relationships'
    }
  },
  {
    id: 'backwardsspelling',
    title: 'Backwards Spelling',
    description: 'Spell the word backwards',
    category: 'Language',
    icon: '🔠',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: BackwardsSpelling,
    benefits: {
      skills: 'Working memory manipulation, Visualization, Orthographic processing',
      brainAreas: 'Visual word form area, Dorsolateral prefrontal cortex (manipulation)',
      howToPlay: 'Visualize the word in your mind and type the letters in reverse order',
      importance: 'Highly effective exercise for working memory and mental visualization'
    }
  },
  {
    id: 'multiples',
    title: 'Multiples',
    description: 'Identify if a number is a multiple',
    category: 'Math',
    icon: '✖️',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Multiples,
    benefits: {
      skills: 'Multiplication facts, Divisibility rules, Pattern recognition',
      brainAreas: 'Angular gyrus (arithmetic facts), Prefrontal cortex',
      howToPlay: 'Quickly decide if the target number is a multiple of the base number',
      importance: 'Speeds up mental calculation, factoring, and algebraic simplification'
    }
  },
  {
    id: 'flashmemory',
    title: 'Flash Memory',
    description: 'Remember the items shown briefly',
    category: 'Memory',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: FlashMemory,
    benefits: {
      skills: 'Iconic memory, Visual persistence, Rapid encoding, Attention',
      brainAreas: 'Visual cortex, Hippocampus, Prefrontal cortex',
      howToPlay: 'Memorize the items that flash briefly on screen and recall them',
      importance: 'Trains speed of visual processing and immediate information capture'
    }
  },
  {
    id: 'alphaorder',
    title: 'Alphabetical Order',
    description: 'Put the letters in order',
    category: 'Language',
    icon: '🔤',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: AlphaOrder,
    benefits: {
      skills: 'Alphabetizing, Sequencing, Verbal ordering',
      brainAreas: 'Language cortex, Prefrontal cortex (sequencing)',
      howToPlay: 'Arrange the scrambled letters into correct alphabetical order',
      importance: 'Key organizational skill for sorting data, finding files, and using indices'
    }
  },
  {
    id: 'digitreversal',
    title: 'Digit Reversal',
    description: 'Reverse the sequence of digits',
    category: 'Working Memory',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    component: DigitReversal,
    benefits: {
      skills: 'Working memory manipulation, Sequencing, Attention',
      brainAreas: 'Dorsolateral prefrontal cortex (executive control), Parietal lobe',
      howToPlay: 'Memorize the sequence of numbers and type them out in reverse order',
      importance: 'A gold-standard cognitive test for working memory capacity and mental control'
    }
  },
  {
    id: 'fractioncompare',
    title: 'Fraction Compare',
    description: 'Which fraction is larger?',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: FractionCompare,
    benefits: {
      skills: 'Proportional reasoning, Magnitude estimation, Cross-multiplication',
      brainAreas: 'Intraparietal sulcus (ratio processing)',
      howToPlay: 'Determine which of the two fractions represents a larger value',
      importance: 'Advanced number sense - crucial for understanding probability and statistics'
    }
  },
  {
    id: 'wordchain',
    title: 'Word Chain',
    description: 'Form a chain of words',
    category: 'Language',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: WordChain,
    benefits: {
      skills: 'Vocabulary access, Phonological awareness, Verbal fluency',
      brainAreas: 'Broca\'s area, Wernicke\'s area, Temporal lobe',
      howToPlay: 'Create a new word that starts with the last letter of the previous word',
      importance: 'Enhances lexical access speed and connection between words'
    }
  },
  {
    id: 'shapecounter',
    title: 'Shape Counter',
    description: 'Count specific shapes in a group',
    category: 'Attention',
    icon: '🔷',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: ShapeCounter,
    benefits: {
      skills: 'Selective attention, Categorization, Visual counting, Distractor filtering',
      brainAreas: 'Visual cortex, Parietal lobe (spatial attention)',
      howToPlay: 'Count only the specific target shapes while ignoring other shapes',
      importance: 'Trains visual filtering and ability to find relevant data in noise'
    }
  },
  {
    id: 'logicgates',
    title: 'Logic Gates',
    description: 'Solve the logic gate puzzles',
    category: 'Logic',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: LogicGates,
    benefits: {
      skills: 'Boolean logic, Deductive reasoning, Rule integration',
      brainAreas: 'Prefrontal cortex (abstract reasoning), Parietal lobe',
      howToPlay: 'Determine if the output is True or False based on inputs and the gate (AND/OR/NOT)',
      importance: 'Computional thinking foundation - essential for programming and formal logic'
    }
  },
  {
    id: 'colorsequence',
    title: 'Color Sequence',
    description: 'Memorize color patterns',
    category: 'Memory',
    icon: '🌈',
    gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
    component: ColorSequence,
    benefits: {
      skills: 'Visual memory, Sequencing, Attention',
      brainAreas: 'Occipital lobe, Hippocampus, Prefrontal cortex',
      howToPlay: 'Watch the sequence of lighting colors and repeat it exactly',
      importance: 'Strengthens ability to recall visual sequences - useful for navigation and learning steps'
    }
  },
  {
    id: 'impulsecontrol',
    title: 'Impulse Control',
    description: 'Test your self-control',
    category: 'Executive Function',
    icon: '🛑',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: ImpulseControl,
    benefits: {
      skills: 'Inhibitory control, Reaction inhibition, Focus',
      brainAreas: 'Prefrontal cortex (inhibitory control), Basal ganglia',
      howToPlay: 'Click only on green "GO" signals, withhold action on red "STOP" signals',
      importance: 'Critical for managing impulses and thoughtful behavior'
    }
  },
  {
    id: 'mirrormatch',
    title: 'Mirror Match',
    description: 'Identify mirrored shapes',
    category: 'Visual & Spatial',
    icon: '🪞',
    gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
    component: MirrorMatch,
    benefits: {
      skills: 'Mental rotation, Spatial symmetry, Visual analysis',
      brainAreas: 'Parietal lobe, Extrastriate visual areas',
      howToPlay: 'Identify the shape that is a perfect mirror reflection of the target',
      importance: 'Enhances understanding of spatial orientation and symmetry'
    }
  },
  {
    id: 'sequencerecall',
    title: 'Sequence Recall',
    description: 'Remember the order of items',
    category: 'Memory',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: SequenceRecall,
    benefits: {
      skills: 'Sequential memory, Order processing, Serial recall',
      brainAreas: 'Hippocampus (encoding order), Frontal cortex',
      howToPlay: 'Watch the random order of items appearing and select them in the same order',
      importance: 'Important for remembering phone numbers, passwords, and instructions'
    }
  },
  {
    id: 'spotchanges',
    title: 'Spot Changes',
    description: 'Find differences between images',
    category: 'Attention',
    icon: '🧐',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: SpotChanges,
    benefits: {
      skills: 'Change blindness awareness, Visual attention, Comparison',
      brainAreas: 'Visual cortex (V4), Parietal visual areas',
      howToPlay: 'Compare two similar images and click on the subtle differences between them',
      importance: 'Improves observation skills and attention to detail'
    }
  },
  {
    id: 'clockreading',
    title: 'Clock Reading',
    description: 'Read the time on the clock',
    category: 'Math',
    icon: '⏰',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: ClockReading,
    benefits: {
      skills: 'Time perception, Analog scale reading, Modular arithmetic',
      brainAreas: 'Parietal lobe (spatial/math), Prefrontal cortex',
      howToPlay: 'Read the time shown on the analog clock face and enter it digitally',
      importance: 'Essential life skill for time management and schedule planning'
    }
  },
  {
    id: 'greatersum',
    title: 'Greater Sum',
    description: 'Which sum is larger?',
    category: 'Math',
    icon: '➕',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    component: GreaterSum,
    benefits: {
      skills: 'Mental addition, Magnitude comparison, Calculation speed',
      brainAreas: 'Intraparietal sulcus, Angular gyrus',
      howToPlay: 'Quickly calculate sums of two expressions and click the one that is larger',
      importance: 'Enhances rapid mental math and estimation skills'
    }
  },
  {
    id: 'mentalmath',
    title: 'Mental Math',
    description: 'Solve math problems in your head',
    category: 'Math',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: MentalMath,
    benefits: {
      skills: 'Arithmetic, Working memory, Calculation, Focus',
      brainAreas: 'Frontal (working memory) and Parietal (math) networks',
      howToPlay: 'Solve multi-step arithmetic problems without writing anything down',
      importance: 'Daily necessity for shopping, budgeting, and quick problem solving'
    }
  },
  {
    id: 'blinkfocus',
    title: 'Blink Focus',
    description: 'Test your focus and reaction speed',
    category: 'Attention',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: BlinkFocus,
    benefits: {
      skills: 'Sustained attention, Vigilance, Inhibitory control',
      brainAreas: 'Prefrontal cortex, Brainstem arousal systems',
      howToPlay: 'Focus on the center and react only when the specific visual cue appears',
      importance: 'Trains ability to maintain focus over time without becoming distracted'
    }
  },
  {
    id: 'divisibility',
    title: 'Divisibility',
    description: 'Test divisibility rules',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: Divisibility,
    benefits: {
      skills: 'Number properties, Division rules, Pattern recognition',
      brainAreas: 'Prefrontal cortex (rule application), Parietal lobe',
      howToPlay: 'Determine if the displayed number is evenly divisible by the target divisor',
      importance: 'Fundamental for number theory, simplifying fractions, and factoring'
    }
  },
  {
    id: 'rapidaddition',
    title: 'Rapid Addition',
    description: 'Timed addition practice',
    category: 'Math',
    icon: '➕',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: RapidAddition,
    benefits: {
      skills: 'Addition fluency, Processing speed, Mental math',
      brainAreas: 'Intraparietal sulcus, Angular gyrus',
      howToPlay: 'Solve the addition problems as quickly as possible within the time limit',
      importance: 'Fundamental skill for all higher-level math and daily calculations'
    }
  },
  {
    id: 'timetables',
    title: 'Times Tables',
    description: 'Practice multiplication tables',
    category: 'Math',
    icon: '✖️',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: TimeTables,
    benefits: {
      skills: 'Multiplication facts, Rote memory, Numerical fluency',
      brainAreas: 'Hippocampus (fact retrieval), Language language areas',
      howToPlay: 'Answer the multiplication questions correctly to master your times tables',
      importance: 'Critical for advanced math, engineering, science, and everyday estimation'
    }
  },
  {
    id: 'rhythmtapper',
    title: 'Rhythm Tapper',
    description: 'Remember rhythm patterns',
    category: 'Memory',
    icon: '🎵',
    gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
    component: RhythmTapper,
    benefits: {
      skills: 'Auditory memory, Temporal processing, Motor synchronization',
      brainAreas: 'Auditory cortex, Cerebellum (timing), Supplemental motor area',
      howToPlay: 'Listen to the rhythm pattern and tap it back exactly in time',
      importance: 'Enhances temporal processing and auditory-motor coordination'
    }
  },
  {
    id: 'factorials',
    title: 'Factorials',
    description: 'Calculate factorials',
    category: 'Math',
    icon: '❗',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: Factorials,
    benefits: {
      skills: 'Multiplicative reasoning, Pattern recognition, Large number estimation',
      brainAreas: 'Prefrontal cortex (working memory), Parietal lobe',
      howToPlay: 'Calculate the factorial of the given number (e.g., 4! = 4×3×2×1)',
      importance: 'Builds understanding of permutations, combinations, and growth rates'
    }
  },
  {
    id: 'squareroots',
    title: 'Square Roots',
    description: 'Find perfect square roots',
    category: 'Math',
    icon: '√',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: SquareRoots,
    benefits: {
      skills: 'Inverse operations, Number sense, Estimation',
      brainAreas: 'Intraparietal sulcus, Prefrontal cortex',
      howToPlay: 'Identify the square root of the displayed perfect square number',
      importance: 'Key concept for algebra, geometry, and physics'
    }
  },
  {
    id: 'orderedrecall',
    title: 'Ordered Recall',
    description: 'Remember words in sequence',
    category: 'Memory',
    icon: '📝',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: OrderedRecall,
    benefits: {
      skills: 'Verbal working memory, Serial order memory, Rehearsal',
      brainAreas: 'Hippocampus, Left prefrontal cortex (Broca\'s area)',
      howToPlay: 'Memorize the list of words and recall them in the exact order presented',
      importance: 'Vital for following multi-step instructions and memorizing lists'
    }
  },
  {
    id: 'higherlower',
    title: 'Higher or Lower',
    description: 'Number prediction game',
    category: 'Logic',
    icon: '🎲',
    gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    component: HigherLower,
    benefits: {
      skills: 'Probability estimation, Logical inference, Decision making',
      brainAreas: 'Frontopolar cortex, Anterior cingulate cortex',
      howToPlay: 'Guess if the next number will be higher or lower than the current one',
      importance: 'Trains ability to estimate probabilities and make logical predictions'
    }
  },
  {
    id: 'patternmatch',
    title: 'Pattern Match',
    description: 'Match symbol patterns',
    category: 'Visual & Spatial',
    icon: '🎨',
    gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
    component: PatternMatch,
    benefits: {
      skills: 'Visual pattern recognition, Template matching, Attention to detail',
      brainAreas: 'Visual cortex, Fusiform face area (pattern areas)',
      howToPlay: 'Find the symbol pattern that exactly matches the target pattern',
      importance: 'Fundamental for reading graphs, maps, and identifying objects'
    }
  },
  {
    id: 'romannumerals',
    title: 'Roman Numerals',
    description: 'Convert Roman to Arabic',
    category: 'Math',
    icon: 'Ⅰ',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: RomanNumerals,
    benefits: {
      skills: 'Symbolic translation, Historical number systems, additive/subtractive logic',
      brainAreas: 'Visual word form area, Parietal lobe',
      howToPlay: 'Convert the Roman numeral displayed into its Arabic number equivalent',
      importance: 'Enhances cognitive flexibility by switching between number systems'
    }
  },
  {
    id: 'averages',
    title: 'Averages',
    description: 'Calculate mean values',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: Averages,
    benefits: {
      skills: 'Mean calculation, Data summarization, Division',
      brainAreas: 'Parietal lobe (calculation), Prefrontal cortex',
      howToPlay: 'Calculate the average (mean) of the set of numbers shown',
      importance: 'Essential for statistics, analyzing data, and understanding general trends'
    }
  },
  {
    id: 'symmetrytest',
    title: 'Symmetry Test',
    description: 'Identify symmetric patterns',
    category: 'Visual & Spatial',
    icon: '〰️',
    gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
    component: SymmetryTest,
    benefits: {
      skills: 'Symmetry perception, Pattern analysis, Visual closure',
      brainAreas: 'Extrastriate cortex, Loc (Lateral Occipital Complex)',
      howToPlay: 'Determine if the displayed shape or pattern has a line of symmetry',
      importance: 'Fundamental for object recognition and understanding biological forms'
    }
  },
  {
    id: 'directionmemory',
    title: 'Direction Memory',
    description: 'Remember arrow sequences',
    category: 'Memory',
    icon: '🧭',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: DirectionMemory,
    benefits: {
      skills: 'Visuospatial memory, Sequencing, Orientation',
      brainAreas: 'Hippocampus, Retrosplenial cortex (navigation), Parietal lobe',
      howToPlay: 'Memorize the sequence of arrow directions and repeat them',
      importance: 'Key skill for navigation, map reading, and giving directions'
    }
  },
  {
    id: 'quicksort',
    title: 'Quick Sort Check',
    description: 'Identify sorted sequences',
    category: 'Logic',
    icon: '📊',
    gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    component: QuickSort,
    benefits: {
      skills: 'Order verification, Numerical processing speed, Pattern checking',
      brainAreas: 'Prefrontal cortex (rule monitoring), Intraparietal sulcus',
      howToPlay: 'Quickly decide if the set of numbers is correctly sorted in ascending order',
      importance: 'Enhances ability to spot errors in data and organized systems'
    }
  },
  {
    id: 'quickcount',
    title: 'Quick Count',
    description: 'Count digits rapidly',
    category: 'Attention',
    icon: '🔢',
    gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
    component: QuickCount,
    benefits: {
      skills: 'Visual search, Digit recognition, Speed counting',
      brainAreas: 'Visual cortex, Number form area, Parietal lobe',
      howToPlay: 'Find and count how many times a specific digit appears in the grid',
      importance: 'Trains rapid visual scanning and quantitative data extraction'
    }
  },
  {
    id: 'anglemath',
    title: 'Angle Math',
    description: 'Find missing triangle angles',
    category: 'Math',
    icon: '📐',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: AngleMath,
    benefits: {
      skills: 'Geometry, Subtraction, Visual reasoning',
      brainAreas: 'Parietal lobe (spatial math), Prefrontal cortex',
      howToPlay: 'Calculate the missing angle in a triangle (knowing sum is 180°)',
      importance: 'Foundation for geometry, construction, and spatial estimation'
    }
  },
  {
    id: 'evenodd',
    title: 'Even or Odd Majority',
    description: 'Count even vs odd numbers',
    category: 'Logic',
    icon: '🔢',
    gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    component: EvenOdd,
    benefits: {
      skills: 'Categorization, Rapid counting, Comparison',
      brainAreas: 'Intraparietal sulcus, Prefrontal cortex (decision)',
      howToPlay: 'Determine if there are more Even or Odd numbers shown',
      importance: 'Enhances rapid numerical property recognition and crowd estimation'
    }
  },
  {
    id: 'lettercount',
    title: 'Letter Count',
    description: 'Count letter occurrences',
    category: 'Language',
    icon: '🔤',
    gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
    component: LetterCount,
    benefits: {
      skills: 'Letter recognition, Visual scanning, Spelling attention',
      brainAreas: 'Visual word form area, Occipital lobe',
      howToPlay: 'Count how many letters are in the displayed word',
      importance: 'Supports reading fluency and attention to orthographic detail'
    }
  },
  {
    id: 'numberrange',
    title: 'Number Range',
    description: 'Calculate differences',
    category: 'Math',
    icon: '➖',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: NumberRange,
    benefits: {
      skills: 'Subtraction, Magnitude estimation, Range calculation',
      brainAreas: 'Parietal lobe (numerical distance), Prefrontal cortex',
      howToPlay: 'Calculate the difference (range) between the largest and smallest numbers shown',
      importance: 'Useful for data analysis, budgeting, and estimation'
    }
  },
  {
    id: 'positionmemory',
    title: 'Position Memory',
    description: 'Remember item positions',
    category: 'Memory',
    icon: '📍',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: PositionMemory,
    benefits: {
      skills: 'Spatial location memory, Object-location binding',
      brainAreas: 'Hippocampus (spatial map), Parahippocampal cortex',
      howToPlay: 'Memorize the exact grid positions of the items and place them back correctly',
      importance: 'Critical for remembering where things are placed (keys, car, etc.)'
    }
  },
  {
    id: 'speedreading',
    title: 'Speed Reading',
    description: 'Remember words shown briefly',
    category: 'Attention',
    icon: '⚡',
    gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
    component: SpeedReading,
    benefits: {
      skills: 'Rapid visual processing, Whole-word reading, Short-term memory',
      brainAreas: 'Visual word form area, Angular gyrus',
      howToPlay: 'Read and remember words flashed on the screen at high speed',
      importance: 'Improves reading speed and rapid info absorption'
    }
  },
  {
    id: 'colormixer',
    title: 'Color Mixer',
    description: 'Identify mixed color results',
    category: 'Visual & Spatial',
    icon: '🎨',
    gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
    component: ColorMixer,
    benefits: {
      skills: 'Color theory, Visual prediction, Mental synthesis',
      brainAreas: 'Visual cortex (color processing), Prefrontal cortex',
      howToPlay: 'Predict the resulting color when two specific primary/secondary colors are mixed',
      importance: 'Enhances understanding of color relationships and mental visualization'
    }
  },
  {
    id: 'doubledigits',
    title: 'Double Digit Add',
    description: 'Add two-digit numbers quickly',
    category: 'Math',
    icon: '➕',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: DoubleDigits,
    benefits: {
      skills: 'Mental addition, Place value awareness, Carrying operations',
      brainAreas: 'Intraparietal sulcus, Angular gyrus',
      howToPlay: 'Mentally add two double-digit numbers and enter the correct sum',
      importance: 'Strengthens mental arithmetic for everyday calculations without a calculator'
    }
  },
  {
    id: 'truefalse',
    title: 'True or False',
    description: 'Quick fact verification',
    category: 'Logic',
    icon: '❓',
    gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    component: TrueFalse,
    benefits: {
      skills: 'Fact verification, General knowledge retrieval, Decision speed',
      brainAreas: 'Temporal lobe (semantic memory), Prefrontal cortex',
      howToPlay: 'Read the statement and quickly decide if it is True or False',
      importance: 'Tests speed of information retrieval and accuracy of knowledge'
    }
  },
  {
    id: 'missinglette',
    title: 'Missing Letter',
    description: 'Find the missing letter',
    category: 'Language',
    icon: '🔠',
    gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
    component: MissingLetter,
    benefits: {
      skills: 'Spelling, Word completion, Vocabulary',
      brainAreas: 'Visual word form area, Language areas',
      howToPlay: 'Identify the letter that correctly completes the incomplete word',
      importance: 'Reinforces spelling patterns and word recognition'
    }
  },
  {
    id: 'shapefinder',
    title: 'Shape Finder',
    description: 'Click all target shapes',
    category: 'Visual & Spatial',
    icon: '🔍',
    gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
    component: ShapeFinder,
    benefits: {
      skills: 'Visual search, Shape recognition, Selective attention',
      brainAreas: 'Visual cortex, Parietal lobe (spatial attention)',
      howToPlay: 'Find and click on all instances of the specific target shape hidden among others',
      importance: 'Improves efficiency in finding visual targets in cluttered environments'
    }
  },
  {
    id: 'moneymath',
    title: 'Money Math',
    description: 'Calculate change quickly',
    category: 'Math',
    icon: '💰',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: MoneyMath,
    benefits: {
      skills: 'Financial arithmetic, Subtraction/Addition, Decimal handling',
      brainAreas: 'Parietal lobe (calculation), Prefrontal cortex',
      howToPlay: 'Calculate the total value of coins or the correct change due',
      importance: 'Direct real-world application for handling money and shopping'
    }
  },
  {
    id: 'skipcount',
    title: 'Skip Counting',
    description: 'Continue number patterns',
    category: 'Math',
    icon: '🔢',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: SkipCount,
    benefits: {
      skills: 'Number patterns, Multiplicative thinking, Sequence prediction',
      brainAreas: 'Intraparietal sulcus, Prefrontal cortex',
      howToPlay: 'Fill in the next numbers by counting by 2s, 5s, 10s, etc.',
      importance: 'Builds number sense and prepares the brain for multiplication concepts'
    }
  },
  {
    id: 'rounding',
    title: 'Rounding Numbers',
    description: 'Round to nearest 10',
    category: 'Math',
    icon: '〰️',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: Rounding,
    benefits: {
      skills: 'Estimation, Number sense, Place value',
      brainAreas: 'Parietal lobe, Prefrontal cortex',
      howToPlay: 'Round the displayed number to the nearest 10, 100, or whole number',
      importance: 'Essential for quick mental estimation and checking calculation reasonableness'
    }
  },
  {
    id: 'bigsmall',
    title: 'Biggest Number',
    description: 'Find the largest number',
    category: 'Logic',
    icon: '🔝',
    gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
    component: BigSmall,
    benefits: {
      skills: 'Magnitude comparison, Rapid scanning, Decision making',
      brainAreas: 'Intraparietal sulcus (magnitude processing)',
      howToPlay: 'Scan the set of numbers and click on the one with the largest value',
      importance: 'Trains ability to quickly assess and compare numerical values'
    }
  },
  {
    id: 'oddoneout',
    title: 'Odd One Out',
    description: 'Find the different number',
    category: 'Logic',
    icon: '🎯',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: OddOneOut,
    benefits: {
      skills: 'Pattern recognition, Anomaly detection, Categorical reasoning',
      brainAreas: 'Prefrontal cortex (rule inference), Visual cortex',
      howToPlay: 'Identify the item or number that follows a different rule than the others',
      importance: 'Enhances logical reasoning and ability to spot exceptions/errors'
    }
  },
  {
    id: 'sequencenext',
    title: 'Sequence Next',
    description: 'Continue the sequence',
    category: 'Math',
    icon: '➡️',
    gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
    component: SequenceNext,
    benefits: {
      skills: 'Pattern recognition, Inductive reasoning, Mathematical logic',
      brainAreas: 'ROI (Regions of Interest) in parietal and prefrontal cortex',
      howToPlay: 'Identify the rule governing the sequence and determine the next number',
      importance: 'Fundamental for algebra, computer science, and logical problem solving'
    }
  },
  {
    id: 'vowelcount',
    title: 'Vowel Counter',
    description: 'Count vowels in words',
    category: 'Language',
    icon: '🅰️',
    gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
    component: VowelCount,
    benefits: {
      skills: 'Phonological awareness, Letter scanning, Rapid linguistic processing',
      brainAreas: 'Language areas (Wernicke\'s area), Visual word form area',
      howToPlay: 'Count the total number of vowels (A, E, I, O, U) in the displayed work',
      importance: 'Strengthens rapid word analysis and reading efficiency'
    }
  },
  {
    id: 'fastfingers',
    title: 'Fast Fingers',
    description: 'Type words as fast as you can',
    category: 'Speed',
    icon: '⌨️',
    gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
    component: FastFingers,
    benefits: {
      skills: 'Typing speed, Motor coordination, Visual-motor integration',
      brainAreas: 'Motor cortex, Cerebellum, Basal ganglia',
      howToPlay: 'Type the falling words exactly as they appear before they reach the bottom',
      importance: 'Essential dexterity skill for modern computer use and communication'
    }
  },
  {
    id: 'nextnumber',
    title: 'Next Number',
    description: 'What comes after?',
    category: 'Math',
    icon: '➕',
    gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
    component: NextNumber,
    benefits: {
      skills: 'Counting, Number sequencing, Simple addition',
      brainAreas: 'Intraparietal sulcus, Prefrontal cortex',
      howToPlay: 'Simply identify the number that follows the displayed number (n + 1)',
      importance: 'Basic numerical fluency and rapid processing of sequential data'
    }
  }
];

const categories = ['All', 'Memory', 'Logic', 'Speed', 'Math', 'Language', 'Problem Solving', 'Working Memory', 'Attention', 'Executive Function', 'Visual & Spatial'];

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGames = selectedCategory === 'All'
    ? games
    : games.filter(game => game.category === selectedCategory);



  if (currentGame) {
    const GameComponent = currentGame.component;
    return (
      <GameContext.Provider value={currentGame}>
        <GameComponent onBack={() => setCurrentGame(null)} />
      </GameContext.Provider>
    );
  }

  return (
    <div className="app">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title gradient-text fade-in">
            🧠 Brain Games
          </h1>
          <p className="hero-subtitle fade-in">
            Challenge your mind with fun and engaging brain training games
          </p>
        </div>
      </div>

      <div className="container">
        <div className="categories-section">
          <h2 className="section-title">Categories</h2>
          <div className="category-buttons">
            {categories.map(category => {
              const count = category === 'All'
                ? games.length
                : games.filter(game => game.category === category).length;

              return (
                <button
                  key={category}
                  className={`btn category- btn ${selectedCategory === category ? 'active' : 'btn-secondary'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="games-grid">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              category={game.category}
              icon={game.icon}
              gradient={game.gradient}
              onClick={() => setCurrentGame(game)}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="no-games">
            <p>No games found in this category</p>
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>More games coming soon! 🎮</p>
      </footer>
    </div>
  );
}

export default App;
