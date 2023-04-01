// handle deleting of rooms

const rooms = require("../../../../libs/rooms");
const doDeleteMedia = require("./doDeleteMedia");

module.exports = async ({ roomId }) => {
	const theRoom = await (await rooms.findById(roomId)).data;
	if (!theRoom) return { status: 404, err: "Room not found", message: "Refresh and try again", alert: "danger" };

	// remove the media first
	theRoom.images.forEach( async image => {
		const removeImage = await doDeleteMedia({ roomId: theRoom._id, mediaPath: image.path, mediaType: "images" });
		if(removeImage.err) console.log("removeMedia", removeImage);
	});

	// remove the media first
	theRoom.videos.forEach( async video => {
		const removeVideo = await doDeleteMedia({ roomId: theRoom._id, mediaPath: video.path, mediaType: "videos" });
		if(removeVideo.err) console.log("removeMedia", removeVideo);
	});

	// then delete the room if media is successful
	const deleteRoom = await rooms.remove(theRoom._id);
	if(!deleteRoom) return { status: 500, err: "Failed to delete room", message: "Refresh and try again", alert: "danger" };
	else return { status: 200, err: null, message: "Successfully deleted room", alert: "success" };
}