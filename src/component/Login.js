import { useState} from 'react';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../FirebaseConfig/Firebase-Config';

//initial state for the input
const initialState = {
	email:'',
	password:''
};

const Login = ({setisAuth, setuser}) => {

	const navigate =useNavigate();

	const [formValue, setFormValue] = useState(initialState);
	const { email, password } =formValue;

	//Targeting the input form
	const onInputChange = (e) => {
		setFormValue({...formValue, [e.target.name]: e.target.value})
	}


	const HandleLoginSubmit = async (e) =>{
		e.preventDefault();

		try {
			if(email && password) {
				const {user} = await signInWithEmailAndPassword(auth, email, password);
				setuser(user);
				toast.success('Login Successfully');
				navigate('/');
				localStorage.setItem('IsAuthorised', true); //storing in localstorage
				setisAuth(true);
			}
		} catch (error) {
			toast.error(error.message);
		}
	}

	const GoogleBtn =() => {
		signInWithPopup(auth, provider).then((result)=> {
			toast.success('Signup Successfully');
			localStorage.setItem('IsAuthorised', true);
			navigate('/')
			setisAuth(true);
		})
	}


  return (
    <div className="container">
		<h1>Login</h1>
		<form onSubmit={HandleLoginSubmit}>

			<label htmlFor="email">Email</label>
			<input type="email" id="email" name="email" required value={email} onChange={onInputChange} />

			<label htmlFor="password">Password</label>
			<input type="password" name="password" required value={password} onChange={onInputChange} />
			
			<button type='submit'>Login</button>

		</form>

		<div className="loginPage">
        
        <button className='login-with-google-btn'>Sign In With Google</button>
        </div>

		<div>Don't have an account?<Link className='linkStyle' to='/register'> Register</Link></div>
	</div>
  )
}

export default Login;
