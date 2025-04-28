import React from "react";

export const metadata = {
  title: "Welcome to RandomWise!",
  excerpt: "Discover RandomWise: free hub for randomization tools, and the Dicidely AI assistant.",
  date: "2025-04-15",
  author: "RandomWise Team"
};

const IntroductionArticle: React.FC = () => (
  <article>
    <h2 className="text-3xl font-bold mb-2">Welcome to RandomWise!</h2>
    <p className="text-gray-400 mb-4 text-sm">By RandomWise Team· 2025-04-15</p>
    <p className="mb-4"><a href="https://randomwise.app" target="_blank" rel="noopener noreferrer" className="text-primary">RandomWise</a> is your all-in-one hub for simple, fun, and useful randomization tools. Whether you want to flip a coin, roll dice, generate random numbers, or pick a winner, our site provides a fast and delightful experience—no ads, no clutter, just results.</p>
    <p className="mb-4">We believe in transparency, accessibility, and open source values. All our tools are free to use, and we’re constantly adding more features and tools based on your feedback.</p>
    <p className="mb-4">Our platform is designed with both simplicity and power in mind. You’ll find classic chance tools like coin flips, dice rolls, and wheel spins, as well as advanced utilities for rock paper scissors, fortune teller, card picker, and more. Each tool is crafted for speed and ease of use, with a modern, distraction-free interface. You can also customize the tools to suit your needs.</p>
    <p className="mb-4">One of our most exciting features is <span className='font-semibold text-primary'>Dicidely</span>(which is under construction currently), our friendly AI decision-making assistant. Dicidely can help you to make decisions. Just start a conversation and let Dicidely guide you—it's like having a decision-making expert on your team, available 24/7!</p>
    <p className="mb-4">Why did we build RandomWise? We noticed that most randomizer sites are cluttered with ads, slow to use, and often lack transparency in how results are generated. We set out to change that. Our <a href="https://github.com/agioracle/RandomWise" target="_blank" rel="noopener noreferrer" className="text-primary">codebase</a> is open source, so you can see exactly how each tool works—and even contribute your own improvements or new features.</p>
    <p className="mb-4">RandomWise is also perfect for educators, students, gamers, and anyone who needs to make a fair, unbiased choice. Our tools work great on desktop and mobile, and we never collect personal data or track your usage.</p>
    <p className="mb-4">We’re just getting started! In the coming months, expect to see new tools, advanced randomization options, and community-driven enhancements. If you have an idea, suggestion, or just want to say hi, reach out through our contact page or open an issue on GitHub.</p>
    <p className="mb-4">Thank you for choosing <a href="https://randomwise.app" target="_blank" rel="noopener noreferrer" className="text-primary">RandomWise</a>. We’re excited to help you make decisions, play games, and enjoy the fun side of randomness!</p>
    <p className="mt-6 text-gray-400 text-xs">— The RandomWise Team</p>
  </article>
);

export default IntroductionArticle;
