import { useEffect, useState } from "react";

interface TypingEffectProps {
  texts: string[];
  typingDelay?: number;
  erasingDelay?: number;
  newTextDelay?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  typingDelay = 100,
  erasingDelay = 50,
  newTextDelay = 1000,
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping) {
        setCharIndex((prevIndex) => prevIndex + 1);
        if (charIndex >= texts[textIndex].length) {
          setIsTyping(false);
          setTimeout(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
            setCharIndex(0);
            setIsTyping(true);
          }, newTextDelay);
        }
      } else {
        setCharIndex((prevIndex) => prevIndex - 1);
        if (charIndex === 0) {
          setIsTyping(true);
        }
      }
    }, isTyping ? typingDelay : erasingDelay);

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, textIndex, texts, typingDelay, erasingDelay, newTextDelay]);

  return <span>{texts[textIndex].slice(0, charIndex)}</span>;
};

export default TypingEffect;