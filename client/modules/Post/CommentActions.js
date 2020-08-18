import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const EDIT_COMMENT_MODE = 'EDIT_COMMENT_MODE';
export const CANCEL_EDIT_COMMENT_MODE = 'CANCEL_EDIT_COMMENT_MODE';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(postId, comment) {
  return (dispatch) => {
    return callApi(`posts/${postId}/comments`, 'post', {
      comment: {
        author: comment.author,
        body: comment.body,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)));
  };
}

export function editComment({ cuid, author, body }) {
  return {
    type: EDIT_COMMENT,
    cuid,
    author,
    body,
  };
}

export function enableEditMode(comment) {
  return {
    type: EDIT_COMMENT_MODE,
    comment
  };
}

export function cancelEditMode() {
  return {
    type: CANCEL_EDIT_COMMENT_MODE,
  };
}

export function editCommentRequest(cuid, comment) {
  return dispatch => {
    return callApi(`comments/${cuid}`, 'put', {
      comment: {
        author: comment.author,
        body: comment.body,
      },
    }).then(res => dispatch(editComment(res.comment)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments`).then(res => {
      dispatch(addComments(res.comments));
    });
  };
}
