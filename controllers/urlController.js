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
      url = new Url({ longUrl, shortUrl: `${baseUrl}/${customAlias}`})
    } else {
      const urlCode = shortId.generate();
      url = new Url({  longUrl, shortUrl: `${baseUrl}/${urlCode}`});
    }

    await url.save();
    res.status(200).json({ url: url });

  } catch (error) {
    res.status(500);
    console.log(error);
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
      console.log(url.clicks);
      return res.redirect(url.longUrl);
    } else {
      res.status(404).json('URL not found');
    }
  } catch (err) {
    res.status(500).json('Server error');
  }
};



async function generateQrCode(req, res) {
  const { shortUrl } = req.body

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

module.exports = {
  shortenUrl,
  redirectUrl,
  generateQrCode,
  getAllUrls
}