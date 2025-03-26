import tkinter as tk
from tkinter import messagebox, ttk
from tkinter.ttk import Button

app = tk.Tk()
app.title("To-do-list")
app.geometry("400x400")

tasks = []

class ToDoList:  # classes-for-to_do_list
    
    @staticmethod
    def update_task():  #function-for-updating-tasks
        task_list.delete(0, tk.END)
        for task in tasks:
            task_list.insert(tk.END, task)

    @staticmethod
    def add_task():  #function-for-add-tasks
        task = task_entry.get()
        if task.strip():
            tasks.append(task)
            ToDoList.update_task()
            task_entry.delete(0, tk.END)
        else:
            messagebox.showwarning("No task selected!!")

    @staticmethod
    def clear_task():  #function-for-clear-tasks
        if messagebox.askyesno("Sure ?"):
            tasks.clear()
            ToDoList.update_task()

    @staticmethod
    def remove_task():  #function-for-remove-tasks
        try:
            selected_task = task_list.curselection()[0]
            tasks.pop(selected_task)
            ToDoList.update_task()
        except IndexError:
            messagebox.showwarning("No task selected")

title_label = tk.Label(app, text="Simple To-Do-List", font=("Times New Roman", 16))
title_label.pack(padx=15)

frame = tk.Frame(app)
frame.pack(pady=10)

task_entry = tk.Entry(frame, width=30, font=("Times New Roman", 15))
task_entry.pack(padx=5)

button_frame = tk.Frame(app)
button_frame.pack(pady=10)

add_button = ttk.Button(button_frame, text="Add", command=ToDoList.add_task)
add_button.pack(padx=5, side=tk.LEFT)  #AddButton

clear_button = ttk.Button(button_frame, text="Clear", command=ToDoList.clear_task)
clear_button.pack(padx=5, side=tk.LEFT)  #ClearButton

remove_button = ttk.Button(button_frame, text="Remove", command=ToDoList.remove_task)
remove_button.pack(padx=5, side=tk.LEFT)  #RemoveButton

task_list = tk.Listbox(app, width=40, height=10, font=("Times New Roman", 12), selectmode=tk.SINGLE)
task_list.pack(pady=10)

app.mainloop()
