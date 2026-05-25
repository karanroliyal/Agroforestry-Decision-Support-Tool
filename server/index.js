require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/recommendations', recommendationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Agroforestry Decision Support Backend is running.' });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
