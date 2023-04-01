// remove media from room and db
const fs = require("fs");
const rooms = require("../../../../libs/rooms");
const cloudinary = require("../../../../config/cloudinary");
const alerts = require("../../../../constants/alerts");

module.exports = async ({ roomId, cloud, mediaPath, mediaType }) => {
  // search room for the mediaId then remove it if it exist
  // Using fs.stat to check if the file exist before deleting
  console.log("here1");
  console.log("delete", cloud, mediaPath);
  if (mediaPath)
    fs.stat(mediaPath, (fsStats_err, stats) => {
      console.log("here2");
      if (fsStats_err) {
        console.error("fsStats_err:", fsStats_err);
        try {
          throw {
            message: "Check to see if the file stil exist",
            err: "Could not delete this media!",
            status: 400,
            alert: alerts.DANGER,
            data: null,
          };
        } catch (err) {
          console.error("error in fs stat", err);
        }
      }
      // Using fs to also delete the book file
      else
        fs.unlink(mediaPath, (unlink_err) => {
          console.log("here3");

          if (unlink_err) {
            console.error("unlink_err:", unlink_err);
            try {
              throw {
                message: "Check to see if the file stil exist",
                err: "Could not delete this media!",
                status: 400,
                alert: alerts.DANGER,
                data: null,
              };
            } catch (err) {
              console.error("error in fs stat", err);
            }
          } else console.log("============= Deleted ==============");
        });
    });
  console.log("here4");

  if (cloud)
    cloudinary.uploader.destroy(
      cloud.public_id,
      { resource_type: mediaType.substr(0, mediaType.length - 1) },
      function (err, result) {
        console.log("here5");
        if (err) {
          console.error("cloud delete err:", err);
        } else if (result) {
          console.log("deleteCloud", result);
        } else {
          console.log("Check the cloud delete");
        }
      }
    );

  console.log("here6");

  // remove the media form the room
  if (mediaPath && roomId && mediaType) {
    const updatedRoom = await rooms.update({
      itemToupdateId: { _id: roomId },
      propertyToUpdate: mediaType,
      optionsToUse: "$pull",
      updateValue: { path: mediaPath },
    });

    console.log("here7");

    if (updatedRoom.err)
      return {
        status: 501,
        err: "Failed to remove media from room",
        message: "Refresh and try again",
        alert: alerts.DANGER,
        data: null,
      };

    return {
      message: "Media deleted successfully",
      err: null,
      status: 200,
      alert: "success",
      data: true,
    };
  } else return {
      status: 401,
      err: `Invalid parameters expected deleteMedia({ roomId, cloud, mediaPath, mediaType }) instead got deleteMedia({${roomId}, ${cloud?.public_id}, ${mediaPath}, ${mediaType}}) `,
      message: "Refresh and try again",
      alert: alerts.DANGER,
      data: null,
    };
};
