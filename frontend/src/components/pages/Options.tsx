import { useEffect, useState, useCallback } from "react"
import ThemeSwitcher from "../ThemeSwitcher"
import { NavLink } from "react-router-dom"

interface ThemeSwitcherInterface {
  theme: string,
  setTheme: any
}

export default function Options({theme, setTheme}:ThemeSwitcherInterface) {

  return (
    <>
      <ThemeSwitcher theme={theme} setTheme={setTheme}></ThemeSwitcher>
    </>
  )
}