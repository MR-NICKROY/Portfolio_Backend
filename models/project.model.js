import mongoose from "mongoose";

// Backend/models/user.model.js
const ProjectSchema = mongoose.Schema(
  {
    ProjectName: { type: String, required: true },
    Image: { type: String, required: true },
    ProjectUrl: { type: String, default: "" },
    DownloadLink: { type: String, default: "" },
    Password: { type: String, required: true },

    // Add this field
  },
  { timestamps: true }
);

const Project = mongoose.model("project", ProjectSchema);
export default Project;
