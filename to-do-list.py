import tkinter as tk
from tkinter import messagebox, ttk

app = tk.Tk()
app.title("To-do List")
app.geometry("500x500")

tasks = []
undo_stack = []

class ToDoList:
    
    @staticmethod
    def update_task():  # Function for updating tasks
        task_list.delete(0, tk.END)
        
        for index, (task_name, completed, priority) in enumerate(tasks):
            color = "Black"  # Default color
            if completed:
                color = "Green"
            elif priority == "High":
                color = "Red"
            elif priority == "Medium":
                color = "Orange"
            elif priority == "Low":
                color = "Yellow"

            task_list.insert(tk.END, task_name)
            last_index = task_list.size() - 1
            task_list.itemconfig(last_index, {'fg': color})

    @staticmethod
    def add_task():  # Function for adding tasks
        task_name = task_entry.get()
        priority = priority_var.get()  # Get the selected priority
        if task_name:
            tasks.append((task_name, False, priority))  # Add task with default completed status
            ToDoList.update_task()
            task_entry.delete(0, tk.END)

    @staticmethod
    def clear_task():  # Function for clearing tasks
        if messagebox.askyesno("Confirm", "Are you sure you want to clear all tasks?"):
            tasks.clear()
            ToDoList.update_task()

    @staticmethod
    def remove_task():  # Function for removing tasks
        try:
            selected_task_index = task_list.curselection()[0]
            undo_stack.append(tasks.pop(selected_task_index))  # Save the removed task for undo
            ToDoList.update_task()
        except IndexError:
            messagebox.showwarning("No task selected", "Please select a task to remove.")

    @staticmethod
    def task_completion():  # Function for marking task as completed
        try:
            selected_task_index = task_list.curselection()[0]
            task_name = task_list.get(selected_task_index)

            for i in range(len(tasks)):
                if tasks[i][0] == task_name:
                    tasks[i] = (task_name, True, tasks[i][2])  # Mark as completed
                    break
            
            ToDoList.update_task()

        except IndexError:
            messagebox.showwarning("No task selected", "Please select a task to mark as completed.")

    @staticmethod
    def undo_task():  # Function for undo
        if undo_stack:
            last_task = undo_stack.pop()
            tasks.append((last_task[0], False, last_task[2]))  # Re-add the task with completed status as False
            ToDoList.update_task()

# GUI Setup
title_label = tk.Label(app, text="Simple To-Do List", font=("Times New Roman", 16))
title_label.pack(padx=15)

frame = tk.Frame(app)
frame.pack(pady=10)

task_entry = tk.Entry(frame, width=30, font=("Times New Roman", 15))
task_entry.pack(padx=5)

button_frame = tk.Frame(app)
button_frame.pack(pady=10)

priority_var = tk.StringVar(value="Low")
priority_value = ["High", "Medium", "Low"]
priority_menu = ttk.Combobox(frame, textvariable=priority_var, values=priority_value)
priority_menu.pack(padx=5, side=tk.LEFT)

add_button = ttk.Button(button_frame, text="Add", command=ToDoList.add_task)
add_button.pack(padx=5, side=tk.LEFT)

clear_button = ttk.Button(button_frame, text="Clear", command=ToDoList.clear_task)
clear_button.pack(padx=5, side=tk.LEFT)

remove_button = ttk.Button(button_frame, text="Remove", command=ToDoList.remove_task)
remove_button.pack(padx=5, side=tk.LEFT)

undo_button = ttk.Button(button_frame, text="Undo", command=ToDoList.undo_task)
undo_button.pack(padx=5, side=tk.LEFT)

complete_button = ttk.Button(button_frame, text="Completed", command=ToDoList.task_completion)
complete_button.pack(padx=5, side=tk.LEFT)

task_list = tk.Listbox(app, width=40, height=10, font=("Times New Roman", 12), selectmode=tk.SINGLE)
task_list.pack(pady=10)

app.mainloop()
