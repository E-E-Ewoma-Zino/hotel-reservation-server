// update 
const alerts = require("../../../../constants/alerts");
const rooms = require("../../../../libs/rooms")

module.exports = async (roomData) => {
	// trun the features to an array
	const { roomId } = roomData;

	roomData.features = roomData.features.split(',');

	// update the room base on each data in the roomData obj
	for (const key in roomData) {
		if (Object.hasOwnProperty.call(roomData, key)) {
			const data = roomData[key];

			if(data === undefined || data === null) continue;

			const updateRoom = await rooms.update({
				itemToupdateId: { _id: roomId },
				optionsToUse: key === "images" || key === "videos"? "$push": "$set",
				propertyToUpdate: key,
				updateValue: data
			});

			if(updateRoom.err) return updateRoom;
		}
	}

	return { status: 200, alert: alerts.SUCCESS, message: "Room Updated", err: null, data: true };
}