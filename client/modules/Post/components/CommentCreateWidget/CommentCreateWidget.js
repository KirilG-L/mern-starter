import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// Import Style
import styles from './CommentCreateWidget.css';

export class CommentCreateWidget extends Component {
  state = {
    authorName: '',
    commentText: '',
  };

  onAddCommentClick = ev => {
    ev.preventDefault();
    this.props.handleAddComment(this.props.postId, this.state.authorName, this.state.commentText);
    this.setState({ author: '', body: '' });
  };

  onSaveCommentClick = ev => {
    ev.preventDefault();
    this.props.handleEditComment(this.state.authorName, this.state.commentText);
    this.setState({ author: '', body: '' });
  };

  getCreateForm = () => {
    return (
      <div className={styles.appear}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>New comment</h2>
          <input
            placeholder="Author name"
            className={styles['form-field']}
            value={this.state.authorName}
            onChange={e => this.setState({ authorName: e.target.value })}
          />
          <textarea
            placeholder="Leave your comment"
            className={styles['form-field']}
            value={this.state.commentText}
            onChange={e => this.setState({ commentText: e.target.value })}
          />
          <a
            className={styles['comment-submit-button']}
            href="#"
            onClick={this.onAddCommentClick}
          >
            <FormattedMessage id="submit"/>
          </a>
        </div>
      </div>
    );
  };

  getEditForm = () => {
    return (
      <div className={styles.appear}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Edit comment</h2>
          <textarea
            placeholder="Leave your comment"
            className={styles['form-field']}
            value={this.state.commentText}
            onChange={(ev) => this.setState({ commentText: ev.target.value })}
          />
          <a
            className={styles['comment-submit-button']}
            href="#"
            onClick={this.onSaveCommentClick}
          >
            Save
          </a>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.editing) {
      return this.getEditForm();
    }
    return this.getCreateForm();
  }
}

CommentCreateWidget.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  editing: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    dataAdded: PropTypes.instanceOf(Date),
  }),
};

export default CommentCreateWidget;
