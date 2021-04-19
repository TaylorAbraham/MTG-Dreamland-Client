import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="home__splash">
        <div className="home__splash-content">
          <Typography variant="h1">Welcome to MTG Dreamland</Typography>
          <Typography variant="h3">A site for generating new formats to play.</Typography>
          <div className="home__links">
            <Typography variant="h5">Check out our generators!</Typography>
            <div className="home__links-buttons">
              <Link to="/pool">
                <Button size="large" variant="contained" color="secondary">
                  Random Pool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="home__body">
        <Typography variant="h3">Generators</Typography>
        <Typography variant="h4">Random Pool</Typography>
        <Typography>
          Random pool is a generator that creates a hypothetical constructed format. It will pull random cards of
          different colors, color pairs, lands, etc to create a set of cards. Share the link with your friends, and see
          who can build the strongest deck! Online software such as Cockatrice and Untap.in can provide a place to play
          for free.
        </Typography>
      </div>
    </div>
  );
};

export default Home;
