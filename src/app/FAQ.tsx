// components/FAQ.tsx

import React, { useState } from 'react';
import { gsap } from 'gsap';

const faqData = [
  {
    question: "How do I bypass AI detection systems?",
    answer: "By using advanced techniques to modify AI-generated content, you can reduce the likelihood of detection.",
  },
  {
    question: "What's the easiest way to avoid AI content filters?",
    answer: "The easiest way is to manually review and adjust the content to ensure it aligns with human writing patterns.",
  },
  {
    question: "How can I make AI-generated text seem human-written?",
    answer: "Incorporate natural language nuances and contextually relevant information to make AI-generated text more human-like.",
  },
  // Add more FAQs as needed...
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <button
              className="w-full text-left p-4 focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-4 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ; 