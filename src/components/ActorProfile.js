import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 5,
  },
  alias: {
    fontSize: 16,
  },
});

const ActorProfile = (props) => {
  const {
    classes,
    cover,
    avatar,
    name,
    alias,
    description,
    followAction,
    headerAction,
  } = props;

  return (
    <div className={classes.root}>
      <Card>
        {cover}
        <CardHeader
          avatar={avatar}
          title={
            <div className={classes.titleContainer}>
              <Typography variant="title" className={classes.title}>
                {name}
              </Typography>
              <Typography
                component="p"
                className={classes.alias}
              >
                {`@${alias}`}
              </Typography>
            </div>
          }
          subheader={
            <Typography component="p">
              {description || ''}
            </Typography>
          }
          className={classes.header}
          action={headerAction}
        />
        <CardActions>
          {followAction}
        </CardActions>
      </Card>
    </div>
  );
};

ActorProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  cover: PropTypes.node.isRequired,
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string,
  description: PropTypes.string,
  followAction: PropTypes.node,
  headerAction: PropTypes.node,
};

ActorProfile.defaultProps = {
  description: '',
  alias: '',
  followAction: null,
  headerAction: null,
};

export default withStyles(styles)(ActorProfile);
