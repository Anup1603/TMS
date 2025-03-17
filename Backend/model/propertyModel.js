const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    property_name: {
        type: String,
        required: [true, "Property Name is required"],
        trim: true,
    },

    flat_no: {
        type: String,
        required: [true, "Flat number is required"],
        trim: true,
    },

    bhk: {
        type: String,
        required: [true, "BHK is required"],
        trim: true,
    },

    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ['Available', 'Occupied'],
        default: 'Available',
    },

    rent: {
        type: Number,
        required: [true, "Rent amount is required"],
        min: [0, "Rent must be a positive number"],
    },


    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },

    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },

    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
    },


    pic: {
        type: String,
        // required: true,
        default:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSSzYyHasXOWKgS7naaJ36bn3kNiNziusDA&s",
    },

    property_owner: {
        type: String,
        required: [true, "Property owner is required"],
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
