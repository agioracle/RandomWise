import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonialsList = [
  {
    quote: "RandomWise is a lifesaver! It's my go-to whenever I need to make a quick decision. Highly recommended!",
    name: "Sarah W.",
    title: "Frequent User",
    avatar: "/images/avatars/avatar1.png",
  },
  {
    quote: "The variety of tools is amazing. From simple coin flips to tarot readings, it has everything.",
    name: "Callia P.",
    title: "Event Planner",
    avatar: "/images/avatars/avatar2.png",
  },
  {
    quote: "I love using the Spin Wheel for fun group decisions. It always adds an element of excitement!",
    name: "Mike G.",
    title: "Office Worker",
    avatar: "/images/avatars/avatar3.png",
  },
  {
    quote: "Finally, a site that gathers all these useful random tools in one place. Well designed and easy to use.",
    name: "Alex T.",
    title: "Student",
    avatar: "/images/avatars/avatar4.png",
  },
  {
    quote: "The 'Ask Decidely' feature is surprisingly insightful. It helped me think through a tough choice.",
    name: "Jessica R.",
    title: "Student",
    avatar: "/images/avatars/avatar5.png",
  },
  {
    quote: "Simple, fast, and reliable. What more could you ask for in a random generator tool?",
    name: "David K.",
    title: "Developer",
    avatar: "/images/avatars/avatar6.png",
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonialsList.map((testimonial, index) => (
            <Card key={index} className="testimonial-card flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <blockquote className="text-lg mb-6 italic before:content-[open-quote] after:content-[close-quote]">
                  {testimonial.quote}
                </blockquote>
              </CardContent>
              <CardFooter className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
