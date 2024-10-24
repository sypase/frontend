// // // components/QuestionsCarousel.tsx

// // import React, { useEffect, useRef, useState } from 'react';
// // import { gsap } from 'gsap';

// // const questions = [
// //     "How do I bypass AI detection systems?",
// //     "What's the easiest way to avoid AI content filters?",
// //     "How can I make AI-generated text seem human-written?",
// //     "What tricks can help me get around AI content detectors?",
// //     "How do I change AI content to avoid detection?",
// //     "Can AI detectors be fooled by altering the text?",
// //     "What's the best method to bypass AI detection algorithms?",
// //     "How can I remove AI footprints from generated content?",
// //     "How do I ensure AI-written content isn't flagged as such?",
// //     "What techniques work to make AI content undetectable?",
// //     "Is there a way to modify AI-generated text to seem natural?",
// //     "How do I prevent AI filters from catching my content?",
// //     "Can I tweak AI-generated material to fool detection tools?",
// //     "How do I disguise AI content to make it look human?",
// //     "How can I rewrite AI content to bypass detection systems?",
// //     "What are some effective ways to bypass AI filters?",
// //     "How do I make AI content sound more human-like?",
// //     "Is there a way to modify AI content so it's not detected?",
// //     "Can AI-generated text be adjusted to avoid being flagged?",
// //     "How do I make sure my content passes AI detection?",
// //     "What steps can I take to bypass AI content filters?",
// //     "Can AI-generated text be humanized to avoid detection?",
// //     "How do I prevent AI-generated content from being flagged?",
// //     "How do I fool AI content detectors with rewritten text?",
// //     "How do I bypass AI content filters with subtle changes?",
// //     "Can I avoid AI detection by changing word choices?",
// //     "What techniques help bypass AI detection systems?",
// //     "How do I make my AI-generated text more undetectable?",
// //     "Can AI content be transformed to avoid detection?",
// //     "How do I ensure AI-written material passes human tests?",
// //     "What's the best way to fool AI content filters?",
// //     "Can I rewrite AI content to make it more human-sounding?",
// //     "How do I tweak AI content to pass detection tools?",
// //     "Is there a way to make AI-generated material less detectable?",
// //     "How do I stop AI filters from flagging my content?",
// //     "Can AI text be humanized to avoid detection algorithms?",
// //     "How do I remove AI markers from generated content?",
// //     "What are the steps to fool AI content detectors?",
// //     "Can AI content be adjusted to avoid being flagged?",
// //     "How do I rewrite AI text so it appears human-made?",
// //     "How do I change AI-generated text to bypass filters?",
// //     "What methods can I use to bypass AI detection systems?",
// //     "How do I tweak AI content to avoid detection?",
// //     "Can I humanize AI-generated content to fool detectors?",
// //     "How do I modify AI text to make it seem natural?",
// //     "What steps can I take to fool AI detection systems?",
// //     "How do I bypass AI filters by rewriting content?",
// //     "How do I avoid AI content filters by tweaking words?",
// //     "Can I adjust AI text to make it pass for human writing?",
// //     "What strategies help bypass AI detection algorithms?",
// //     "How do I disguise AI-written content to avoid detection?",
// //     "Can AI text be altered to avoid being caught by filters?",
// //     "How do I prevent AI detectors from flagging my content?",
// //     "Can I rewrite AI-generated material to pass as human?",
// //     "How do I tweak AI content to avoid detection systems?",
// //     "What are the tricks to bypass AI content detectors?",
// //     "How do I stop AI-generated text from being flagged?",
// //     "Can AI-written content be modified to fool detectors?",
// //     "How do I rewrite AI text so it passes detection tests?",
// //     "Can AI content be humanized to avoid detection filters?",
// //     "How do I avoid AI content filters with rewritten material?",
// //     "Can AI-generated text be altered to avoid being flagged?",
// //     "How do I tweak AI-generated content to seem human?",
// //     "What's the best way to bypass AI detection filters?",
// //     "How do I make AI-written content seem more natural?",
// //     "What are the steps to avoid AI content filters?",
// //     "Can I rewrite AI content to fool detection algorithms?",
// //     "How do I change AI-generated text to avoid being flagged?",
// //     "What techniques can I use to bypass AI detection systems?",
// //     "How do I humanize AI-generated text to pass detection tools?",
// //     "How do I prevent AI filters from flagging AI-generated content?",
// //     "Can AI content be rewritten to seem human-written?",
// //     "How do I make AI-generated content undetectable?",
// //     "What methods help bypass AI content filters?",
// //     "How do I tweak AI text to avoid detection?",
// //     "Can I humanize AI text to bypass detection systems?",
// //     "How do I modify AI-generated text to avoid being flagged?",
// //     "How do I make AI content sound more human-like?",
// //     "What are the tricks to avoid AI detection filters?",
// //     "How do I change AI-written text to seem more natural?",
// //     "Can I fool AI detection systems by altering AI-generated text?",
// //     "How do I stop AI-generated material from being flagged?",
// //     "How do I tweak AI content to pass as human-written?",
// //     "Can AI-generated text be humanized to fool detection systems?",
// //     "How do I modify AI content to bypass detection algorithms?",
// //     "What methods can I use to make AI text undetectable?",
// //     "How do I rewrite AI text to pass detection systems?",
// //     "Can AI-written material be adjusted to avoid detection filters?",
// //     "How do I avoid AI content filters by modifying text?",
// //     "How do I change AI text to avoid being flagged?",
// //     "Can AI content be transformed to fool detection algorithms?",
// //     "How do I rewrite AI-generated text to avoid detection filters?",
// //     "How do I stop AI content from being flagged as AI-generated?",
// //     "How do I disguise AI-written content to seem human-made?",
// //     "Can AI text be adjusted to bypass detection tools?",
// //     "How do I prevent AI detectors from flagging AI-generated content?",
// //     "Can AI-written material be rewritten to avoid detection?",
// //     "How do I humanize AI text to pass detection filters?",
// //     "How do I make AI content sound like it was written by a person?",
// //     "What are the steps to make AI-generated material undetectable?"
// //   ];

// // const QuestionsCarousel = () => {
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //   const questionRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     if (questionRef.current) {
// //       gsap.fromTo(
// //         questionRef.current,
// //         { opacity: 0, y: 20 },
// //         {
// //           opacity: 1,
// //           y: 0,
// //           duration: 1,
// //           ease: 'power2.out',
// //         }
// //       );
// //     }

// //     const interval = setInterval(() => {
// //       setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
// //     }, 3000); // Change question every 3 seconds

// //     return () => clearInterval(interval);
// //   }, [currentQuestionIndex]);

// //   return (
// //     <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">

// //       {/* Carousel Question */}
// //       <div ref={questionRef} className="relative mt-16 p-4 bg-white shadow-md rounded-lg max-w-xl">
// //         <p className="text-lg text-gray-700 text-center">{questions[currentQuestionIndex]}</p>
// //       </div>
// //             {/* Fixed Center Text */}
// //             <div className="absolute top-1/4 flex items-center justify-center z-10">
// //         <h1 className="text-5xl font-bold text-gray-800">NOAIGPT IS THE ANSWER</h1>
// //       </div>

// //     </section>
// //   );
// // };

// // export default QuestionsCarousel;

// // components/QuestionsCarousel.tsx

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// const questions = [
//   "How do I bypass AI detection systems?",
//   "What's the easiest way to avoid AI content filters?",
//   "How can I make AI-generated text seem human-written?",
//   "What tricks can help me get around AI content detectors?",
//   "How do I change AI content to avoid detection?",
//   "Can AI detectors be fooled by altering the text?",
//   "What's the best method to bypass AI detection algorithms?",
//   "How can I remove AI footprints from generated content?",
//   // Add more questions as needed...
// ];

// const QuestionsCarousel = () => {
//   const carouselRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (carouselRef.current) {
//       const totalWidth = carouselRef.current.scrollWidth;
//       gsap.to(carouselRef.current, {
//         x: -totalWidth / 2,
//         duration: questions.length * 2,
//         ease: 'none',
//         repeat: -1,
//       });
//     }
//   }, []);

//   return (
//     <section className="relative flex items-center justify-center min-h-screen bg-gray-100 p-8 overflow-hidden">
//       {/* Fixed Center Text */}
//       <div className="absolute top-1/4 flex items-center justify-center z-10">
//         <h1 className="text-5xl font-bold text-gray-800">NOAIGPT</h1>
//       </div>

//       {/* Carousel Container */}
//       <div ref={carouselRef} className="flex space-x-8">
//         {questions.map((question, index) => (
//           <div key={index} className="bg-white p-4 shadow-md rounded-lg min-w-max">
//             <p className="text-lg text-gray-700">{question}</p>
//           </div>
//         ))}
//         {/* Duplicate the list for seamless looping */}
//         {questions.map((question, index) => (
//           <div key={`${index}-duplicate`} className="bg-white p-4 shadow-md rounded-lg min-w-max">
//             <p className="text-lg text-gray-700">{question}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default QuestionsCarousel;

// components/QuestionsCarousel.tsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const questions = [
  "How do I bypass AI detection systems?",
  "What's the easiest way to avoid AI content filters?",
  "How can I make AI-generated text seem human-written?",
  "What tricks can help me get around AI content detectors?",
  "How do I change AI content to avoid detection?",
  "Can AI detectors be fooled by altering the text?",
  "What's the best method to bypass AI detection algorithms?",
  "How can I remove AI footprints from generated content?",
  "How do I ensure AI-written content isn't flagged as such?",
  "What techniques work to make AI content undetectable?",
  "Is there a way to modify AI-generated text to seem natural?",
  "How do I prevent AI filters from catching my content?",
  "Can I tweak AI-generated material to fool detection tools?",
  "How do I disguise AI content to make it look human?",
  "How can I rewrite AI content to bypass detection systems?",
  "What are some effective ways to bypass AI filters?",
  "How do I make AI content sound more human-like?",
  "Is there a way to modify AI content so it's not detected?",
  "Can AI-generated text be adjusted to avoid being flagged?",
  "How do I make sure my content passes AI detection?",
  "What steps can I take to bypass AI content filters?",
  "Can AI-generated text be humanized to avoid detection?",
  "How do I prevent AI-generated content from being flagged?",
  "How do I fool AI content detectors with rewritten text?",
  "How do I bypass AI content filters with subtle changes?",
  "Can I avoid AI detection by changing word choices?",
  "What techniques help bypass AI detection systems?",
  "How do I make my AI-generated text more undetectable?",
  "Can AI content be transformed to avoid detection?",
  "How do I ensure AI-written material passes human tests?",
  "What's the best way to fool AI content filters?",
  "Can I rewrite AI content to make it more human-sounding?",
  "How do I tweak AI content to pass detection tools?",
  "Is there a way to make AI-generated material less detectable?",
  "How do I stop AI filters from flagging my content?",
  "Can AI text be humanized to avoid detection algorithms?",
  "How do I remove AI markers from generated content?",
  "What are the steps to fool AI content detectors?",
  "Can AI content be adjusted to avoid being flagged?",
  "How do I rewrite AI text so it appears human-made?",
  "How do I change AI-generated text to bypass filters?",
  "What methods can I use to bypass AI detection systems?",
  "How do I tweak AI content to avoid detection?",
  "Can I humanize AI-generated content to fool detectors?",
  "How do I modify AI text to make it seem natural?",
  "What steps can I take to fool AI detection systems?",
  "How do I bypass AI filters by rewriting content?",
  "How do I avoid AI content filters by tweaking words?",
  "Can I adjust AI text to make it pass for human writing?",
  "What strategies help bypass AI detection algorithms?",
  "How do I disguise AI-written content to avoid detection?",
  "Can AI text be altered to avoid being caught by filters?",
  "How do I prevent AI detectors from flagging my content?",
  "Can I rewrite AI-generated material to pass as human?",
  "How do I tweak AI content to avoid detection systems?",
  "What are the tricks to bypass AI content detectors?",
  "How do I stop AI-generated text from being flagged?",
  "Can AI-written content be modified to fool detectors?",
  "How do I rewrite AI text so it passes detection tests?",
  "Can AI content be humanized to avoid detection filters?",
  "How do I avoid AI content filters with rewritten material?",
  "Can AI-generated text be altered to avoid being flagged?",
  "How do I tweak AI-generated content to seem human?",
  "What's the best way to bypass AI detection filters?",
  "How do I make AI-written content seem more natural?",
  "What are the steps to avoid AI content filters?",
  "Can I rewrite AI content to fool detection algorithms?",
  "How do I change AI-generated text to avoid being flagged?",
  "What techniques can I use to bypass AI detection systems?",
  "How do I humanize AI-generated text to pass detection tools?",
  "How do I prevent AI filters from flagging AI-generated content?",
  "Can AI content be rewritten to seem human-written?",
  "How do I make AI-generated content undetectable?",
  "What methods help bypass AI content filters?",
  "How do I tweak AI text to avoid detection?",
  "Can I humanize AI text to bypass detection systems?",
  "How do I modify AI-generated text to avoid being flagged?",
  "How do I make AI content sound more human-like?",
  "What are the tricks to avoid AI detection filters?",
  "How do I change AI-written text to seem more natural?",
  "Can I fool AI detection systems by altering AI-generated text?",
  "How do I stop AI-generated material from being flagged?",
  "How do I tweak AI content to pass as human-written?",
  "Can AI-generated text be humanized to fool detection systems?",
  "How do I modify AI content to bypass detection algorithms?",
  "What methods can I use to make AI text undetectable?",
  "How do I rewrite AI text to pass detection systems?",
  "Can AI-written material be adjusted to avoid detection filters?",
  "How do I avoid AI content filters by modifying text?",
  "How do I change AI text to avoid being flagged?",
  "Can AI content be transformed to fool detection algorithms?",
  "How do I rewrite AI-generated text to avoid detection filters?",
  "How do I stop AI content from being flagged as AI-generated?",
  "How do I disguise AI-written content to seem human-made?",
  "Can AI text be adjusted to bypass detection tools?",
  "How do I prevent AI detectors from flagging AI-generated content?",
  "Can AI-written material be rewritten to avoid detection?",
  "How do I humanize AI text to pass detection filters?",
  "How do I make AI content sound like it was written by a person?",
  "What are the steps to make AI-generated material undetectable?",
];

const QuestionsCarousel = () => {
  const rowRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  useEffect(() => {
    rowRefs.forEach((ref, index) => {
      if (ref.current) {
        const totalWidth = ref.current.scrollWidth;
        gsap.to(ref.current, {
          x: index % 2 === 0 ? -totalWidth / 2 : totalWidth / 2,
          duration: questions.length * 8,
          ease: "none",
          repeat: -1,
        });
      }
    });
  }, [rowRefs]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-hidden space-y-8">
      {/* Fixed Center Text */}
      {/* <div className=" top-1/4 flex items-center justify-center z-10">
        <h1 className="text-5xl font-bold text-gray-800">
          NOAIGPT IS THE ULTIMATE SOLUTION
        </h1>
      </div> */}

      {/* Carousel Rows */}
      {rowRefs.map((ref, rowIndex) => (
        <div key={rowIndex} ref={ref} className="flex space-x-8">
          {questions.map((question, index) => (
            <div
              key={`${rowIndex}-${index}`}
              className="bg-white p-4 shadow-md rounded-lg min-w-max"
            >
              <p className="text-lg text-gray-700">{question}</p>
            </div>
          ))}
          {/* Duplicate the list for seamless looping */}
          {questions.map((question, index) => (
            <div
              key={`${rowIndex}-${index}-duplicate`}
              className="bg-white p-4 shadow-md rounded-lg min-w-max"
            >
              <p className="text-lg text-gray-700">{question}</p>
            </div>
          ))}
        </div>
      ))}

      {/* <div className=" top-1/4 flex items-center justify-center z-10">
        <h1 className="text-5xl font-bold text-gray-800">
            BYPASS AI TEXT EASILY
        </h1>
      </div> */}
    </section>
  );
};

export default QuestionsCarousel;
