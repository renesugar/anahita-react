import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import StackGrid from 'react-stack-grid';
import InfiniteScroll from 'react-infinite-scroller';

import {
  browsePeople,
  resetPeople,
  followPerson,
  unfollowPerson,
} from '../../actions/people';
import ActorCard from '../../components/cards/ActorCard';

const styles = theme => ({
  root: {
    width: '100%',
  },
  progress: {
    marginLeft: '48%',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class PeoplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      keywordFilter: '',
      usertypeFiter: '',
      disabledFilter: false,
      hasMore: true,
    };

    this.fetchPeople = this.fetchPeople.bind(this);
  }

  componentWillUnmount() {
    this.props.resetPeople();
  }

  canFollow(person) {
    const { viewer } = this.props;
    return viewer.id !== person.id;
  }

  handleFollowPerson(person) {
    const { viewer } = this.props;
    this.props.followPerson(viewer, person);
  }

  handleUnfollowPerson(person) {
    const { viewer } = this.props;
    this.props.unfollowPerson(viewer, person);
  }

  fetchPeople() {
    const {
      keywordFilter,
      usertypeFiter,
      disabledFilter,
    } = this.state;
    const { offset, limit } = this.props;
    this.props.browsePeople({
      keywordFilter,
      usertypeFiter,
      disabledFilter,
      offset,
      limit,
    });
  }

  render() {
    const {
      classes,
      isAuthenticated,
      people,
    } = this.props;

    const { hasMore } = this.state;

    return (
      <div className={classes.root}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
              People
          </Typography>
        </Toolbar>
        <InfiniteScroll
          loadMore={this.fetchPeople}
          hasMore={hasMore}
          loader={<CircularProgress key={0} className={classes.progress} />}
        >
          <StackGrid
            columnWidth={410}
            gutterWidth={20}
            gutterHeight={20}
          >
            {people.map((person) => {
              const key = `person_${person.id}`;
              const avatarSrc = person.imageURL.medium && person.imageURL.medium.url;
              const coverSrc = person.coverURL.medium && person.coverURL.medium.url;
              const canFollow = this.canFollow(person);
              return (
                <ActorCard
                  key={key}
                  name={person.name}
                  alias={person.username}
                  description={person.body}
                  avatar={avatarSrc}
                  cover={coverSrc}
                  canFollow={canFollow}
                  isLeader={Boolean(person.isLeader)}
                  isAuthenticated={isAuthenticated}
                  handleFollowActor={() => this.handleFollowPerson(person)}
                  handleUnfollowActor={() => this.handleUnfollowPerson(person)}
                  profile={`/people/${person.username}/`}
                />
              );
            })
            }
          </StackGrid>
        </InfiniteScroll>
      </div>
    );
  }
}

PeoplePage.propTypes = {
  classes: PropTypes.object.isRequired,
  browsePeople: PropTypes.func.isRequired,
  resetPeople: PropTypes.func.isRequired,
  followPerson: PropTypes.func.isRequired,
  unfollowPerson: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  people: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  viewer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {
    people,
    errorMessage,
    offset,
    limit,
  } = state.peopleReducer;

  const {
    isAuthenticated,
    viewer,
  } = state.authReducer;

  return {
    people,
    errorMessage,
    offset,
    limit,
    isAuthenticated,
    viewer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    browsePeople: (params) => {
      dispatch(browsePeople(params));
    },
    resetPeople: () => {
      dispatch(resetPeople());
    },
    followPerson: (viewer, person) => {
      dispatch(followPerson(viewer, person));
    },
    unfollowPerson: (viewer, person) => {
      dispatch(unfollowPerson(viewer, person));
    },
  };
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeoplePage));
