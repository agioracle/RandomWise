// Data file containing all tool information for RandomWise

export const tools = [
  {
    name: "Flip Coin",
    slug: "flip-coin",
    image: "/images/coin-heads.webp",
    description: "Toss a coin to quickly decide between options.",
    width: 120,
    height: 120,
    keywords: ['flip coin', 'coin flip', 'toss coin', 'random coin', 'decision making'],
  },
  {
    name: "Randomizer Wheel",
    slug: "randomizer-wheel",
    image: "/images/wheel.webp",
    description: "Free online randomizer wheel. Spin the customizable wheel to make random selection.",
    width: 120,
    height: 120,
    keywords: ['randomizer wheel', 'wheel randomizer', 'wheel randomiser', 'randomizer spin', 'spin the wheel generator', 'randomiser wheel', 'random generator wheel', 'spin the wheel randomizer', 'spin randomizer'],
  },
  {
    name: "Roll Dice",
    slug: "roll-dice",
    image: "/images/dice.webp",
    description: "Online dice roller. You can roll 6 types of dice for board games or decision making.",
    width: 120,
    height: 120,
    keywords: ['roll dice', 'roll a dice', 'random roll', 'dice random', 'roll the dice', 'roll a die', 'random roll dice', 'randomized dice', 'roll dice random', 'random dice roller', 'dice roll', 'roll dies'],
  },
  {
    name: "Random Number Generator",
    slug: "random-number-generator",
    image: "/images/randnum.webp",
    description: "Generate random numbers within a specified range for quick decision-making.",
    width: 120,
    height: 120,
    keywords: ['random number generator', 'random numbers', 'number generator', 'number random'],
  },
  {
    name: "Rock Paper Scissors",
    slug: "rock-paper-scissors",
    image: "/images/rps.webp",
    description: "Play Rock Paper Scissors to settle disputes or make quick decisions.",
    width: 120,
    height: 120,
    keywords: ['rock paper scissors'],
  },
  {
    name: "Temple Fortune Stick",
    slug: "temple-fortune-stick",
    image: "/images/fst.webp",
    description: "Draw a random fortune from the Temple Fortune Stick for quick decision-making.",
    width: 120,
    height: 120,
    keywords: ['temple fortune stick', 'fortune stick', 'random fortune'],
  },
  {
    name: "Random Card Picker",
    slug: "random-card-picker",
    image: "/images/cards.webp",
    description: "Draw cards from a standard deck for quick decision-making or games.",
    width: 120,
    height: 120,
    keywords: ['random card picker', 'random card', 'card randomizer', 'card picker', 'card randomiser']
  },
];

// Create a lookup map for O(1) access time
const toolsBySlug: Record<string, typeof tools[0]> = {};

// Initialize the lookup map
tools.forEach(tool => {
  toolsBySlug[tool.slug] = tool;
});

// Helper function to get a tool by slug - O(1) time complexity
export const getToolBySlug = (slug: string) => {
  return toolsBySlug[slug] || null;
};

// Helper function to get all tools
export const getAllTools = () => {
  return tools;
};
