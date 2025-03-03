import React from 'react'
import './container.sass';

function container({page, title, description, body}) {
  return (
    <div className='container'>
        <div className='content'>
            <h3 className='title'>{title}</h3>
            <div className='description'>{description}</div>
            <div className='body'>{body}</div>
        </div>
    </div>
  );
}

export default container