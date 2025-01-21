import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/slices/postsSlice';
import { Send } from 'lucide-react';

export default function PostForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (!text.trim()) {
      return;
    }

    const post = {
      id: crypto.randomUUID(),
      content: text.trim(),
      likes: 0,
      comments: [],
      timestamp: Date.now(),
    };

    dispatch(createPost(post));
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg shadow-sm p-4">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What's happening?"
        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center gap-2 px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          Post
        </button>
      </div>
    </form>
  );
}