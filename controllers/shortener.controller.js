const ShortenedURL = require("./../models/shortener.model");
const nanoid = require("nanoid");
const { check } = require("express-validator");

exports.createUrls = async (req, res) => {
  /*//to validate url
  const validateURL = check("url")
    .notEmpty()
    .withMessage("URL is required")
    .isURL()
    .withMessage("Invalid URL");

  // Check if the URL already exists in the database
  const existingURL = await ShortenedURL.findOne({ originalUrl: url });

  if (existingURL) {
    return res.status(200).json({
      message: "Short URL already exists",
      data: {
        shortUrl: existingURL.shortUrl,
      },
    });
  }*/
  /*
  try {
    const newShortenedURL = await ShortenedURL.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        ShortenedURL: newShortenedURL,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }*/
};

exports.getUrls = async (req, res) => {
  /*  try {
    const allurl = await ShortenedURL.find();

    res.status(200).json({
      status: "success",
      data: {
        allurl,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }*/
};
