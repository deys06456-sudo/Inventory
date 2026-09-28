const Inventory = require("../models/inventory.model");

class InventoryController {

    // CREATE INVENTORY WITH IMAGE
    async createInventory(req, res) {
        try {

            const { itemName, sku, description, category, supplier, purchasePrice, sellingPrice, quantity, minimumStock, warehouseLocation, status } = req.body;

            // Required fields
            if ( !itemName || !sku || !description || !category || !supplier || purchasePrice === undefined || sellingPrice === undefined || quantity === undefined || minimumStock === undefined || !warehouseLocation || !status) 
                {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }

            // Image required
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Inventory image is required"
                });
            }

            // Create Inventory
            const inventoryData = new Inventory({ itemName, sku, description, category, supplier, purchasePrice, sellingPrice, quantity, minimumStock,

                // Multer image
                image: req.file.filename,

                warehouseLocation,
                status
            });

            const data = await inventoryData.save();

            return res.status(201).json({
                success: true,
                message: "Inventory created successfully",
                data: data
            });

        } catch (error) {

            // Duplicate SKU
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "SKU already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // GET ALL INVENTORY
    async getInventories(req, res) {
        try {

            const inventories = await Inventory.find()
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                message: "Inventory fetched successfully",
                total: inventories.length,
                data: inventories
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // GET SINGLE INVENTORY
    async getSingleInventory(req, res) {
        try {

            const id = req.params.id;

            const inventory = await Inventory.findById(id);

            if (!inventory) {
                return res.status(404).json({
                    success: false,
                    message: "Inventory not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Inventory fetched successfully",
                data: inventory
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // UPDATE INVENTORY
        async updateInventory(req, res) {
        try {

            const id = req.params.id;


            const updateData = {
                ...req.body
            };


            // New image uploaded
            if (req.file) {
                updateData.image = req.file.filename;
            }


            const updateInventory =
                await Inventory.findByIdAndUpdate(
                    id,
                    updateData,
                    {
                        new: true,
                        runValidators: true
                    }
                );


            if (!updateInventory) {
                return res.status(404).json({
                    success: false,
                    message: "Inventory not found"
                });
            }


            return res.status(200).json({
                success: true,
                message: "Inventory updated successfully",
                data: updateInventory
            });


        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }



    // DELETE INVENTORY
    async deleteInventory(req, res) {
        try {

            const id = req.params.id;

            const deleteInventory =
                await Inventory.findByIdAndDelete(id);

            if (!deleteInventory) {
                return res.status(404).json({
                    success: false,
                    message: "Inventory not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Inventory deleted successfully"
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // SEARCH INVENTORY
    async searchInventory(req, res) {
        try {

            const { itemName } = req.query;

            const inventories = await Inventory.find({
                itemName: {
                    $regex: itemName,
                    $options: "i"
                }
            });

            return res.status(200).json({
                success: true,
                message: "Inventory search successfully",
                total: inventories.length,
                data: inventories
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    // FILTER BY CATEGORY
    async filterByCategory(req, res) {
        try {

            const { category } = req.query;

            const inventories = await Inventory.find({
                category: {
                    $regex: category,
                    $options: "i"
                }
            });

            return res.status(200).json({
                success: true,
                message: "Inventory filtered successfully",
                total: inventories.length,
                data: inventories
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new InventoryController();