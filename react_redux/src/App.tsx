import './App.css';
import './Components/assessment/AssessmentBlock.css';
import './Components/header/Header.css';
import './Components/localdata/LocalData.css';
import Assessment from './Components/assessment/Assessment';
import Words from './Components/words/Words';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/header/Header';
//REDUX
import { Provider } from 'react-redux';
import store from './store/store';
import LocalData from './Components/localdata/LocalData';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Words />} />
            <Route path="/ass" element={<Assessment />} />
            <Route path="/data" element={<LocalData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
