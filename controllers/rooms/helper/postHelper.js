const rooms = require("../../../libs/rooms");
const alerts = require("../../../constants/alerts");
const { uploadToCloudinary } = require("./module/uploadToCloudinary");

module.exports = {
  async createRoom(req, res) {
    const image = req.files?.images ? req.files.images : [];
    const video = req.files?.videos ? req.files.videos : [];

    const bodyData = {
      ...req.body,
      images: image,
      videos: video,
    };

    // console.log(req.files);
    // console.log(bodyData);
    try {
      if (bodyData?.features || bodyData?.features !== "")
        bodyData.features = bodyData.features.split(",");
      console.log("new rooms", bodyData);

      // upload to cloudinary
      uploadToCloudinary(
        [...bodyData.images, ...bodyData.videos],
        async (result) => {
          console.log("our result", result);
          let count = 0;
          if (bodyData.images.length)
            while (count <= bodyData.images.length - 1) {
              bodyData.images[count].cloud = result[count];
              count++;
            }
          if (bodyData.videos.length)
            while (
              count - bodyData.images.length <=
              bodyData.videos.length - 1
            ) {
              bodyData.videos[count - bodyData.images.length].cloud =
                result[count];
              count++;
            }

          const { status, alert, err, message, data } = await rooms.create(
            bodyData
          );
          res.status(status).json({ alert, status, err, message, data });
        }
      );
    } catch (err) {
      console.error("Error in Server:", err);
      res
        .status(500)
        .json({
          err: err.message,
          message: "Error in Server",
          alert: alerts.DANGER,
        });
    }
  },
};
