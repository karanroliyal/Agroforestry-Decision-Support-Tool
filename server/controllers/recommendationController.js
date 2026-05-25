const groqService = require('../services/groqService');

const getRecommendations = async (req, res) => {
  try {
    const { region, soil, rainfall, purpose } = req.body;

    if (!region || !soil || !rainfall || !purpose) {
      return res.status(400).json({ error: 'Missing required information. Please provide region, soil, rainfall, and purpose.' });
    }

    const recommendations = await groqService.generateRecommendations({ region, soil, rainfall, purpose });
    
    res.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations. Please try again later.' });
  }
};

module.exports = {
  getRecommendations
};
