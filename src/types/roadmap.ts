// TypeScript interfaces for Learning Roadmap feature

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  completed?: boolean;
  files?: string[];
  commands?: string[];
  learningObjectives?: string[];
  prerequisites?: string[];
}

export interface RoadmapDay {
  day: number;
  title: string;
  description: string;
  tasks: RoadmapTask[];
  setupInstructions?: string;
  keyFiles?: string[];
  learningGoals?: string[];
}

export interface RoadmapProgress {
  _id?: string;
  userId: string;
  reportId: string;
  completedTasks: string[];
  currentDay: number;
  startedAt: Date;
  lastUpdatedAt: Date;
  notes?: { [taskId: string]: string };
}

export interface EnhancedRoadmap {
  days: RoadmapDay[];
  totalDays: number;
  estimatedTotalTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Made with Bob
