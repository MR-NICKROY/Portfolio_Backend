import express from "express";
import { getProjects, addProject } from "../controller/project.controller.js";

const router = express.Router();

// POST route for adding project data
router.post("/add_data", addProject);

// GET route for fetching all project data
router.get("/get_data", getProjects);

export default router;
