import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig/Firebase-Config';
import { signOut } from 'firebase/auth';

const NavBar = ( {setisAuth, setuser, isAuth }) => {

  const navigate = useNavigate();

  const signOutBtn = () => {
    if (window.confirm('ARE YOU SURE YOU WANT TO LOG OUT FROM YOUR ACCOUNT ?')) {
      signOut(auth).then(()=>{
        localStorage.clear();
        setuser(null);
        setisAuth(false);
        navigate('/login');

      })
    }
  }
  return (
    <nav>
      <Link to='/'>Home</Link>

      {!isAuth ?(<Link to='/login'>Login</Link>):(
        <>
        <Link to='/post'>CreatePost</Link>
      <button onClick={signOutBtn}>Sign Out</button>
        </>
        
      )}
  
    </nav>
  )
}

export default NavBar;
