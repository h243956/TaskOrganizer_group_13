import GuiHandler from './GuiHandler.js'
import TaskBox from './TaskBox.js'
import Repository from './Repository.js'

const taskcontainer = document.getElementById("taskcontainer")
const modalcontainer = document.getElementById("modalcontainer")
const taskbox= new TaskBox(modalcontainer)
const gui = new GuiHandler(taskcontainer)
const repository = new Repository()
taskcontainer.querySelector("button").addEventListener("click",(event) => {taskbox.show()},true)

getStatuses()
getTasks()

gui.deleteTaskCallback = (id) => console.log(`User has approved the deletion of task with id ${id}.`)
gui.deleteTaskCallback = (id) => deleteTask(id)

gui.newStatusCallback = (id, status) => console.log(`User has approved updating task with id ${id} to status ${status}`)
gui.newStatusCallback = (id, status) => updateTask(id, status)

taskbox.onsubmitCallback = (task) => console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`)
taskbox.onsubmitCallback = (task) => postTask(task)
taskbox.onsubmitCallback = (task) => taskbox.close()

function updateTask(id, status) {
	const promise = repository.updateTask(id, status)
	promise.then(data => gui.updateTask(id, status))
}

function getStatuses() {
	const statuses = repository.getStatusList();
	statuses.then(data =>  {
		gui.allStatuses = data
		taskbox.allStatuses = data
	})
}

function getTasks() {
	const tasks = repository.getTaskList();
	tasks.then(data => {
        if(data.length) {
            data.forEach((task) => {gui.showTask(task)})
            taskcontainer.querySelector("p").textContent = `Found ${data.length} tasks!`
        } else {
            gui.noTask()
        }		
        taskcontainer.querySelector("button").removeAttribute('disabled')
	})
}

function postTask(task) {
	const promise = repository.postTask(task);
	promise.then(data => gui.showTask(task))
}

function deleteTask(id) {
	const promise = repository.deleteTask(id)
	promise.then(data => gui.removeTask(id))
}
