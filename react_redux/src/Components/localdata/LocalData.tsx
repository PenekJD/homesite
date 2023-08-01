import { useEffect, useState } from "react";

const LS_WORDS_KEY = 'polski-words';
const LS_LINES_KEY = 'polski-lines';
const LS_RUS_KEY = 'polski-rus';
const LS_MISSTAKES_KEY = 'polski-misstakes';
const LS_SUCCESS_KEY = 'polski-success';


function LocalData() {

  const [words, setWord]: any = useState('');
  const [lines, setLine]: any = useState('');
  const [rus, setRus]: any = useState('');
  const [misstakes, setMisstakes]: any = useState('');
  const [success, setSuccess]: any = useState('');

  useEffect(() => {
    let lsWords = localStorage.getItem(LS_WORDS_KEY); setWord(() => lsWords);
    let lsLines = localStorage.getItem(LS_LINES_KEY); setLine(lsLines);
    let lsRus = localStorage.getItem(LS_RUS_KEY); setRus(lsRus);
    let lsMisstakes = localStorage.getItem(LS_MISSTAKES_KEY); setMisstakes(lsMisstakes);
    let lsSuccess = localStorage.getItem(LS_SUCCESS_KEY); setSuccess(lsSuccess);
  }, [words, lines, rus, misstakes])

  function startParsing(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      value: string
    }
    let parseThis = target.value.split('\n');
    parseThis.reduce((acc: any, cur: string) => {
      if (cur) {
        if (acc === "header") {
          return cur;
        } else {
          //TODO: Make here saving to local storage
          // console.log('---');
          // console.log(acc); //localStorage key
          // console.log(cur); //localStorage content
          localStorage.setItem(acc, cur);
          return "header";
        }
      } else {
        return 'header';
      }
    }, 'header');
  }

  return (
    <>
      <div className={`codeBlock`}>
        <h3>Data:</h3>
        <textarea onChange={startParsing} value={`${LS_WORDS_KEY}\n${words}\n\n${LS_LINES_KEY}\n${lines}\n\n${LS_RUS_KEY}\n${rus}\n\n${LS_MISSTAKES_KEY}\n${misstakes}\n\n${LS_SUCCESS_KEY}\n${success}`}></textarea>
      </div>
    </>
  )
}

export default LocalData;