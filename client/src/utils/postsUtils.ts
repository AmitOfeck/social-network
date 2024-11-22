export const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Access token is missing');
      }
  
      const response = await fetch('http://localhost:4000/posts', {
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
  