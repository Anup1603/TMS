const generateToken = require("../utils/generateToken");
const User = require("../model/userModel")

const getAllUser = async (req, res) => {
    const allUserData = await User.find();
    return res.status(200).json(allUserData);
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(409).json({ message: "User already exists" })
        };

        const newUser = await User.create({ name, email, password });

        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            token: generateToken(newUser._id)
        })

    }
    catch (error) {
        return res.status(500).json({ message: `Somethings went wrong : ${error.message}` })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid user, Register first" })

        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: generateToken(user._id)
            })
        }
        else {
            return res.status(401).json({ message: "Invalid password" });
        }

    } catch (error) {
        return res.status(500).json({ message: `Error in Login: ${error.message}` })
    }
}

const singleUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById({ _id: id });
        if (!user)
            return res.status(401).json({ message: `User does't exist` });

        return res.status(202).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Error from single user: ${error.message}` })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!user)
            return res.status(401).json({ message: `User does't exist` });

        return res.status(202).json({ message: `Updated successfully ${id}`, user });

    } catch (error) {
        return res.status(500).json({ message: `Error in Update user: ${error.message}` })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete({ _id: id });
        if (!user)
            return res.status(401).json({ message: `User does't exist` });

        return res.status(202).json({ message: `Delete ${id} successfull` });
    } catch (error) {
        return res.status(500).json({ message: `Error Delete user: ${error.message}` })
    }
}

module.exports = { getAllUser, registerUser, loginUser, singleUser, updateUser, deleteUser }
