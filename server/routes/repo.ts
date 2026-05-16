import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { fetchRepoInfo } from "../services/githubService";
import { analyzeRepo } from "../services/aiService";
import { OnboardingReport } from "../models/Report";

const router = express.Router();

router.post("/analyze", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { repoUrl } = req.body;
    if (!repoUrl) return res.status(400).json({ message: "Repository URL is required" });

    // Step 1: Fetch repo data from GitHub
    const repoInfo = await fetchRepoInfo(repoUrl);

    // Step 2: Analyze with Gemini AI
    const analysis = await analyzeRepo(repoInfo);

    // Defensive check for array fields
    const safeAnalysis = {
      ...analysis,
      techStack: Array.isArray(analysis.techStack) ? analysis.techStack : [],
      roadmap: Array.isArray(analysis.roadmap) ? analysis.roadmap : [],
      importantFiles: Array.isArray(analysis.importantFiles) ? analysis.importantFiles : [],
      risks: Array.isArray(analysis.risks) ? analysis.risks : [],
      entryPoints: Array.isArray(analysis.entryPoints) ? analysis.entryPoints : [],
    };

    // Step 3: Save to database
    const report = new OnboardingReport({
      userId: req.user?.id,
      repoUrl,
      repoName: repoInfo.repo,
      owner: repoInfo.owner,
      ...safeAnalysis
    });

    await report.save();

    res.status(201).json(report);
  } catch (error: any) {
    console.error("Analysis error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/reports", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const reports = await OnboardingReport.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/reports/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const report = await OnboardingReport.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
