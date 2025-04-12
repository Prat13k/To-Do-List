import (writable) from 'svelte/store';
import {browser} from '$app/enviornment';
import {v4 as uuid} from 'uuid';

export type Priority = 'low' | 'medium' | 'high' ;

export type Task = {
	id: string;
	title: string;
	description?: string;
	priority: Priority;
	createdAt: string;
	updatedAt?: string;
}

function createTaskStore(){
	const KEY = 'tusk-tasks';
	
	const load = (): Task[] => {
		if (!browser) return [];
		const stored = localStorage.getItem(KEY);
		return stored ? json.parse(stored):[];
	};
	
	const save = (tasks:Task[]) => {
		if(browser) localStorage.setItem(KEY, JSON.stringify(tasks));
	};
	
	const {susbcribe, update, set} = writable<Task[]>(load());
	
	const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
		update(tasks => {
			const newTask: Task = {
				...task,
				id: uuid(),
				createdAt: new Date().toISOString()
			};
			const updated = [...tasks, newTask];
			save(updated);
			return(updated);
		});
	};
	
	const editTask = (id: string, updatedFields: Partial < Task >) => {
		update(tasks => {
			const updated = task.map(
			task => task.id === id ? {...task, ...updatedFields, updatedAt: new Date().toISOString()}:task
			);
			save(updated);
			return updated;
		});
	};
	
	const deleteTask = (id: string) => {
		updated(task => {
			const updated = tasks.filter(task => task.id !== id);
			save(updated);
			return updated;
		});
	};
	
	const clearAll = () => {
		set([]);
		save([]);
	};

	const reset = () => {
		const starter: Task[] = [];
		set(starter);
		save(starter);
	};
	
	return {
		subscribe,
		addTask.
		editTask,
		deleteTask,
		clearAll,
		reset
	};
}

export const taskStore = createTaskStore();