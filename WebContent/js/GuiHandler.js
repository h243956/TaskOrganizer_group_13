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
    } else {
      console.log(`User did not confirm to delete task ${task.title}.`)
    }
  }

  handleUpdateTask(event, task) {
    if(event.target.value !== 0 && event.target.value !== task.status ) {
    	if(confirm(`Set ${task.title} to ${event.target.value}?`)) {
    		this.fireNewStatusCallbackArr(task.id, event.target.value);
    	} else {
    		console.log(`User did not confirm to update task ${task.title}.`)
    		this.resetStatusSelector(task.id, task.status)
    	}
    }
  }
 

  showTask(task) {
    const tasktable = this.container.querySelector(".tasks-table")
    const tasks = tasktable.children;
    const tasknode = document.createElement("tr");
    tasknode.setAttribute('data-key', task.id);
    tasknode.innerHTML = this.getTaskInnerHtml(task);
    const removeButton = tasknode.querySelector("button")
    const select = tasknode.querySelector("select")
    removeButton.addEventListener('click', this.handleRemoveTask.bind(this, task))
    select.addEventListener('change', (event) => this.handleUpdateTask(event, task))
    
    if(tasks.length) {
    	if(!this.isExistingTask(tasks, task)) {
    		tasktable.insertBefore(tasknode, tasks[0])
      }
    } else {
    	tasktable.appendChild(tasknode)
    }
  }


  updateTask(id, status) {
	  const tasktable = this.container.querySelector(".tasks-table")
	  const node = tasktable.querySelector(`.tasks-table > tr[data-key="${id}"`)
	  const statusTd = node.querySelector(`td[data-type="status"]`)
	  const newStatusText = document.createTextNode(`${status}`)
	  statusTd.replaceChild(newStatusText, statusTd.childNodes[0])
	  this.resetStatusSelector(id, status)
  }
  
  resetStatusSelector(id, status) {
	  const node = this.container.querySelector(`.tasks-table > tr[data-key="${id}"`)
	  const selectorNode = node.querySelector(`td[data-type="selector"]`)
	  const newSelectorNode = document.createElement("select")
	  const title=node.querySelector(`td[data-type="title"]`).textContent
	  newSelectorNode.innerHTML = this.getStatusSelectorHTML(status)
	  newSelectorNode.addEventListener('change', (event) => this.handleUpdateTask(event, {id: id, title: title, status: status}))
	  selectorNode.replaceChild(newSelectorNode, selectorNode.childNodes[1])
  }

  removeTask(id) {
    const node = this.container.querySelector(`.tasks-table > tr[data-key="${id}"`)
    node.parentNode.removeChild(node)
    console.log(`Task ${id} has been removed from the DOM`)
  }

  noTask() {
	  const tasktable = this.container.querySelector(".tasks-table")
	  return tasktable.children.length == 0;  
  }
  
  fireDeleteTaskCallbacks(id) {
	  if(this.deleteTaskCallbackArr.length) {
		  this.deleteTaskCallbackArr.forEach(callback => {
			  callback(id)
		  })
	  }
  }
  
  fireNewStatusCallbackArr(id, newstatus) {
	  if(this.newStatusCallbackArr.length) {
		  this.newStatusCallbackArr.forEach(callback => {
			  callback(id, newstatus)
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
        <td data-type="title">${task.title}</td>
        <td data-type="status">${task.status}</td>
        <td data-type="selector">
        ${this.getStatusSelectorHTML(task.status)}
        </td>
        <td><button type="button">Remove</button></td>
      </tr>
  `;
	  
  }
  
  getStatusSelectorHTML(activestatus) {
	  return `<select>
      <option value="0" selected>&lt;Modify&gt;</option>
      ${this.statuses.map(status => {
        if(status===activestatus) {
          return `<option value="${status}" disabled>${status}</option>`
        } else {
          return `<option value="${status}">${status}</option>`
        }
      })}
    </select>`
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