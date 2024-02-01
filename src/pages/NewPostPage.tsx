import { useContext } from 'react';
import { PostForm } from '../components/PostForm';
import { useUsers } from '../store/UsersContext';
import { PostsContext } from '../store/PostsContext';
import { Post } from '../types';
import { useNavigate, useParams } from 'react-router';

export const NewPostPage = () => {
  const { addPost } = useContext(PostsContext);
  const users = useUsers();
  const navigate = useNavigate();
  const {userId} = useParams();
  const normalizedUserId = userId ? +userId : 0;

  const handleSubmit = async ({ title, userId, body }: Omit<Post, 'id'>) => {
    await addPost({ title, userId, body });
  }

  return <>
    <h1 className="title">Write a post</h1>

    <PostForm
      users={users}
      fixedUserId={normalizedUserId}
      onSubmit={handleSubmit}
      onReset={() => navigate('..')}
    />
  </>;
}