import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  posts: [],
  post: {},
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// create new post
export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialState) => {
    try {
      const response = await axios.post('api/posts', initialState);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// get the posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (initialState) => {
    try {
      const { company_id } = initialState;

      const response = await axios.get(`api/posts/${company_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// update post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialState) => {
    try {
      const { text, id } = initialState;

      const response = await axios.put(`api/posts/${id}`, {
        text,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (initialState) => {
    try {
      const { id } = initialState;

      const response = await axios.delete(`/api/posts/${id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// select single post
export const selectPostById = createAsyncThunk(
  'posts/selectPostById',
  async (initialState) => {
    try {
      const { id, company_id } = initialState;

      const response = await axios.get(`api/posts/${company_id}/${id}`, {
        company_id,
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = {};
        if (action.payload.posts && action.payload.users) {
          state.posts = action.payload.posts;

          const POSTS_SIZE = action.payload.posts.length;
          const USERS_SIZE = action.payload.users.length;

          const posts = action.payload.posts;
          const users = action.payload.users;

          for (let i = 0; i < POSTS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (posts[i].user_id === users[j]._id) {
                state.posts[i].name = users[j].name;
              }
            }
          }
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        if (action.payload.post && action.payload.user) {
          action.payload.post.name = action.payload.user[0].name;

          state.posts.push(action.payload.post);
        }
      })
      .addCase(selectPostById.fulfilled, (state, action) => {
        if (action.payload.post && action.payload.user) {
          const { name } = action.payload.user[0];

          action.payload.post.name = name;
          state.post = action.payload.post;
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.post && action.payload.user) {
          const { _id } = action.payload.post;
          const { name } = action.payload.user[0];

          const posts = state.posts.filter((post) => post._id !== _id);

          action.payload.post.name = name;
          state.posts = [...posts, action.payload.post];
          state.post = action.payload.post;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload?.err) {
          console.log('delete post could not complete');
          console.log(action.payload);
          return;
        }

        const { msg, id } = action.payload;
        if (msg && id) {
          const posts = state.posts.filter((post) => post._id !== id);
          state.posts = [...posts];
          state.post = {};
        }
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const getMyPostById = (state) => state.posts.post;

export default postsSlice.reducer;
