import React from 'react';
import MediaPage from './media/MediaPage';

class PhotosPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownerId: 0,
    };
  }

  render() {
    const { ownerId } = this.state;
    const filters = {
      ownerId,
    };

    return (
      <MediaPage
        namespace="photos"
        queryFilters={filters}
        {...this.params}
      />
    );
  }
}

export default PhotosPage;
