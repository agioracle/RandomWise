import React from "react";
import { Sun, Settings2, CircleSlash } from "lucide-react";

const featuresList = [
  {
    icon: Sun,
    title: "Quick & Easy",
    description: "Make decisions in seconds with our user-friendly and fun random tools.",
  },
  {
    icon: Settings2,
    title: "Customizable",
    description: "Personalize the random tools to suit your decision-making needs.",
  },
  {
    icon: CircleSlash,
    title: "Always Free",
    description: "Enjoy unlimited access to all random tools at no cost.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-10 h-10 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-left text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
