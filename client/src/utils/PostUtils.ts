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


  export const getPostById = async (postId: string) => {
    try {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
  
      const result = await response.json(); 
      return result;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error; 
    }
  };

  export const deletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Post deletion failed');
      }
  
      const result = await response.json(); 
      return result; 
    } catch (error) {
      console.error('Error during post deletion:', error); 
      throw error; 
    }
  };

  export const updatePost = async (postId: string, updatedPost: any) => {
    try {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'PUT', 
        headers: {
          'Authorization': `${token}`
        },
        body: updatedPost, 
      });
  
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
  
      const result = await response.json(); 
      return result; 
    } catch (error) {
      console.error('Error updating post:', error);
      throw error; 
    }
  };
  
  
  