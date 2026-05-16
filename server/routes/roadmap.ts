import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { RoadmapProgress } from "../models/RoadmapProgress";
import { OnboardingReport } from "../models/Report";

const router = express.Router();

// Get progress for a specific report
router.get("/progress/:reportId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user?.id;

    // Verify user owns the report
    const report = await OnboardingReport.findOne({ _id: reportId, userId });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Find or create progress
    let progress = await RoadmapProgress.findOne({ userId, reportId });
    
    if (!progress) {
      progress = new RoadmapProgress({
        userId,
        reportId,
        completedTasks: [],
        currentDay: 1,
        notes: {}
      });
      await progress.save();
    }

    res.json(progress);
  } catch (error: any) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: error.message });
  }
});

// Initialize or reset progress
router.post("/progress/:reportId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user?.id;

    // Verify user owns the report
    const report = await OnboardingReport.findOne({ _id: reportId, userId });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Create or reset progress
    let progress = await RoadmapProgress.findOne({ userId, reportId });
    
    if (progress) {
      progress.completedTasks = [];
      progress.currentDay = 1;
      progress.notes = new Map();
      progress.startedAt = new Date();
    } else {
      progress = new RoadmapProgress({
        userId,
        reportId,
        completedTasks: [],
        currentDay: 1,
        notes: {}
      });
    }

    await progress.save();
    res.status(201).json(progress);
  } catch (error: any) {
    console.error("Error initializing progress:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update task completion status
router.patch("/progress/:reportId/task/:taskId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { reportId, taskId } = req.params;
    const { completed } = req.body;
    const userId = req.user?.id;

    // Verify user owns the report
    const report = await OnboardingReport.findOne({ _id: reportId, userId });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    let progress = await RoadmapProgress.findOne({ userId, reportId });
    
    if (!progress) {
      progress = new RoadmapProgress({
        userId,
        reportId,
        completedTasks: [],
        currentDay: 1,
        notes: {}
      });
    }

    if (completed) {
      // Add task to completed list if not already there
      if (!progress.completedTasks.includes(taskId)) {
        progress.completedTasks.push(taskId);
      }
    } else {
      // Remove task from completed list
      progress.completedTasks = progress.completedTasks.filter(id => id !== taskId);
    }

    // Update current day based on completed tasks
    // This is a simple calculation - you can make it more sophisticated
    const totalTasks = report.roadmap?.length || 0;
    if (totalTasks > 0) {
      progress.currentDay = Math.min(
        Math.floor((progress.completedTasks.length / totalTasks) * 7) + 1,
        7
      );
    }

    await progress.save();
    res.json(progress);
  } catch (error: any) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: error.message });
  }
});

// Add or update notes for a task
router.post("/progress/:reportId/notes", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { reportId } = req.params;
    const { taskId, note } = req.body;
    const userId = req.user?.id;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Verify user owns the report
    const report = await OnboardingReport.findOne({ _id: reportId, userId });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    let progress = await RoadmapProgress.findOne({ userId, reportId });
    
    if (!progress) {
      progress = new RoadmapProgress({
        userId,
        reportId,
        completedTasks: [],
        currentDay: 1,
        notes: {}
      });
    }

    // Update notes
    if (!progress.notes) {
      progress.notes = new Map();
    }
    progress.notes.set(taskId, note);

    await progress.save();
    res.json(progress);
  } catch (error: any) {
    console.error("Error saving note:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all progress for a user (for manager/CTO dashboards)
router.get("/progress", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?.id;
    const progress = await RoadmapProgress.find({ userId })
      .populate('reportId')
      .sort({ lastUpdatedAt: -1 });
    
    res.json(progress);
  } catch (error: any) {
    console.error("Error fetching all progress:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete progress (reset)
router.delete("/progress/:reportId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { reportId } = req.params;
    const userId = req.user?.id;

    await RoadmapProgress.deleteOne({ userId, reportId });
    res.json({ message: "Progress reset successfully" });
  } catch (error: any) {
    console.error("Error deleting progress:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;

// Made with Bob
