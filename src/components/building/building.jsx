import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea } from '@material-ui/core';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    card: {
        marginLeft: "10px",
        minHeight: 75,
        padding: "15px"
    },
    element: {
        float: "right",
        marginLeft: "5px",
    }
});


class Building extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: ''
        };

        this.handleClick = this.handleClick.bind(this);

    };

    handleClick = key => (e) => {
        e.preventDefault();
        this.props.handleClick(key);
        
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>

                <Card className={classes.card}>
                <CardActionArea             
                onClick={this.handleClick()}
                >

                <i className="material-icons"> business </i>
                <div className={classes.element}>
                {this.props.buildingName}
                </div>
                <br />
                <i className="material-icons"> format_list_numbered_rtl </i>
                <div className={classes.element}>
                {this.props.floors} floors
                </div>
                </CardActionArea>
                </Card>

            </div>

        );
    }
}

Building.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Building);