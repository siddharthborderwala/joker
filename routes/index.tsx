import { Head } from "$fresh/runtime.ts";
import Joke from "../islands/joke.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>TellAJoke</title>
      </Head>
      <div className="flex flex-col h-screen">
        <Joke />
        <footer>
          <p className="text-gray-700 text-sm my-4 px-6 sm:px-0 text-gray-800 font-mono w-full max-w-xl mx-auto">
            Made with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <a
              href="https://siddharthborderwala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Siddharth Borderwala
            </a>{" "}
            &middot; Jokes from{" "}
            <a
              href="https://sv443.net/jokeapi/v2/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              JokeAPI
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
