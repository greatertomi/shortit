const { customAlphabet } = require('nanoid');
// const { ObjectId } = require('mongoose').Types;
const { default: mongoose } = require('mongoose');
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
    if (!mongoose.Types.ObjectId.isValid(objectids)) {
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
// The error message you're encountering, "CastError: Cast to ObjectId failed for value
// "6505fa741109c97645aea3a1\n"(type string) at path "_id" for model "ShortenedURL","
// indicates that there's an issue with the format of the _id value you're
// trying to use as an ObjectId. It appears that there's a newline character
// (\n) at the end of the id value. thats why i used trim string method
