const express = require("express");
const controller = require("../controller/noteController");
const router = express.Router();

router.post("/create", controller.createNotes);
router.get("/get/all", controller.getNotes);
router.get("/get/:id", controller.getNotesById);
router.patch("/update/:id", controller.updateNotes);

module.exports = router;
