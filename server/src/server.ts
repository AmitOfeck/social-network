import app from './index';
import https from 'https';
import fs from 'fs';

// טעינת משתני סביבה
const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 4000;
const NODE_ENV = process.env.NODE_ENV || 'production';

console.log(`Loaded environment: ${NODE_ENV}`);
console.log(`HOST: ${HOST}`);
console.log(`PORT: ${PORT}`);

// קריאה לתעודות SSL
const sslOptions = {
  key: fs.readFileSync('/home/st111/client-key.pem'),
  cert: fs.readFileSync('/home/st111/client-cert.pem'),
};

// מאזין רק על פורט 4000 עם HTTPS
https.createServer(sslOptions, app).listen(PORT, HOST, () => {
  console.log(`✅ HTTPS Server running on https://${HOST}:${PORT}`);
});
