// Data file containing all tool information for RandomWise

export const tools = [
  {
    name: "Flip Coin",
    slug: "flip-coin",
    image: "/images/coin-heads.png",
    description: "Make a quick yes/no decision with our virtual coin flipper.",
    width: 120,
    height: 120,
  },
  {
    name: "Spin the Wheel",
    slug: "spin-the-wheel",
    image: "/images/wheel.png",
    description: "Randomly select items or make choices with our customizable spinning wheel.",
    width: 120,
    height: 120,
  },
  {
    name: "Roll Dice",
    slug: "roll-dice",
    image: "/images/dice.png",
    description: "Simulate rolling single or multiple dice for games or random outcomes.",
    width: 120,
    height: 120,
  },
  {
    name: "Random Number Generator",
    slug: "random-number-generator",
    image: "/images/randnum.png",
    description: "Generate secure random numbers within your specified range.",
    width: 120,
    height: 120,
  },
  {
    name: "Rock Paper Scissors",
    slug: "rock-paper-scissors",
    image: "/images/rps.png",
    description: "Play a quick game of Rock Paper Scissors to settle decisions.",
    width: 120,
    height: 120,
  },
  {
    name: "Temple Fortune Stick",
    slug: "temple-fortune-stick",
    image: "/images/fst.png",
    description: "Get a random fortune from our collection of 30+ fortunes.",
    width: 120,
    height: 120,
  },
  {
    name: "Card Picker",
    slug: "card-picker",
    image: "/images/cards.png",
    description: "Randomly draw one or more cards from a standard 52-card deck.",
    width: 120,
    height: 120,
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
