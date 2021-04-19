import React, { useEffect, useState, useRef } from 'react';
import fetch from 'node-fetch';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Snackbar,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useLocation } from 'react-router-dom';
import { SERVER_URL } from '../../constants';
import './RandomPool.scss';

// A custom hook that builds on useLocation to parse the query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const STATES = Object.freeze({ INITIAL: 0, LOADING: 1, DONE: 2 });

const RandomPool = () => {
  const [cards, setCards] = useState([]);
  const [state, setState] = useState(STATES.INITIAL);
  const [poolUUID, setPoolUUID] = useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const poolTextRef = useRef(null);
  const poolLinkRef = useRef(null);
  const uuidParam = useQuery().get('uuid');
  const baseURL = window.location.href.split('?')[0];

  const fetchPool = (url) => {
    setState(STATES.LOADING);
    fetch(url || `${SERVER_URL}/random-pool`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          if (json.error.type === 'SERVER_NOT_STARTED') {
            setTimeout(() => {
              fetchPool();
            }, 2000);
          }
        } else {
          setCards(json.cards);
          setState(STATES.DONE);
          if (json.uuid) {
            setPoolUUID(json.uuid);
          }
        }
      });
  };

  useEffect(() => {
    if (uuidParam) {
      setPoolUUID(uuidParam);
      fetchPool(`${SERVER_URL}/random-pool/${uuidParam}`);
    }
  }, [uuidParam]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const selectAll = (e) => {
    e.target.select(); // Highlight whole textarea on select
  };

  const copyFromRef = (ref) => {
    ref.current.select();
    document.execCommand('copy');
    setSnackbarOpen(true);
  };

  return (
    <div className="root">
      <div className="header">
        <Accordion className="info-accordian">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>What is this generator?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Random pool is a generator that creates a hypothetical constructed format. It will pull random cards of
              different colors, color pairs, lands, etc to create a set of cards. Share the link with your friends, and
              see who can build the strongest deck! Online software such as Cockatrice and Untap.in can provide a place
              to play for free.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Button
          className="generate-button"
          color="secondary"
          size="large"
          variant="contained"
          onClick={() => fetchPool()}
        >
          Generate New Pool
        </Button>
      </div>
      {state === STATES.LOADING && (
        <>
          <Divider />
          <div className="loading">
            <CircularProgress size="5rem" />
          </div>
        </>
      )}
      {state === STATES.DONE && (
        <div className="pool">
          <Divider />
          <div className="pool-info">
            <div className="pool-link">
              <div className="pool-link__header">
                <Typography variant="h6">Your pool</Typography>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<FileCopyIcon />}
                  onClick={() => copyFromRef(poolTextRef)}
                >
                  Copy
                </Button>
              </div>
              <TextField
                className="pool-textbox"
                inputRef={poolTextRef}
                multiline
                rows={10}
                value={cards.map((card) => card.name).join('\n')}
                variant="outlined"
                color="primary"
                onFocus={selectAll}
              />
            </div>
            <div className="pool-link">
              <div className="pool-link__header">
                <Typography variant="h6">Link to your pool</Typography>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<FileCopyIcon />}
                  onClick={() => copyFromRef(poolLinkRef)}
                >
                  Copy
                </Button>
              </div>
              <TextField
                className="pool-textbox"
                inputRef={poolLinkRef}
                variant="outlined"
                value={`${baseURL}?uuid=${poolUUID}`}
                onFocus={selectAll}
              />
            </div>
          </div>
          <div className="pool-images">
            {cards.map((card) => (
              <a key={card.name} href={card.scryfallURI} target="_blank" rel="noreferrer">
                <img className="card-pic" alt={card.name} src={card.imgURI} />
              </a>
            ))}
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert elevation={6} variant="filled" severity="success">
              Copied to clipboard!
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default RandomPool;
