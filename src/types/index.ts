// Basic types for our social media app
type PostId = string;
type CommentId = string;

export interface Post {
  id: PostId;
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: number;
}

export interface Comment {
  id: CommentId;
  postId: PostId;
  content: string;
  timestamp: number;
}