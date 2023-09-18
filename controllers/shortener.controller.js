const { customAlphabet } = require('nanoid');
const ShortenedURL = require('../models/shortener.model');

// Create a custom nanoid generator for generating short URLs
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 5);

exports.createUrls = async (req, res) => {
  const { url, customName } = req.body;
  try {
    const existingUrl = await ShortenedURL.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.json({
        message: 'Short url already exist',
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
    await new ShortenedURL({
      customName,
      shorturl: `https://shortit/${shortUrl}`,
      originalUrl: url
    }).save();

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

exports.getUrls = async (req, res) => {
  try {
    const getAllUrls = await ShortenedURL.find({});

    // if there are no url in the database return emepty array
    if (!getAllUrls || getAllUrls.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(getAllUrls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'internal server error' });
  }
};
