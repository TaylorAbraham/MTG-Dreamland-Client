import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <Typography variant="h1">Welcome to MTG Dreamland</Typography>
        <Typography variant="h3">A site for generating new formats to play.</Typography>
        <div className="home__links">
          <Typography variant="h5">Check out our generators</Typography>
          <div className="home__links-buttons">
            <Link to="/pool">
              <Button variant="contained" color="primary">
                Random Pool
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
