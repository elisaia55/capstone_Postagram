import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getPostFollowing } from '../../store/post';


import './UserProfile.css'






function UserProfile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  const userAuth = useSelector(state => state.session.user)

  const getUserPosts = useSelector((state) => state.post.following);
  
  let postCount = Object.keys(getUserPosts).length - 1
  
  
  useEffect(() => {
    dispatch(getPostFollowing());
  }, [user]);
  
  
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
      <div className='top-user-profile'>

       <img src={user.image_url} id="user-profie-img"></img>
       <div className='user-profile-info'>
        <h2 id='user-profile-username'>{user.username}</h2>
        {userAuth.id === user.id && <button>edit Profile</button>}

       </div>
      <div className=''>
        
        </div>      
      </div>

    <div>
      
    </div>
        {userId} 
      
        <p>
          
          {user.email}
          </p>
      

    
    <div>

      <p>
        
         {user.username}
        </p>
    </div>
    </div>
  );
}
export default UserProfile;
