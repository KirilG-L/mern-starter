import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  const { comment, onDelete } = props;
  return (
    <div className={styles['single-comment']}>
      <h3 className={styles['comment.id']}>{`# ${comment.cuid}`}</h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {comment.author}</p>
      <p className={styles['comment-text']}>{comment.text}</p>
      <p className={styles['delete-btn']}><a href="#" onClick={onDelete}><FormattedMessage id="deleteComment" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    cuid: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CommentListItem;
