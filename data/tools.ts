// Data file containing all tool information for RandomWise

export const tools = [
  {
    name: "Flip Coin",
    slug: "flip-coin",
    image: "/images/coin-heads.png",
    description: "Easy & fun random decision tool for quick yes/no choices with a virtual coin flip.",
    width: 120,
    height: 120,
  },
  {
    name: "Spin the Wheel",
    slug: "spin-the-wheel",
    image: "/images/wheel.png",
    description: "Fun decision-making tool with a customizable wheel for random selection among multiple options.",
    width: 120,
    height: 120,
  },
  {
    name: "Roll Dice",
    slug: "roll-dice",
    image: "/images/dice.png",
    description: "Easy & fun virtual dice roller for random decision-making in games and everyday choices.",
    width: 120,
    height: 120,
  },
  {
    name: "Random Number Generator",
    slug: "random-number-generator",
    image: "/images/randnum.png",
    description: "Simple decision-making tool that generates random numbers within your specified range.",
    width: 120,
    height: 120,
  },
  {
    name: "Rock Paper Scissors",
    slug: "rock-paper-scissors",
    image: "/images/rps.png",
    description: "Fun & easy random decision game to quickly settle choices with the classic Rock Paper Scissors.",
    width: 120,
    height: 120,
  },
  {
    name: "Temple Fortune Stick",
    slug: "temple-fortune-stick",
    image: "/images/fst.png",
    description: "Fun random fortune-telling tool with 30+ fortunes to guide your decisions and future.",
    width: 120,
    height: 120,
  },
  {
    name: "Card Picker",
    slug: "card-picker",
    image: "/images/cards.png",
    description: "Easy & fun random decision tool that draws cards from a standard deck for games or choices.",
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
