import React from 'react';
import { format } from 'timeago.js';
import './message.css';

export default function Message({ message, own }) {
  return (
    <div className={own ? 'message own' : ''}>
      <div className='messageTop'>
        <img className='messageImg' src='http://i.redd.it/875pyiflh2541.gif' alt='' />
        <p className='messageText'>{message.text}</p>
      </div>
      <div className='messageBottom'>{format(message.createdAt)}</div>
    </div>
  );
}
