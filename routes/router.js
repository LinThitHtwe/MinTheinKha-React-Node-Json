const express = require("express");
const router = express.Router();
const myController = require("../controllers/myController");

router.get("/questions", myController.show_all_questions);
router.get("/numbers", myController.show_all_numbers);
router.post("/answer/", myController.show_answer);
module.exports = router;
