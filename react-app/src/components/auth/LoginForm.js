import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import PhoneImg from '../../images/phone.png'
import GoogleLogo from '../../images/gg-play.png'
import AppleLogo from '../../images/app-store.png'
import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setErrors([])
    setEmail(e.target.value);
    
  };

  const updatePassword = (e) => {
    setErrors([])
    setPassword(e.target.value);
  };

  const demoUser2 = () => {
    dispatch(login("demo@aa.io", "password"))
  }

  if (user) {
    return <Redirect to='/' />;
  }



  return (
    <>
    <div className='login-container'>
      <div className='login-phone-img'>
        <h2 className='main-logo2'>Postagram</h2>
        <img src={PhoneImg}></img>
      </div>
      <div className='right-login-container'>


        
      <p className='main-logo'>Postagram</p>
    <div className='login-info-container'>
    
    
    <form onSubmit={onLogin}>
      <div className='signup-errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
      <div className='login-inputs-container'>
        <label htmlFor='email'></label>
        <input
          className='signup-inputs'
          name='email'
          type='email'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
          />
      
        <label htmlFor='password'></label>
        <input
          className='signup-inputs'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
          />
        <div className='login-button-container'>

        <button id='login-button-main' type='submit'
        onClick={onLogin}
        disabled={
          !email.length ||
          !password.length}>Log in</button>
        </div>
            <div className='break-or2'>
          <div className='or-line-break2'></div>
          <div className='or-word2'> OR </div>
          <div className='or-line-break2'></div>
        </div >
        <button className='login-demo-button2' onClick={demoUser2}
          >Log in as Demo User</button>
      </div>
          
    </form>
    </div>
    <div className='bottom-login-container'>
      <p> Don't have an account?</p>
      <a id='login-signup-button' href='/signup'>Sign up</a>
    
    </div>
    <div className='get-app-text2'>Get the app</div>
    <div className='social-logos-container'>
      <a href='https://apps.apple.com/app/instagram/id389801252?vt=lo' target='_blank'>

<img className='social-logos2' src={GoogleLogo}></img>
</a>
<a href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3D06C72F4A-D84C-4ECF-8C5D-844C98131E2D%26utm_content%3Dlo%26utm_medium%3Dbadge' target='_blank'>

<img className='social-logos2' src={AppleLogo}></img>
</a>
    </div>
    </div>
    </div>
    
    
          </>
  );
};

export default LoginForm;
