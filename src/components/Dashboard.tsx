import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Navbar from './Navbar';
import PostForm from './PostForm';
import Post from './Post';

export default function Dashboard() {
  const posts = useSelector((state: RootState) => state.posts.items);
  const query = useSelector((state: RootState) => state.search.query.toLowerCase());

  // Filter posts based on search query
  const filteredPosts = query
    ? posts.filter(post =>
        post.content.toLowerCase().includes(query) ||
        post.comments.some(comment => comment.content.toLowerCase().includes(query))
      )
    : posts;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto py-8 px-4">
        <PostForm />
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && query && (
            <p className="text-center text-gray-500">No posts found matching "{query}"</p>
          )}
          {filteredPosts.length === 0 && !query && (
            <p className="text-center text-gray-500">No posts yet. Be the first to post!</p>
          )}
        </div>
      </main>
    </div>
  );
}