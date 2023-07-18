import { NavLink } from 'react-router-dom';

export default function Header() {

  //NavLink has cool feature as adding active-class name for link (it's simplify fast style creation of menu)

  return (
    <div className="appHeader">
      <nav className="main-menu">
        <NavLink to="">:3</NavLink>
        <NavLink to="./main" >Main</NavLink>
        <NavLink to="./actives">Actives</NavLink>
        <NavLink to="./options">Options</NavLink>
        <NavLink to="./nestjs">NestJS</NavLink>
      </nav>
      <div className="logIn">
        <NavLink to="./login">Log in</NavLink>
      </div>
    </div>
  )
}