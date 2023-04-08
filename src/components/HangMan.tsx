import { useState, useId } from "react";
import hangMan0 from "../../public/hangMan0.png";
import hangMan1 from "../../public/hangMan1.png";
import hangMan2 from "../../public/hangMan2.png";
import hangMan3 from "../../public/hangMan3.png";
import hangMan4 from "../../public/hangMan4.png";
import hangMan5 from "../../public/hangMan5.png";
import hangMan6 from "../../public/hangMan6.png";
import hangMan7 from "../../public/hangMan7.png";
import hangMan8 from "../../public/hangMan8.png";

const HangMan = () => {
  const [word, setWord] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [guess, setGuess] = useState<string>("");
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);
  const [correctGuesses, setCorrectGuesses] = useState<string>("_");
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const wordInputId = useId();
  const guessInputId = useId();

  function chooseWord() {
    if (word !== "") {

      setIsDisabled(true);

      switch (word.length) {
        case 1:
          setCorrectGuesses("_");
          break;

        case 2:
          setCorrectGuesses("__");
          break;

        case 3:
          setCorrectGuesses("___");
          break;

        case 4:
          setCorrectGuesses("____");
          break;

        case 5:
          setCorrectGuesses("_____");
          break;
      }
    } else {
      alert("You have to submit a word first.");
    }
  }

  function handleGuess() {
    
    if (isDisabled) {

      setGuessHistory((current) => [...current, guess]);
      if (word.includes(guess)) {
        let latestGuess: string[] = correctGuesses.split("");
        const wordIndexes: number[] = [];
  
        for (let i = 0; i < word.length; i++) {
          if (word[i] === guess) {
            wordIndexes.push(i);
          }
        }
  
        for (let i = 0; i < wordIndexes.length; i++) {
          latestGuess.splice(wordIndexes[i], 1, guess);
        }
  
        setCorrectGuesses(latestGuess.join(""));
      } else {
        setWrongGuesses(wrongGuesses + 1);
      }
  
      setGuess("");
    } else {
      alert("You have to submit a word first.")
    }
    }

  function reset() {
    setWord("");
    setIsDisabled(false);
    setGuess("");
    setCorrectGuesses("_");
    setWrongGuesses(0);
    setGuessHistory([]);
  }

  if (wrongGuesses < 8 && correctGuesses.includes("_")) {
    return (
      <div className="HangMan">
        <div className="game">
          <label htmlFor={wordInputId}>Type a word</label>
          <input
            maxLength={5}
            type="text"
            onChange={(e) => setWord(e.target.value)}
            value={word}
            className={!isDisabled ? "current" : "hidden"}
            id={wordInputId}
          />
          <button disabled={isDisabled} onClick={chooseWord}>
            Choose word
          </button>
          <img
            width="200"
            height="200"
            src={hangMan0}
            alt="A white square"
            className={wrongGuesses === 0 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan1}
            alt="A hill"
            className={wrongGuesses === 1 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan2}
            alt="Hill with a post"
            className={wrongGuesses === 2 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan3}
            alt="Hill with a post"
            className={wrongGuesses === 3 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan4}
            alt="Hill with a post"
            className={wrongGuesses === 4 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan5}
            alt="Hill with a post"
            className={wrongGuesses === 5 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan6}
            alt="Hill with a post with a head hanging off it"
            className={wrongGuesses === 6 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan7}
            alt="Hill with a post with a head and torso hanging off it"
            className={wrongGuesses === 7 ? "current" : "hidden"}
          />
          <img
            width="200"
            height="200"
            src={hangMan8}
            alt="Hill with a post with a stick figure hanging off it"
            className={wrongGuesses === 8 ? "current" : "hidden"}
          />
          <p>{correctGuesses}</p>
          <p>Past guesses: {guessHistory}</p>
          <label htmlFor={guessInputId}>Make a guess on a letter</label>
          <input
            type="text"
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
            maxLength={1}
            id={guessInputId}
          />
          <button onClick={handleGuess}>Guess</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="HangMan">
        <img
          width="200"
          height="200"
          src="/hangMan8.png"
          alt="Hill with a post"
          className={wrongGuesses > 7 ? "current" : "hidden"}
        />
        <h2>{!correctGuesses.includes("_") ? "You won!" : "You lost!"}</h2>
        <p>The word was: {word}</p>
        <button onClick={reset}>Play again</button>
      </div>
    );
  }
};

export default HangMan;
