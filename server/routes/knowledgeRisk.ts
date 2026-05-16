import express from "express";
import { KnowledgeRisk } from "../models/KnowledgeRisk";
import { OnboardingReport } from "../models/Report";
import { analyzeBusFactor } from "../services/knowledgeRiskService";
import { fetchRepoInfo } from "../services/githubService";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

// Generate knowledge risk analysis for a report
router.post("/analyze/:reportId", authMiddleware, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = (req as any).user.id;

    // Get the existing report
    const report = await OnboardingReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Check if analysis already exists
    let existingAnalysis = await KnowledgeRisk.findOne({ reportId });
    if (existingAnalysis) {
      return res.json(existingAnalysis);
    }

    // Get fresh repo info
    const repoInfo = await fetchRepoInfo(report.repoUrl);

    // Perform AI analysis
    const analysisData = await analyzeBusFactor(repoInfo, report);

    // Save to database
    const knowledgeRisk = new KnowledgeRisk({
      reportId,
      userId,
      repoUrl: report.repoUrl,
      ...analysisData
    });

    await knowledgeRisk.save();

    res.json(knowledgeRisk);
  } catch (error: any) {
    console.error("Knowledge risk analysis error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze knowledge risk" });
  }
});

// Get knowledge risk analysis by report ID
router.get("/report/:reportId", authMiddleware, async (req, res) => {
  try {
    const { reportId } = req.params;

    const analysis = await KnowledgeRisk.findOne({ reportId });
    if (!analysis) {
      return res.status(404).json({ error: "Knowledge risk analysis not found" });
    }

    res.json(analysis);
  } catch (error: any) {
    console.error("Error fetching knowledge risk:", error);
    res.status(500).json({ error: error.message || "Failed to fetch knowledge risk" });
  }
});

// Get all knowledge risk analyses for a user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const analyses = await KnowledgeRisk.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(analyses);
  } catch (error: any) {
    console.error("Error fetching user knowledge risks:", error);
    res.status(500).json({ error: error.message || "Failed to fetch knowledge risks" });
  }
});

// Refresh/regenerate knowledge risk analysis
router.put("/refresh/:reportId", authMiddleware, async (req, res) => {
  try {
    const { reportId } = req.params;
    const userId = (req as any).user.id;

    const report = await OnboardingReport.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Get fresh repo info
    const repoInfo = await fetchRepoInfo(report.repoUrl);

    // Perform new AI analysis
    const analysisData = await analyzeBusFactor(repoInfo, report);

    // Update or create
    const knowledgeRisk = await KnowledgeRisk.findOneAndUpdate(
      { reportId },
      {
        ...analysisData,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    res.json(knowledgeRisk);
  } catch (error: any) {
    console.error("Knowledge risk refresh error:", error);
    res.status(500).json({ error: error.message || "Failed to refresh knowledge risk" });
  }
});

// Delete knowledge risk analysis
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await KnowledgeRisk.findByIdAndDelete(id);
    res.json({ message: "Knowledge risk analysis deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting knowledge risk:", error);
    res.status(500).json({ error: error.message || "Failed to delete knowledge risk" });
  }
});

export default router;

// Made with Bob
