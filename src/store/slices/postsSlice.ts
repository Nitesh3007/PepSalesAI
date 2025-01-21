import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Post, Comment } from '../../types';

// State shape for posts
interface PostsState {
  items: Post[];
  loading: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPost(state, action: PayloadAction<Post>) {
      state.items.unshift(action.payload);
    },
    updatePost(state, action: PayloadAction<{ id: string; content: string }>) {
      const post = state.items.find(p => p.id === action.payload.id);
      if (post) {
        post.content = action.payload.content;
      }
    },
    deletePost(state, action: PayloadAction<string>) {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
    incrementLikes(state, action: PayloadAction<string>) {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    createComment(state, action: PayloadAction<{ postId: string; comment: Comment }>) {
      const post = state.items.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
    updateComment(state, action: PayloadAction<{ postId: string; commentId: string; content: string }>) {
      const post = state.items.find(p => p.id === action.payload.postId);
      if (post) {
        const comment = post.comments.find(c => c.id === action.payload.commentId);
        if (comment) {
          comment.content = action.payload.content;
        }
      }
    },
    deleteComment(state, action: PayloadAction<{ postId: string; commentId: string }>) {
      const post = state.items.find(p => p.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== action.payload.commentId);
      }
    },
  },
});

export const {
  createPost,
  updatePost,
  deletePost,
  incrementLikes,
  createComment,
  updateComment,
  deleteComment,
} = postsSlice.actions;

export default postsSlice.reducer;