import React, { useState } from 'react';
import '../css/Register.css'
import '../css/Login.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    if (image) formData.append('image', image);

    try {
      // כאן תעשה קריאה ל- API כדי לשלוח את הנתונים
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      // טיפול בתגובה אחרי הרשמה (למשל הפניית המשתמש)
    } catch (error) {
      console.error('Error during register:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            className="input-field"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit" >Register</button>
      </form>
    </div>
  );
};

export default Register;
