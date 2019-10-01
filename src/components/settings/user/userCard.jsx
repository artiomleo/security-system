import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteEmployee } from '../../../api/requests';



const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white"
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        width: "auto"
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
    avatar: {
        backgroundColor: "#0080c5",
      },
});


class UserCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ''
        };

        this.handleDelete = this.handleDelete.bind(this);

    };


    handleDelete = id => (e) => {
        e.preventDefault();
        deleteEmployee({
            id: this.props.value
          }).then(result => {
            if (result.status === 200) {
                this.props.handleDelete(id);
            } else if (result.status === 400) {
            } else if (result.status === 401) {
            }
          });
       
    };



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <div className={classes.demo}>
                    <List dense={false}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            {this.props.userProp.charAt(0).toUpperCase()}
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={this.props.userProp}
                                secondary={this.props.rfidProp}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    aria-label="Delete"
                                    onClick={this.handleDelete(this.props.value)}>

                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>
            </div>

        );
    }
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);