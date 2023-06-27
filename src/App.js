import './App.css';
import Home from './component/Home';
import NavBar from './component/NavBar';
import { Route, Routes } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Post from './component/Post';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth} from './FirebaseConfig/Firebase-Config';
import { useEffect, useState } from 'react';

function App() {

  const [ user, setuser ] = useState(null)

  //useState for checking if user is autheticated

  const [ isAuth, setisAuth] = useState(localStorage.getItem('isAuthorised'));

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        setuser (authUser);
      } else {
        setuser(null);

      }
    });
  }, []);


  return (
    <div>
      {/* <h1>Hello Pyschos!!!</h1> */}
      <ToastContainer />
      <NavBar isAuth ={isAuth} setisAuth ={setisAuth} setuser ={setuser} />

      <Routes>
        <Route path='/' element={<Home isAuth ={isAuth} />}/>
        <Route path='/register' element={<Register setisAuth ={setisAuth} setuser ={setuser} />}/>
        <Route path='/login' element={<Login setisAuth ={setisAuth} setuser={setuser} />}/>
        <Route path='/post' element={<Post isAuth={isAuth} />}/>
      </Routes>
    </div>
  );
}

export default App;
