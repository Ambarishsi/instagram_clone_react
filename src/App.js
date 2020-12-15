import React, { useState } from 'react';
import './App.css';
import Post from './post';
import { db, auth } from './firebase';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import ImageUpload from './Imageupload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  
  paper: {
    position: 'absolute',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  //useEffect -> Runs a piece of code based on a specific condition

 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser) =>{
    if(authUser){
      //user has logged in
      console.log(authUser);
      setUser(authUser);

    } else {
      //user has logged off
      setUser(null);
    }
  })
return () =>{
  //perfom some cleanup action
  unsubscribe();
}

 }, [user, username]);
  
 useEffect(() => {
   db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
     //everey time a new post added, this code fires up
     setPosts(snapshot.docs.map(doc => ({
       id: doc.id, 
       posts: doc.data()
     })
     ));
   });
  }, []);

  const signUp = (event) =>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
     return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
    setOpen(false);
  }

  const signIn = (event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false);
  }

  return (
    <div className="App">
     
       
<Modal
  open={open}
  onClose={() => setOpen(false)}

>
<div style={modalStyle} className={classes.paper}>
<center>
    <img
      className="app__headerImage"
      src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="logo"
      />
</center> 
<form className="app__signup">
<Input
      placeholder="username"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required={true}
      />
      <Input
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required={true}
      />
      <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required={true}
      />
      <Button type="submit" onClick={signUp} color="secondary">Sign Up</Button>
</form>
      
  
</div>
</Modal>

<Modal
  open={openSignIn}
  onClose={() => setOpenSignIn(false)}

>
<div style={modalStyle} className={classes.paper}>
<center>
    <img
      className="app__headerImage"
      src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="logo"
      />
</center> 
<form className="app__signup">

      <Input
      placeholder="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <Input
      placeholder="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" onClick={signIn} color="secondary">Sign  In</Button>
</form>
      
  
</div>
</Modal>

<Modal
  open={openUpload}
  onClose={() => setOpenUpload(false)}

>
<div style={modalStyle} className={classes.paper}>
<center>
    <img
      className="app__headerImage"
      src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="logo"
      />
      
</center> 

    {
      user?.displayName ? (
        <ImageUpload username={user.displayName}/>  
      ): (
       ''
      )
    }
  
</div>
</Modal>

    <div className="app__header"> 
     { /*<img
      className="app__headerImage"
      src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      alt="logo"
     />*/}
      <div  className="app__headerImage">
      {
      user?.displayName ? (
        <h3>{user.displayName}</h3> 
      ): (
        <h3>Slkgram</h3>
      )
    }
      </div>
      <div className="app__buttons">
       {user ? (
        <div className="app__loginContainer">
       <Button  onClick={() => setOpenUpload(true)} color="primary">Upload</Button>
       <Button  onClick={() => auth.signOut()} color="primary">Logout</Button>
       </div>
    ):(
      <div className="app__loginContainer">
        <Button  onClick={() => setOpenSignIn(true)} color="primary">Sign In</Button>
        <Button  onClick={() => setOpen(true)} color="primary">Sign Up</Button>
      </div>
    )}
    </div>
    
    </div>
    <br></br><br></br><br></br><br></br>
 
 {/**Header */}
    
    
    
    {/**Posts */}
    
{  
  posts.map(({id,posts}) => (
    <Post key ={id} username={posts.username} caption={posts.caption} imageUrl={posts.imageUrl}/>
    ))
}

    {/**Posts */}


    </div>
  );
}

export default App;
