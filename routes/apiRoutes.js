const express = require("express");
const { connectTODb } = require("../db");
const Url = require("../models/url");
const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }
    await connectTODb();
    const checkResult = async (link) => {
      return await Url.findOne({ shortUrl: link });
    };
    const short = Math.random().toString(36).substring(7);
    if (!checkResult(short)) checkResult(short);
    const urlData = {
      url,
      shortUrl: short,
    };
    const link = await Url.create(urlData);
    res.status(201).json({
      success: true,
      message: "URL created successfully",
      data: link,
    });
  } catch (error) {
    console.log("Error in urlShortner", error);
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    await connectTODb();
    const urlData = await Url.findOne({ shortUrl });
    if (!urlData) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }
    urlData.visitors.push(Date.now());
    urlData.save();
    if (urlData.url.startsWith("http")) {
      res.redirect(urlData.url);
    } else {
      res.redirect(`https://${urlData.url}`);
    }
  } catch (error) {
    console.log("Error in urlShortner", error);
  }
});

module.exports = router;
