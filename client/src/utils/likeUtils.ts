
const API_URL = 'http://localhost:4000/likes';

export const sendLikeRequest = async (postId: string, authorId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify({ "authorId":authorId }),  
    });

    if (!response.ok) {
      throw new Error('Error adding like');
    }

    const result = await response.json();
    return result;  
  } catch (error) {
    console.error('Error sending like request:', error);
    throw error;  
  }
};


export const checkLikeStatus = async (postId: string, authorId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`${API_URL}/${postId}/isLike`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ "authorId":authorId }), 
      });
  
      if (!response.ok) {
        throw new Error('Error checking like status');
      }
  
      const result = await response.json();

      return result;  
    } catch (error) {
      console.error('Error checking like status:', error);
      throw error;
    }
  };


export const removeLike = async (postId: string, authorId: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${API_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ "authorId":authorId }),  
    });

    if (!response.ok) {
      throw new Error('Error removing like');
    }

    const result = await response.json();
    return result;  
  } catch (error) {
    console.error('Error removing like:', error);
    throw error;
  }
};
