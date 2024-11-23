export const fetchUser = async (userId: string) => {
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
        throw new Error('User not found');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;  
    }
  };
  