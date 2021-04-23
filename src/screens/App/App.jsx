import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { useLocation, Link, Route } from 'react-router-dom';
import { FeedbackFish } from '@feedback-fish/react';
import Home from '../Home/Home';
import RandomPool from '../RandomPool/RandomPool';
import './App.scss';
import { SERVER_URL } from '../../constants';

const App = () => {
  const path = useLocation().pathname;

  useEffect(() => {
    fetch(`${SERVER_URL}/ping`); // Ping our server to wake it up
  }, []);

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="app__title">
            <Link to="/">MTG Dreamland</Link>
          </Typography>
          <div className="v-divider" />
          <Link to="/" className={`underline-link ${path === '/' && 'current'}`}>
            <span className="inner">HOME</span>
          </Link>
          <Link to="/pool" className={`underline-link ${path === '/pool' && 'current'}`}>
            <span className="inner">RANDOM POOL</span>
          </Link>
        </Toolbar>
      </AppBar>
      <Route exact path="/" component={Home} />
      <Route exact path="/pool" component={RandomPool} />
      <Toolbar className="footer">
        <Typography className="mt-1">
          Created with ♥ by{' '}
          <a href="http://taylorabraham.com/" target="_blank" rel="noreferrer">
            Taylor Abraham
          </a>
          .
        </Typography>
        <Typography className="mb-1">
          Landing image by{' '}
          <a
            href="https://pixabay.com/users/kollsd-14736411/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5673499"
            target="_blank"
            rel="noreferrer"
          >
            Dung Tran
          </a>{' '}
          from{' '}
          <a
            href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5673499"
            target="_blank"
            rel="noreferrer"
          >
            Pixabay
          </a>
          .
        </Typography>
        <div className="mb-2">
          <FeedbackFish projectId="2454417672045a">
            <Button variant="contained" size="small" color="secondary">
              <FeedbackIcon className="mr-1" /> Send feedback
            </Button>
          </FeedbackFish>
          <Button className="coffee-button ml-2" variant="contained" size="small" color="secondary">
            <a href="https://www.buymeacoffee.com/taylorabraham" target="_blank" rel="noreferrer">
              <img src="./coffee.png" className="coffee-button-icon mr-1" alt="Coffee Icon" /> Buy Me a Coffee
            </a>
          </Button>
        </div>
      </Toolbar>
    </div>
  );
};

export default App;
