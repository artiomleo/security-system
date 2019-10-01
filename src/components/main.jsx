import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../components/header.jsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { getBuilding, getBuildings, getRooms, addRoom, getLogsByRoom, addLog, getEmployees } from '../api/requests.js';
import Building from './building/building.jsx';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Room from './room/room.jsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Typography } from '@material-ui/core';
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "./snackbar.jsx";



const styles = theme => ({
    root: {
        flexGrow: 1,
        background: "white",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    card: {
        padding: "15px",
        margin: "20px",

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: "#2980B9",
        width: "50px",
        height: "50px",
    },
    building: {
        marginTop: "60px"
    },
    buildings: {
        marginTop: "30px",
        display: "inline-flex",
    },
    fab: {
        
      },
    buttons: {
        justifyContent: "space-evenly",
    },
    msgerror: {
        color: "red",
        fontSize: "12px"
      },
    
   
});


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            username: '',
            expanded: false,
            rooms: [],
            roomId: '',
            filteredRooms: [],
            building: [],
            buildingName: [],
            currentBuilding: 3,
            buildings: [],
            buildingId: [3],
            floors: [],
            floor: [2],
            currentFloor: 1,
            openAdd: false,
            name: '',
            rfid: '',
            fields: {},
            errors: {},
            open: false,
            openLog: false,
            emptyCart: false,
            logs: [],
            openAddPerrmission: false,
            openSelect: false,
            selectValue:'',
            permissions: [],
            rfidEmployee: '',


        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpenLog = this.handleOpenLog.bind(this);


    }
    state = {

    };

    handleDelete(record) {
        const records = this.state.rooms.filter(r => r.id !== record)
        this.setState({ rooms: records })
    
      }

    componentDidMount() {
        window.addEventListener('', this.handleClick, false);
        window.addEventListener('', this.handleDelete, false);
        window.addEventListener('', this.handleOpenLog, false);

        // setInterval(() => {
          getRooms().then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                    var res = JSON.parse(response);
                    this.setState({ rooms: res });
                })
            }
        })
        // }, 1000);

       

        getBuildings().then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                    var res = JSON.parse(response);
                    this.setState({ buildingId: res[0].id });
                    this.setState({ buildings: res });
                    this.setState({ currentBuilding: res[0].id });

                })
            }
        });

        getBuilding({
            id: this.state.buildingId
        }).then(response => {
            if (response.status === 200) {
                response.text().then(response => {
                    var res = JSON.parse(response);
                    this.setState({ building: res });
                    this.setState({ floors: res.floors });
                    this.setState({ buildingName: res.name });
                })
            }
        });

        getEmployees({}).then(response => {
          if (response.status === 200) {
            response.text().then(response => {
                var res = JSON.parse(response);
                
                this.setState({ permissions: res });

            })
        }
        })

    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    setValues(idx) {

      this.setState({ floors: idx.floors })
      this.setState({ buildingName: idx.name })
      this.setState({ buildingId: idx.id })
      this.setState({currentFloor:1});
      this.setState({currentBuilding:idx.id});
    }

    handleClick = (idx) => () => {
      
      this.setValues(idx)
        
    }

    handleNext(e) {
        var a = this.state.currentFloor;
        var count = parseInt(this.state.floors);
        if(a !==count ) {
            this.setState({currentFloor:a+1})
        }
        
    }



    handlePrevious(e) {
        var a = this.state.currentFloor;
        if(a !==1 ) {
        this.setState({currentFloor:a-1})
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
            this.setState({ optionError: "Enter Room Name" })
            this.setState({ open: true })
            this.setState({ emptyCart: true })
    
        }
        this.setState({ errors: errors });
        return formIsValid;
        }

        handleAdd(e) {
            e.preventDefault();
            this.setState({ openAdd: true })
            
        
        }

        addLog(id,text) {
          
          addLog({
            text: text,
            buildingId: this.state.buildingId,
            roomId: id
        }).then(result => {
            if (result.status === 200) {
            result.text().then(result => {
                
            });
            } else if (result.status === 401) {
          
            }
    
          });
        }

        handleAddRoom(e) {
            e.preventDefault();

        if (this.handleValidation()) {
        this.setState({ open: true })
        this.setState({ option: "Room" })
        var buildingId = parseInt(this.state.buildingId)
        var floorId = parseInt(this.state.currentFloor)

        addRoom({
            name: this.state.name,
            buildingId: buildingId,
            floorId: floorId,
            roomRfid: this.state.rfid,
            status: false
        }).then(result => {
            if (result.status === 200) {
            result.text().then(result => {
                const response = JSON.parse(result);
                var id = response.id;
                this.addLog(id,"Room "+this.state.name+" added successfully")
                this.setState({roomId: id});
                this.setState({ fields: { name: '', rfid: '' } })
             var room = this.state.rooms;
              this.setState({ emptyCart: false })
              room.push(response)
              this.setState({ rooms: room })
              this.setState({ openAdd: false });
            });
            } else if (result.status === 401) {
            this.setState({ optionError: "Room Name already exists" })
            this.setState({ emptyCart: true })
            }
    
          });
         }
        }
          

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

          handleCloseDialog = () => {
            this.setState({ openAdd: false });
          };

          handleClose = (e, reason) => {
            if (reason === "clickaway") {
              return;
            }
        
            this.setState({ open: false });
          };

          handleOpenLog = (id) => {
            this.setState({ openLog: true });
            this.setState({ roomId: id });
            
            var build = this.state.buildingId;
            this.getLogs(build,id);


          }





          getLogs(buildingId,roomId) {

            
          getLogsByRoom({
                roomId: roomId,
                buildingId: buildingId
              }).then(response => {
                if (response.status === 200) {
                  response.text().then(response => {
                    var res = JSON.parse(response);
                    this.setState({ logs: res });

                    
                })
                } else if (response.status === 400) {
                } else if (response.status === 401) {
                }
              });

            }
            

          handleCloseLog = () => {
            this.setState({ openLog: false });

          }

         
  
        
    

    render() {
        const { classes } = this.props;
        return (

        <div className={classes.root}>
            <Header></Header>

        <div className={classes.buildings}>
        {this.state.buildings.map((row, idx) =>

        <Building
            value={row.id}
            key={row.id}
            buildingName={row.name}
            floors={row.floors}
            handleClick={this.handleClick(row)}
        />
        )}
        </div>

        <div className={classes.building}>

        <Card className={classes.card}>
        <CardHeader
            avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                    {this.state.currentFloor + "/" + this.state.floors}
                </Avatar>
            }
            action={
                <Fab 
        onClick={this.handleAdd.bind(this)} 
        color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
            }
            title={this.state.buildingName}
            subheader="Info"
            
        />
         <IconButton 
            onClick={this.handlePrevious.bind(this)}
            aria-label="Add to favorites">
            <SkipPreviousIcon />
            </IconButton>
            <IconButton
            onClick={this.handleNext.bind(this)}
            aria-label="Share">
            <SkipNextIcon  />
         </IconButton>
        <CardContent>
        {this.state.rooms    
        .filter((a)=>a.floorId === this.state.currentFloor && 
        a.buildingId === this.state.currentBuilding ? 1 : 0)
        .map((row,idx) =>
        <Room
            key={row.id}
            value={row.id}
            roomName={row.name}
            roomRfid={row.roomRfid}
            handleDelete={this.handleDelete}
            handleOpenLog={this.handleOpenLog}
            led={row.status.toString()}

         /> 
             )}
        
        </CardContent>
        </Card>
        </div>

        <Dialog
          open={this.state.openAdd}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Room</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter data to create a new room
            </DialogContentText>
            <form onSubmit =  { (e) => this.register(e) }>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Room name"
              type="text"
              fullWidth
              onChange={this.onChangeName.bind(this, "name")}
              />
             <span className={classes.msgerror}>
                  {this.state.errors["name"]}
                </span>
            <TextField
              margin="dense"
              id="rfid"
              label="Room RFID"
              type="text"
              fullWidth
              onChange={this.onChangeRfid.bind(this, "rfid")}
              />
             <span className={classes.msgerror}>
                  {this.state.errors["rfid"]}
                </span>
                </form>    

          </DialogContent>
          <DialogActions
            className={classes.buttons}
            >
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button                   
            onClick={e => this.handleAddRoom(e)}
            color="primary">   
              Confirm
            </Button>
            
          </DialogActions>
          
        </Dialog>

        <Dialog
          open={this.state.openLog}
          onClose={this.handleCloseLog}
          scroll='paper'
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Log File</DialogTitle>
          <DialogContent>
          {this.state.logs.map((row,idx) =>
            <Typography key={idx}>{row.text}</Typography>
          )}
            <DialogContentText>
              
            </DialogContentText>
          </DialogContent>
        </Dialog>

        

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

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);