import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../store/slices/postsSlice';
import { Send } from 'lucide-react';

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (!text.trim()) {
      return;
    }

    const comment = {
      id: crypto.randomUUID(),
      postId,
      content: text.trim(),
      timestamp: Date.now(),
    };

    dispatch(createComment({ postId, comment }));
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}