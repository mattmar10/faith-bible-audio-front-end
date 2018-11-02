import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SermonsTable from '../components/sermons_table'

const drawerWidth = 240;


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 1430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});


class AdminPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      anchor: 'left',
      openDialog: false
    };

    this.toggleDialog = this.toggleDialog.bind(this);
  }
  
  toggleDialog() {
    this.setState(state => ({
      openDialog: !state.openDialog,
      anchor: state.anchor
    }));
  }

  handleClose = () => {
    this.setState({ openDialog: false });
  };


  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  render() {

    const { classes } = this.props;

    const menuItems = 
        <div>
            <ListItem button>
                <ListItemText primary="Add" onClick={(e) => this.toggleDialog()} />
            </ListItem>
            <Divider />
        </div>
    
    return (
        <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h4" color="inherit" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{menuItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <SermonsTable sermons={this.props.sermons}/>
        </main>
        <Dialog
          fullWidth={true}
          open={this.state.openDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Sermon</DialogTitle>
          <DialogContent>
              content

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);