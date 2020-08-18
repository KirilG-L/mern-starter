import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import CommentList from '../../components/CommentList';
import CommentCreateWidget from '../../components/CommentCreateWidget/CommentCreateWidget';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';
import { addCommentRequest, deleteCommentRequest, fetchComments, editCommentRequest, enableEditMode, cancelEditMode } from '../../CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getCommentsSelector } from '../../CommentReducer';

export class PostDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post.cuid));
  }

  handleAddComment = (postId, author, body) => {
    this.props.dispatch(addCommentRequest(postId, { author, body }));
  };

  handleEditComment = (author, body) => {
    this.props.dispatch(editCommentRequest(this.props.editing.cuid, { author, body }));
    this.props.dispatch(cancelEditMode());
  };

  handleDeleteComment = (cuid) => {
    this.props.dispatch(deleteCommentRequest(cuid));
  };

  openEditComment = (comment) => {
    this.props.dispatch(enableEditMode(comment));
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        {this.props.comments && <CommentList
          comments={this.props.comments}
          handleDeleteComment={this.handleDeleteComment}
          openEditComment={this.openEditComment}
        />}
        <CommentCreateWidget
          handleAddComment={this.handleAddComment}
          handleEditComment={this.handleEditComment}
          postId={this.props.post.cuid}
          editing={this.props.editing}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [
  params => {
    return fetchPost(params.cuid);
  },
  params => {
    return fetchComments(params.cuid);
  }];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getCommentsSelector(state),
    editing: state.comments.editing,
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  editing: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    dataAdded: PropTypes.instanceOf(Date),
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
