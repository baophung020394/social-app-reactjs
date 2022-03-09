import React, { useState, useEffect, useContext } from 'react';
import { MoreVert } from '@material-ui/icons';
import axios from 'axios';
import { format } from 'timeago.js';

import { Link } from 'react-router-dom';
import './post.css';
import { AuthContext } from '../../context/AuthContext';
import ReactTimeAgo from 'react-time-ago';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);

      setUser(res?.data ? res.data : {});
    };

    fetchUser();
  }, [post.userId]);

  const likeHander = () => {
    try {
      axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={
                  currentUser.profilePicture
                    ? PF + currentUser.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=''
              />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>
              {/* <ReactTimeAgo date={post.createdAt} locale="en-US"  timeStyle="round"/> */}
              {format(post.createdAt)}
            </span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>

        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={PF + post?.img} alt='' />
        </div>

        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img className='likeIcon' src={`${PF}like.png`} alt='' onClick={likeHander} />

            <img className='likeIcon' src={`${PF}heart.png`} alt='' onClick={likeHander} />

            <span className='postLikeCounter'>{like} people liked it</span>
          </div>

          <div className='postBottomRight'>
            <span className='postCommentText'>{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
