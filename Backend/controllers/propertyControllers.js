const Property = require("../model/propertyModel");

const getProperty = async (req, res) => {
    const allProperty = await Property.find({ user_id: req.user._id })
    return res.status(200).json(allProperty);
};


const createProperty = async (req, res) => {
    const { propertyName, flatNo, bhk, status, rentAmount, address, city, state, propertyOwner }
        = req.body;

    try {
        if (!propertyName || !flatNo || !bhk || !status || !rentAmount || !address || !city || !state || !propertyOwner) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        const property = await Property.create({
            propertyName,
            flatNo,
            bhk,
            status,
            rentAmount,
            address,
            city,
            state,
            propertyOwner,
            user_id: req.user._id,
        });

        return res.status(201).json({
            message: "New property created successfully",
            property
        });

    } catch (error) {
        console.error(`Error in creating property: ${error.message}`);
        return res.status(500).json({
            message: `Error in creating property`,
            error: error.message
        });
    }
};


const getSingleProperty = async (req, res) => {
    const { id } = req.params;
    try {
        const property = await Property.findById({ _id: id });
        if (!property)
            return res.status(401).json({ message: `Property does't exists` });

        return res.status(202).json(property);
    } catch (error) {
        return res.status(500)
            .json({ message: `Error to get single property: ${error.message}` })
    }
};


const updateProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!property)
            return res.status(401).json({ message: `Property does't exist` });

        return res.status(202).json({ message: `Updated successfully: ${id}`, property });
    } catch (error) {
        return res.status(500).json({ message: `Error in Update property: ${error.message}` });
    }
};

const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findByIdAndDelete({ _id: id });
        if (!property)
            return res.state(401).json({ message: `Property does't exists` });

        return res.status(202).json({ message: `Delete property id ${id} successfull.` })
    } catch (error) {
        return res.status(500).json({ message: `Error from delete property: ${error.message}` })
    }
}

module.exports = { getProperty, createProperty, getSingleProperty, updateProperty, deleteProperty }
