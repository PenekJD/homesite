import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/page">Page</NavLink>
    </nav>
  )
}

export default Nav;