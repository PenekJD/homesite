import { useEffect, useState } from "react"

const envUrl: string = process.env.REACT_APP_HOST_SERVER || 'http://localhost:8888';

export function Nestjs() {
  //Main send-form
  const [form, setForm] = useState({
    title: "title",
    desc: "",
    ser: (new Date()).getTime() + '' + (Math.random()*(999-100)*100)
  });
  //Request values
  const [url, setUrl] = useState(envUrl);
  const [type, setType] = useState('GET');
  const [njsData, setNjsData] = useState('');

  function getData(fetchObj:any, isNum?: boolean | undefined) {
    console.log(fetchObj)
    fetch( `${url}`, fetchObj )
      .then( resp => resp.json() )
      .then( data => { setNjsData(data.main) } )
      .catch( err => {
        console.error(err);
      } );
  }

  useEffect( () => {
    getData({ method: type });
  }, [] );

  function formEditParam(prm:string, val:string):void {
    setForm( (el) => {
      return { ...el, [prm]: val };
    } );
  }

  function submitButton() {
    getData( 
      type==='POST' ? 
      {
        method: type,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      } : 
      {
        method: type
      }
    )
  }

  return (
    <>
      <div>
        Request: 
        <input type="text" value={url} onChange={ (e)=>{ setUrl(e.target.value) } }/>
        <select value={type} onChange={ (e)=>{ setType( e.target.value ) } }>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
      <div className={'app-form'}>
        <label>Title</label>
        <input value={form.title} 
          onChange={ (e)=>{ formEditParam('title', e.target.value) } }
        />
        <label>Description</label>
        <input value={form.desc} 
          onChange={ (e)=>{ formEditParam('desc', e.target.value) } }
        />
      </div>
      <div>
        <button onClick={submitButton}>Submit</button>
      </div>
      <div className={'code-area'}>{njsData}</div>
    </>
  )
}