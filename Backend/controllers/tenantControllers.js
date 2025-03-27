const Property = require("../model/propertyModel");
const Tenant = require("../model/tenantModel");


const getAllTenant = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }

        const userId = req.user.id;

        // Step 1: Get all properties owned by the user
        const userProperties = await Property.find({ user_id: userId }).select("_id");

        // if (!userProperties || userProperties.length === 0) {
        //     return res.status(404).json({ message: "No properties found for this user." });
        // }

        const propertyIds = userProperties.map((property) => property._id); // Extract property IDs

        // Step 2: Fetch tenants whose property_id matches user's properties
        const tenants = await Tenant.find({ property_id: { $in: propertyIds } }).populate("property_id");

        // if (!tenants || tenants.length === 0) {
        //     return res.status(404).json({ message: "No tenants allocated for this user's properties." });
        // }

        return res.status(200).json(tenants);
    } catch (error) {
        console.error("Error fetching tenants:", error);
        return res.status(500).json({ message: `Error fetching tenants: ${error.message}` });
    }
};

const getTenant = async (req, res) => {
    const { propertyid } = req.params;
    try {
        const tenant = await Tenant.find({ property_id: propertyid }).populate("property_id");
        if (tenant.length === 0)
            return res.status(404).json({ message: `No tenant is allocated in this property right now` });

        return res.status(200).json(tenant);
    } catch (error) {
        return res.status(500).json({ message: `Error in get tenant: ${error.message}` });
    }
}

const createTenant = async (req, res) => {
    try {
        const { propertyid } = req.params;
        const property = await Property.find({ _id: propertyid });
        if (!property)
            return res.status(401).json({ message: `Property not found` });

        const { name, email, phoneNo, govermentID, govermentIDNumber, leaseStartDate } = req.body;

        if (!name || !email || !phoneNo || !govermentID || !govermentIDNumber || !leaseStartDate)
            return res.status(400).json({ message: `Please fill all the required fields` });

        const tenant = await Tenant.create({
            name,
            email,
            phoneNo,
            govermentID,
            govermentIDNumber,
            leaseStartDate,
            property_id: propertyid
        })

        return res.status(201)
            .json({ message: `New tenant is created successfully for this property`, tenant });

    } catch (error) {
        return res.status(500).json({ message: `Error in create tenant: ${error.message}` });
    }
}

const getSingleTenant = async (req, res) => {
    const { id } = req.params;
    try {
        const tenant = await Tenant.findOne({ _id: id });
        if (!tenant)
            return res.status(401).json({ message: `Tenant not avaiable` });

        return res.status(202).json(tenant);
    } catch (error) {
        return res.status(500)
            .json({ message: `Error from get single tenant: ${error.message}` });
    }
}

const updateTenent = async (req, res) => {
    const { id } = req.params;
    try {
        const tenant = await Tenant.findByIdAndUpdate
            ({ _id: id }, req.body, { new: true });

        if (!tenant)
            return res.status(401).json({ message: `Tenant not found or can't be updated` });

        return res.status(202).json({ message: `Tenant Updated successfully`, tenant });
    } catch (error) {
        return res.status(500).json({ message: `Error from updated tenant: ${error.message}` });
    }
}

const deleteTenant = async (req, res) => {
    const { id } = req.params;
    try {
        const tenant = await Tenant.findOneAndDelete({ _id: id });
        if (!tenant)
            return res.status(401).json({ message: `Tenant not found` });

        return res.status(202).json({ message: `Tenent ${id} delete successfully.` });
    } catch (error) {
        return res.status(500).json({ message: `Error from delete tenant: ${error.message}` });
    }
}

module.exports = { getAllTenant, getTenant, createTenant, getSingleTenant, updateTenent, deleteTenant };
