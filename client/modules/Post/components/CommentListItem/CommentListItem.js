import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  const { comment, onDelete } = props;
  return (
    <div className={styles['single-comment']}>
      <p className={styles['author-name']}>
        <FormattedMessage id="by" /> {comment.author}</p>
      <p className={styles['comment-text']}>{comment.body}</p>
      <div className={styles['delete-btn']}>
        <a
          className={styles['save-btn']}
          href="#"
          onClick={() => props.openEditComment(comment)}
        >
          Edit comment
        </a>
        <a href="#" onClick={() => onDelete(comment.cuid)}>
          <FormattedMessage id="deleteComment" />
        </a>
      </div>

      <hr className={styles.divider} />
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  openEditComment: PropTypes.func.isRequired,
};

export default CommentListItem;
