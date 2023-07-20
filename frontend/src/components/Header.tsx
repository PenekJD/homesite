import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Header() {

  const userContext = useContext(UserContext);

  //NavLink has cool feature as adding active-class name for link (it's simplify fast style creation of menu)

  return (
    <div className="appHeader">
      <nav className="main-menu">
        <NavLink to="">:3</NavLink>
        <NavLink to="./nestjs">NestJS</NavLink>
        <NavLink to="./options">Options</NavLink>
      </nav>
      <div className="logIn">
        { !userContext.user.isLoggedIn && 
          (<NavLink to="./login">Log in</NavLink>) 
        }
      </div>
    </div>
  )
}