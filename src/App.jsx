import { useEffect, useState } from "react";
import DiceIcon from "./assets/images/icon-dice.svg";
import PatternDivider from "./assets/images/pattern-divider-desktop.svg";
import Loader from "./components/Loader";

function App() {
  const [adviceId, setAdviceId] = useState(null);
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((response) => {
        console.log({ response });
        setAdviceId(response.slip.id);
        setAdvice(response.slip.advice);
      });
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    setIsLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        console.log({ response });
        setAdviceId(response.slip.id);
        setAdvice(response.slip.advice);
      });
  };

  // useEffect(() => {
  //   const fetchAdvice = async () => {
  //     const response = await fetch("https://api.adviceslip.com/advice");
  //     const data = await response.json();
  //     setAdviceId(response.slip.id);
  //     setAdvice(response.slip.advice);
  //     setAdvice(data);
  //   };
  //   fetchAdvice();
  // }, []);

  if (isPageLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <div>
          <img src="./images/icon-moon.svg" alt="Moon Icon" />
        </div>
        <h1>Advice Generator APP</h1>
        <div className="card">
          <h3>
            Advice #<span>{adviceId}</span>
          </h3>

          <div className="advice loading">
            {isLoading ? <Loader /> : <blockquote>{advice}</blockquote>}
          </div>

          <div className="pattern-divider-wrapper">
            <img
              src={PatternDivider}
              className="pattern-divider"
              alt="Pattern Divider"
            />
          </div>

          <button id="advice-generator-button" onClick={fetchAdvice}>
            <img src={DiceIcon} alt="Button Icon" />
          </button>
        </div>
      </main>

      <footer>
        <div className="attribution">
          <p>
            Coded by{" "}
            <a
              href="https://www.linkedin.com/in/jassehomar/"
              title="Linkedin"
              target="_blank"
            >
              Modou Lamin Jaiteh{" "}
            </a>
            .
          </p>
        </div>
        <p className="copyright">
          &copy; 2024 JCC - Part 2 of the Junior Developer Program. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
