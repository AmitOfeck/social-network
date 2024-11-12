export const registerUser = async (
    email: string,
    password: string,
    name: string,
    image: string | null 
  ) => {
    try {
   
      const payload = {
        email,
        password,
        name,
        image,
      };
  
      const response = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; 
    }
  };
  