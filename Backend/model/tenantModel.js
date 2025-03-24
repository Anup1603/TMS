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

    phone_no: {
        type: String,
        required: [true, "Phone Number is required"],
    },

    gov_id: {
        type: String,
        enum: {
            values: ["Aadhar", "PAN card", "Passport", "Green card", "Driving License", "Property Document"],
            message: '{VALUE} is not a valid government ID type',
        },

        required: [true, "Government ID is required"],
    },

    lease_start_date: {
        type: Date,
        required: [true, "Lease start date is required"],
    },

    lease_end_date: {
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
