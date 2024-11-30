export const updateUserById = async (userId: string, formData: FormData): Promise<any> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user');
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
  
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };