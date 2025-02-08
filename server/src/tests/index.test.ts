import request from 'supertest';
import app from '../index'; 
import mongoose from 'mongoose';

beforeAll(async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('API Endpoints', () => {
  it('should get the Google client ID', async () => {
    const res = await request(app).get('/api/google-client-id');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('clientId');
  });


  it('should return 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
  });
});