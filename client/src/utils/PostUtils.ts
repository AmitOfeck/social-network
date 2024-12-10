import { handle401AndRetry } from "./handle401Error";

export const createPost = async (formData: FormData): Promise<any> => {
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
        if (response.status === 401) {
          return await handle401AndRetry(createPost, formData);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json(); 
      return result; 
    } catch (error) {
      console.error('Error during post creation:', error); 
      throw error; 
    }
  };


  export const getPostById = async (postId: string): Promise<any> => {
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
        if (response.status === 401) {
          return await handle401AndRetry(getPostById, postId);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json(); 
      return result;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error; 
    }
  };

  export const deletePost = async (postId: string): Promise<any> => {
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
        if (response.status === 401) {
          return await handle401AndRetry(deletePost, postId);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json(); 
      return result; 
    } catch (error) {
      console.error('Error during post deletion:', error); 
      throw error; 
    }
  };

  export const updatePost = async (postId: string, updatedPost: any): Promise<any> => {
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
        if (response.status === 401) {
          return await handle401AndRetry(updatePost, postId, updatedPost);
        }
        throw new Error('Failed to fetch comments');
      }
  
      const result = await response.json(); 
      return result; 
    } catch (error) {
      console.error('Error updating post:', error);
      throw error; 
    }
  };
  
  
  