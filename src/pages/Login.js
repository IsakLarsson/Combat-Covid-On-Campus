import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, InputBase, Typography } from '@material-ui/core';
import Umulogo from '../images/umu.png';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    margin: '0 30px',
    overflowX: 'hidden',
  },
  loginButton: {
    '@media only screen and (max-width: 768px)': {
      backgroundColor: '#2672EC',
      color: '#fff',
      borderRadius: '0',
      width: '86px',
      fontSize: '0.8em',
      fontWeight: '200',
      textTransform: 'capitalize',
      marginTop: '30px',
    },
  },
  logo: {
    width: '83%',
    margin: '30px 10px 50px 0',
  },
  inputField: {
    '@media only screen and (max-width: 768px)': {
      width: '83%',
      marginRight: '10px',
      marginBottom: '10px',
      border: '1px solid #c9c9c9',
      fontSize: '0.8em',
      padding: '0 5px',
    },
  },
  azureText: {
    '@media only screen and (max-width: 768px)': {
      marginTop: '30px',
      marginBottom: '30px',
      fontSize: '0.8em',
      color: '#2672EC',
    },
  },
  logText: {
    fontSize: '0.8em',
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.8em',
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [messageError, setMessageError] = useState(false);

  const history = useHistory();

  const classes = useStyles();
  const onFormSubmit = () => {
    if (email === 'test@student.umu.se' && pwd === 'lösenord') {
      setMessageError(false);
      history.push('/map');
    } else {
      setMessageError(true);
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  return (
    <div className={classes.root}>
      <img className={classes.logo} src={Umulogo} alt="logo"></img>
      {messageError ? <Typography className={classes.errorMessage}>Fel Umu-id eller lösenord</Typography> : <></>}
      <form style={{ width: '100%' }} onSubmit={onFormSubmit}>
        <InputBase
          value={email}
          className={classes.inputField}
          onChange={handleEmailChange}
          placeholder="Umu-id"
        ></InputBase>
        <InputBase
          value={pwd}
          className={classes.inputField}
          onChange={handlePwdChange}
          type="password"
          placeholder="Lösenord"
        ></InputBase>
      </form>
      <Button className={classes.loginButton} onClick={onFormSubmit}>
        Logga in
      </Button>

      <Typography className={classes.azureText}>Azure Multi-Factor Authentication</Typography>
      <Typography className={classes.logText}>Logga in med ditt Umu-id och lösenord.</Typography>
      <Typography className={classes.logText}>Vad är Umu-id? Läs mer här.</Typography>
    </div>
  );
};

export default Login;
