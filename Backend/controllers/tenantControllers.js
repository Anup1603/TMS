const Property = require("../model/propertyModel");
const Tenant = require("../model/tenantModel");


const getTenant = async (req, res) => {
    const { propertyid } = req.params;
    try {
        const tenant = await Tenant.find({ property: propertyid }).populate("property");
        if (tenant.length === 0)
            return res.status(404).json({ message: `No tenant found in this property` });

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

        const { name, email, phone_no, gov_id, lease_start_date, lease_end_date } = req.body;

        if (!name || !email || !phone_no || !gov_id || !lease_start_date)
            return res.status(400).json({ message: `Please fill all the required fields` });

        const tenant = await Tenant.create({
            name,
            email,
            phone_no,
            gov_id,
            lease_start_date,
            lease_end_date,
            property: propertyid
        })

        return res.status(201)
            .json({ message: `New tenant is created successfully for this property`, tenant });

    } catch (error) {
        return res.status(500).json({ message: `Error in create tenant: ${error.message}` });
    }
}

const getSingleTenant = async (req, res) => {
    const { propertyid, id } = req.params;
    try {
        const tenant = await Tenant.findOne({ property: propertyid, _id: id });
        if (!tenant)
            return res.status(401).json({ message: `Tenant not avaiable` });

        return res.status(202).json(tenant);
    } catch (error) {
        return res.status(500)
            .json({ message: `Error from get single tenant: ${error.message}` });
    }
}

const updateTenent = async (req, res) => {
    const { propertyid, id } = req.params;
    try {
        const tenant = await Tenant.findByIdAndUpdate
            ({ property: propertyid, _id: id }, req.body, { new: true });

        if (!tenant)
            return res.status(401).json({ message: `Tenant not found or can't be updated` });

        return res.status(202).json({ message: `Tenant Updated successfully`, tenant });
    } catch (error) {
        return res.status(500).json({ message: `Error from updated tenant: ${error.message}` });
    }
}

const deleteTenant = async (req, res) => {
    const { propertyid, id } = req.params;
    try {
        const tenant = await Tenant.findOneAndDelete({ property: propertyid, _id: id });
        if (!tenant)
            return res.status(401).json({ message: `Tenant not found` });

        return res.status(202).json({ message: `Tenent ${id} delete successfully.` });
    } catch (error) {
        return res.status(500).json({ message: `Error from delete tenant: ${error.message}` });
    }
}

module.exports = { getTenant, createTenant, getSingleTenant, updateTenent, deleteTenant };
