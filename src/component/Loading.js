import React from 'react'
import ReactDOM from 'react-dom';
import loadingGif from '../Asset/loading.gif';

const Loading = () => {
  return ReactDOM.createPortal (
    <div id='wrapper'>
        <div className='loader'>
            <img src={loadingGif} alt='loading gif' width={200}/>
        </div>
      
    </div>,
    document.getElementById('loading')
  )
}

export default Loading;
