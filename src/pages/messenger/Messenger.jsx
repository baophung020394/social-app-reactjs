import Topbar from 'components/topbar/Topbar';
import React from 'react';
import './messenger.css';

export default function Messenger() {
  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>menu</div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>box</div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>online</div>
        </div>
      </div>
    </>
  );
}
