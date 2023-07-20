import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Card from './components/Card';
import IUser from './interfaces/IUser';
import UserContext from './context/UserContext';
import CUseEffect from './components/CUseEffect';
import CUseCallback from './components/CUseCallback';
import Header from './components/Header';
import Options from './components/pages/Options';
import Option from './components/pages/Option';
import Login from './components/pages/Login';
import { Nestjs } from './components/pages/Nestjs';



function App() {
  //THEME params
  let [theme, setTheme] = useState('light');
  //USER params
  const [user, setUser]: 
  [IUser, React.Dispatch<React.SetStateAction<IUser>>]
  = useState({fullname: "Guest", lastname:""});

  function changeTheme(sTheme:string): void {
    localStorage.setItem('theme', sTheme);
    setTheme(sTheme);
  }

  useEffect( () => {
    let checkSavedTheme: string = localStorage.getItem('theme')+'';
    if ( checkSavedTheme !== 'null' ) {
      setTheme(checkSavedTheme);
    }
  }, [] );

  return (
    <UserContext.Provider value={ { user, setUser } }>
      <div className={ 'App '+' '+theme }>
        
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={ <b>WELCOME</b> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/options" element={<Options theme={theme} setTheme={changeTheme} />}/>
              <Route path="/options/:id" element={ <Option /> } />
            <Route path='/nestjs' element={<Nestjs />}/>
          </Routes>
        </BrowserRouter>

      </div>
    </UserContext.Provider>
  );
}

export default App;
