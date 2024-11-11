export const registerUser = async (
    email: string,
    password: string,
    name: string,
    image: string | null // Expecting image URL or base64 encoded string if you need to send it as part of JSON
  ) => {
    try {
      // Creating the payload object to send in the request body
      const payload = {
        email,
        password,
        name,
        image,
      };
  
      // Sending a POST request to the register endpoint with the JSON payload
      const response = await fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Setting the content type to JSON
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Registration failed');
      }
  
      // Parsing the response as JSON and returning the result (user data, token, etc.)
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Throwing the error to handle it in the calling function
    }
  };
  