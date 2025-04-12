import type {Task} from '$stores/taskStores'

export function filterByPriority(task: Task[], priority: string): Task[]
{
	return tasks.filter(task => task.priority === priority);
}