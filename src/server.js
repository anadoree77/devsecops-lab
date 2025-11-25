const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const DB_CONNECTION = "mongodb://admin:SuperSecret123!@prod-db.company.com:27017/myapp";
const STRIPE_SECRET_KEY = "sk_live_123456789";
const SENDGRID_API_KEY = "SG.test-test-test";

app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, "INSECURE_SECRET");
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/debug', (req, res) => {
  res.json({
    db: DB_CONNECTION,
    stripe: STRIPE_SECRET_KEY,
    sendgrid: SENDGRID_API_KEY
  });
});

app.listen(3000, () => console.log("Server running"));
