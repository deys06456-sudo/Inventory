const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true
        },

        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        supplier: {
            type: String,
            required: true
        },

        purchasePrice: {
            type: Number,
            required: true
        },

        sellingPrice: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        minimumStock: {
            type: Number,
            required: true,
            min: 0
        },

        image: {
            type: String,
            default: ""
        },

        warehouseLocation: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Inventory", inventorySchema);



































