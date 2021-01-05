import React from "react";
import "./landing.css";
import Study from "../images/study.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  loginButton: {
    backgroundColor: "#296c96 !important",
    color: "#FFF",
    fontSize: "1.5rem",
    "&:hover": {
      backgroundColor: "#FFF",
    },
    marginTop: "150px",
    "@media screen and (max-width: 320px)": {
      fontSize: "1.2rem",
    },
  },
  label: {
    textTransform: "none",
  },
}));

const Landing = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="iconWrap">
        <img className="studyIcon" src={Study} alt="Study" />
      </div>
      <div className="headerWrapper">
        <h1 className="green">Safe</h1>
        <h1 className="blue">Study</h1>
      </div>
      <p>Study without worries!</p>
      <Button
        onClick={handleClick}
        variant="contained"
        classes={{ root: classes.loginButton, label: classes.label }}
      >
        Logga in med Umu ID
      </Button>
    </div>
  );
};

export default Landing;
