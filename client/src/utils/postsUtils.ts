export const fetchPosts = async (skip = 0, limit = 3) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token is missing');
    }

    const response = await fetch(
      `http://localhost:4000/posts?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const postsData = await response.json();
    return postsData;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};



export const getPostsByAuthorId = async (authorId: string, skip = 0, limit = 3) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(
      `http://localhost:4000/posts/author/${authorId}?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': token,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse?.message || 'Failed to fetch posts by author');
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


  