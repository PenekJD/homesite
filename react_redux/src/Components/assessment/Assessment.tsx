import { useCallback, useEffect, useRef, useState } from "react";

const LS_WORDS_KEY = 'polski-words';
const LS_LINES_KEY = 'polski-lines';
const LS_RUS_KEY = 'polski-rus';
const LS_MISSTAKES_KEY = 'polski-misstakes';
const LS_SUCCESS_KEY = 'polski-success';

function Assessment() {


  const inputEl: any = useRef('');
  const [startsFrom, setStartsFrom]: any = useState(0);
  const [words, setWord]: any = useState([]);
  const [lines, setLine]: any = useState([]);
  const [rus, setRus]: any = useState([]);
  const [firstLoad, setFL]: any = useState(true);
  const [evaluated, setEval]: any = useState(false);
  const [assRes, setAssRes]: any = useState(0);
  const [isRand, setIsRand]: any = useState('random');
  const [realAnswer, setRealAnswer]: any = useState([]);
  const [randomIdx, setRandIdx] = useState(0);
  const [misstakes, setMisstakes]: any = useState({});
  const [success, setSuccess]: any = useState({});

  const randomGen = useCallback(() => {
    setRandIdx(
      Math.floor(
        Math.random() * (lines.length - startsFrom) + startsFrom
      )
    );
  }, [setRandIdx, lines, startsFrom]);

  useEffect(() => {
    if (firstLoad) {
      if (isRand) { randomGen(); }
      let lsWords = localStorage.getItem(LS_WORDS_KEY);
      let lsLines = localStorage.getItem(LS_LINES_KEY);
      let lsRus = localStorage.getItem(LS_RUS_KEY);
      let lsMisstakes = localStorage.getItem(LS_MISSTAKES_KEY);
      let lsSuccess = localStorage.getItem(LS_SUCCESS_KEY);
      if (lsWords && lsLines) {
        lsWords = JSON.parse(lsWords);
        lsLines = JSON.parse(lsLines);
        setWord(lsWords);
        setLine(lsLines);
        if (lsRus) {
          lsRus = JSON.parse(lsRus);
          setRus(lsRus);
        }
        if (lsMisstakes) {
          lsMisstakes = JSON.parse(lsMisstakes);
          setMisstakes(lsMisstakes);
        }
        if (lsSuccess) {
          lsSuccess = JSON.parse(lsSuccess);
          setSuccess(lsSuccess);
        }
      }
      setFL(false);
    } else {
      localStorage.setItem(LS_MISSTAKES_KEY, JSON.stringify(misstakes));
      localStorage.setItem(LS_SUCCESS_KEY, JSON.stringify(success));
    }
  }, [words, lines, rus, firstLoad, isRand, misstakes, success, startsFrom, randomIdx, randomGen]);


  function compareStrings(realOne: string, comparaThis: string) {
    let evaluation = 0;
    let exp = 0;
    realOne = realOne.toLowerCase();
    let realArr = realOne.split(' ');
    comparaThis = comparaThis.toLowerCase();
    let userArr = comparaThis.split(' ');
    let realAnswerAcc = realArr.map((word, idx) => {
      let color = "#f00";
      let foundIdx = userArr.indexOf(word)
      if (foundIdx >= 0) {
        exp += 1;
        color = "#ca0";
        if (foundIdx === idx) { exp += 1; color = "#0a0"; }
        //If word is fully succeed - put it to storage
        setSuccess((obj: any) => {
          return { ...obj, [word]: obj[word] ? obj[word] + 1 : 1 }
        });
      } else {
        //If word is incorrect - put it to storage
        setMisstakes((obj: any) => {
          return { ...obj, [word]: obj[word] ? obj[word] + 1 : 1 }
        });
      }
      return {
        str: word,
        color: color
      }
    });
    evaluation = Math.round(10 / (realAnswerAcc.length * 2 / exp));
    setAssRes(evaluation);
    setRealAnswer(realAnswerAcc);
    setEval(true);
  }


  function customSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (evaluated) {
      if (!isRand) {
        setRandIdx((idx) => {
          if (idx < startsFrom) { return startsFrom; }
          return idx >= (lines.length - 1) ? startsFrom : idx + 1;
        });
      } else {
        randomGen();
      }
      setEval(false);
      setRealAnswer([]);
      inputEl.current.value = "";
    } else {
      const target = e.target as typeof e.target & {
        text: { value: string }
      }
      const inputtedLine = (target.text.value).trim();
      if (!inputtedLine) {
        randomGen();
        return
      }
      const realOne = lines[randomIdx];
      if (inputtedLine && realOne) {
        compareStrings(realOne, inputtedLine);
      }
    }
  }

  return (
    <>
      <div className={`assessmentBlock`}>
        <div className={`abHead`}>
          <span>Проверка знаний</span>
          <div className={`OrderSelect`}>
            <label>Начать с:</label>
            <input className={`startsFrom`}
              value={startsFrom}
              onChange={(e) => { setStartsFrom((i: number) => parseInt(e.target.value)) }}
              type="number" min="0" max={lines.length - 1}
            />
            <select onChange={(e) => { setIsRand(e.target.value) }}>
              <option value="random">Рандомно</option>
              <option value="">По порядку</option>
            </select>
          </div>
        </div>
        <h2>
          <span style={{ fontSize: '8px', opacity: '0.3' }}>[{randomIdx}/{lines.length - 1}]</span>
          {rus[randomIdx]}
        </h2>
        <form onSubmit={customSubmit}>
          <input name="text" autoComplete="off" ref={inputEl} />
        </form>
        {realAnswer.length > 0 && (
          <div className={`comparisonBlock`}>
            <div>
              {realAnswer.map((el: { str: string, color: string }, idx: number) => {
                return (
                  <span key={`${idx}_real`} style={{ color: el.color }}>
                    {el.str}
                  </span>
                )
              })}
            </div>
            <div>{` Оценка: ${assRes}/10`}</div>
          </div>
        )}
      </div>
    </>
  )

}

export default Assessment;