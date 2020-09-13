export default class GuiHandler {
  
  constructor(container) {
    this.container=container
    this.statuses=null
    this.deleteTaskCallbackArr = []
    this.newStatusCallbackArr = []
    this.prepareView()
  }

  set allStatuses(statuses) {
    this.statuses=statuses
  }

  set deleteTaskCallback(callback) {
	  this.deleteTaskCallbackArr.push(callback)
  }

  set newStatusCallback(callback) {
	  this.newStatusCallbackArr.push(callback)
  }
  
  handleRemoveTask(task) {
	if(confirm(`Delete task ${task.title}?`)) { 
	  this.fireDeleteTaskCallbacks(task.id)
      this.removeTask(task.id)
    } else {
      console.log(`User did not confirm to delete task ${task.title}.`)
    }
  }
 

  showTask(task) {
    const tasktable = this.container.querySelector(".tasks-table")
    const tasks = tasktable.children;
    const tasknode = document.createElement("tr");
    tasknode.setAttribute('data-key', task.id);
    tasknode.innerHTML = this.getTaskInnerHtml(task);
    const removeButton = tasknode.querySelector("button")
    removeButton.addEventListener('click', this.handleRemoveTask.bind(this, task))
    
    if(tasks.length) {
    	if(!this.isExistingTask(tasks, task)) {
        tasktable.insertBefore(tasknode, tasks[0])
      }
    } else {
    	tasktable.appendChild(tasknode)
    }
  }


  update(task) {

  }

  removeTask(id) {
    const node = this.container.querySelector(`.tasks-table > tr[data-key="${id}"`)
    node.parentNode.removeChild(node)
    console.log(`Task ${id} has been removed from the DOM`)
  }

  noTask() {

  }
  
  fireDeleteTaskCallbacks(id) {
	  if(this.deleteTaskCallbackArr.length) {
		  this.deleteTaskCallbackArr.forEach(callback => {
			  callback(id)
		  })
	  }
  }
  
  fireNewStatusCallbackArr(id) {
	  if(this.newStatusCallbackArr.length) {
		  this.newStatusCallbackArr.forEach(callback => {
			  callback(id)
		  })
	  }
  }

  prepareView() {
    const tasklist = this.container.querySelector('.tasklist')
    const tablenode = document.createElement("table");
    tablenode.innerHTML = `
      <thead>
        <tr>
          <th>Task</th>
          <th colspan="3">Status</th>
        </tr>
      </thead>
      <tbody class="tasks-table">
      </tbody>
    `;
    tasklist.appendChild(tablenode)
  }

  getTaskInnerHtml(task) {
	  return `
      <tr>
        <td>${task.title}</td>
        <td>${task.status}</td>
        <td>
          <select>
            <option value="0" selected>&lt;Modify&gt;</option>
            ${this.statuses.map(status => {
              if(status===task.status) {
                return `<option value="${status}" disabled>${status}</option>`
              } else {
                return `<option value="${status}">${status}</option>`
              }
            })}
          </select>
        </td>
        <td><button type="button">Remove</button></td>
      </tr>
  `;
  }
  
  isExistingTask(children, task) {
    let childrenArr = Array.from(children)
    let exists=false
    childrenArr.forEach(element => {
      if(task.id==element.getAttribute("data-key")) {
        exists=true
      }
    })
	  return exists
  }

  
}