import React from 'react';

import { withFirebase } from '../Firebase';

//Material Components
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="sign-out"
        color="inherit"
        onClick={firebase.doSignOut}
      >
        <ExitToAppIcon />
      </IconButton>
    </div>
  );
};

export default withFirebase(SignOutButton);
