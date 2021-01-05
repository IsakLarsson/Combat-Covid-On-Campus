import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import QrScan from '../images/qrscan.png';
import CheckinCard from '../components/CheckinCard';
import MenuBouble from '../components/MenuBouble';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#BAD6C5',
  },
  content: {
    '@media only screen and (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column',

      height: '100vh',
      margin: '0 30px',
      overflowX: 'hidden',
      backgroundColor: '#BAD6C5',
      alignItems: 'center',
    },
  },
  checkButton: {
    '@media only screen and (max-width: 768px)': {
      height: '250px',
      width: '250px',
      backgroundColor: '#F8F8F8',
      borderRadius: '20px',
      marginTop: '50px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  checkText: {
    fontWeight: '500',
    fontSize: '1.3em',
    marginTop: '10px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '90%',
  },
  header: {
    marginTop: '50px',
    fontSize: '1.7em',
  },
}));
const CheckIn = () => {
  const classes = useStyles();
  const [checkins, setCheckins] = useState([{ zone: 'Naturhuset zon 5', day: 'Måndag', time: '8.15' }]);

  const checkIn = () => {
    setCheckins((checkins) => [...checkins, { zone: 'Naturhuset zon 5', day: 'Måndag', time: '8.15' }]);
    console.log(checkins);
  };
  const checkOut = () => {
    let array = [...checkins];
    array.splice(0, 1);
    setCheckins(array);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.checkButton} onClick={checkIn}>
          <img className={classes.qr} src={QrScan} alt="qr"></img>
          <Typography className={classes.checkText}>Checka in</Typography>
        </Box>
        <Box className={classes.list}>
          <Typography className={classes.header}>Incheckningar</Typography>
          {checkins.map((x, i) => (
            <CheckinCard key={i} data={x} checkout={checkOut} />
          ))}
        </Box>
      </Box>
      <MenuBouble></MenuBouble>
    </div>
  );
};

export default CheckIn;
