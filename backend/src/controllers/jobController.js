import Job from "../models/job.model.js";
import { success, error } from "../utils/response.js";
import mongoose from "mongoose";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    success(res, job, "Job created");
  } catch (err) {
    error(res, err.message);
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");
    success(res, jobs);
  } catch (err) {
    error(res, err.message);
  }
};

export const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return error(res, "Invalid Job ID", 400);
    }

    const job = await Job.findById(id).populate("postedBy");
    if (!job) return error(res, "Job not found", 404);

    success(res, job);
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    error(res, err.message, 500);
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return error(res, "Job not found", 404);

    success(res, job, "Updated");
  } catch (err) {
    error(res, err.message);
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return error(res, "Job not found", 404);

    success(res, job, "Deleted");
  } catch (err) {
    error(res, err.message);
  }
};
