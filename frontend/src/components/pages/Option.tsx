import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function Option() {

  const backendUrl: string = process.env.REACT_APP_HOST_SERVER+'' || 'https://localhost:8888';

  const {id} = useParams();

  let [obj, setObj] = useState({desc:""});

  const getInfo = () => {
    fetch(`${backendUrl}/options/${id}`)
    .then( resp => resp.json() )
    .then( data => { setObj(data) } )
    .catch( err => {
      console.log('CONNECTION ERROR'); 
      console.log(err); 
    })
    .finally( () => {

    } );
  }

  useEffect( () => {
    getInfo();
  }, [] )

  return (
    <>
      <h1>Current id: {id}</h1>
      <div>
        {obj.desc ? obj.desc : `No nodes with id:${id}` }
      </div>
    </>
  )

}