import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './chatOnline.css';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriend] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get('/users/friends/' + currentId);
      setFriend(res.data);
    };
    getFriends();
  }, [currentId]);

  console.log('friends', friends);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
      setCurrentChat(res.data);
    } catch (error) {
      console.log('error', error)
    }
  }
  
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <div className='chatOnline'>
      {onlineFriends.map((o) => (
        <div className='chatOnlineFriend' onClick={() => handleClick(o)}>
          <div className='chatOnlineImgContainer'>
            <img
              className='chatOnlineImg'
              src={o.profilePicture ? PF + o.profilePicture : PF + 'person/noAvatar.png'}
              alt=''
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{o.username}</span>
        </div>
      ))}
    </div>
  );
}
// https://www.hentaipins.com/wp-content/uploads/2017/10/anime-hentai-gif-15083333614kng8.gif
// https://media-cdn.tripadvisor.com/media/photo-s/12/4c/0a/ba/montecristo-country-house.jpg
