const cloudinary = require("../../../../config/cloudinary");

exports.uploadToCloudinary = function (localMedia, callback) {
  const result = [];

  console.log("we here", localMedia);
  localMedia.forEach(async (media, index, arr) => {
    try {
      console.log("file", media);
      const res = await cloudinary.uploader.upload(
        "https://n3glhg-5004.csb.app/" + media.path,
        {
          use_filename: true,
          unique_filename: true,
          overwrite: true,
          resource_type: media.fieldname === "images" ? "image" : "video",
          upload_preset:
            media.fieldname === "images" ? "roomsImage" : "roomsVideo",
        }
      );

      result.push(res);
    } catch (error) {
      console.error("cloudinary Error", error);
      result.push(null);
    } finally {
      if (index >= arr.length - 1) {
        console.log("done");
        callback(result);
      }
    }
  });
};
