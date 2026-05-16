import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  FileCode, 
  Target, 
  Terminal,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { RoadmapDay, RoadmapTask, RoadmapProgress } from '../types/roadmap';

interface LearningRoadmapProps {
  reportId: string;
  roadmapData: any[]; // Original roadmap from report
  role?: 'employee' | 'manager' | 'cto';
}

const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ reportId, roadmapData, role = 'employee' }) => {
  const { token } = useAuth();
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [progress, setProgress] = useState<RoadmapProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [taskNotes, setTaskNotes] = useState<{ [key: string]: string }>({});

  // Transform original roadmap data to enhanced structure
  const enhancedRoadmap: RoadmapDay[] = roadmapData.map((item, index) => ({
    day: item.day || index + 1,
    title: item.task || `Day ${index + 1}`,
    description: item.description || '',
    tasks: [
      {
        id: `day-${index + 1}-task-1`,
        title: item.task || `Main Task`,
        description: item.description || '',
        estimatedTime: '2-3 hours',
        files: [],
        completed: false
      }
    ],
    setupInstructions: '',
    keyFiles: [],
    learningGoals: []
  }));

  useEffect(() => {
    fetchProgress();
  }, [reportId]);

  const fetchProgress = async () => {
    try {
      const res = await axios.get(`/api/roadmap/progress/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProgress(res.data);
      setTaskNotes(res.data.notes || {});
    } catch (error) {
      console.log('No progress found, starting fresh');
      setProgress({
        userId: '',
        reportId,
        completedTasks: [],
        currentDay: 1,
        startedAt: new Date(),
        lastUpdatedAt: new Date(),
        notes: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day: number) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  const toggleTaskComplete = async (taskId: string) => {
    if (!progress) return;

    const isCompleted = progress.completedTasks.includes(taskId);
    const newCompletedTasks = isCompleted
      ? progress.completedTasks.filter(id => id !== taskId)
      : [...progress.completedTasks, taskId];

    const updatedProgress = {
      ...progress,
      completedTasks: newCompletedTasks,
      lastUpdatedAt: new Date()
    };

    setProgress(updatedProgress);

    try {
      await axios.patch(
        `/api/roadmap/progress/${reportId}/task/${taskId}`,
        { completed: !isCompleted },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Failed to update task:', error);
      setProgress(progress);
    }
  };

  const saveNote = async (taskId: string, note: string) => {
    setTaskNotes({ ...taskNotes, [taskId]: note });
    
    try {
      await axios.post(
        `/api/roadmap/progress/${reportId}/notes`,
        { taskId, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const calculateProgress = () => {
    if (!progress) return 0;
    const totalTasks = enhancedRoadmap.reduce((sum, day) => sum + day.tasks.length, 0);
    return totalTasks > 0 ? Math.round((progress.completedTasks.length / totalTasks) * 100) : 0;
  };

  const getCurrentDay = () => {
    if (!progress) return 1;
    const completedDays = enhancedRoadmap.filter(day => 
      day.tasks.every(task => progress.completedTasks.includes(task.id))
    ).length;
    return Math.min(completedDays + 1, enhancedRoadmap.length);
  };

  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-medium">Loading your learning roadmap...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = calculateProgress();
  const currentDay = getCurrentDay();

  return (
    <div className="space-y-8">
      {/* Header with Progress Overview */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <Calendar size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Learning Roadmap</h2>
              <p className="text-sm text-zinc-500 font-medium mt-1">Your personalized 7-day onboarding journey</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Current Progress</p>
            <p className="text-4xl font-bold text-white tracking-tighter">{progressPercentage}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
            <span className="text-zinc-500">Day {currentDay} of {enhancedRoadmap.length}</span>
            <span className="text-indigo-400">{progress?.completedTasks.length || 0} tasks completed</span>
          </div>
          <div className="w-full bg-[#09090b] h-4 rounded-full overflow-hidden border border-[#27272a]">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-[#09090b] p-4 rounded-2xl border border-[#27272a] text-center">
            <TrendingUp size={20} className="text-emerald-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Days Active</p>
            <p className="text-2xl font-bold text-white tracking-tighter">{currentDay - 1}</p>
          </div>
          <div className="bg-[#09090b] p-4 rounded-2xl border border-[#27272a] text-center">
            <Target size={20} className="text-indigo-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Tasks Left</p>
            <p className="text-2xl font-bold text-white tracking-tighter">
              {enhancedRoadmap.reduce((sum, day) => sum + day.tasks.length, 0) - (progress?.completedTasks.length || 0)}
            </p>
          </div>
          <div className="bg-[#09090b] p-4 rounded-2xl border border-[#27272a] text-center">
            <Clock size={20} className="text-amber-400 mx-auto mb-2" />
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Est. Time Left</p>
            <p className="text-2xl font-bold text-white tracking-tighter">
              {Math.max(0, (enhancedRoadmap.length - currentDay + 1) * 3)}h
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-6 relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent hidden md:block"></div>

        {enhancedRoadmap.map((day, dayIndex) => {
          const isExpanded = expandedDays.has(day.day);
          const isDayComplete = day.tasks.every(task => progress?.completedTasks.includes(task.id));
          const isCurrentDay = day.day === currentDay;
          const isPastDay = day.day < currentDay;

          return (
            <div key={day.day} className="relative">
              {/* Day Card */}
              <div 
                className={`glass-card rounded-3xl overflow-hidden transition-all duration-300 ${
                  isCurrentDay ? 'ring-2 ring-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : ''
                } ${isDayComplete ? 'bg-emerald-500/5' : ''}`}
              >
                {/* Day Header */}
                <button
                  onClick={() => toggleDay(day.day)}
                  className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-6">
                    {/* Day Number Badge */}
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 transition-all ${
                        isDayComplete 
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                          : isCurrentDay
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 animate-pulse'
                          : 'bg-[#09090b] border-[#27272a] text-zinc-500'
                      }`}>
                        {isDayComplete ? <CheckCircle2 size={32} /> : day.day}
                      </div>
                      {isCurrentDay && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
                      )}
                    </div>

                    {/* Day Info */}
                    <div className="text-left">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{day.title}</h3>
                        {isCurrentDay && (
                          <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-500/30">
                            Current
                          </span>
                        )}
                        {isDayComplete && (
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full border border-emerald-500/30">
                            Complete
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-400 font-medium">{day.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="text-xs text-zinc-500 flex items-center">
                          <Clock size={14} className="mr-1" />
                          2-3 hours
                        </span>
                        <span className="text-xs text-zinc-500 flex items-center">
                          <Target size={14} className="mr-1" />
                          {day.tasks.length} tasks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={24} className="text-zinc-500" />
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-[#27272a] p-8 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Tasks List */}
                    <div className="space-y-4">
                      {day.tasks.map((task, taskIndex) => {
                        const isTaskComplete = progress?.completedTasks.includes(task.id);
                        
                        return (
                          <div 
                            key={task.id}
                            className={`p-6 rounded-2xl border transition-all ${
                              isTaskComplete 
                                ? 'bg-emerald-500/5 border-emerald-500/30' 
                                : 'bg-[#09090b] border-[#27272a] hover:border-indigo-500/30'
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              {/* Checkbox */}
                              <button
                                onClick={() => toggleTaskComplete(task.id)}
                                className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  isTaskComplete
                                    ? 'bg-emerald-500 border-emerald-500'
                                    : 'border-zinc-600 hover:border-indigo-500'
                                }`}
                              >
                                {isTaskComplete && <CheckCircle2 size={16} className="text-white" />}
                              </button>

                              {/* Task Content */}
                              <div className="flex-1">
                                <h4 className={`font-bold text-lg mb-2 ${
                                  isTaskComplete ? 'text-zinc-500 line-through' : 'text-white'
                                }`}>
                                  {task.title}
                                </h4>
                                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                  {task.description}
                                </p>

                                {/* Task Meta Info */}
                                {(task.files && task.files.length > 0) && (
                                  <div className="mb-4">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center">
                                      <FileCode size={14} className="mr-1" />
                                      Key Files
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {task.files.map((file, i) => (
                                        <span 
                                          key={i}
                                          className="px-3 py-1 bg-[#18181b] text-indigo-400 text-xs font-mono rounded-lg border border-[#27272a] hover:border-indigo-500/50 transition-colors"
                                        >
                                          {file}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(task.commands && task.commands.length > 0) && (
                                  <div className="mb-4">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center">
                                      <Terminal size={14} className="mr-1" />
                                      Commands
                                    </p>
                                    <div className="space-y-2">
                                      {task.commands.map((cmd, i) => (
                                        <code 
                                          key={i}
                                          className="block px-4 py-2 bg-[#0c0c0e] text-emerald-400 text-sm font-mono rounded-lg border border-[#27272a]"
                                        >
                                          $ {cmd}
                                        </code>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {(task.learningObjectives && task.learningObjectives.length > 0) && (
                                  <div className="mb-4">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center">
                                      <Lightbulb size={14} className="mr-1" />
                                      Learning Objectives
                                    </p>
                                    <ul className="space-y-1">
                                      {task.learningObjectives.map((obj, i) => (
                                        <li key={i} className="text-sm text-zinc-400 flex items-start">
                                          <span className="text-indigo-500 mr-2">•</span>
                                          {obj}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Notes Section */}
                                {role === 'employee' && (
                                  <div className="mt-4 pt-4 border-t border-[#27272a]">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 block">
                                      Personal Notes
                                    </label>
                                    <textarea
                                      value={taskNotes[task.id] || ''}
                                      onChange={(e) => setTaskNotes({ ...taskNotes, [task.id]: e.target.value })}
                                      onBlur={(e) => saveNote(task.id, e.target.value)}
                                      placeholder="Add your notes, questions, or insights..."
                                      className="w-full bg-[#0c0c0e] border border-[#27272a] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                                      rows={3}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Day Summary */}
                    {day.learningGoals && day.learningGoals.length > 0 && (
                      <div className="p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
                        <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center">
                          <BookOpen size={16} className="mr-2" />
                          Day {day.day} Learning Goals
                        </h4>
                        <ul className="space-y-2">
                          {day.learningGoals.map((goal, i) => (
                            <li key={i} className="text-sm text-zinc-300 flex items-start">
                              <CheckCircle2 size={16} className="text-indigo-500 mr-2 mt-0.5 shrink-0" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Celebration */}
      {progressPercentage === 100 && (
        <div className="glass-card rounded-3xl p-12 text-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/50">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Congratulations! 🎉</h3>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            You've completed your onboarding roadmap! You're now ready to contribute to the project with confidence.
          </p>
        </div>
      )}
    </div>
  );
};

export default LearningRoadmap;

// Made with Bob
