import { createContext } from "react";
import IUserContext from "../interfaces/IUserContext";

const UserContext = createContext<IUserContext>({
  user: {
    name: "",
    isLoggedIn: false
  },
  setUser: ()=>{}
});

export default UserContext;
