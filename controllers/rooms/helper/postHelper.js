const rooms = require("../../../libs/rooms");
const alerts = require("../../../constants/alerts");
const { uploadToCloudinary } = require("./module/uploadToCloudinary");

module.exports = {
  async createRoom(req, res) {
    const bodyData = {
      ...req.body,
      images: req.files.images,
      videos: req.files.videos,
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
          while (count <= bodyData.images.length - 1) {
            bodyData.images[count].cloud = result[count];
            count++;
          }
          while (
            count - (bodyData.images.length) <=
            bodyData.videos.length - 1
          ) {
            bodyData.videos[count - (bodyData.images.length)].cloud = result[count];
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
        .json({ err: err.message, message: "Error in Server", alert: alerts.DANGER });
    }
  },
};
