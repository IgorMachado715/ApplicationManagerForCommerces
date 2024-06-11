const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");

router.get("/:id", clientsController.getClient);

router.delete("/:id", clientsController.deleteClient);

router.get("/:name?", clientsController.getClients);

router.patch("/:id", clientsController.updateClient);

router.post("/", clientsController.insertClient);

module.exports = router;
