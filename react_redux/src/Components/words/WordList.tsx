interface IWordListProps {
  title: string,
  arr: string[],
  misstakes: any,
  success: any
};

function WordList({ title, arr, misstakes, success }: IWordListProps) {
  const misstakeCName: string = 'misstake';
  const successCName: string = 'success';
  return (
    <div className={`WordList words`}>
      <h2><span>{title}</span> <span> {success ? Object.keys(success).length : 0} / {arr.length}</span></h2>
      <ul>
        {arr.length > 0 && arr.map((word, idx) => {
          let extraClassName = '';
          if (misstakes[word] && success[word]) {
            extraClassName = misstakes[word] > success[word] ? misstakeCName : successCName;
          } else {
            if (misstakes[word]) { extraClassName = misstakeCName; }
            if (success[word]) { extraClassName = successCName; }
          }
          return (
            <li key={`${idx}_wl`} className={`${extraClassName}`}>
              {word}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default WordList;