import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import path from 'path';

import User from '../models/userModel';
import Post from '../models/postModel';

let userId: string;
let postId: string;
let accessToken: string;

beforeAll(async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }

  const registerResponse = await request(app)
    .post('/users/register')
    .field('email', 'testuser@example.com')
    .field('password', 'password123')
    .field('name', 'Test User')
    .attach('image', path.resolve(__dirname, 'assets/test-image.jpg'));

  expect(registerResponse.statusCode).toEqual(201);
  expect(registerResponse.body).toHaveProperty('user');
  userId = registerResponse.body.user._id;

  const loginResponse = await request(app)
    .post('/users/login')
    .send({ email: 'testuser@example.com', password: 'password123' });

  expect(loginResponse.statusCode).toEqual(200);
  expect(loginResponse.body).toHaveProperty('accessToken');
  accessToken = loginResponse.body.accessToken;
});

afterAll(async () => {
  await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `${accessToken}`);

  await mongoose.disconnect();
});

describe('Post API Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `${accessToken}`)
      .field('content', 'This is a test post')
      .attach('photo', path.resolve(__dirname, 'assets/test-image.jpg'));

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
    postId = res.body.post._id;
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/posts')
      .set('Authorization', `${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('posts');
    expect(res.body.posts.length).toBeGreaterThan(0);
  });

  it('should get a post by ID', async () => {
    const res = await request(app)
      .get(`/posts/${postId}`)
      .set('Authorization', `${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', postId);
  });

  it('should update a post by ID', async () => {
    const res = await request(app)
      .put(`/posts/${postId}`)
      .set('Authorization', `${accessToken}`)
      .field('content', 'This is an updated test post')
      .attach('photo', path.resolve(__dirname, 'assets/test-image.jpg'));

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
    expect(res.body.post).toHaveProperty('content', 'This is an updated test post');
  });

  it('should delete a post by ID', async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`)
      .set('Authorization', `${accessToken}`);

    expect(res.statusCode).toEqual(200);
  });
});
