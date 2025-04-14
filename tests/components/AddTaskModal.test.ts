import{render,fireEvent} from '@testing-library/svelte';
import AddTaskModal from '$components/AddTaskModal.svelte';
import { vi } from 'vitest';

describe('AddTaskModal',() => {
	it('Add a Task on Submit', async() => {
		const{getByPlaceholderText, getByText, component} = render(AddTaskModal,{
			props: {show: true, editingTask: null}
			});
		
		const CreateHandler = vi.fn();
		component.$on('create', createHandler);
	
		await fireEvent.input(getByPlaceholderText('Title'), {target: {value: 'New Task'}});
		await fireEvent.click(getByText('Add'));
	
		expect(CreateHandler).toHaveBeenCalled();
	});
});