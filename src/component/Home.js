import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig/Firebase-Config';
import {MdDeleteForever} from 'react-icons/md'

const Home = ({isAuth}) => {

  //storing the data in an array
  const [postList, setpostList] = useState([]);

  //creating a collection in the firestore
  const collectionRef = collection(db, 'POST');

  useEffect(()=>{
     const getposts = async ()=>{
      const data = await getDocs(collectionRef);
      setpostList(data.docs.map((e)=>({
        ...e.data(), id: e.id
      })))
     };
     
     getposts();
  },[])

  const deletePost = async (id)=> {
    if(window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS POST?')) {
      const postDoc = doc(db, 'POST', id)
      await deleteDoc(postDoc)
    }
  }


  return (
    <div className='homePage'>
      {postList.map((e, index)=> {
        return (
          <div className='post' key={index}>
            <div className='postHeader'>
              <span className='title'>
                <h1>{e.title}</h1>
              </span>

              <span className='deletePost'>
               {isAuth && e.author.id === auth.currentUser.uid && (
                 <MdDeleteForever className='iconstyle' />
                 )}
              </span>
              
              <span className='postTestContainer'>
              </span>

            </div>
                 <p>{e.textarea}</p>
                 <h3>{e.author.name}</h3>
                 <p>@{e.author.email}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Home;
