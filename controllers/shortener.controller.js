const ShortenedURL = require("./../models/shortener.model");

exports.getUrls = async (req, res) => {
  try {
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
  }
};

exports.createUrls = async (req, res) => {
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
  }
};
