import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index';
import path from 'path';

let userId: string;
let postId: string;
let accessToken: string;

beforeAll(async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }

  const registerResponse = await request(app)
    .post('/users/register')
    .field('email', 'liketest@example.com')
    .field('password', 'password123')
    .field('name', 'Like Test User')
    .attach('image', path.resolve(__dirname, 'assets/test-image.jpg'));

  expect(registerResponse.statusCode).toEqual(201);
  userId = registerResponse.body.user._id;

  const loginResponse = await request(app)
    .post('/users/login')
    .send({ email: 'liketest@example.com', password: 'password123' });

  expect(loginResponse.statusCode).toEqual(200);
  accessToken = loginResponse.body.accessToken;

  const postResponse = await request(app)
    .post('/posts')
    .set('Authorization', `${accessToken}`)
    .field('content', 'This is a like test post')
    .attach('photo', path.resolve(__dirname, 'assets/test-image.jpg'));

  expect(postResponse.statusCode).toEqual(201);
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

describe('Like API Endpoints', () => {
  it('should add a like to a post', async () => {
    const res = await request(app)
      .post(`/likes/${postId}`)
      .set('Authorization', `${accessToken}`)
      .send({});

    expect(res.statusCode).toEqual(201);
    expect(res.body.like).toHaveProperty('authorId', userId);
    expect(res.body.like).toHaveProperty('postId', postId);
  });

  it('should check if a post is liked', async () => {
    const res = await request(app)
      .post(`/likes/${postId}/isLike`)
      .set('Authorization', `${accessToken}`)
      .send({});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('isLiked', true);
  });

  it('should remove a like from a post', async () => {
    const res = await request(app)
      .delete(`/likes/${postId}`)
      .set('Authorization', `${accessToken}`)
      .send({});

    expect(res.statusCode).toEqual(200);
  });

  it('should confirm the post is no longer liked', async () => {
    const res = await request(app)
      .post(`/likes/${postId}/isLike`)
      .set('Authorization', `${accessToken}`)
      .send({});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('isLiked', false);
  });
});