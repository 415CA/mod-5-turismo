import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

//Material Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    const useStyles = makeStyles((theme) => ({
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    return (
      <>
      <br></br>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form
          onSubmit={this.onSubmit}
          className={useStyles.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                variant="outlined"
                fullWidth
                id="passwordOne"
                label="New Password"
                autoFocus
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                variant="outlined"
                fullWidth
                id="passwordTwo"
                label="Confirm New Password"
                autoFocus
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            disabled={isInvalid}
          >
            Reset My Password
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </Container>
      </>
    );
  }
}

export default withFirebase(PasswordChangeForm);
