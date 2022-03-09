import React, { useContext, useEffect, useState, useRef } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import './feed.css';
import { AuthContext } from '../../context/AuthContext';
import ReactAudioPlayer from 'react-audio-player';
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  // const [playSound, setPlaySound] = useState(true);

  // useEffect(() => {
  //   onClickPlay(playSound);
  // }, [playSound]);
  // const handleSetPlaySound = () => {
  //   console.log('cc');
  //   setPlaySound(!playSound);
  // };
  // console.log('playSound', playSound)
  // const renderAudio = () => {
  //   console.log('play', playSound);
  //   return (
  //     <>
  //       <ReactAudioPlayer
  //         src={playSound ? 'https://www.mboxdrive.com/backgroundhome.mp3' : null}
  //         autoPlay={playSound ? true : false}
  //         controls
  //       />
  //     </>
  //   );
  // };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get('/posts/profile/' + username)
        : await axios.get('posts/timeline/' + user._id);

      setPosts(
        res?.data
          ? res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          : []
      );
    };

    fetchPosts();
  }, [username, user._id]);
  
  return (
    <div className='feed'>
      <div className='feedWrapper'>

        {(!username || username === user.username) && <Share />}

        {
          posts.map((p) => (
            <Post key={p._id} post={p} />
          ))
        }

      </div>
    </div>
  );
}
