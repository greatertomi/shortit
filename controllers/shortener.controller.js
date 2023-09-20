const { customAlphabet } = require('nanoid');
const { ObjectId } = require('mongoose').Types;
// const { default: mongoose } = require('mongoose');
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

exports.editurl = async (req, res) => {
  try {
    const { id } = req.params;
    const objectid = id.trim();
    const { originalUrl, customName } = req.body;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(objectid)) {
      return res.status(400).json({ error: 'Invalid id format' });
    }
    // Query the database to find the URL by ID
    const updateurl = await ShortenedURL.findOne({ _id: objectid });

    // If the URL with the given ID is not found, return an error
    if (!updateurl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Update the URL if originalUrl is provided
    const updateUrl = await ShortenedURL.findByIdAndUpdate(objectid, originalUrl, { new: true });
    if (originalUrl) {
      updateurl.originalUrl = originalUrl;
      await updateurl.save();

      return res.json({
        message: 'URL updated successfully',
        data: {
          originalUrl
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUrls = async (req, res) => {
  try {
    const getAllUrls = await ShortenedURL.find({});

    // if there are no url in the database return emepty array
    if (!getAllUrls || getAllUrls.length === 0) {
      return res.status(200).json([]);
    }
    // to get all urls
    return res.status(200).json(getAllUrls);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

exports.getSingleUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const objectids = id.trim();
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(objectids)) {
      return res.status(400).json({ error: 'invalid id format' });
    }
    // Query the database to find the URL by ID

    const findOneUrl = await ShortenedURL.findById(objectids);

    // If the URL with the given ID is not found, return an error
    if (!findOneUrl) {
      return res.status(404).json({ error: 'url not found' });
    }
    // Return the URL
    return res.status(200).json(findOneUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = id.trim();

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(objectId)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Query the database to find the URL by ID
    const originalUrlFind = await ShortenedURL.findById(objectId);

    if (!originalUrlFind) {
      return res.status(404).json({ error: 'Original URL not found' });
    }

    // Remove the document from the database
    await ShortenedURL.findByIdAndDelete(objectId);

    return res.status(200).json({
      message: 'URL deleted successfully',
      data: null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
