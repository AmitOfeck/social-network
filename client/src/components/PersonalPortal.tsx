import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../utils/fetchUser';
import { fetchImageUrl } from '../utils/fetchImageUrl';
import { getPostsByAuthorId } from '../utils/postsUtils';
import SinglePost from './SinglePost';
import { CommentsProvider } from './contexts/CommentProvider';
import { usePosts } from './contexts/PostContext';
import '../css/PersonalPortal.css';

const PersonalPortal = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<null | any>(null);

  const { posts, setPosts } = usePosts();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (id) {
        try {
          const fetchedUser = await fetchUser(id);
          setUser(fetchedUser);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
  
    loadUser();
  }, []); 

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const postsData = await getPostsByAuthorId(id, page, limit);
          setPosts((prevPosts) =>
            page === 1
              ? postsData.posts
              : [...prevPosts, ...postsData.posts]
          );
        }
      } catch (error) {
        console.error('Failed to fetch posts');
        setError('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [id, page, limit]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="personal-portal-container">
      <div className="profile-header">
        <img
          src={user?.image ? `${fetchImageUrl(user.image)}` : `https://via.placeholder.com/50`}
          alt={user?.name}
          className="profile-image"
        />
        <h1>{user?.name}</h1>
        <p className="user-email">{user?.email}</p>
      </div>
      <h2>Posts by {user?.name}</h2>
      <div>
        {posts.length === 0 && !isLoading ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <CommentsProvider key={post._id}>
              <SinglePost key={post._id} post={post} />
            </CommentsProvider>
          ))
        )}
      </div>
      <div className="load-more-container">
        <button
          className={`load-more-btn ${isLoading ? 'loading' : ''}`}
          onClick={loadMorePosts}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More Posts'}
        </button>
      </div>
    </div>
  );
};

export default PersonalPortal;
