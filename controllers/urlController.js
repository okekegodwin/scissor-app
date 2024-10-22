require("dotenv").config();

const Url = require("../models/urlModel");
const validUrl = require("valid-url");
const shortId = require("shortid");
const QRCode = require("qrcode");

const PORT = process.env.PORT;
const baseUrl = `http://localhost:${PORT}`;


async function shortenUrl(req, res) {

  const { longUrl, customAlias } = req.body;

  if (!validUrl.isUri(longUrl)) {

    res.status(400);
    res.json({ message: "This is not a valid url" })

  }

  try {
    let url;

    if (customAlias && customAlias.trim() !== "") {

      const existingAlias = await Url.findOne({ customAlias });

      if (existingAlias) {
        res.status(400);
        res.json({ message: "Custom alias already in use. Please choose another alias." });
      }
      url = new Url({ longUrl, shortUrl: `${baseUrl}/${customAlias}`, customAlias})
    } else {
      const urlCode = shortId.generate();
      url = new Url({  longUrl, shortUrl: `${baseUrl}/${urlCode}`, customAlias});
    }

    await url.save();
    res.status(200).json({ url: url });

  } catch (error) {
    res.status(500);
    res.json({
      message: error.errmsg
    })
  }
}


async function redirectUrl(req, res) {
  
  const { code } = req.params;

  try {

    const url = await Url.findOne({ shortUrl: `${baseUrl}/${code}` }) || await Url.findOne({ customAlias: code });
    
    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      res.status(404).json('URL not found');
    }
  } catch (err) {
    res.status(500).json('Server error');
  }
};



async function generateQrCode(req, res) {
  const { shortUrl } = req.body;

  try {
    const qrCode = await QRCode.toDataURL(shortUrl);

    res.json({ qrCode });

  } catch (error) {

    res.status(500).json("QR code generation failed");
    
  }
}


async function getAllUrls(req, res) {
  try {
    const urls = await Url.find({ });

    if (!urls) {
      res.status(400).json( "No urls available" );
    }

    res.status(200);
    res.send(urls);

  } catch (error) {
    res.status(500);
    res.json({
      message: "An error occured",
      data: error.message
    })
  }

}


async function updateAlias(req, res) {
  const id = req.params.id;

  const { newAlias } = req.body;

  if (newAlias === '') {
    res.status(404).json("Custom alias is required");
  }

  try {
    const url = await Url.findById(id);

    if (!url) {
      return res.status(404).json("ID passed is not found!");
    }

    const aliasExist = await Url.findOne({ newAlias });

    if (aliasExist) {
      return res.status(400).json("Alias already exist. Please pass in a new alias");
    }

    url.customAlias = newAlias;
    url.shortUrl = `${baseUrl}/${newAlias}`;

    await url.save();

    res.status(200);
    return res.json({
      message: "custom alias has been updated successfully",
      url: url
    })

  } catch (error) {
    res.status(500);
    return res.json({
      message: "An error occurred",
      error: error.message
    })
  }
}


async function deleteUrl(req, res) {
  const id = req.params.id;

  try {
    const url = await Url.findById(id);

    if (!url) {
      return res.status(404).json("ID not found");
    }

    await Url.findByIdAndDelete(id);

    res.status(200);
    return res.json("URL deleted successfully!");

  } catch (error) {

    res.status(500);

    return res.json({
      message: "An internal error occurred",
      error: error.message
    })

  }
}

module.exports = {
  shortenUrl,
  redirectUrl,
  generateQrCode,
  getAllUrls,
  updateAlias,
  deleteUrl
}