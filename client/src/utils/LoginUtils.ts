export const loginUser = async (
    email: string,
    password: string
  ) => {
    try {
      const payload = {
        email,
        password,
      };
  
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error during login:', err.message);
      } else {
        console.error('Unknown error:', err);
      }
      throw err;
    }
  };
  