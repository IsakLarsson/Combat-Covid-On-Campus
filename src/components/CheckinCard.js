import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: '#fff',
    width: '280px',
    height: '90px',
    margin: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignText: 'left',
    margin: '10px 10px',
  },
  zone: { fontWeight: '600' },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 'auto',
  },
  checkOut: {
    backgroundColor: '#FF9292!important',
    width: '90px',
    height: '34px',
    fontSize: '0.8rem',
  },
}));
const CheckinCard = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.text}>
        <Typography className={classes.zone}>{props.data.zone}</Typography>
        <Typography>{props.data.day}</Typography>
        <Typography>{props.data.time}</Typography>
      </Box>
      <Box className={classes.button}>
        <Button className={classes.checkOut} onClick={props.checkout}>
          Checka ut
        </Button>
      </Box>
    </Box>
  );
};

export default CheckinCard;
