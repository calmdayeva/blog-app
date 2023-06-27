import {useEffect, useState} from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; //storing the data in firestore db
import { db, auth } from '../FirebaseConfig/Firebase-Config'; //database configuration
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const initialState = {
  title:'',
  textarea:''
}

const Post = ({isAuth}) => {

  const navigate = useNavigate();

  const [loading, setloading] = useState(false)
  
  const [formValue, setFormValue] = useState(initialState);
  const { title, textarea} = formValue

  //Targeting the input form
  const onInputChange = (e) =>{
    setFormValue({...formValue, [e.target.name]: e.target.value});
  }
 
  //This handle submit functionality
  const HandleSubmit = async (e) =>{
    e.preventDefault();
    setloading(true);
    

    //creating a collection in the firestore
    const collectionRef = collection(db, 'POST');
    
    try {

      await addDoc(collectionRef, {
        ...formValue,
        timestamp: serverTimestamp(),
        //date: new Date(),

        //author
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
            email: auth.currentUser.email
        }
      });
  
      setloading(false)
      navigate('/')
      
    } catch (error) {
      console.log(error)
      setloading(false)
      
    }
  };


  //protecting the route
  //if not authenticated redirect to login page...
  useEffect(()=>{
    if (!isAuth) {
      navigate('/login')
    }
  },[isAuth, navigate]);


  return (
    <>
    {loading && <Loading /> }
    
      <div className='CreatePostPage'>

        <div className='cpContainer'>
          <h1>Create A Post</h1>
          
          <form onSubmit={HandleSubmit}>
          <div className='inputGp'>
            <label>Title:</label>
            <input name='title' type='text' placeholder='Title...' value={title} onChange={onInputChange} required/>

          </div>
          
          <div className='inputGp'>
            <label>Post:</label>
            <textarea name='textarea' placeholder='Post an Article...' value={textarea} onChange={onInputChange} required/>
          </div>

          <button>Submit Post</button>
          </form>

        </div>
      </div>
    </>
  )
}

export default Post;
