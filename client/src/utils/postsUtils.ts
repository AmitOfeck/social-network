import { handle401AndRetry } from "./handle401Error";

export const fetchPosts = async (skip = 0, limit = 3) : Promise<any> => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token is missing');
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return await handle401AndRetry(fetchPosts, skip, limit);;
      }
      throw new Error('Failed to fetch posts');
    }

    const postsData = await response.json();
    return postsData;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};



export const getPostsByAuthorId = async (authorId: string, skip = 0, limit = 3) : Promise<any> => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/author/${authorId}?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return await handle401AndRetry(getPostsByAuthorId, authorId, skip, limit);
      }
      throw new Error('Failed to fetch posts');
    }

    const result = await response.json();

    return {
      posts: result.posts || [],
      totalPosts: result.totalPosts || 0,
    };
  } catch (error) {
    console.error('Error fetching posts by author ID:', error);
    throw error;
  }
};


  