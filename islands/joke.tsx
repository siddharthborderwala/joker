import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import TypingEffect from "./typing-effect.tsx";

export default function Joke() {
  const [joke, setJoke] = useState(null);

  const isOnlyTouchDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window && navigator.maxTouchPoints === 0;
  }, []);

  const speak = useCallback(async () => {
    const synth = globalThis.speechSynthesis;
    const res = await fetch("https://v2.jokeapi.dev/joke/Any");
    const joke = await res.json();
    const jokeText = joke.type === "single"
      ? joke.joke
      : `${joke.setup}\r\n${joke.delivery}`;
    setJoke(jokeText);
    const utterThis = new SpeechSynthesisUtterance(jokeText);
    const voices = synth.getVoices();
    utterThis.voice = voices.find((voice) =>
      voice.voiceURI === "Serena (Enhanced)"
    ) ?? voices[0];
    synth.speak(utterThis);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "j") {
        speak();
      }
    });
  }, [speak]);

  return (
    <div className="relative w-full flex-grow-1">
      <div className="bg-indigo-700 px-6 py-16 sm:py-24">
        <div className=" max-w-xl mx-auto">
          <h1 className="text-6xl font-mono font-bold mb-4 text-white">
            Tell A Joke
          </h1>
          {isOnlyTouchDevice
            ? <button onClick={speak} className="w-full">Joke</button>
            : (
              <p className="text-gray-700 text-lg text-gray-100">
                Press{" "}
                <strong>
                  <kbd>j</kbd>
                </strong>{" "}
                for a Joke
              </p>
            )}
        </div>
      </div>
      {joke
        ? (
          <p className="text-gray-700 text-lg mt-8 px-6 sm:px-0 text-gray-700 w-full max-w-xl mx-auto">
            <TypingEffect key={joke} text={joke} typingSpeed={36} />
          </p>
        )
        : null}
    </div>
  );
}
