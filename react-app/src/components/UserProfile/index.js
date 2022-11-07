import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getPostFollowing } from '../../store/post';
import { findPosts } from '../../store/post';
import { singleUser } from '../../store/user';
import { useHistory } from 'react-router-dom';
import './UserProfile.css'






function UserProfile() {
  const history = useHistory()
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
    height: "160px",
    width: "160px",
    borderRadius: "50%"

  }

  useEffect(() => {
    dispatch(singleUser(userId))
  }, [userId])



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
    
  }, []);
  
 
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

        </div>
          <div className='line-break'>
          <svg aria-label="" className="_ab26-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
          <span className='posts-mid-border'>Posts</span>
          </div>
        </div>
        
        
       
        <div className='photo-gallery-container'>
      {getUserPosts?.map((post,i) => (
        
        <div key={post + i} className="user-posts-imgs">
          <div className='top-user'>
            <a href={`/posts/${post.post.id}`}>
            <div className='brighten'>
            <img className='profile-imgs' src={post.post.media_url}/>

            </div>
            </a>
          </div>
   

        </div>
      ))}

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
