from flask import Flask, jsonify, request

app = Flask(__name__)
tasks= []

@app.route('/tasks', methods = ['GET'])
def get_tasks():
    return jsonify(tasks),200

@app.route('/tasks', methods = ['POST'])
def add_tasks():
    data = request.json
    task_name = data.get('name')
    if not task_name:
        return jsonify({'error':'Task name is req'}),400
    task = {'id':len(tasks) + 1,'name' : task_name}
    tasks.append(task)
    return jsonify(task),201

@app.route('/tasks/<int:task_id>',methods = ['DELETE'])
def remove_tasks(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({'message':f'task {task_id} removed'}),200

if __name__ == 'main':
    app.run(debug = True)