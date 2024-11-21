export const createPost = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Post creation failed');
      }
  
      const result = await response.json(); 
      return result; 
    } catch (error) {
      console.error('Error during post creation:', error); 
      throw error; 
    }
  };
  