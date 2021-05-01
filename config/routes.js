const express = require("express");
const router = express.Router();
const detailsController = require("../controllers/details.controller");


router.get("/details", detailsController.readAllDetails);
router.get("/details/:id", detailsController.readOne);
router.post("/details", detailsController.create);
router.patch("/details/:id", detailsController.update);
router.delete("/details/:id", detailsController.delete);

module.exports = router;