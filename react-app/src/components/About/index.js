import HeadShot from '../../images/headshot.jpg'
import GithubImage from '../../images/GitHub-logo.jpg'
import LinkedInImage from '../../images/Linked-in.png'
import College from '../../images/college.png'
import Program from '../../images/Appacademy.jpeg'
import './About.css'
import { useSelector } from 'react-redux'
import Navigation from '../Navigation'




const About = () => {

    const currentUser = useSelector(state => state.session.user)



    const pictureStyling = {
        height: "160px",
        width: "160px",
        borderRadius: "50%"
    
      }

    return (
         <>
         {currentUser ? <Navigation /> : false}
         <div className='user-profile-container'>
        <div className='inner-top-profile'>
      <div className='top-user-profile'>

        <div className='user-profile-img'>
       <img src={HeadShot} id="user-img" style={pictureStyling}></img>

        </div>
       

       <div className='user-profile-info'>
        <h2 id='user-profile-username'>elisaia99</h2>
       

       </div>
      <div className='user-stats-container'>
        <div></div>
        <div className='user-stats-info'>
          <span className='user-profile-count'> 4 </span>
          <span className='user-stats-text'> posts </span>
        </div>
      <div className='user-stats-info'>
        <span className='user-profile-count'>99,000,000</span>
        <span className='user-stats-text'> followers</span>
      </div>
      <div className='user-stats-info'>
        <span className='user-profile-count'>1</span>
        <span className='user-stats-text'> following</span>
      </div>
        </div>      
        </div>
        <div className='user-profile-description'>
          <h3 id='h3-username'>Augustino "Fino" Elisaia</h3>
          <p id='user-description2'>Hello, my name is Augustino Elisaia and I am an ex-professional football player looking to become a software engineer</p>
        
      </div>
      <div className='user-img-container'>

        </div>
          <div className='line-break'>
          <svg aria-label="" className="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
          <span className='posts-mid-border'>Posts</span>
          </div>
        </div>
        
        
       
        <div className='photo-gallery-container'>
            <a href='https://github.com/elisaia55' target='_blank'>
        <img className='profile-imgs' src={GithubImage}></img>

            </a>
            <a href='https://www.linkedin.com/in/augustino-elisaia-7307a822b/' target='_blank'>
        <img className='profile-imgs' src={LinkedInImage}></img>

            </a>
        
            <a href='https://www.calpoly.edu/' target='_blank'>
        <img className='profile-imgs' src={College}></img>

            </a>
            <a href='https://www.appacademy.io/learn-more/software-engineering-immersive-remote?utm_campaign=18674160910&utm_adgroup=142743095237&utm_matchtype=e&utm_device=c&utm_gclid=CjwKCAjwtp2bBhAGEiwAOZZTuCoMKPZA2RzPLvZ-GMhNKHF2t_V4oExb_oEpQYJKcu-BRCMTvoH98xoCZI8QAvD_BwE&utm_creative=629907419991&utm_keyword=app%20academy&utm_source=google&utm_medium=ppc&utm_adposition=&utm_placement=&utm_location=9032006&utm_network=g&gclid=CjwKCAjwtp2bBhAGEiwAOZZTuCoMKPZA2RzPLvZ-GMhNKHF2t_V4oExb_oEpQYJKcu-BRCMTvoH98xoCZI8QAvD_BwE' target='_blank'>
        <img className='profile-imgs' src={Program}></img>

            </a>
        
        </div>

    <div>
      
      
    </div>
        
    
    <div>
    </div>
    <div></div>
    </div>
        {!currentUser ? 
        <a className='return-button-atag' href='/signup'>
             <button className='return-button'>Go Back to Sign In</button> 
        </a>
       
        : false}
         </>
    )
}

export default About;