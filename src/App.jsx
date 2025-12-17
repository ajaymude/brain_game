import { useState } from 'react';
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
import './App.css';

const games = [
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards',
    category: 'Memory',
    icon: '🧠',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: MemoryGame
  },
  {
    id: 'sequence',
    title: 'Number Sequence',
    description: 'Find the pattern and complete the sequence',
    category: 'Logic',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: NumberSequence
  },
  {
    id: 'color',
    title: 'Color Rush',
    description: 'Quick! Does the word match the color?',
    category: 'Speed',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: ColorRush
  },
  {
    id: 'math',
    title: 'Math Sprint',
    description: 'Solve math problems before time runs out',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: MathSprint
  },
  {
    id: 'hanoi',
    title: 'Tower of Hanoi',
    description: 'Classic puzzle - move all disks to the right tower',
    category: 'Problem Solving',
    icon: '🗼',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: TowerOfHanoi
  },
  {
    id: 'reaction',
    title: 'Reaction Time',
    description: 'Test how fast you can react to visual stimuli',
    category: 'Speed',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: ReactionTime
  },
  {
    id: 'nback',
    title: 'N-Back Memory',
    description: 'Scientific working memory training game',
    category: 'Working Memory',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: NBackGame
  },
  {
    id: 'sliding',
    title: 'Sliding Puzzle',
    description: 'Arrange tiles in order by sliding them',
    category: 'Problem Solving',
    icon: '🧩',
    gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
    component: SlidingPuzzle
  },
  {
    id: 'findodd',
    title: 'Find the Odd One',
    description: 'Quickly spot the item that doesn\'t belong',
    category: 'Attention',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    component: FindOddOne
  },
  {
    id: 'simon',
    title: 'Simon Says',
    description: 'Repeat the pattern of lights and sounds',
    category: 'Memory',
    icon: '💡',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: SimonSays
  },
  {
    id: 'progressive',
    title: 'Progressive Grid Memory',
    description: 'Remember sequences on expanding grids',
    category: 'Memory',
    icon: '📈',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    component: ProgressiveMemory
  },
  {
    id: 'whack',
    title: 'Whack-a-Mole',
    description: 'Click the targets as fast as you can!',
    category: 'Speed',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: WhackAMole
  },
  {
    id: 'anagram',
    title: 'Anagram Solver',
    description: 'Unscramble the letters to find words',
    category: 'Language',
    icon: '🔤',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: AnagramSolver
  },
  {
    id: 'visual',
    title: 'Visual Search',
    description: 'Find all target symbols in the grid',
    category: 'Attention',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: VisualSearch
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Fill the 9×9 grid with logic and strategy',
    category: 'Logic',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Sudoku
  },
  {
    id: 'wordladder',
    title: 'Word Ladder',
    description: 'Transform one word into another, one letter at a time',
    category: 'Language',
    icon: '🪜',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: WordLadder
  },
  {
    id: 'gonogo',
    title: 'Go / No-Go Task',
    description: 'Test your response inhibition and control',
    category: 'Executive Function',
    icon: '🚦',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: GoNoGo
  },
  {
    id: 'digitspan',
    title: 'Digit Span',
    description: 'Test how many digits you can remember',
    category: 'Working Memory',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: DigitSpan
  },
  {
    id: 'pattern',
    title: 'Pattern Recognition',
    description: 'Identify the next item in visual patterns',
    category: 'Logic',
    icon: '🔮',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: PatternRecognition
  },
  {
    id: 'cardmemory',
    title: 'Card Memory',
    description: 'Remember which cards were shown from a deck',
    category: 'Memory',
    icon: '🃏',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: CardMemory
  },
  {
    id: 'stroop',
    title: 'Stroop Test',
    description: 'Select the color, not the word - test cognitive interference!',
    category: 'Attention',
    icon: '🎨',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: StroopTest
  },
  {
    id: 'wordmemory',
    title: 'Word Memory',
    description: 'Memorize and recall a list of words',
    category: 'Memory',
    icon: '📝',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: WordMemory
  },
  {
    id: 'mentalrotation',
    title: 'Mental Rotation',
    description: 'Visualize shapes rotated in space',
    category: 'Visual & Spatial',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: MentalRotation
  },
  {
    id: 'rhymematch',
    title: 'Rhyme Match',
    description: 'Find words that rhyme with the target',
    category: 'Language',
    icon: '🎵',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: RhymeMatch
  },
  {
    id: 'missingnumbers',
    title: 'Missing Numbers',
    description: 'Find the missing number in the sequence',
    category: 'Logic',
    icon: '🔍',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: MissingNumbers
  },
  {
    id: 'colormatching',
    title: 'Color Matching',
    description: 'Find all instances of the target color',
    category: 'Attention',
    icon: '🌈',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: ColorMatching
  },
  {
    id: 'verbalfluency',
    title: 'Verbal Fluency',
    description: 'Name as many items in a category as you can',
    category: 'Language',
    icon: '💬',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: VerbalFluency
  },
  {
    id: 'quickmath',
    title: 'Quick Math',
    description: 'Solve arithmetic problems rapidly',
    category: 'Math',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: QuickMath
  },
  {
    id: 'typingspeed',
    title: 'Typing Speed',
    description: 'Test your typing speed and accuracy',
    category: 'Speed',
    icon: '⌨️',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    component: TypingSpeed
  },
  {
    id: 'taskswitching',
    title: 'Task Switching',
    description: 'Switch between different cognitive tasks',
    category: 'Executive Function',
    icon: '🔀',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: TaskSwitching
  },
  {
    id: 'dualnback',
    title: 'Dual N-Back',
    description: 'Advanced working memory training with dual stimuli',
    category: 'Working Memory',
    icon: '🧬',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: DualNBack
  },
  {
    id: 'synonymfinder',
    title: 'Synonym Finder',
    description: 'Find words with similar meanings',
    category: 'Language',
    icon: '📖',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: SynonymFinder
  },
  {
    id: 'speedclick',
    title: 'Speed Click',
    description: 'Click the target as fast as you can',
    category: 'Speed',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: SpeedClick
  },
  {
    id: 'numberbonds',
    title: 'Number Bonds',
    description: 'Find pairs of numbers that make a target sum',
    category: 'Math',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: NumberBonds
  },
  {
    id: 'lettersequence',
    title: 'Letter Sequence',
    description: 'Complete the alphabetical pattern',
    category: 'Logic',
    icon: '🔤',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: LetterSequence
  },
  {
    id: 'memorygrid',
    title: 'Memory Grid',
    description: 'Remember positions in an expanding grid',
    category: 'Memory',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: MemoryGrid
  },
  {
    id: 'visualcomparison',
    title: 'Visual Comparison',
    description: 'Compare sizes and make quick judgments',
    category: 'Visual & Spatial',
    icon: '👁️',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: VisualComparison
  },
  {
    id: 'symbolmatch',
    title: 'Symbol Match',
    description: 'Find all matching symbols in the grid',
    category: 'Attention',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: SymbolMatch
  },
  {
    id: 'shapeshifter',
    title: 'Shape Shifter',
    description: 'Match shapes or colors based on instructions',
    category: 'Executive Function',
    icon: '🔄',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: ShapeShifter
  },
  {
    id: 'equationsolver',
    title: 'Equation Solver',
    description: 'Solve simple algebraic equations',
    category: 'Math',
    icon: '🧮',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: EquationSolver
  },
  {
    id: 'mazerunner',
    title: 'Maze Runner',
    description: 'Navigate to the goal using arrow keys',
    category: 'Problem Solving',
    icon: '🗺️',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: MazeRunner
  },
  {
    id: 'concentration',
    title: 'Concentration',
    description: 'Match pairs by remembering card positions',
    category: 'Memory',
    icon: '🎴',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Concentration
  },
  {
    id: 'oddevensort',
    title: 'Odd/Even Sort',
    description: 'Sort numbers by odd or even',
    category: 'Logic',
    icon: '🔀',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    component: OddEvenSort
  },
  {
    id: 'copypattern',
    title: 'Copy Pattern',
    description: 'Watch and recreate visual patterns',
    category: 'Memory',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    component: CopyPattern
  },
  {
    id: 'primenumbers',
    title: 'Prime Numbers',
    description: 'Identify prime vs composite numbers',
    category: 'Math',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: PrimeNumbers
  },
  {
    id: 'fractions',
    title: 'Simplify Fractions',
    description: 'Reduce fractions to simplest form',
    category: 'Math',
    icon: '➗',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Fractions
  },
  {
    id: 'wordassociation',
    title: 'Word Association',
    description: 'Identify word relationships',
    category: 'Language',
    icon: '🔗',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    component: WordAssociation
  },
  {
    id: 'percentagecalc',
    title: 'Percentage Calculator',
    description: 'Calculate percentages quickly',
    category: 'Math',
    icon: '%',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    component: PercentageCalc
  },
  {
    id: 'sameordifferent',
    title: 'Same or Different',
    description: 'Compare shapes and colors rapidly',
    category: 'Visual & Spatial',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    component: SameOrDifferent
  },
  {
    id: 'countinggame',
    title: 'Counting Game',
    description: 'Count objects quickly and accurately',
    category: 'Attention',
    icon: '🔢',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    component: CountingGame
  },
  {
    id: 'comparisons',
    title: 'Number Comparisons',
    description: 'Compare numbers using >, <, =',
    category: 'Math',
    icon: '⚖️',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    component: Comparisons
  },
  { id: 'backwardsspelling', title: 'Backwards Spelling', description: 'Spell words backwards', category: 'Language', icon: '🔄', gradient: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)', component: BackwardsSpelling },
  { id: 'multiples', title: 'Multiples', description: 'Identify multiples of numbers', category: 'Math', icon: '✖️', gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)', component: Multiples },
  { id: 'flashmemory', title: 'Flash Memory', description: 'Memorize sequences quickly', category: 'Memory', icon: '⚡', gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', component: FlashMemory },
  { id: 'alphaorder', title: 'Alphabetical Order', description: 'Sort letters alphabetically', category: 'Language', icon: '🔤', gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)', component: AlphaOrder },
  { id: 'digitreversal', title: 'Digit Reversal', description: 'Reverse number sequences', category: 'Working Memory', icon: '🔢', gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)', component: DigitReversal },
  { id: 'fractioncompare', title: 'Fraction Compare', description: 'Compare fraction values', category: 'Math', icon: '⚖️', gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', component: FractionCompare },
  { id: 'wordchain', title: 'Word Chain', description: 'Build chains of related words', category: 'Language', icon: '⛓️', gradient: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)', component: WordChain },
  { id: 'shapecounter', title: 'Shape Counter', description: 'Count specific shapes quickly', category: 'Attention', icon: '🔢', gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)', component: ShapeCounter },
  { id: 'logicgates', title: 'Logic Gates', description: 'Evaluate AND, OR, NOT operations', category: 'Logic', icon: '🔌', gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)', component: LogicGates },
  { id: 'colorsequence', title: 'Color Sequence', description: 'Memorize color patterns', category: 'Memory', icon: '🌈', gradient: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)', component: ColorSequence },
  { id: 'impulsecontrol', title: 'Impulse Control', description: 'Test your self-control', category: 'Executive Function', icon: '🛑', gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)', component: ImpulseControl },
  { id: 'mirrormatch', title: 'Mirror Match', description: 'Identify mirrored shapes', category: 'Visual & Spatial', icon: '🪞', gradient: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)', component: MirrorMatch },
  { id: 'sequencerecall', title: 'Sequence Recall', description: 'Remember number sequences', category: 'Working Memory', icon: '🧠', gradient: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)', component: SequenceRecall },
  { id: 'spotchanges', title: 'Spot Changes', description: 'Find differences between grids', category: 'Attention', icon: '👁️', gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)', component: SpotChanges },
  { id: 'clockreading', title: 'Clock Reading', description: 'Read analog clock times', category: 'Logic', icon: '⏰', gradient: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)', component: ClockReading },
  { id: 'greatersum', title: 'Greater Sum', description: 'Compare sums of numbers', category: 'Math', icon: '➕', gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', component: GreaterSum },
  { id: 'mentalmath', title: 'Mental Math', description: 'Multi-step mental arithmetic', category: 'Math', icon: '🧮', gradient: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)', component: MentalMath },
  { id: 'blinkfocus', title: 'Blink Focus', description: 'Click targets before they disappear', category: 'Attention', icon: '👀', gradient: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)', component: BlinkFocus },
  { id: 'divisibility', title: 'Divisibility', description: 'Test divisibility rules', category: 'Math', icon: '➗', gradient: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', component: Divisibility }
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
    return <GameComponent onBack={() => setCurrentGame(null)} />;
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
                  className={`btn category-btn ${selectedCategory === category ? 'active' : 'btn-secondary'}`}
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
