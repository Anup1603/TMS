const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: [true, "Property Name is required"],
        trim: true,
    },

    flatNo: {
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

    rentAmount: {
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


    image: {
        type: String,
        // required: true,
        default:
            "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=600",
    },

    propertyOwner: {
        type: String,
        required: [true, "Property owner is required"],
        trim: true,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
