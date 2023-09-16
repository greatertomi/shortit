const { customAlphabet } = require('nanoid');
const ShortenedURL = require('../models/shortener.model');

// Create a custom nanoid generator for generating short URLs
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 5);

exports.createUrls = async (req, res) => {
  const { originalUrl, customName } = req.body;
  try {
    const existingUrl = await ShortenedURL.findOne({ originalUrl });

    if (existingUrl) {
      return res.json({
        message: 'Original url already exist',
        data: { shortUrl: existingUrl.shortUrl }
      });
    }

    let shortUrl = customName || nanoid();
    // If customName has spaces, replace them with dashes
    if (customName && customName.includes(' ')) {
      shortUrl = customName.replace(/ /g, '-');
    }

    // Check if the short URL already exists
    const existingShortUrl = await ShortenedURL.findOne({ shortUrl });

    if (existingShortUrl) {
      return res.status(400).json({ message: 'Custom name already in use' });
    }

    // Create a new URL entry
    const shortenedUrl = new ShortenedURL({
      customName,
      shortUrl: `https://shortit/${shortUrl}`,
      originalUrl
    });

    await shortenedUrl.save();

    return res.json({
      message: 'URL shortened successfully',
      data: {
        shortUrl: `https://shortit/${shortUrl}`
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// exports.getUrls = async (req, res) => {}
