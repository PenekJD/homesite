import { useEffect } from "react";

interface ThemeSwitcherInterface {
  theme:string,
  setTheme: any
}

function ThemeSwitcher( { theme, setTheme }:ThemeSwitcherInterface ) {

  return (
    <>
      Theme:  
      <select
        value={theme}
        onChange={ () => {
          setTheme( theme==='dark'?'light':'dark' )
        } }
      >
        <option>dark</option>
        <option>light</option>
      </select>
    </>
  )
}

export default ThemeSwitcher;