const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const uploadToCloudinary = async (file) => {
  if (!file || !file.path) {
    console.log("File is required for upload.");
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto", // handles image, video, etc.
    });

    // Delete file from local storage after upload
    fs.unlinkSync(file.path);

    return response; // full Cloudinary response object
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
};

module.exports = { cloudinary, uploadToCloudinary };
