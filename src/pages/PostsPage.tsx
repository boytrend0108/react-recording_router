/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';

import { PostList } from '../components/PostList';
import { Loader } from '../components/Loader';
import { PostsContext } from '../store/PostsContext';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { deletePost as deletePostFromServer } from '../services/post';

export const PostsPage: React.FC = () => {
  const { posts, loading, errorMessage, loadPosts, deletePost } = useContext(PostsContext);
  const { userId } = useParams();
  const normalizedUdesId = userId ? +userId : 0;

  function onDelete(postId: number) {
    deletePostFromServer(postId)
      .then(() => deletePost(postId))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loadPosts(normalizedUdesId);
  }, [normalizedUdesId]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="">
      {normalizedUdesId && (
        <Link to='..'> Back </Link>
      )}
      <h1 className="title">User {userId} Posts</h1>

      {posts.length > 0 ? (
        <PostList posts={posts} onDelete={onDelete} />
      ) : (
        <p>There are no posts yet</p>
      )}

      <Link to="new" className="button is-info">Create a post</Link>

      {errorMessage && (
        <p className="notification is-danger">{errorMessage}</p>
      )}
    </div>
  );
};
