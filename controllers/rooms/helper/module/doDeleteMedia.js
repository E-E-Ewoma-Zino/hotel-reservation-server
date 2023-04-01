// remove media from room and db
const fs = require("fs");
const rooms = require("../../../../libs/rooms");

module.exports = async ({ roomId, mediaPath, mediaType }) => {
	// search room for the mediaId then remove it if it exist 
	// Using fs.stat to check if the file exist before deleting
	fs.stat(mediaPath, (fsStats_err, stats) => {
		if (fsStats_err) {
			console.error("fsStats_err:", fsStats_err);
			try {
				throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger", data: null };
			} catch (err) {
				console.log("The Error:", err);
			}
		}
		// Using fs to also delete the book file
		else fs.unlink(mediaPath, (unlink_err) => {
			if (unlink_err) {
				console.error("unlink_err:", unlink_err);
				try {
					throw { message: "Check to see if the file stil exist", err: "Could not delete this media!", status: 400, alert: "danger", data: null };
				} catch (err) {
					console.log("The Error:", err);
				}
			}
			console.log("============= Deleted ==============");
		});
	});

	// remove the media form the room
	const updatedRoom = await rooms.update({
		itemToupdateId: { _id: roomId },
		propertyToUpdate: mediaType,
		optionsToUse: "$pull",
		updateValue: { path: mediaPath }
	})
	if(updatedRoom.err) return { status: 501, err: "Failed to remove media from room", message: "Refresh and try again", alert: "danger", data: null };

	return { message: "Media deleted successfully", err: null, status: 200, alert: "success", data: true };
}