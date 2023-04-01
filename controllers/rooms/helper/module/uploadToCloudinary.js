const cloudinary = require("../../../../config/cloudinary");

exports.uploadToCloudinary = function (pathToLocalMedia, callback) {
	const result = [];

	pathToLocalMedia.forEach(async (media, index, arr) => {
		try {
			const res = await cloudinary.uploader.upload(media.path, {
				use_filename: true,
				unique_filename: true,
				overwrite: true,
				resource_type: media.fieldname === "images"? "image": "video",
				upload_preset: media.fieldname === "images"? "roomsImage": "roomsVideo"
			});

			result.push(res);
		} catch (error) {
			console.error("cloudinary Error", error);
			result.push(null);
		}
		if (index >= arr.length - 1) {
			console.log("done");
			callback(result);
		}
	});
}