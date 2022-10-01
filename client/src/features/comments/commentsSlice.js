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

// update comment
export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async (initialState) => {
    try {
      const { text, id } = initialState;

      const response = await axios.put(`api/comments/${id}`, {
        text,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// delete comment
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (initialState) => {
    try {
      const { id } = initialState;

      const response = await axios.delete(`/api/comments/${id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

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
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        if (action.payload.comment && action.payload.user[0]) {
          const { _id } = action.payload.comment;
          const { name } = action.payload.user[0];

          const comments = state.comments.filter(
            (comment) => comment._id !== _id
          );

          action.payload.comment.name = name;
          state.comments = [...comments, action.payload.comment];
          state.comment = action.payload.comment;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (action.payload?.err) {
          console.log('delete comment could not complete');
          console.log(action.payload);
          return;
        }

        const { msg, id } = action.payload;
        if (msg && id) {
          const comments = state.comments.filter(
            (comment) => comment._id !== id
          );
          state.comments = [...comments];
          state.comment = {};
        }
      });
  },
});

export const selectAllComments = (state) => state.comments.comments;

export default commentsSlice.reducer;
