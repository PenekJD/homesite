import { useCallback, useEffect, useMemo, useState } from "react";

interface INode {
  name:string, 
  id:number
}
interface INodesData {
  array: [INode]
}

export default function CUseCallback() {

  const devCName:string = "CUseCallback";
  let [backendUrl, setBackendUrl] = useState(process.env.REACT_APP_HOST_SERVER+'');


  let [usersArr, setUsersArr]:
  [ INodesData, React.Dispatch<React.SetStateAction<INodesData>> ]
  = useState({array:[{name:'', id: 0}]});

  //useMemo sample - if usersArr change all calculations will be recalculated
  const operateData = useMemo( () => {
    return usersArr.array.reduce( (acc, el) => {
      return acc += el.name;
    }, '' );
  }, [usersArr] );

  //useCallback
  const getData = useCallback( () => {
    fetch(backendUrl)
    .then( res => res.json() )
    .then( data => {
      setServerData( data ); 
    } );
  }, [backendUrl] );

  useEffect( () => {
    getData();
    console.log("Update "+devCName);
  }, [backendUrl, getData] );



  function setServerData(data:INodesData) {
    setUsersArr(data);
  }

  function setNewLink() {
    setBackendUrl( l => ( l.indexOf('/1') >= 0 ) ? l : l+'/1' )
  }

  return (
    <>
      <div className={"moduleBlock"}>
        {devCName}
        <br />
        <div className="code-area">
          { true && usersArr.array.map( el => {
            return (<div key={el.id}>{el.name}</div>)
          } ) }
        </div>
        <br />
        {operateData}
        <button onClick={ setNewLink }>test</button>
      </div>
    </>
  );
}