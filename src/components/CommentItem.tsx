import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment, deleteComment } from '../store/slices/postsSlice';
import { Edit2, Trash2, Save } from 'lucide-react';
import type { Comment } from '../types';

interface CommentItemProps {
  postId: string;
  comment: Comment;
}

export default function CommentItem({ postId, comment }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);
  const dispatch = useDispatch();

  function handleSave() {
    const trimmedText = editedText.trim();
    if (trimmedText && trimmedText !== comment.content) {
      dispatch(updateComment({
        postId,
        commentId: comment.id,
        content: trimmedText
      }));
    }
    setIsEditing(false);
  }

  function handleDelete() {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      dispatch(deleteComment({ postId, commentId: comment.id }));
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      {isEditing ? (
        <div>
          <textarea
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
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
        <div className="flex justify-between items-start">
          <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:text-blue-500 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}