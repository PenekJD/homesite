import { useEffect, useState } from "react";

interface setOff {
  setOff: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CUseEffect({ setOff }:setOff) {

  const devCName:string = "CUseEffect";

  let [num, setNum]:
  [number, React.Dispatch<React.SetStateAction<number>>]
  = useState(0);



  
  //useEffect and states
  useEffect( ()=>{
    console.log("Mount "+devCName);
    return () => {
      console.log("Unmount "+devCName);
    }
  }, [] ); 

  useEffect( () => {
    console.log("Update "+devCName);
  }, [num] );





  function hideComponent() {
    setOff(false)
  }

  function incNum() {
    setNum( n => n+1 );
  }

  return (
    <>
      <div className={'moduleBlock'}>
        UseEffect
        <br /><button onClick={ hideComponent }>Make Unmount</button>
        <br /><button onClick={incNum}>Make Update {num}</button>
      </div>
    </>
  )
}