import Project from "./../models/project.model.js";
import dotenv from "dotenv"; // Import dotenv to use environment variables

dotenv.config(); // Load environment variables

// Controller to get ProjectName, Image, and DownloadLink
export const getProjects = async (req, res) => {
  try {
    // Fetch only the required fields from the database
    const projects = await Project.find({});
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch projects", error });
  }
};

// Controller to add ProjectName, Image, and DownloadLink
export const addProject = async (req, res) => {
  const { ProjectName, Image, ProjectUrl, DownloadLink, Password } = req.body;

  // Check if the password is valid
  if (Password !== process.env.PASSWORD) {
    return res
      .status(401)
      .json({ success: false, message: "Only Host can access" });
  }

  try {
    // Create a new project
    const newProject = new Project({
      ProjectName,
      Image,
      DownloadLink,
      ProjectUrl,
      Password,
    });
    await newProject.save(); // Save to MongoDB

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add project", error });
  }
};
