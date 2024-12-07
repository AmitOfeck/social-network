export const fetchPosts = async (page = 1, limit = 5) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Access token is missing');
    }

    const response = await fetch(`http://localhost:4000/posts?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    return posts; 
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const getPostsByAuthorId = async (authorId: string, page = 1, limit = 3) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(
      `http://localhost:4000/posts/author/${authorId}?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts by author');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching posts by author ID:', error);
    throw error;
  }
};

  