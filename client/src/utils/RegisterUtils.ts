export const registerUser = async (formData: FormData) => { // קבלת FormData כפרמטר
  try {
    const response = await fetch('http://localhost:4000/users/register', {
      method: 'POST',
      body: formData, 
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
