const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: [true, "project name is required"],
        },

        description: {
            type: String,
            required: [true, "description is required"],
        },

        liveUrl: {
            type: String,
        },
        gitHubLink: {
            type: String,
        },
        uploadImage: {
            type: String,
            required: [true, 'project image is required']
        },
        status: {
            type: String,
            required: [true, "status is required"],
            enum: ["pending", "archived", "completed"],
            default: "pending",
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

    },
    { timestamps: true }
);

const User = new mongoose.model("Project", ProjectSchema);

module.exports = User;
