import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getPostFollowing } from '../../store/post';
import { findPosts } from '../../store/post';


import './UserProfile.css'






function UserProfile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])
  const userAuth = useSelector(state => state.session.user)
  const [finishedLoading, setFinishedloading] = useState(false)
  
  const getUserPosts = useSelector((state) => state.post?.posts);
  
  
  const postCount = Object.keys(getUserPosts || {}).length 
  


  let randomNum = Math.floor(Math.random() * 9999)
  let randomNum2 = Math.abs(Math.floor(Math.random() * 999))

  const pictureStyling = {
    height: "100px",
    width: "100px",
    borderRadius: "50%"

  }

  let newCounter;

  // const postCount = () => {
  //   if (finishedLoading) {
  //       newCounter = Object.keys(getUserPosts).length - 1
  //   } else {
  //     return null
  //   }
  // }
  
  useEffect(() => {
    (async () => {
      const newResponse = await dispatch(findPosts(userId))
      if (newResponse) {
        setErrors(newResponse)
        setFinishedloading(true)
      }
    })();
    console.log( "WE HIT THE MOTHERLOAD")
  }, [dispatch]);
  
 

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }


  return (
    <div className='user-profile-container'>
        <div className='inner-top-profile'>
      <div className='top-user-profile'>

        <div className='user-profile-img'>
       <img src={user.image_url} id="user-img" style={pictureStyling}></img>

        </div>
       <div className='user-profile-info'>
        <h2 id='user-profile-username'>{user.username}</h2>
        {userAuth.id === user.id && <button id='edit-profile-btn'>Edit Profile</button>}

       </div>
      <div className='user-stats-container'>
        <div></div>
        <div className='user-stats-info'>
          <span className='user-profile-count'> {postCount} </span>
          <span className='user-stats-text'> posts </span>
        </div>
      <div className='user-stats-info'>
        <span className='user-profile-count'>{randomNum}</span>
        <span className='user-stats-text'> followers</span>
      </div>
      <div className='user-stats-info'>
        <span className='user-profile-count'>{randomNum2}</span>
        <span className='user-stats-text'> following</span>
      </div>
        </div>      
        </div>
        <div className='user-profile-description'>
          <h3 id='h3-username'>{user.name}</h3>
          <p id='user-description'>{user.description}</p>
      </div>
      <div className='user-img-container'>

      {getUserPosts?.map((post,i) => (
        <div key={post + i} className="user-posts-imgs">
          <div className='top-user'>
            <img className='profile-imgs' src={post.post.media_url}/>
          </div>

        </div>
      ))}
      </div>
        </div>

    <div>
      {}
      
    </div>
        
    
    <div>
    </div>
    <div></div>
    </div>
  );
}
export default UserProfile;
