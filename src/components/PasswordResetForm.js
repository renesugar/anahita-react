import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  formPaper: {
    padding: '20px',
    maxWidth: '360px',
    margin: '64px auto',
  },
  title: {
    marginBottom: theme.spacing.unit,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});

const PasswordResetForm = (props) => {
  const {
    classes,
    handleFieldChange,
    handleFormSubmit,
    hasEmail,
    isFetching,
    success,
    error,
  } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.formPaper} elevation={2}>
        <Typography
          variant="title"
          color="primary"
          className={classes.title}
        >
          {'Forgot Password?'}
        </Typography>
        <form onSubmit={handleFormSubmit}>
          {success &&
            <Typography
              type="body1"
              color="primary"
              paragraph
            >
              {'We emailed you a link. Please click on that link and follow the instructions!'}
            </Typography>
          }
          {error &&
            <Typography
              type="body1"
              color="error"
              paragraph
            >
              {error}
            </Typography>
          }
          <TextField
            name="email"
            onChange={handleFieldChange}
            label="What is your email?"
            error={!hasEmail}
            helperText={!hasEmail ? 'Your email is required!' : ''}
            autoFocus
            fullWidth
            margin="normal"
          />
          <Button
            variant="raised"
            type="submit"
            color="primary"
            className={classes.button}
            disabled={isFetching}
          >
            {'Reset Password'}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

PasswordResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  hasEmail: PropTypes.bool,
  success: PropTypes.bool,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};

PasswordResetForm.defaultProps = {
  hasEmail: true,
  isFetching: false,
  success: false,
  error: '',
};

export default withStyles(styles)(PasswordResetForm);