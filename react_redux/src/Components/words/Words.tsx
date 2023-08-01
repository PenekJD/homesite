import { useCallback, useEffect, useRef, useState } from "react"
import WordList from "./WordList";
import LineList from "./LineList";
/* REDUX */
import { useSelector } from "react-redux";
import { getWordsSelector } from "./words.slice";
/* * * */

const LS_WORDS_KEY = 'polski-words';
const LS_LINES_KEY = 'polski-lines';
const LS_RUS_KEY = 'polski-rus';
const LS_MISSTAKES_KEY = 'polski-misstakes';
const LS_SUCCESS_KEY = 'polski-success';

function Words() {

  const mainInput: any = useRef();
  const [words, setWord]: any = useState([]);
  const [lines, setLine]: any = useState([]);
  const [rus, setRus]: any = useState([]);
  const [misstakes, setMisstakes]: any = useState({});
  const [success, setSuccess]: any = useState({});
  const [reverse, setReverse]: any = useState('classic');
  const [firstLoad, setFL]: any = useState(true);

  /* REDUX MAGIC HERE*/
  const wordsRedux = useSelector(getWordsSelector);
  console.log(wordsRedux);
  /******/


  function customSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      line: { value: string }
    }
    const line: string = (target.line.value).trim();
    if (line) {
      setLine((arr: any) => {
        return [...arr, line]
      });
      let curArr = line.split(' ');
      curArr.forEach(word => {
        let curWord = word.toLowerCase();
        if (words.indexOf(curWord) < 0) {
          setWord((arr: any) => {
            return [...arr, curWord]
          });
        }
      });
    }
  }

  const saveTrans = useCallback((idx: any, newValue: string) => {
    setRus((obj: any) => {
      return { ...obj, [idx]: newValue }
    });
  }, []);

  function setToReverse(val: string) {
    setReverse(val);
  }

  useEffect(() => {
    if (firstLoad) {
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
      localStorage.setItem(LS_LINES_KEY, JSON.stringify(lines));
      localStorage.setItem(LS_WORDS_KEY, JSON.stringify(words));
      localStorage.setItem(LS_RUS_KEY, JSON.stringify(rus));
      mainInput.current.value = "";
    }
  }, [words, lines, rus, firstLoad, misstakes]);

  return (
    <>
      <form className={`AddWordForm`} onSubmit={customSubmit}>
        <input name="line" type="text" ref={mainInput} placeholder="Введите фразу и нажмите Enter" />
      </form>
      <div className={`all-words-container ${reverse}`}>
        <LineList arr={lines} title={`Предложения`} saveTrans={saveTrans} rus={rus} setToReverse={setToReverse} reverse={reverse} />
        <WordList arr={words} title={`Словарный запас`} misstakes={misstakes} success={success} />
      </div>
    </>
  )
}

export default Words;