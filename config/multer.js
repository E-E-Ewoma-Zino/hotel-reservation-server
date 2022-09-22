const bird = require("../utils/messageBird");
const multer = require("multer");
const path = require("path");

// @desc	configure multer
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, callback) => {
		callback(null, file.fieldname + "-" + file.originalname + "-" + Date.now() + path.extname(file.originalname));
	}
});

module.exports = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.fieldname === "images") {
			if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "image/webp") {
				return cb(null, true);
			} else {
				console.log("Multer err", file);
				return {
					err: "You can only upload .png, .jpg, .gif and .jpeg files!",
					message: "Please re-upload the file",
					status: 403,
					alert: "danger"
				}

			}
		}
		else if (file.fieldname === "videos") {
			if (file.mimetype == "video/x-m4v" || file.mimetype == "video/mp4" || file.mimetype == "video/x-mp4" || file.mimetype == "video/x-mkv" || file.mimetype == "video/mkv" || file.mimetype == "video/x-matroska" || file.mimetype == "video/webm" || file.mimetype == "video/ogg") {
				cb(null, true);
			} else {
				console.log("Multer err", file);
				return {
					err: "You can only upload .mp4, .mkv, .m4v files!",
					message: "Please re-upload the file. You can't uploaded" + file.mimetype,
					status: 403,
					alert: "danger"
				}
			}
		}
		else {
			console.log("Multer err", file);
			return {
				err: "file path image not found",
				message: "ncorrect path to image. Please re-upload the file",
				status: 402,
				alert: "danger"
			}
		}
	}
});