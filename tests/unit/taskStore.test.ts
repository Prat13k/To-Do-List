import { taskStore } from '$stores/taskStore';
import { mockTasks } from '../mocks/mockTasks'; // ✅ correct

describe('taskStore', () =>	{
	beforeEach(() => taskStore.reset());
	
	it('adds a task', () => {
		taskStore.addTask({title : 'Hello', description: '', priority: 'low'});
		taskStore.subscribe(tasks => {
			expect(tasks.length).toBe(1);
			expect(tasks[0].title).toBe('Hello');
		})();
	});
	
	it('delete a task',() => {
		taskStore.addTask({title : 'To Delete', description: '', priority: 'low'});
		let id = '';
		taskStore.subscribe(tasks => {id = tasks[0]?.id || '';})();
		taskStore.deleteTask(id);
		taskStore.subscribe(tasks => expect(tasks.length).toBe(0))();
	});
});