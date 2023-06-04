import { useEffect, useState } from "preact/hooks";

export default function TypingEffect({
  text: fullText,
  typingSpeed,
}: { text: string, typingSpeed: number }) {
  const [text, setText] = useState("");
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleType = () => {
      setText(
          fullText.substring(0, text.length + 1)
      );
        setLoopNum(loopNum + 1);
    };

    const timer = setTimeout(() => {
      handleType();
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, loopNum, typingSpeed, fullText]);

  return (
    <span className="text-gray-700 text-lg whitespace-preserve">{text}</span>
  );
}