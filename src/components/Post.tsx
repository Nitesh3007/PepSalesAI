import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost, deletePost, incrementLikes } from '../store/slices/postsSlice';
import { Heart, MessageCircle, Edit2, Trash2, Save } from 'lucide-react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  function handleSave() {
    const trimmedText = editedText.trim();
    if (trimmedText && trimmedText !== post.content) {
      dispatch(updatePost({ id: post.id, content: trimmedText }));
    }
    setIsEditing(false);
  }

  function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      dispatch(deletePost(post.id));
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-4">
        {isEditing ? (
          <div>
            <textarea
              value={editedText}
              onChange={e => setEditedText(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-1.5 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(incrementLikes(post.id))}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span>{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:text-blue-500 transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <CommentForm postId={post.id} />
          <CommentList postId={post.id} comments={post.comments} />
        </div>
      )}
    </article>
  );
}