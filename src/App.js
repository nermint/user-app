import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserList from './components/UserList/UserList';
import UserUpdate from './components/UserUpdate/UserUpdate';
import Header from './components/Layout/Header';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event) =>{
    setSearchValue(event);
  }
  return (
    <>
      <Router>
        <Header onChangeInput={handleChange}/>
        <Routes>
          <Route path='/' element={<UserList searchValue={searchValue}/>}/>
          <Route path='/add' element={<UserUpdate/>}/>
          <Route path='/edit/:id' element={<UserUpdate/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
