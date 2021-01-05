import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '../images/menu.png';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menu: { position: 'absolute', bottom: '40px', right: '20px' },
  menuButton: {
    backgroundColor: '#fff',
    height: '70px',
    width: '70px',
    borderRadius: '50%',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));

const MenuBouble = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box className={classes.menu}>
      <Button className={classes.menuButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <img className={classes.menuIcon} src={MenuIcon} alt="menu"></img>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push('/map');
          }}
        >
          Karta
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();

            history.push('/checkin');
          }}
        >
          Incheckningar
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuBouble;
