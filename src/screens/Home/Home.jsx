import { Typography } from '@material-ui/core';
import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <Typography variant="h1">Welcome to MTG Dreamland</Typography>
      </div>
    </div>
  );
};

export default Home;
