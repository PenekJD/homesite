interface ThemeSwitcherInterface {
  theme:string,
  setTheme: any
}

function ThemeSwitcher( { theme, setTheme }:ThemeSwitcherInterface ) {

  return (
    <>
      <div>
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
      </div>
    </>
  )
}

export default ThemeSwitcher;