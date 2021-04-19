import React, { useEffect, useState, useCallback, useRef } from 'react';
import fetch from 'node-fetch';
import { TextField, Snackbar, IconButton, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useLocation } from 'react-router-dom';
import { SERVER_URL } from '../../constants';
import './RandomPool.scss';

// A custom hook that builds on useLocation to parse the query string
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RandomPool = () => {
  const [cards, setCards] = useState([]);
  const [poolUUID, setPoolUUID] = useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const poolTextRef = useRef(null);
  const poolLinkRef = useRef(null);
  const paramQuery = useQuery();
  const uuidParam = paramQuery.get('uuid');
  const baseURL = window.location.href.split('?')[0];

  const fetchPool = useCallback(() => {
    let fetchURL = `${SERVER_URL}/random-pool`;
    if (uuidParam) {
      setPoolUUID(uuidParam);
      fetchURL = `${SERVER_URL}/random-pool/${uuidParam}`;
    }
    fetch(fetchURL)
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
          if (json.uuid) {
            setPoolUUID(json.uuid);
          }
        }
      });
  }, [uuidParam]);

  useEffect(() => {
    fetchPool();
  }, [fetchPool]);

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
    <div>
      {cards && (
        <div className="pool">
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
