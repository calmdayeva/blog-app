import {useState} from 'react'
import {auth, provider} from '../FirebaseConfig/Firebase-Config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link,useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';

//initial state for the input
const initialState = {
	Username:'',
	email:'',
	password:'',
	ConfirmedPassword:''
};

const Register = ({ setisAuth, setuser}) => {

	const navigate =useNavigate();

	const [formValue, setFormValue] = useState(initialState);
	const { Username, email, password, ConfirmedPassword } =formValue;

	//Targeting the input form
	const onInputChange = (e) => {
		setFormValue({...formValue, [e.target.name]: e.target.value});
	}

	const HandleSubmit = async (e) =>{
		e.preventDefault();

		if (Username === '' || email === '' || password === '' || ConfirmedPassword === '' ) {
			toast.error('pls fill in the input field');
			return;
		} 
		if (password.length < 6) {
			toast.error('password is too short');
			return;
		} if (password !== ConfirmedPassword){
			toast.error('password do not match');
			return;
		} 
		
			try{

			 const {user} = await createUserWithEmailAndPassword( auth, email, password);
						await updateProfile(user, {displayName: Username});
						// console.log('user registered succesfully ')
					toast.success('User registered successfully');
					//Additional logic or reduction after succesful registration
					navigate('/');
					
					localStorage.setItem('isAuthorised', true); //storing in local storage
					setisAuth(true);

			} catch (error){
				console.log('User already in Use');
			}
			
	};

  return (
    <div className="container">
		<h1>Register</h1>
		<form onSubmit={HandleSubmit}>
			<label htmlFor="username">Username</label>
			<input type="text" name="Username" required value={Username} onChange={onInputChange}  />

			<label htmlFor="email">Email</label>
			<input type="email" name="email" required value={email} onChange={onInputChange} />

			<label htmlFor="password">Password</label>
			<input type="password" name="password" required value={password} onChange={onInputChange}  />

			<label htmlFor="confirm-password">Confirm Password</label>
			<input type="password" name="ConfirmedPassword" required value={ConfirmedPassword} onChange={onInputChange} />

			<button type="submit">Register</button> 
		</form>

		<div>Already have an account? <Link className='linkStyle' to='/login'>Login</Link></div>
	</div>
  )
}

export default Register;
