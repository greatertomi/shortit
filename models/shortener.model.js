const mongoose = require("mongoose");
const shortenedURLSchema = new mongoose.Schema({
  customName: {
    type: String,
    unique: true,
    sparse: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ShortenedURL = mongoose.model("ShortenedURL", shortenedURLSchema);
module.exports = ShortenedURL;

/*const testUrlShortener = new ShortenedURL({
  customName: "untalented guy",
  shortUrl: `https://github.com/wetgr`,
  originalUrl: `https://github.com/mongodb-university/atlas_starter_nodejs`,
});

testUrlShortener
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log("error", err));
*/
