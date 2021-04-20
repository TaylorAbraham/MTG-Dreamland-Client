import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useLocation, Link, Route } from 'react-router-dom';
import Home from '../Home/Home';
import RandomPool from '../RandomPool/RandomPool';
import './App.scss';

const App = () => {
  const path = useLocation().pathname;

  // TODO: Remove this when Heroku testing is done
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);

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
        <Typography>
          Created with ♥ by{' '}
          <a href="http://taylorabraham.com/" target="_blank" rel="noreferrer">
            Taylor Abraham
          </a>
          .
        </Typography>
        <Typography>
          Landing image by{' '}
          <a href="https://pixabay.com/users/kollsd-14736411/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5673499">
            Dung Tran
          </a>{' '}
          from{' '}
          <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5673499">
            Pixabay
          </a>
          .
        </Typography>
      </Toolbar>
    </div>
  );
};

export default App;
