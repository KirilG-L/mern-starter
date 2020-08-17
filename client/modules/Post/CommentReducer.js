import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_COMMENTS } from './CommentActions';

// Initial State
const initialState = {
  comments: [{
    cuid: 1,
    author: 'Mike',
    text: 'How are you?',
  }],
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        comments: [...state.comments, {
          cuid: state.comments.length > 0 ? state.comments[state.comments.length - 1].cuid + 1 : 1,
          author: action.author,
          text: action.text,
        }],
      };

    case GET_COMMENTS :
      return {
        comments: action.comments,
      };

    case EDIT_COMMENT :
      return {
        comments: state.comments.map((comment) => (
          comment.cuid === action.cuid ? {
            cuid: action.cuid,
            author: action.author,
            text: action.text,
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
export const getComments = state => state.comments.comments;


// Export Reducer
export default CommentReducer;
