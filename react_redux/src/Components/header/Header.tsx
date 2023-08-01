import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className={`mainNavigation`}>
      <NavLink to="/" ><img alt="site logo" src={`/favicon.ico`} /> Конспект</NavLink>
      <NavLink to="/ass" >Проверка знаний</NavLink>
      <NavLink to="/data" >Данные</NavLink>
    </nav>
  )
}

export default Header;