import React from 'react'
import './post.css';
import Avatar from '@material-ui/core/Avatar';


function post({username, caption, imageUrl}) {
    return (
        
      
        <div className="post">
            <div className="post__header">
            <Avatar 
            className="post__avatar"
            alt="Ambarish" 
            src="/static/images/avatar/1.jpg" />
            <h3>{username}</h3>
            </div>
            {/**header-> avater + username */}
            
            <img
            className="post__image"
            src={imageUrl}
            alt="post"
            id="myImg"
            />
          


            {/**image */}

            <h4 className="post__text"><strong>{username}: </strong>{caption}</h4>
            {/**username + caption */}
        </div>
    )
}

export default post
