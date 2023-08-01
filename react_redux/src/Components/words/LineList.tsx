import { useRef } from "react"

interface IWordListProps {
  title: string,
  arr: string[],
  rus: any,
  saveTrans: any,
  setToReverse: (val:string) => void,
  reverse: string
};

function LineList( {title, arr, saveTrans, rus, setToReverse, reverse}: IWordListProps ) {
  const transElem:any = useRef('');

  return (
    <div className={`WordList list`}>
      <select className={`LinesSwitch`} value={reverse} onChange={ (e) => { setToReverse(e.target.value) } }>
        <option value="classic">Classic</option>
        <option value="reverse">Reversed</option>
      </select>
      <h2><span>{title}</span> <span>{Object.keys(rus).length} / {arr.length}</span></h2>
      <ul>
        { arr.length > 0 && arr.map( (el, idx) => { return (
          <li className={`translations`} key={`${idx}_wl`} 
              style={ rus[idx] ? { borderLeft :'8px solid #fc0' } : {} }
          >
            <div>{el}</div>
            <div className={`over`} >
              <input onChange={ (e) => { saveTrans(idx, e.target.value) } }
                value={ rus[idx] ? rus[idx] : `` } 
                ref={transElem} 
                placeholder="Введи перевод тут"/>
            </div>
          </li>
        ) } ) }
      </ul>
    </div>
  )
}

export default LineList;