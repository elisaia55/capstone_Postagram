import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import UserProfile from './components/UserProfile';
import { authenticate } from './store/session';
import Navigation from './components/Navigation';
import NewPost from './components/PostModal/NewPost';
import Post from './components/Post';
import Home from './components/Home';
import About from './components/About';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      
      <Switch>
        <Route path='/login' exact={ true }>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={ true }>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/posts/:postId" exact={ true }>
          <Navigation />
          <Post />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={ true } >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={ true } >
          <Navigation />
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={ true } >
          <Navigation />
          <Home />
        </ProtectedRoute>
        <Route path='/about-us' exact={true}>
          
          <About />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
