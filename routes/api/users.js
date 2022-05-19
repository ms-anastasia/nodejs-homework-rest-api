const express = require("express");

const { validation, auth, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { verifyEmailSchema } = require("../../models/user");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.post("/verify", validation(verifyEmailSchema), ctrlWrapper(ctrl.resendEmail));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
