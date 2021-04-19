import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useLocation, Link, Route } from 'react-router-dom';
import Home from '../Home/Home';
import RandomPool from '../RandomPool/RandomPool';
import './App.scss';

const App = () => {
  const path = useLocation().pathname;

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="app__title">
            MTG Dreamland
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
    </div>
  );
};

export default App;
