import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import { OpenModal } from '../../context/OpenModal';
import MainLogo from '../../images/POSTagram_logo.png'
import "./auth.css"



const SignUpForm = () => {
  const { setNum } = OpenModal();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("")
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const date = new Date()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username.toLowerCase(), email, password, name));
      if (data) {
        setErrors(data);
      };
      if (data) {
        setErrors(data);
      }
      setNum(0)
    } else {
      setErrors(["Passwords must be the same"])
    }
  };

  useEffect(() => {
    document.title = 'Sign Up • Postagram'
  }, [])

  const demoUser = () => {
    dispatch(login("demo@aa.io", "password"))
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value)
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-outer-container'>
      <div className='top-signup'>
        <p className='main-logo'>Postagram</p>
        <div className='sign-up-greeting'>
          <p className='sign-up-word'>Sign up to see photos and videos from your friends.</p>
        </div>
        <button onClick={ demoUser } className="signup-demo-btn">
          Log in as Demo User
        </button>
        <div className='break-or'>
          <div className='or-line-break'></div>
          <div className='or-word'>OR</div>
          <div className='or-line-bot-break'></div>
        </div>
        <form className='signup-form-container' onSubmit={ onSignUp }>
          <div>

            <input
              placeholder='Email'
              className='signup-inputs'
              type='text'
              name='email'
              onChange={ updateEmail }
              value={ email }
              required={ true }
              autoComplete="off"
            ></input>
          </div>
          <div>
            <input
              placeholder='Full Name'
              className='signup-inputs'
              type='text'
              name='name'
              onChange={ updateName }
              value={ name }
              required={ true }
              autoComplete="off"
            ></input>
          </div>
          <div>
            <input
              placeholder='Username'
              className='signup-inputs'
              type='text'
              name='username'
              onChange={ updateUsername }
              value={ username }
              required={ true }
              autoComplete="off"
            ></input>
          </div>

          <input
            placeholder="Password"
            className='signup-inputs'
            type="password"
            name="password"
            autoComplete="off"
            onChange={ updatePassword }
            value={ password }
            required={ true }
          ></input>
          <input
            placeholder="Repeat Password"
            autoComplete="off"
            className='signup-inputs'
            type="password"
            name="repeat_password"
            onChange={ updateRepeatPassword }
            value={ repeatPassword }
            required="{ true }"
          >

          </input>
          <button
            type='submit'
            className='signup-btn'
            disabled={
              !username.length ||
              !email.length ||
              !password.length ||
              !repeatPassword.length ||
              !name.length
            }
          >
            Sign Up
          </button>

        </form>
        <div className='signup-errors'>

          { errors.map((error, ind) => (
            <div key={ ind }>{ error }</div>
          )) }

        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
