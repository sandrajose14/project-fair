
import './App.css';
import Footer from './components/Footer';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import Home from './pages/Home';
import Auth from './components/Auth';
import { isAuthTokenContext } from './contexts/ContextShare';
import { useContext } from 'react';

function App() {

  const {isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/project' element={<Project/>}></Route>
        <Route path='/dashboard' element={isAuthToken?<Dashboard Dashboard/>:<Home/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
