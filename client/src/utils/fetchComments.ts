
export const fetchComments = async (postId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:4000/comments/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization':`${token}` 
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };
  