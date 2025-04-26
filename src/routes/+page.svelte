<!-- src/routes/+page.svelte -->
<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  
  const tasks = writable([]);
  
  let newTaskTitle = '';
  let newTaskDescription = '';
  let newTaskPriority = 'MEDIUM';
  let showAddTask = false;
  let darkMode = false;
  let showCompleted = false;
  let showSettings = false; // Add this to control settings view
  
  // Delete confirmation
  let showDeleteConfirmation = false;
  let taskToDelete = null;
  
  // Update body class when dark mode changes
  $: if (typeof document !== 'undefined') {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  
  function toggleDarkMode() {
    darkMode = !darkMode;
    // Save preference to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('dark_mode', JSON.stringify(darkMode));
    }
  }
  
  function toggleSettings() {
    showSettings = !showSettings;
    // Hide add task form when settings are shown
    if (showSettings) {
      showAddTask = false;
    }
  }
  
  function addTask() {
    if (newTaskTitle.trim()) {
      // Find the highest ID and add 1
      const highestId = $tasks.length > 0 
        ? Math.max(...$tasks.map(t => t.id)) 
        : 0;
      
      const newTask = {
        id: highestId + 1,
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        priority: newTaskPriority,
        completed: false
      };
      
      tasks.update(items => [newTask, ...items]);
      resetForm();
    }
  }
  
  function resetForm() {
    newTaskTitle = '';
    newTaskDescription = '';
    newTaskPriority = 'MEDIUM';
    showAddTask = false;
  }
  
  function clearAllTasks() {
    tasks.set([]);
  }
  
  function confirmDelete(taskId) {
    taskToDelete = taskId;
    showDeleteConfirmation = true;
  }
  
  function cancelDelete() {
    taskToDelete = null;
    showDeleteConfirmation = false;
  }
  
  function deleteTask() {
    if (taskToDelete !== null) {
      tasks.update(items => items.filter(item => item.id !== taskToDelete));
      showDeleteConfirmation = false;
      taskToDelete = null;
    }
  }
  
  function deleteAllCompleted() {
    tasks.update(items => items.filter(item => !item.completed));
  }
  
  function toggleTaskCompleted(taskId) {
    tasks.update(items => 
      items.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
      )
    );
  }
  
  // Initialize dark mode based on user's system preference and load saved tasks
  onMount(() => {
    if (typeof window !== 'undefined') {
      // Try to load dark mode preference first
      const savedDarkMode = localStorage.getItem('dark_mode');
      if (savedDarkMode !== null) {
        try {
          darkMode = JSON.parse(savedDarkMode);
        } catch (e) {
          console.error('Failed to load dark mode preference', e);
          // Fallback to system preference
          darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
      } else {
        // Set dark mode based on system preference if no saved preference
        darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      // Load tasks from localStorage if available
      const savedTasks = localStorage.getItem('tusk_tasks');
      if (savedTasks) {
        try {
          tasks.set(JSON.parse(savedTasks));
        } catch (e) {
          console.error('Failed to load saved tasks', e);
        }
      }
    }
  });
  
  // Save tasks to localStorage whenever they change
  $: if (typeof localStorage !== 'undefined') {
    localStorage.setItem('tusk_tasks', JSON.stringify($tasks));
  }
  
  $: filteredTasks = showCompleted ? $tasks : $tasks.filter(task => !task.completed);
  $: hasCompletedTasks = $tasks.some(task => task.completed);
</script>

<svelte:head>
  <title>Zotu - The To do list</title>
  <meta name="description" content="Zotu - A simple and elegant task manager">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</svelte:head>

<!-- Fixed dark mode by ensuring the class binding is correctly placed -->
<div class="task-app {darkMode ? 'dark-mode' : ''}">
  <header>
    <div class="app-header">
      <h1 class="app-title">Zotu</h1>
      <div class="app-nav">
        <!-- Use buttons instead of links for SPA navigation -->
        <button 
          class="nav-link {!showSettings ? 'active' : ''}" 
          on:click={() => showSettings = false}
        >
          Home
        </button>
        <button 
          class="nav-link {showSettings ? 'active' : ''}" 
          on:click={toggleSettings}
        >
          Settings
        </button>
        <button class="theme-toggle" on:click={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>

    {#if !showSettings}
      <div class="app-controls">
        <div class="mode-control">
          <div class="toggle-switch">
            <label class="switch">
              <input type="checkbox" bind:checked={showCompleted}>
              <span class="slider"></span>
            </label>
            <span class="toggle-label">Show Completed</span>
          </div>
        </div>
        
        <div class="action-buttons">
          {#if hasCompletedTasks}
            <button class="action-button secondary" on:click={deleteAllCompleted}>
              Clear Completed
            </button>
          {/if}
          
          <button class="action-button primary" on:click={() => showAddTask = !showAddTask}>
            + Add Task
          </button>
        </div>
      </div>
    {/if}
  </header>
  
  {#if showSettings}
    <div class="settings-container">
      <h2>Settings</h2>
      
      <div class="settings-section">
        <h3>Appearance</h3>
        <div class="setting-item">
          <span>Dark Mode</span>
          <div class="toggle-switch">
            <label class="switch">
              <input type="checkbox" bind:checked={darkMode}>
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h3>Data Management</h3>
        <div class="setting-actions">
          <button class="button danger" on:click={clearAllTasks}>
            Clear All Tasks
          </button>
        </div>
      </div>
    </div>
  {:else}
    {#if showAddTask}
      <div class="add-task-form">
        <input
          type="text"
          bind:value={newTaskTitle}
          placeholder="Task title"
          class="task-input"
          autofocus
        />
        <input
          type="text"
          bind:value={newTaskDescription}
          placeholder="Description (optional)"
          class="task-input"
        />
        <div class="form-row">
          <div class="priority-selector">
            <label>Priority:</label>
            <select bind:value={newTaskPriority}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div class="form-buttons">
            <button class="button secondary" on:click={resetForm}>Cancel</button>
            <button class="button primary" on:click={addTask} disabled={!newTaskTitle.trim()}>
              Save
            </button>
          </div>
        </div>
      </div>
    {/if}
    
    {#if $tasks.length === 0}
      <div class="empty-state">
        <p>No tasks yet. Start by adding one!</p>
      </div>
    {/if}
    
    <div class="task-list">
      {#each filteredTasks as task (task.id)}
        <div class="task-card" class:completed={task.completed}>
          <div class="task-content">
            <div class="task-header">
              <input 
                type="checkbox" 
                class="complete-checkbox" 
                checked={task.completed} 
                on:change={() => toggleTaskCompleted(task.id)}
              />
              <h2>{task.title}</h2>
            </div>
            {#if task.description}
              <p>{task.description}</p>
            {/if}
          </div>
          <div class="task-actions">
            <div class="task-priority {task.priority.toLowerCase()}">{task.priority}</div>
            <button class="delete-task" on:click={() => confirmDelete(task.id)} aria-label="Delete task">
              ×
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  
  {#if showDeleteConfirmation}
    <div class="modal-backdrop" on:click={cancelDelete}>
      <div class="modal" on:click|stopPropagation>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this task?</p>
        <div class="modal-buttons">
          <button class="button secondary" on:click={cancelDelete}>Cancel</button>
          <button class="button danger" on:click={deleteTask}>Delete</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Footer -->
  <footer>
    <p>Zotu &copy; {new Date().getFullYear()}</p>
  </footer>
</div>

<style>
  /* Global styles */
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    transition: background-color 0.3s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
  
  :global(body.dark-mode) {
    background-color: #121212;
    color: #e0e0e0;
  }
  
  /* App container */
  .task-app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    transition: color 0.3s ease, background-color 0.3s ease;
    display: flex;
    flex-direction: column;
    color: #333;
    background-color: #f5f5f5;
  }
  
  .task-app.dark-mode {
    color: #e0e0e0;
    background-color: #121212;
  }
  
  /* Footer styles */
  footer {
    margin-top: auto;
    padding-top: 20px;
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    transition: color 0.3s ease;
  }
  
  .dark-mode footer {
    color: #aaa;
  }
  
  /* Header styles */
  header {
    margin-bottom: 20px;
  }
  
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .dark-mode .app-header {
    border-bottom-color: #333;
  }
  
  .app-title {
    font-size: 2rem;
    font-weight: bold;
    color: #1a73e8;
    margin: 0;
  }
  
  .app-nav {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .nav-link {
    color: #666;
    text-decoration: none;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    color: #1a73e8;
    background-color: rgba(26, 115, 232, 0.05);
  }
  
  .nav-link.active {
    color: #1a73e8;
    background-color: rgba(26, 115, 232, 0.1);
  }
  
  .dark-mode .nav-link {
    color: #aaa;
  }
  
  .dark-mode .nav-link:hover {
    color: #64b5f6;
    background-color: rgba(100, 181, 246, 0.1);
  }
  
  .dark-mode .nav-link.active {
    color: #64b5f6;
    background-color: rgba(100, 181, 246, 0.15);
  }
  
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
  
  .theme-toggle:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .dark-mode .theme-toggle:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  /* Settings styles */
  .settings-container {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    flex-grow: 1;
  }
  
  .dark-mode .settings-container {
    background-color: #1e1e1e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .settings-container h2 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
    transition: color 0.3s ease;
  }
  
  .dark-mode .settings-container h2 {
    color: #e0e0e0;
  }
  
  .settings-section {
    margin-bottom: 25px;
  }
  
  .settings-section h3 {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 15px;
    transition: color 0.3s ease;
  }
  
  .dark-mode .settings-section h3 {
    color: #aaa;
  }
  
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    transition: border-color 0.3s ease;
  }
  
  .dark-mode .setting-item {
    border-bottom-color: #333;
  }
  
  .setting-actions {
    margin-top: 15px;
  }
  
  /* App controls */
  .app-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .mode-control {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .toggle-switch {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .toggle-label {
    font-size: 0.9rem;
    color: #666;
    transition: color 0.3s ease;
  }
  
  .dark-mode .toggle-label {
    color: #aaa;
  }
  
  /* Switch styling */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #1a73e8;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #1a73e8;
  }
  
  input:checked + .slider:before {
    transform: translateX(20px);
  }
  
  /* Action buttons */
  .action-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .action-button {
    border-radius: 50px;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    border: none;
  }
  
  .action-button.primary {
    background-color: #1a73e8;
    color: white;
  }
  
  .action-button.primary:hover {
    background-color: #1557b0;
  }
  
  .action-button.secondary {
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
  }
  
  .dark-mode .action-button.secondary {
    color: #aaa;
    border-color: #444;
  }
  
  .action-button.secondary:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .dark-mode .action-button.secondary:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  /* Empty state */
  .empty-state {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
    margin: 80px 0;
    transition: color 0.3s ease;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dark-mode .empty-state {
    color: #aaa;
  }
  
  /* Task list */
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    flex-grow: 1;
  }
  
  /* Task card */
  .task-card {
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    transition: all 0.3s ease;
  }
  
  .task-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .dark-mode .task-card {
    background-color: #1e1e1e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .dark-mode .task-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .task-card.completed {
    opacity: 0.7;
  }
  
  .task-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }
  
  .complete-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #1a73e8;
  }
  
  .task-content {
    flex-grow: 1;
    margin-right: 10px;
  }
  
  .task-content h2 {
    font-size: 1.1rem;
    margin: 0;
    color: #333;
    transition: color 0.3s ease, text-decoration 0.3s ease;
    font-weight: 500;
  }
  
  .dark-mode .task-content h2 {
    color: #e0e0e0;
  }
  
  .task-card.completed h2 {
    text-decoration: line-through;
    color: #888;
  }
  
  .task-content p {
    margin: 5px 0 0 28px;
    color: #666;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }
  
  .dark-mode .task-content p {
    color: #aaa;
  }
  
  /* Task actions */
  .task-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  
  .task-priority {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: lowercase;
  }
  
  .task-priority.low {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .task-priority.medium {
    background-color: #fff8e1;
    color: #ff8f00;
  }
  
  .task-priority.high {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .dark-mode .task-priority.low {
    background-color: rgba(46, 125, 50, 0.2);
    color: #81c784;
  }
  
  .dark-mode .task-priority.medium {
    background-color: rgba(255, 143, 0, 0.2);
    color: #ffb74d;
  }
  
  .dark-mode .task-priority.high {
    background-color: rgba(198, 40, 40, 0.2);
    color: #e57373;
  }
  
  .delete-task {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
    line-height: 1;
    padding: 0 5px;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .delete-task:hover {
    color: #d32f2f;
  }
  
  /* Add task form */
  .add-task-form {
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .dark-mode .add-task-form {
    background-color: #1e1e1e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .task-input {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 0.95rem;
    background-color: white;
    color: #333;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }
  
  .task-input:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
  
  .dark-mode .task-input {
    background-color: #333;
    color: #e0e0e0;
    border-color: #444;
  }
  
  .dark-mode .task-input:focus {
    border-color: #64b5f6;
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.2);
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .priority-selector {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .priority-selector label {
    color: #666;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }
  
  .dark-mode .priority-selector label {
    color: #aaa;
  }
  
  .priority-selector select {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ddd;
    background-color: white;
    color: #333;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }
  
  .priority-selector select:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
  
  .dark-mode .priority-selector select {
    background-color: #333;
    color: #e0e0e0;
    border-color: #444;
  }
  
  .dark-mode .priority-selector select:focus {
    border-color: #64b5f6;
    box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.2);
  }
  
  .form-buttons {
    display: flex;
    gap: 10px;
  }
  
  /* Generic button styles */
  .button {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
  }
  
  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .button.primary {
    background-color: #1a73e8;
    color: white;
    border: none;
  }
  
  .button.primary:hover:not(:disabled) {
    background-color: #1557b0;
  }
  
  .button.secondary {
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
  }
  
  .button.secondary:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .dark-mode .button.secondary {
    color: #aaa;
    border-color: #444;
  }
  
  .dark-mode .button.secondary:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .button.danger {
    background-color: #d32f2f;
    color: white;
    border: none;
  }
  
  .button.danger:hover:not(:disabled) {
    background-color: #b71c1c;
  }
  
  /* Modal styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
  }
  
  .modal {
    background-color: white;
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
  
  .dark-mode .modal {
    background-color: #1e1e1e;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  
  .modal h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #333;
    font-size: 1.3rem;
    transition: color 0.3s ease;
  }
  
  .dark-mode .modal h3 {
    color: #e0e0e0;
  }
  
  .modal p {
    margin-bottom: 24px;
    color: #666;
    font-size: 1rem;
    transition: color 0.3s ease;
  }
  
  .dark-mode .modal p {
    color: #aaa;
  }
  
  .dark-mode .modal p {
    color: #aaa;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  /* Responsive styles */
  @media (max-width: 600px) {
    .app-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .app-nav {
      width: 100%;
      justify-content: space-between;
    }
    
    .app-controls {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .action-buttons {
      width: 100%;
      justify-content: space-between;
    }
    
    .form-row {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .form-buttons {
      width: 100%;
      justify-content: space-between;
    }
    
    .task-actions {
      flex-direction: column;
      align-items: flex-end;
    }
  }
  
</style>