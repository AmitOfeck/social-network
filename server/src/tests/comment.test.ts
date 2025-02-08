import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import path from 'path';

let userId: string;
let postId: string;
let commentId: string;
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

  const postResponse = await request(app)
    .post('/posts')
    .set('Authorization', `${accessToken}`)
    .field('content', 'This is a test post')
    .attach('photo', path.resolve(__dirname, 'assets/test-image.jpg'));

  expect(postResponse.statusCode).toEqual(201);
  expect(postResponse.body).toHaveProperty('post');
  postId = postResponse.body.post._id;
});

afterAll(async () => {

  await request(app)
    .delete(`/posts/${postId}`)
    .set('Authorization', `${accessToken}`);

  await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `${accessToken}`);

  await mongoose.disconnect();
});

describe('Comment API Endpoints', () => {
  it('should create a new comment', async () => {
    const res = await request(app)
      .post(`/comments/${postId}`)
      .set('Authorization', `${accessToken}`)
      .send({ content: 'This is a test comment' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('content', 'This is a test comment');
    expect(res.body).toHaveProperty('postId', postId);
    commentId = res.body._id;
  });

  it('should get all comments for a post', async () => {
    const res = await request(app)
      .get(`/comments/${postId}`)
      .set('Authorization', `${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('content');
    expect(res.body[0]).toHaveProperty('postId', postId);
  });


});
