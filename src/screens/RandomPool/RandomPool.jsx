import React, { useEffect, useState, useCallback } from 'react';
import fetch from 'node-fetch';
import { TextField, Snackbar, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
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

  const selectAllAndCopy = (e) => {
    e.target.select(); // Highlight whole textarea on select
    document.execCommand('copy');
    setSnackbarOpen(true);
  };

  return (
    <div>
      {cards && (
        <div className="pool">
          {poolUUID && (
            <TextField
              className="pool-textbox"
              label="URL"
              variant="outlined"
              value={`${baseURL}?uuid=${poolUUID}`}
              onFocus={selectAllAndCopy}
            />
          )}
          <div>
            <TextField
              className="pool-textbox"
              label="Cards"
              multiline
              rows={10}
              value={cards.map((card) => card.name).join('\n')}
              variant="outlined"
              onFocus={selectAllAndCopy}
            />
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
              horizontal: 'center',
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
