import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, ADD_COMMENTS, EDIT_COMMENT_MODE, CANCEL_EDIT_COMMENT_MODE } from './CommentActions';

// Initial State
const initialState = {
  comments: [],
  editing: null,
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        comments: [...state.comments, action.comment],
      };

    case ADD_COMMENTS :
      return {
        comments: action.comments,
      };

    case EDIT_COMMENT_MODE :
      return {
        ...state,
        editing: action.comment,
      };

    case CANCEL_EDIT_COMMENT_MODE :
      return {
        ...state,
        editing: null,
      };

    case EDIT_COMMENT :
      return {
        comments: state.comments.map((comment) => (
          comment.cuid === action.cuid ? {
            ...comment,
            cuid: action.cuid,
            author: action.author,
            body: action.body,
          } : comment
        )),
      };

    case DELETE_COMMENT :
      return {
        comments: state.comments.filter(comment => comment.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all comments
export const getCommentsSelector = state => state.comments.comments;


// Export Reducer
export default CommentReducer;
