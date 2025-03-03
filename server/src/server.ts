import express from 'express';
import app from './index';
import https from 'https';
import http from 'http';
import fs from 'fs';

if (process.env.NODE_ENV !== 'production') {
  console.log('Development Mode: Running HTTP Server');
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(`🚀 HTTP Server running on port ${process.env.PORT}`);
  });
} else {
  try {
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/node04.cs.colman.ac.il/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/node04.cs.colman.ac.il/fullchain.pem')
    };

    console.log('Production Mode: Running HTTPS Server');
    https.createServer(options, app).listen(process.env.HTTPS_PORT, () => {
      console.log(`🔒 HTTPS Server running on port ${process.env.HTTPS_PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start HTTPS server:', error);
    process.exit(1);
  }
}
