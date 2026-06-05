const authModel = require('../Models/authModel');
const getToken = require('../Services/authService');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        userData.password = hashedPassword;
        const addUser = await authModel.create(userData);
        
        res.send({
            status: 200,
            message: "User registered",
            data: addUser
        });
    } catch (error) {
        res.send({ status: 500, message: "Registration failed", error: error.message });
    }
};

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authModel.findOne({ email }); // Password select karna zaroori hai check ke liye

        if (!user) {
            return res.send({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({ message: "Invalid Password" });
        }

        const token = getToken(user);
        res.send({
            status: "true",
            message: "Login Successful",
            token,
            role: user.role
        });
    } catch (error) {
        res.send({
            status: "false",
            message: "Login Failed",
            error: error.message
        });
    }
};

const viewUsers = async (req, res) => {
    try {
        const users = await authModel.find();
        res.send({ status: 200, message: "User List", data: users });
    } catch (error) {
        res.send({ status: 500, message: "Error while fetching users", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await authModel.deleteOne({ _id: req.params.id });
        res.send({ status: 200, message: "User deleted" });
    } catch (error) {
        res.send({ status: 500, message: "Error while deleting user", error: error.message });
    }
};

const updStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatus = ["active", "blocked"];

        if (!allowedStatus.includes(status)) {
            return res.send({ status: "error", message: "Invalid status value" });
        }

        await authModel.updateOne({ _id: id }, { status });
        res.send({ status: "success", message: "User status updated successfully" });
    } catch (error) {
        res.send({ status: "error", message: "Error while updating status" });
    }
};

module.exports = { registerUser, authUser, viewUsers, deleteUser, updStatus };