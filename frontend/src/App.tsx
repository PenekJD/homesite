import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import UserContext from './context/UserContext';
import Header from './components/Header';
import Options from './components/pages/Options';
import Option from './components/pages/Option';
import Login from './components/pages/Login';
import { Nestjs } from './components/pages/Nestjs';



function App() {
  //THEME params
  let [theme, setTheme] = useState('light');
  //USER params
  const [user, setUser] = useState( {name: "Guest", isLoggedIn: false} );

  function changeTheme(sTheme:string): void {
    localStorage.setItem('theme', sTheme);
    setTheme(sTheme);
  }

  function checkAuth() {
    const checkKey: string = localStorage.getItem('u_token')+'';
    if (checkKey && checkKey !== 'null' && checkKey !== 'undefined') {
      
    }
  }

  function checkTheme() {
    const checkSavedTheme: string = localStorage.getItem('theme')+'';
    if ( checkSavedTheme !== 'null' ) {
      setTheme(checkSavedTheme);
    }
  }

  useEffect( () => {
    checkTheme();
    checkAuth();
  }, [] );

  return (
    <UserContext.Provider value={ { user, setUser } }>
      <div className={ 'App '+' '+theme }>
        
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={ <b>WELCOME</b> }/>
            <Route path="/login" element={ <Login setUser={setUser} user={user}/> }/>
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
