import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './conversations.css';

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios('/users?userId=' + friendId);
        console.log('res', res);
        setUser(res.data);
      } catch (error) {
        console.log('error', error);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <img
        className='conversationImg'
        src={user?.profilePicture ? PF + user.profilePicture : PF + 'person/noAvatar.png'}
        alt=''
      />
      <span className='conversationName'>{user?.username}</span>
    </div>
    // http://i.redd.it/875pyiflh2541.gif
    // https://static.hentai-img.com/upload/20141125/1/308/230.gif
    // https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/272317134_4701497346631526_7595671562833540517_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=FRl_pv3WrA0AX_O-m5Q&_nc_ht=scontent.fsgn5-9.fna&oh=00_AT9hMpCZSjmH9weLBhWVpcls7vhNU3b3eeSykl1J8Vq6Qg&oe=6217D354
  );
}
