import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UserList from './components/UserList';
import UserUpdate from './components/UserUpdate';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<UserList/>}/>
          <Route path='/add' element={<UserUpdate/>}/>
          <Route path='/edit/:id' element={<UserUpdate/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
