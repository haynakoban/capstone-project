import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  comments: [],
  comment: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// add comment
export const addComment = createAsyncThunk(
  'comments/addComment',
  async (initialState) => {
    try {
      const response = await axios.post('api/comments', initialState);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch all comments
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (initialState) => {
    try {
      const { post_id } = initialState;

      const response = await axios.get(`api/comments/${post_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch a single comment
// export const fetchSingleComment = createAsyncThunk(
//   'comments/fetchSingleComment',
//   async (initialState) => {
//     try {
//       const { post_id } = initialState;

//       const response = await axios.get(`api/comments/comment/${post_id}`);

//       return response.data;
//     } catch (e) {
//       return e.message;
//     }
//   }
// );

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        if (action.payload.comment && action.payload.user) {
          const { name } = action.payload.user[0];

          action.payload.comment.name = name;
          state.comments.push(action.payload.comment);
          // state.post = action.payload.post;
        }
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comment = {};
        if (action.payload.comments && action.payload.users) {
          state.comments = action.payload.comments;

          const COMMENTS_SIZE = action.payload.comments.length;
          const USERS_SIZE = action.payload.users.length;

          const comments = action.payload.comments;
          const users = action.payload.users;

          for (let i = 0; i < COMMENTS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (comments[i].user_id === users[j]._id) {
                state.comments[i].name = users[j].name;
              }
            }
          }
        }
      });
  },
});

export const selectAllComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
