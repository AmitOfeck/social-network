import { handle401AndRetry } from "./handle401Error";

export const fetchUser = async (userId: string): Promise<any> => {
    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        throw new Error('No access token found');
      }
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,  
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          return await handle401AndRetry(fetchUser, userId);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;  
    }
  };
  