export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  author: string;
  slug: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Welcome to the RandomWise Blog',
    excerpt: 'Discover updates, insights, and stories from the RandomWise team.',
    image: '/images/blog/welcome.webp',
    date: '2025-04-15',
    author: 'RandomWise Team',
    slug: 'welcome-to-randomwise',
  },
  {
    id: '2',
    title: 'How We Built the Flip Coin Tool',
    excerpt: 'A behind-the-scenes look at the design and development of our popular Flip Coin tool.',
    image: '/images/blog/flip-coin-dev.webp',
    date: '2025-04-10',
    author: 'Jane Doe',
    slug: 'how-we-built-flip-coin',
  },
  // Add more posts as needed
];
