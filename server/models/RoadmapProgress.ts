import mongoose from "mongoose";

const roadmapProgressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  reportId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "OnboardingReport", 
    required: true 
  },
  completedTasks: [{ 
    type: String, 
    default: [] 
  }],
  currentDay: { 
    type: Number, 
    default: 1 
  },
  startedAt: { 
    type: Date, 
    default: Date.now 
  },
  lastUpdatedAt: { 
    type: Date, 
    default: Date.now 
  },
  notes: {
    type: Map,
    of: String,
    default: {}
  }
});

// Compound index to ensure one progress per user per report
roadmapProgressSchema.index({ userId: 1, reportId: 1 }, { unique: true });

// Update lastUpdatedAt on save
roadmapProgressSchema.pre("save", function (next) {
  this.lastUpdatedAt = new Date();
  next();
});

export const RoadmapProgress = mongoose.model("RoadmapProgress", roadmapProgressSchema);

// Made with Bob
