import callApi from '../../../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';

// Export Actions
export function addComment(author, text) {
  return {
    type: ADD_COMMENT,
    author,
    text,
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

export function editComment(cuid, author, text) {
  return {
    type: EDIT_COMMENT,
    cuid,
    author,
    text,
  };
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments,
  };
}

export function addCommentRequest(cuid, comment) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'post', {
      comment: {
        author: comment.title,
        text: comment.text,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comment/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)));
  };
}

export function fetchComments(cuid) {
  return (dispatch) => {
    return callApi(`/posts/${cuid}/comments`).then(res => {
      dispatch(getComments(res.comments));
    });
  };
}
