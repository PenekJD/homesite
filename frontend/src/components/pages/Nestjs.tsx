import { useEffect, useState } from "react";
import styles from './Nestjs.module.css';

const envUrl: string = process.env.REACT_APP_HOST_SERVER || 'http://localhost:8888';

interface IProduct {
  title: string,
  desc: string,
  ser: number
}

export function Nestjs() {
  //Main send-form
  const [form, setForm] = useState({
    title: "title",
    desc: "",
    ser: ((new Date()).getTime() + '' + (Math.random()*(999-100)+100)).replace('.', '')
  });
  //Request values
  const [url, setUrl] = useState(envUrl);
  const [type, setType] = useState('GET');
  const [njsData, setNjsData] = useState('');
  const [arrData, setArrData] = useState([]);
  let fetching: boolean = true;

  function getData(fetchObj:any, isNum?: boolean | undefined) {
    fetch( `${url}`, fetchObj )
      .then( resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("No data");     
      } )
      .then( data => { 
        if (fetching) {
          console.log("Fetched results")
          setNjsData(data.main);
          if ( url.split('/').length > 3 ) {
            setArrData( 
              data.main[0] === '[' ?
              JSON.parse(data.main) :
              [JSON.parse(data.main)]
            );
          }
        }
      } )
      .catch( err => {
        console.error(err);
      } );
  }

  useEffect( () => {
    getData({ method: type });
    return () => { fetching = false; }
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
      <div className={styles.requestLine}>
        Request: 
        <input type="text" value={url} onChange={ (e)=>{ setUrl(e.target.value) } }/>
        <select value={type} onChange={ (e)=>{ setType( e.target.value ) } }>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
      {(type === 'PUT' || type === 'POST') && (
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
      )}
      <div>
        <button onClick={submitButton}>Submit</button>
      </div>
      <div className={'code-area'}>
        { !arrData.length && njsData }
        { arrData.map( (el:IProduct) => {
          return (
            <div key={el.ser}>
              <h1>{el.title}</h1>
              <div>{el.desc}</div>
            </div>
          )
        } ) }
      </div>
    </>
  )
}