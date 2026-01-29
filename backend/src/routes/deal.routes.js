const express = require('express');
const router = express.Router();
const Deal = require('../models/Deal');


router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;