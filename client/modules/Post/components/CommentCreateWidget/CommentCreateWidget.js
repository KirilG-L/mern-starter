import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// Import Style
import styles from './CommentCreateWidget.css';

export const CommentCreateWidget = (props) => {
  const { addComment, showAddComment } = props;

  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleCommentClick = () => {
    addComment(authorName, commentText);
  };
  const handleCommentChange = (ev) => {
    setCommentText(ev.target.value);
  };
  const cls = `${styles.form} ${(showAddComment ? styles.appear : '')}`;
  return (
    <div className={cls}>
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}>New comment</h2>
        <input placeholder="Author name" className={styles['form-field']} value={authorName} onChange={e => setAuthorName(e.target.value)} />
        <textarea placeholder="Leave your comment" className={styles['form-field']} value={commentText} onChange={handleCommentChange} />
        <a className={styles['comment-submit-button']} href="#" onClick={handleCommentClick}>
          <FormattedMessage id="submit" />
        </a>
      </div>
    </div>
  );
};

CommentCreateWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
};

export default CommentCreateWidget;
