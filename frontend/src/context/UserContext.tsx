import { createContext } from "react";
import IUserContext from "../interfaces/IUserContext";

const UserContext = createContext<IUserContext>({
  user: {
    fullname: "",
    lastname: ""
  },
  setUser: ()=>{}
});

export default UserContext;
