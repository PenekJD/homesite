import { Dispatch, SetStateAction } from 'react';
import IUser from './IUser';

export default interface IUserContext {
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
}