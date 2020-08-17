import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

const CommentList = (props) => {
  return (
    <div>
      <div className="commentView">
        {
          props.comments.map(comment => (
            <CommentListItem
              comment={comment}
              key={comment.cuid}
              onDelete={() => props.handleDeleteComment(comment.cuid)}
            />
          ))
        }
      </div>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      cuid: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteComment: PropTypes.func,
};

export default CommentList;
