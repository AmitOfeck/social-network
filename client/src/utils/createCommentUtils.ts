
export const createCommentUtils = async (postId: string, content: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const authorId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:4000/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Authorization':`${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "content":content , "authorId":authorId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
  
      return await response.json(); 
    } catch (error) {
      console.error('Error in createCommentUtils:', error);
      throw error; 
    }
  };
  