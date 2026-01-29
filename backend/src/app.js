const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());


app.get('/health', (req, res) => res.send('Server is live'));


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/deals', require('./routes/deal.routes'));
app.use('/api/claims', require('./routes/claim.routes'));


app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: `Route ${req.originalUrl} not found on this server` 
  });
});

module.exports = app;