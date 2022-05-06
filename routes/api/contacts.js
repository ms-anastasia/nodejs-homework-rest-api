const express = require("express");
const { NotFound } = require("http-errors");

const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsScheme, joiStatusSchema } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsScheme), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsScheme), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(joiStatusSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
