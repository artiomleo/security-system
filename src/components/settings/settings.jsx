import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { getEmployees, addEmployee, addBuilding } from '../../api/requests';
import Header from '../../components/header.jsx';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UserCard from './user/userCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "../snackbar.jsx";
import Grid from '@material-ui/core/Grid';



function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "white",
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,

  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    display: "block",
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  textField: {
    width: "100%"
  },
  msgerror: {
    color: "red",
    fontSize: "12px"
  },
  button: {
    marginTop: "15px"
  }

});


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      name: "",
      nameB: "",
      floors: "",
      rfid: "",
      option: "",
      optionError: "",
      users: [],
      buildings: [],
      fields: {},
      errors: {},
      errorsB: {},
      open: false,
      emptyCart: false,
      expanded: false


    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  state = {

  };

  handleDelete(record) {
    const records = this.state.users.filter(r => r.id !== record)
    this.setState({ users: records })

  }

  handleClick = () => {
    this.setState({ open: true });
  };

  componentDidMount() {
    window.addEventListener('', this.handleDelete, false);

    getEmployees().then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          this.setState({ users: res });
        })
      }
    });
  }

  //   componentWillUnmount() {
  //     // you need to unbind the same listener that was binded.
  //     window.removeEventListener('', this.onScroll, false);
  // }



  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  onChangeName(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      name: evt.target.value,
      fields
    });
  }

  onChangeRfid(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      rfid: evt.target.value,
      fields
    });
  }

  onChangeNameB(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      nameB: evt.target.value,
      fields
    });
  }

  onChangeFloors(field, evt) {
    let fields = this.state.fields;
    fields[field] = evt.target.value;
    this.setState({
      floors: evt.target.value,
      fields
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleAdd(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      this.setState({ open: true })
      this.setState({ option: "Employee" })
      addEmployee({
        name: this.state.name,
        rfid: this.state.rfid,
      }).then(result => {
        if (result.status === 200) {
          result.text().then(result => {
            const response = JSON.parse(result);
            var user = this.state.users;
            this.setState({ emptyCart: false })
            this.setState({ fields: { name: '', rfid: '' } })

            user.push(response)
            this.setState({ users: user })

          });
        } else if (result.status === 401) {
          this.setState({ optionError: "Employee Name already exists" })
          this.setState({ emptyCart: true })
        }

      });
    }

  }

  handleAddB(e) {
    e.preventDefault();

    if (this.handleValidationB()) {
      this.setState({ open: true })
      this.setState({ option: "Building" })
      addBuilding({
        name: this.state.nameB,
        floors: this.state.floors,
      }).then(result => {
        if (result.status === 200) {
          result.text().then(result => {

            this.setState({ emptyCart: false })
            this.setState({ fields: { nameB: '', floors: '' } })
            this.setState({ buildings: result })

          });
        } else if (result.status === 401) {
          this.setState({ optionError: "Building Name already exists" })
          this.setState({ emptyCart: true })


        }

      });
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["rfid"]) {
      formIsValid = false;
      errors["rfid"] = "Enter RFID!";
      this.setState({ optionError: "Enter RFID" })
      this.setState({ open: true })
      this.setState({ emptyCart: true })

    }

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Enter Employee Name!";
      this.setState({ optionError: "Enter Employee Name" })
      this.setState({ open: true })
      this.setState({ emptyCart: true })

    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  handleValidationB() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["floors"]) {
      formIsValid = false;
      errors["floors"] = "Enter floors number!";
      this.setState({ optionError: "Enter floors number" })

    }

    if (!fields["nameB"]) {
      formIsValid = false;
      errors["nameB"] = "Enter Building Name!";
      this.setState({ optionError: "Enter Building Name" })

    }

    this.setState({ errors: errors });
    return formIsValid;
  }



  render() {
    const { classes, theme } = this.props;
    return (

      <div className={classes.root}>
        <Header></Header>
        <Grid container spacing={24}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Employee" />
              <Tab label="Building" />

            </Tabs>
          </AppBar>
          <Grid item xs>
          </Grid>
          <Grid item xs={6}>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
        <TabContainer dir={theme.direction}>
          <ExpansionPanel defaultExpanded={this.state.expanded}>
            <ExpansionPanelSummary expandIcon={<Fab
              size="small"
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.addHandle}
            >
              <AddIcon />
            </Fab>}>
              <div className={classes.column}>
                <Typography className={classes.heading}>Add new Employee</Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>Enter data</Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <form onSubmit={(e) => this.registerButton(e)} >

                <TextField
                  margin="dense"
                  id="name"
                  label="Employee Name"
                  type="text"
                  fullWidth
                  onChange={this.onChangeName.bind(this, "name")}
                  value={this.state.fields["name"]}
                />
                <span className={classes.msgerror}>
                  {this.state.errors["name"]}
                </span>
                <TextField
                  margin="dense"
                  id="rfid"
                  label="RFID"
                  type="text"
                  fullWidth
                  onChange={this.onChangeRfid.bind(
                    this,
                    "rfid"
                  )}
                  value={this.state.fields["rfid"]} />
                <span className={classes.msgerror}>
                  {this.state.errors["rfid"]}
                </span>
                <Button className={classes.button}
                  size="small"
                  color="primary"
                  onClick={e => this.handleAdd(e)}
                >
                  Save
                 </Button>

                    </form>
                  </ExpansionPanelDetails>


                </ExpansionPanel>

                {this.state.users.map((row, idx) =>
                  <UserCard
                    key={idx}
                    value={row.id}
                    userProp={row.name}
                    rfidProp={row.rfid}
                    handleDelete={this.handleDelete}
                  />
                )}

              </TabContainer>
              <TabContainer dir={theme.direction}>
                <ExpansionPanel defaultExpanded={this.state.expanded}>
                  <ExpansionPanelSummary expandIcon={<Fab
                    size="small"
                    color="primary"
                    aria-label="Add"
                    className={classes.fab}
                    onClick={this.addHandle}
                  >
                    <AddIcon />
                  </Fab>}>
                    <div className={classes.column}>
                      <Typography className={classes.heading}>Add new Building</Typography>
                    </div>
                    <div className={classes.column}>
                      <Typography className={classes.secondaryHeading}>Enter data</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.details}>
                    <form onSubmit={(e) => this.registerButton(e)} >

                      <TextField
                        margin="dense"
                        id="nameB"
                        label="Building Name"
                        type="text"
                        fullWidth
                        onChange={this.onChangeNameB.bind(this, "nameB")}
                        value={this.state.fields["nameB"]}
                      />
                      <span className={classes.msgerror}>
                        {this.state.errors["nameB"]}
                      </span>
                      <TextField
                        margin="dense"
                        id="floors"
                        label="Floors"
                        type="text"
                        fullWidth
                        onChange={this.onChangeFloors.bind(
                          this,
                          "floors"
                        )}
                        value={this.state.fields["floors"]} />
                      <span className={classes.msgerror}>
                        {this.state.errors["floors"]}
                      </span>
                      <Button className={classes.button}
                        size="small"
                        color="primary"
                        onClick={e => this.handleAddB(e)}
                      >
                        Save
                      </Button>

                    </form>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </TabContainer>


            </SwipeableViews>
          </Grid>

          <Grid item xs>
          </Grid>
        </Grid>

        <Snackbar

          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}

        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.emptyCart === false ? "success" : "error"}
            message={this.state.emptyCart === false ? this.state.option + " added with succes" : this.state.optionError}
          />
        </Snackbar>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Settings);
