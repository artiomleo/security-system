import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = {
  root: {
    flexGrow: 1,
    marginBottom: "10px",
  },
  grow: {
    display: 'flex',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  icon: {
    marginRight: "5px",
    marginTop: "4px",
    cursor: "pointer"

  },
  typo: {
    flexGrow: 1,
    marginLeft: "100px",
    display: 'flex',
    cursor: "pointer",
  },
  logout: {
    // flexDirection: "row",
  }

};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  state = {
  };

  logout = () => {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    localStorage.removeItem("username");
    window.location.assign("/");
    //    window.location.assign( '/' );
  };

  handleSettings = () => {
    window.location.assign("/settings");
  };

  handleSurvey = () => {
    window.location.assign("/main");

  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          
            <Typography
              variant="h6"
              color="inherit"
              className={classes.typo}
              onClick={this.handleSettings}>
              <div className={classes.icon}>
                <i className="material-icons"> settings </i>
              </div>
              Configuration
          </Typography>


            <Typography
              variant="h6"
              color="inherit"
              className={classes.typo}
              onClick={this.handleSurvey}>
              <div className={classes.icon}>
                <i className="material-icons"> camera_alt </i>
              </div>
              Surveillance
          </Typography>
          
            <div className={classes.logout}>
              <Button 
              className={classes.logout}
              onClick={this.logout}
                color="inherit">Log out
          <i className="material-icons"> exit_to_app </i>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);