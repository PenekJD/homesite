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



function App() {

  let backendUrl: string = process.env.REACT_APP_HOST_SERVER+'';
  let [serverResp, setServerResp] = useState([]);
  //THEME params
  let [theme, setTheme] = useState('light');
  //USER params
  const [user, setUser]: 
  [IUser, React.Dispatch<React.SetStateAction<IUser>>]
  = useState({fullname: "Guest", lastname:""});

  //for UseEffect COmponent
  let [activeUE, setActiveUE]:
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] 
  = useState(true);


  //Connect to backend
  function loadInfo(): void {
    fetch(backendUrl)
    .then( resp => resp.json() )
    .then( data => { setServerResp(data) } )
  }


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
            <Route path="/main" 
            element={<>
              <div>Test ENV val:</div>
              <div>{backendUrl}</div>
              <br />
              <br />
              <Card val={"Hello"} dec={ JSON.stringify(serverResp) } func={ loadInfo }></Card>
            </>} />
            <Route path="/actives"
            element={<>
              <br />
              { activeUE && (<CUseEffect setOff={setActiveUE}></CUseEffect>) }
              { !activeUE && ( <button onClick={ ()=>{ setActiveUE(true) } }>Mount UseEffect Component</button> ) }
              <br />
              <CUseCallback></CUseCallback>
            </>} />
          </Routes>
        </BrowserRouter>

      </div>
    </UserContext.Provider>
  );
}

export default App;
