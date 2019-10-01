import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card,CardHeader, Button, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { deleteRoom, getKeysByRoom, getEmployeesByKey, getEmployees, addKey } from '../../api/requests';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { MySnackbarContentWrapper } from "../snackbar.jsx";
import './ledRed.css';


const styles = theme => ({
    root: {
        display: "inline-flex",
        flexGrow: 1,
        backgroundColor: "white",
       
    },
    card: {
        margin: "10px",
        padding: "15px",
        width: "350px"

    },
    element: {
        float: "right",
        marginLeft: "5px",
    },
    adminPop: {
        marginLeft: "-80px"
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    list: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    select: {
      width: "300px"

    }
 
});


class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            permissions: [],
            permUsers: [],
            users: [],
            selectValue: '',
            open: false,
            openAddPerrmission: false,
            anchorEl: null,
            roomId: this.props.value

        };

        this.handleClickMore = this.handleClickMore.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpenLog = this.handleOpenLog.bind(this);
        this.handleAddPermission = this.handleAddPermission.bind(this);
        this.handlePostPermission = this.handlePostPermission.bind(this);

    };

    state = {
      
      };    


  componentDidMount() {

    getEmployees({}).then(response => {
      if (response.status === 200) {
        response.text().then(response => {
            var res = JSON.parse(response);
            this.setState({ users: res });
        })
    }})

   this.addPerm()



 }



 addPerm() {
   var roomId = this.props.value
   
  getKeysByRoom({
    roomId: roomId
  }).then(response => {
    if (response.status === 200) {
      response.text().then(response => {
        var res = JSON.parse(response);
        this.setState({permissions: res})
    
        
      })
      } else if (response.status === 400) {
        return
     } else if (response.status === 401) {
      return
    }
  }).then(res => {
    if(this.state.permissions == '')
    return    
    getEmployeesByKey({
      key: this.state.permissions
    }).then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          var res = JSON.parse(response);
          
          this.setState({permUsers: res})

        })
        } else if (response.status === 400) {
          this.setState({permUsers: []})

       } else if (response.status === 401) {
        return
      }
    });
  })
  

 }

  handleDelete = id => (e) => {
    e.preventDefault();
    deleteRoom({
        id: this.props.value
      }).then(result => {
        if (result.status === 200) {
            this.props.handleDelete(id);
          } else if (result.status === 400) {
         } else if (result.status === 401) {
        }
      });
       
    };

    handleClickMore = event => {        
        this.setState({ anchorEl: event.currentTarget });
      };

    handleOpenLog = id => (e) => {   
        e.preventDefault();

      this.props.handleOpenLog(id);
    }

    handleAddPermission() {   
      this.setState({openAddPerrmission: true})

  }

  handlePostPermission = id => (e) => {
    e.preventDefault();

    this.setState({openAddPerrmission: false})

    var value = this.state.selectValue
    console.log(value);
    
    addKey({
      roomId: id,
      value: value
    }).then(response => {
      if (response.status === 200) {
        response.text().then(response => {
          this.setState({ open: true })
          this.setState({ emptyCart: false })
          this.setState({ option: "Permission added" })
          this.addPerm()
          this.setState({ anchorEl: null });
        })
      } else if (response.status === 400) {
      } else if (response.status === 401) {

        this.setState({ open: true })
        this.setState({ emptyCart: true })
        this.setState({ optionError: "Permission already exists" })

      }
    });
    
  }


  handleChange = event => {
    this.setState({ selectValue: event.target.value });
   console.log(this.state.selectValue);

    console.log(event.target.value);
    
  };

  handleCloseSelect = () => {
    this.setState({ openSelect: false });
  };

  handleOpenSelect = () => {
    this.setState({ openSelect: true });
  };

    
  handleClosePermission = () => {
    this.setState({ openAddPerrmission: false });
    this.setState({ anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleCloseSnack = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root}>

                <Card className={classes.card}>
                {/* <CardActionArea             
                onClick={this.handleClick(this.props.value)}> */}
                <CardHeader
                    avatar={
                      <div className={this.props.led}></div>                    }
                    action={
                        
                        <div>
                        <IconButton
                          aria-owns={anchorEl ? 'simple-menu' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleClickMore}
                        >
                          <MoreVertIcon />
                         
                        </IconButton>
                        <Menu
                          className={classes.adminPop}
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={this.handleClose}
                        >
                          <MenuItem 
                          onClick={this.handleAddPermission}>
                          Add permission</MenuItem>
                          <MenuItem 
                          onClick={this.handleOpenLog(this.props.value)}>
                          Log</MenuItem>
                          <MenuItem  
                          onClick={this.handleDelete(this.props.value)}>
                          Delete Room</MenuItem>
                        </Menu>
                      </div>
                    }
                    title={this.props.roomName}
                    subheader={this.props.roomRfid}
                />
                <div className={classes.list}>
                <List className={classes.list} subheader={<li />}>
        <li key={`section-!!!!`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>{`Permissions`}</ListSubheader>
            {this.state.permUsers.map(row => (
              <ListItem key={`${row.name}`}>
                <ListItemText primary={`${row.name}`} />
              </ListItem>
            ))}
          </ul>
        </li>
    </List>
                
                </div>
                {/* <br />
                  <i className="material-icons"> format_list_numbered_rtl </i>
                <div className={classes.element}>
                  {this.props.floors} floors
                </div> */}
                {/* </CardActionArea> */}
                </Card>


                <Dialog
          open={this.state.openAddPerrmission}
          onClose={this.handleClosePermission}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle 
          className={classes.addPermissionDialog}
          id="form-dialog-title">Add permission</DialogTitle>
          <DialogContent>
            <DialogContentText component={'div'}>
            {/* <InputLabel htmlFor="demo-controlled-open-select">Choose Employee</InputLabel> */}
            <br />
            <FormControl 
            className={classes.formControl}>

          <Select
          component={'div'}
            className={classes.select}
            open={this.state.openSelect}
            onClose={this.handleCloseSelect}
            onOpen={this.handleOpenSelect}
            value={this.state.selectValue}
            onChange={this.handleChange}
            inputProps={{
              name: 'selectValue',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.state.users.map((row,idx) => 
              <MenuItem 
              key={idx}
              value={row.rfid}>{row.name}
              </MenuItem>
            )}
          </Select>
          </FormControl>

          
            </DialogContentText>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePermission} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handlePostPermission(this.props.value)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={Boolean(this.state.open)}
          autoHideDuration={6000}
          onClose={this.handleCloseSnack}

        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnack}
            variant={this.state.emptyCart === false ? "success" : "error"}
            message={this.state.emptyCart === false ? this.state.option + " added with succes" : this.state.optionError}
          />
        </Snackbar>
            </div>

        );
    }
}

Room.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);