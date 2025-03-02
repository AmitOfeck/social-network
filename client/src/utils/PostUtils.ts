import { handle401AndRetry } from "./handle401Error";

export const createPost = async (formData: FormData): Promise<any> => {
    try {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        throw new Error('No access token found');
      }
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
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
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
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
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
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
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
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

  export const fetchGeminiApiKey = async (): Promise<string | null> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/gemini-api-key`);
      const data = await response.json();
      return data.apiKey || null;
    } catch (error) {
      console.error('Error fetching Gemini API key:', error);
      return null;
    }
  };

  

  export const fetchGeminiFact = async (): Promise<string | null> => {
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/api/gemini-fact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //   prompt: `Give me a unique and interesting fun fact that most people don't know. Make sure it is different from previous facts.`
        // })
      });
  
      const data = await response.json();
  
      return data?.fact || 'No fact found';
    } catch (error) {
      console.error('Error fetching fact from Gemini:', error);
      return null;
    }
  };
  
  
  
  
  