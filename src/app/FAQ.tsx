import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <section className="flex items-center justify-center h-[100vh] bg-black"> {/* Dark background for the section */}
      <div className="container w-[60%] p-4">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-200">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {accordionData.map(({ id, question, answer }) => (
        <AccordionItem key={id} value={`item-${id}`} className="border-b border-neutral-700"> {/* Border for each item */}
          <AccordionTrigger className=" text-gray-200">{question}</AccordionTrigger>
          <AccordionContent className=" text-gray-300">{answer}</AccordionContent>
        </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
}

// Sample data for the accordion
const accordionData = [
  { id: 1, question: "What is NoAIGPT?", answer: "NoAIGPT is an AI-powered tool designed to convert AI-generated text into human-like content. It’s perfect for content creators, marketers, students, and professionals who need to produce high-quality, authentic writing that bypasses AI detection systems." },
  { id: 2, question: "How does NoAIGPT work?", answer: "NoAIGPT uses advanced algorithms to rewrite AI-generated text, preserving the original meaning and context while ensuring the output is natural, engaging, and undetectable by AI detection tools." },
  { id: 3, question: "Is NoAIGPT free to use?", answer: "Yes, NoAIGPT offers free access to basic features, with premium options available for users who need advanced tools and services." },
  { id: 4, question: "Can NoAIGPT handle multiple languages?", answer: "Yes, NoAIGPT supports a wide range of languages, allowing users to humanize content in multiple languages and cater to a global audience." },
  { id: 5, question: "Does NoAIGPT bypass AI detection tools?", answer: "Absolutely. NoAIGPT is specifically designed to bypass all major AI detection systems, ensuring that your content is perceived as human-written, regardless of its AI origins." },
  { id: 6, question: "How does NoAIGPT ensure content quality?", answer: "NoAIGPT not only humanizes AI text but also corrects grammatical errors and improves composition. This ensures that the final output is of the highest quality, ready for publication or submission." },
  { id: 7, question: "Is my content secure with NoAIGPT?", answer: "Yes, NoAIGPT prioritizes the security and confidentiality of your content. Our platform is built with robust security measures to protect your data." },
  { id: 8, question: "What payment options are available in Nepal?", answer: "NoAIGPT offers direct online payment services tailored for users in Nepal, allowing for easy access to premium features and services without the need for complicated payment methods." },
];
