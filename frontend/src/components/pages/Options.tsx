import { useEffect, useState, useCallback } from "react"
import ThemeSwitcher from "../ThemeSwitcher"
import { NavLink } from "react-router-dom"

interface ThemeSwitcherInterface {
  theme:string,
  setTheme: any
}

interface Product {
  title: string
  id: number
}

export default function Options({theme, setTheme}:ThemeSwitcherInterface) {

  const backendUrl: string = process.env.REACT_APP_HOST_SERVER+'' || 'https://localhost:8888';

  const [list, setList]:
  [ Array<Product>, React.Dispatch<React.SetStateAction<Array<Product>>>]
  = useState([{title:'', id:0}])

  const getProducts = () => {
    console.log("GET");
    fetch(`${backendUrl}/products`)
    .then( resp => resp.json() )
    .then( data => { setList(data) } )
  };

  useEffect( () => {
    console.log("DID MOUNT");
    getProducts();
  }, [] );

  return (
    <>
      <ThemeSwitcher theme={theme} setTheme={setTheme}></ThemeSwitcher>
      <div>
          { list.length && list.map( el => {
            return <NavLink key={el.id} to={"./"+el.id}>{el.title}</NavLink>
          })}
      </div>
    </>
  )
}