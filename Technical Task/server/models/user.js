const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "error"],
        },

        password: {
            type: String,
            required: [true, "error"],
            select: false,
        },

        email: {
            type: String,
            required: [true, "error"],
            unique: [true, "error"],
            match: [
                /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },

        tokens: {
            type: [
                {
                    type: String,
                },
            ],
            select: false,
            default: []
        },
    },
    { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
