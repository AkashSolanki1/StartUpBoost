const Claim = require('../models/Claim');
const Deal = require('../models/Deal');

exports.createClaim = async (req, res) => {
  const { dealId } = req.body;

  try {
    const deal = await Deal.findById(dealId);
    
    
    if (deal.isLocked && !req.user.isVerified) {
      return res.status(403).json({ message: 'Account verification required for this deal' });
    }

  
    const claim = await Claim.create({
      user: req.user._id,
      deal: dealId,
      status: 'pending'
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Claim failed' });
  }
};