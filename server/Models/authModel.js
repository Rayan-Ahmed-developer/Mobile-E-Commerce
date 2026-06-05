const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
     
    },
    status: {
        type: String,
        enum: ["Active", "Blocked"],
        default: "Active"
    },
    role: {
        type: String,    
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

const authModel = mongoose.model("userData", authSchema);
module.exports = authModel;