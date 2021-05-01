const express = require("express");
const router = express.Router();
const detailsController = require("../controllers/details.controller");


router.post("/details", detailsController.create);

router.get("/details", detailsController.readAllDetails);

router.get("/details/:id", detailsController.readOne);

router.patch("/details/:id", detailsController.update);

router.delete("/details/:id", detailsController.delete);

module.exports = router;