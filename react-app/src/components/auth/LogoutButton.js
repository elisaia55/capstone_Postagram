import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import '../Navigation/Navigation.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout()).then(history.push('/login'));
    
  };

  return (
    <div className='logout-btn-container' onClick={onLogout}>
      <button className='logout-btn'>Logout</button>

    </div>
      )
};

export default LogoutButton;
