import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Comment } from '../types';
import CommentItem from './CommentItem';

function CommentList({ postId, comments }: { postId: string; comments: Comment[] }) {
  const searchText = useSelector((state: RootState) => state.search.searchText.toLowerCase());

  const matchingComments = comments.filter(comment =>
    comment.content.toLowerCase().includes(searchText)
  );

  return (
    <div className="space-y-4 mt-4">
      {matchingComments.map(comment => (
        <CommentItem
          key={comment.id}
          postId={postId}
          comment={comment}
        />
      ))}
    </div>
  );
}

export default CommentList;