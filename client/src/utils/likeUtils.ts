
import { handle401AndRetry } from "./handle401Error";
const API_URL = 'http://localhost:4000/likes';

export const sendLikeRequest = async (postId: string, authorId: string): Promise<any>  => {
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
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        return await handle401AndRetry(sendLikeRequest, postId, authorId);
      }
      throw new Error('Failed to fetch comments');
    }

    const result = await response.json();
    return result;  
  } catch (error) {
    console.error('Error sending like request:', error);
    throw error;  
  }
};


export const checkLikeStatus = async (postId: string, authorId: string): Promise<any>  => {
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
        if (response.status === 401) {
          return await handle401AndRetry(checkLikeStatus, postId, authorId);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json();

      return result;  
    } catch (error) {
      console.error('Error checking like status:', error);
      throw error;
    }
  };


export const removeLike = async (postId: string, authorId: string): Promise<any>  => {
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
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        return await handle401AndRetry(removeLike, postId, authorId);
      }
      throw new Error('Failed to fetch comments');
    }

    const result = await response.json();
    return result;  
  } catch (error) {
    console.error('Error removing like:', error);
    throw error;
  }
};
