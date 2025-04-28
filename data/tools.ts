// Data file containing all tool information for RandomWise

export const tools = [
  {
    name: "Flip Coin",
    slug: "flip-coin",
    image: "/images/coin-heads.webp",
    description: "Toss a virtual coin to quickly decide between options.",
    width: 120,
    height: 120,
    keywords: ['coin flip', 'flip coin', 'toss coin', 'random decision', 'decision making'],
  },
  {
    name: "Spin the Wheel",
    slug: "spin-the-wheel",
    image: "/images/wheel.webp",
    description: "Spin a customizable wheel for random selection among multiple options.",
    width: 120,
    height: 120,
    keywords: ['spin wheel', 'wheel', 'random selection', 'decision making', 'games', 'everyday choices'],
  },
  {
    name: "Roll Dice",
    slug: "roll-dice",
    image: "/images/dice.webp",
    description: "Roll virtual dice for games or random decisions.",
    width: 120,
    height: 120,
    keywords: ['dice', 'virtual dice', 'random decision', 'decision making', 'games', 'everyday choices'],
  },
  {
    name: "Random Number Generator",
    slug: "random-number-generator",
    image: "/images/randnum.webp",
    description: "Generate random numbers within a specified range for quick decision-making.",
    width: 120,
    height: 120,
    keywords: ['random number generator', 'random numbers', 'decision making', 'games', 'everyday choices'],
  },
  {
    name: "Rock Paper Scissors",
    slug: "rock-paper-scissors",
    image: "/images/rps.webp",
    description: "Play Rock Paper Scissors to settle disputes or make quick decisions.",
    width: 120,
    height: 120,
    keywords: ['rock paper scissors', 'rps', 'decision making', 'games', 'everyday choices'],
  },
  {
    name: "Temple Fortune Stick",
    slug: "temple-fortune-stick",
    image: "/images/fst.webp",
    description: "Draw a random fortune from the Temple Fortune Stick for quick decision-making.",
    width: 120,
    height: 120,
    keywords: ['temple fortune stick', 'fortune stick', 'random fortune', 'decision making', 'games', 'everyday choices'],
  },
  {
    name: "Card Picker",
    slug: "card-picker",
    image: "/images/cards.webp",
    description: "Draw cards from a standard deck for quick decision-making or games.",
    width: 120,
    height: 120,
    keywords: ['card picker', 'cards', 'random card', 'decision making', 'games', 'everyday choices'],
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
