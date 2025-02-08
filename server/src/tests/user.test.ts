import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import path from 'path';
import User from '../models/userModel';

beforeAll(async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
});

afterAll(async () => {
  await User.deleteOne({ email: 'testuser@example.com' });  
  await mongoose.disconnect();
});

describe('User API Endpoints', () => {
  let userId: string;
  let accessToken: string;
  let refreshToken: string;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .field('email', 'testuser@example.com')
      .field('password', 'password123')
      .field('name', 'Test User')
      .attach('image', path.resolve(__dirname, 'assets/test-image.jpg'));

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
    userId = res.body.user._id;
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });





  describe('Authenticated User Actions', () => {

    it('should get user details', async () => {
      const res = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `${accessToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id', userId);
    });

    it('should update user details', async () => {
      const res = await request(app)
        .put(`/users/${userId}`)
        .set('Authorization', `${accessToken}`)
        .field('name', 'Updated Test User')
        .attach('image', path.resolve(__dirname, 'assets/test-image.jpg'));

        console.log(res.body)

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('name', 'Updated Test User');
    });

    it('should refresh the access token', async () => {
      const res = await request(app)
        .post(`/users/refresh-token/${userId}`)
        .set('Authorization', `${refreshToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('accessToken');
    });

//     it('should return 404 for an unknown user', async () => {
//       const res = await request(app)
//         .get('/users/unknownUserId')
//         .set('Authorization', `Bearer ${accessToken}`);

//       expect(res.statusCode).toEqual(404);
//     });

    it('should delete the user', async () => {
      const res = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `${accessToken}`);

      expect(res.statusCode).toEqual(200);
    });

  });
});
