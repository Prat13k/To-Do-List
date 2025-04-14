import type { Task } from '$stores/taskStore';

export const mockTasks: Task[] = [
  {
    id: 'mock-1',
    title: 'Write unit tests',
    description: 'Write tests for task store and components',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-2',
    title: 'Polish UI',
    description: 'Add animations and polish modal interactions',
    priority: 'medium',
    createdAt: new Date().toISOString()
	updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-3',
    title: 'Refactor utils',
    priority: 'low',
    createdAt: new Date().toISOString()
	updatedAt: new Date().toISOString()
  }
];
