import { render, fireEvent } from '@testing-library/svelte';
import TaskCard from '$components/TaskCard.svelte';
import { mockTasks } from '../mocks/mockTasks'; // ✅ correct import
import { vi } from 'vitest';

describe('TaskCard', () => {
  it('renders title and priority', async () => {
    const { getAllByRole, component, getByText } = render(TaskCard, {
      props: { task: mockTasks[0] }
    });

    // Check if title and priority are rendered
    expect(getByText('Write unit tests')).toBeTruthy();
    expect(getByText('HIGH')).toBeTruthy(); // uppercase from PriorityTag, depending on implementation

    const editHandler = vi.fn();
    const deleteHandler = vi.fn();

    component.$on('edit', editHandler);
    component.$on('delete', deleteHandler);

    const buttons = getAllByRole('button');
    await fireEvent.click(buttons[0]); // ✏️ Edit
    await fireEvent.click(buttons[1]); // 🗑️ Delete

    expect(editHandler).toHaveBeenCalled();
    expect(deleteHandler).toHaveBeenCalled();
  });
});
