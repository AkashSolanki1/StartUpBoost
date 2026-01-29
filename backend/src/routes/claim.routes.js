const express = require('express');
const router = express.Router();
const Claim = require('../models/Claim');
const Deal = require('../models/Deal');
const { protect } = require('../middlewares/auth.middleware');

router.post('/', protect, async (req, res) => {
  const { dealId } = req.body;

  try {
    const deal = await Deal.findById(dealId);
    if (!deal) return res.status(404).json({ message: 'Deal not found' });

    const existingClaim = await Claim.findOne({ user: req.user._id, deal: dealId });
    if (existingClaim) return res.status(400).json({ message: 'You have already claimed this deal' });

    if (deal.isLocked && !req.user.isVerified) {
      return res.status(403).json({ 
        message: 'Access Restricted. Verification required for this premium deal.' 
      });
    }

    const claim = await Claim.create({
      user: req.user._id,
      deal: dealId,
      status: 'pending'
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-claims', protect, async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).populate('deal');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;