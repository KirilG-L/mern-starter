import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

const CommentList = (props) => {
  return (
    <div>
      <div className="commentView">
        <p style={{textAlign: 'center'}}>{`C O M M E N T S #${props.comments.length}`}</p>
        {
          props.comments.map(comment => (
            <CommentListItem
              comment={comment}
              key={comment.cuid}
              onDelete={props.handleDeleteComment}
              openEditComment={props.openEditComment}
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
      cuid: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDeleteComment: PropTypes.func,
  openEditComment: PropTypes.func,
};

export default CommentList;
