import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axiosConfig';

const initialState = {
  posts: [],
  post: {},
  latest: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

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

      const response = await axios.get(`api/posts/${company_id}/${id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

// fetch latest post
export const fetchLatestPost = createAsyncThunk(
  'posts/fetchLatestPost',
  async (initialState) => {
    try {
      const { company_id } = initialState;

      const response = await axios.get(`api/posts/latest/${company_id}`);

      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNewPost: (state, action) => {
      if (action.payload?.post && action.payload?.user?.[0]) {
        action.payload.post.name = action.payload?.user[0]?.name;

        if (action.payload?.filename) {
          action.payload.post.filename = action.payload?.filename;
        }

        state.posts.push(action.payload.post);
      }
    },
  },
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
          const FILES_SIZE = action.payload?.files?.length;

          const posts = action.payload?.posts;
          const users = action.payload?.users;
          const files = action.payload?.files;

          for (let i = 0; i < POSTS_SIZE; i++) {
            for (let j = 0; j < USERS_SIZE; j++) {
              if (posts[i].user_id === users[j]._id) {
                state.posts[i].name = users[j].name;
              }
            }
          }

          for (let i = 0; i < POSTS_SIZE; i++) {
            for (let j = 0; j < FILES_SIZE; j++) {
              if (posts[i].file_id === files[j]._id) {
                state.posts[i].filename = files[j].filename;
              }
            }
          }
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(selectPostById.fulfilled, (state, action) => {
        if (action.payload.post && action.payload?.user?.[0]) {
          const { name } = action.payload.user[0];

          action.payload.post.name = name;

          if (action.payload?.filename) {
            action.payload.post.filename = action.payload?.filename;
          }

          state.post = action.payload.post;
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.post && action.payload.user) {
          const { _id } = action.payload.post;
          const { name } = action.payload.user[0];

          const posts = state.posts.filter((post) => post._id !== _id);

          if (action.payload?.filename) {
            action.payload.post.filename = action.payload?.filename;
          }

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
      })
      .addCase(fetchLatestPost.fulfilled, (state, action) => {
        if (
          action.payload?.post.length > 0 &&
          action.payload?.user.length > 0
        ) {
          action.payload.post[0].name = action.payload?.user?.[0]?.name;

          if (action.payload?.filename) {
            action.payload.post[0].filename = action.payload?.filename;
          }

          state.latest = action.payload?.post;
        } else {
          state.latest = [];
        }
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectLatestPost = (state) => state.posts.latest;

export const getMyPostById = (state) => state.posts.post;

export const { addNewPost } = postsSlice.actions;

export default postsSlice.reducer;
