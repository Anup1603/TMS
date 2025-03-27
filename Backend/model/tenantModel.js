const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Full name is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },

    phoneNo: {
        type: String,
        required: [true, "Phone Number is required"],
    },

    govermentID: {
        type: String,
        enum: {
            values: ["Aadhar", "PAN card", "Passport", "Green card", "Driving License", "Property Document", "Voter ID"],
            message: '{VALUE} is not a valid government ID type',
        },

        required: [true, "Government ID is required"],
    },

    govermentIDNumber: {
        type: String,
        required: [true, "Government ID number is required"],
        unique: true,
    },

    leaseStartDate: {
        type: Date,
        required: [true, "Lease start date is required"],
    },

    leaseEndDate: {
        type: Date,
        default: Date.now,
    },

    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },

}, { timestamps: true });

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
