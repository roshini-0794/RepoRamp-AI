import mongoose from "mongoose";

const onboardingReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repoUrl: { type: String, required: true },
  repoName: { type: String, required: true },
  owner: { type: String, required: true },
  overview: { type: String, required: true },
  techStack: [String],
  folderStructure: mongoose.Schema.Types.Mixed,
  entryPoints: [{ file: String, description: String }],
  onboardingGuide: { type: String, required: true }, // Markdown
  roadmap: [{ day: Number, task: String, description: String }],
  importantFiles: [{ file: String, reason: String, importance: String }],
  risks: [{ area: String, description: String, severity: String }],
  complexityScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const OnboardingReport = mongoose.model("OnboardingReport", onboardingReportSchema);
