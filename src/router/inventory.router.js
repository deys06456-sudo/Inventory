const express = require("express");
const router = express.Router();

const inventoryController = require("../controller/inventory.controller");
const upload = require("../utils/multer");

// CREATE INVENTORY + IMAGE
router.post(
    "/inventory/create",
    upload.single("image"),
    inventoryController.createInventory
);

// GET ALL INVENTORY
router.get(
    "/inventory/get",
    inventoryController.getInventories
);

// GET SINGLE INVENTORY
router.get(
    "/inventory/:id",
    inventoryController.getSingleInventory
);

// UPDATE INVENTORY + IMAGE
router.put(
    "/inventory/update/:id",
    upload.single("image"),
    inventoryController.updateInventory
);

// DELETE INVENTORY
router.delete(
    "/inventory/delete/:id",
    inventoryController.deleteInventory
);

module.exports = router;