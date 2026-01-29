const mongoose = require('mongoose');
require('dotenv').config();
const Deal = require('./models/Deal');

const deals = [
  {
    title: "AWS Activate",
    description: "Get $5,000 in AWS Cloud credits and technical support to scale your infrastructure.",
    partnerName: "Amazon",
    category: "Cloud",
    isLocked: true,
    benefitValue: "$5,000 Credits"
  },
  {
    title: "Stripe Launch",
    description: "Fee-free processing for your first $20,000 in revenue to help you keep more of what you earn.",
    partnerName: "Stripe",
    category: "Payments",
    isLocked: false,
    benefitValue: "$20k Fee-Free"
  },
  {
    title: "Notion for Startups",
    description: "Connect your team and projects in one workspace. 6 months of Notion Plus for free.",
    partnerName: "Notion",
    category: "Productivity",
    isLocked: false,
    benefitValue: "6 Months Free"
  },
  {
    title: "Mixpanel Pro",
    description: "Advanced product analytics to help you understand your users. Get $50,000 in credits.",
    partnerName: "Mixpanel",
    category: "Analytics",
    isLocked: true,
    benefitValue: "$50,000 Credits"
  },
  {
    title: "HubSpot for Startups",
    description: "Grow your business with up to 90% off HubSpot's marketing, sales, and service software.",
    partnerName: "HubSpot",
    category: "Marketing",
    isLocked: false,
    benefitValue: "90% Discount"
  },
  {
    title: "DigitalOcean Credits",
    description: "Deploy apps faster with $2,000 in cloud infrastructure credits for 12 months.",
    partnerName: "DigitalOcean",
    category: "Cloud",
    isLocked: false,
    benefitValue: "$2,000 Credits"
  },
  {
    title: "Intercom Early Stage",
    description: "Get the full Intercom platform for just $67/month for up to 12 months.",
    partnerName: "Intercom",
    category: "Marketing",
    isLocked: true,
    benefitValue: "95% Off"
  },
  {
    title: "Slack Pro Plan",
    description: "Upgrade your team communication. 25% off the Pro and Business+ plans for 12 months.",
    partnerName: "Slack",
    category: "Productivity",
    isLocked: false,
    benefitValue: "25% Discount"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Important: Clear old deals so you don't have duplicates or bad IDs
    await Deal.deleteMany({});
    
    // Insert the expanded list
    await Deal.insertMany(deals);

    console.log(`${deals.length} Deals Seeded Successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();