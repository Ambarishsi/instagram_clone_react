import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {storage, db} from './firebase';
import firebase from 'firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './Imageupload.css';

function Imageupload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage.ref ("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    //post image inside the db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username :username
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
                })
            }
        )
    }

    return (
        <div className="imageupload">
            <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{progress} %</Typography>
      </Box>
    </Box><br />
            <input type="text" placeholder="Enter a caption" onChange={event =>setCaption(event.target.value)} value={caption}/><br />
            <input type="file" onChange={handleChange} /><br/><hr/>
            <Button onClick={handleUpload} color="secondary">Upload</Button>
            
            


        </div>
    )
}

export default Imageupload
