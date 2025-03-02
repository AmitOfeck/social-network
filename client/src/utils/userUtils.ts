import { handle401AndRetry } from "./handle401Error";

export const updateUserById = async (userId: string, formData: FormData): Promise<any> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          return await handle401AndRetry(updateUserById, userId, formData);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };


  export const fetchUserById = async (userId: string): Promise<any> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          return await handle401AndRetry(fetchUserById, userId);
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