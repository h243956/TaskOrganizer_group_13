export default class GuiHandler {
  
  constructor(container) {
    this.container=container
    this.statuses=null
    this.prepareView()
  }

  set allStatuses(statuses) {
    this.statuses=statuses
  }

  set deleteTaskCallback(callback) {
    console.log(callback)
  }

  set newStatusCallback(callback) {
    console.log(callback)
  }

  showTask(task) {
    const tasktable = this.container.querySelector(".tasks-table")
    const tasks = tasktable.children;
    const tasknode = document.createElement("tr");
    tasknode.setAttribute('data-key', task.id);
    tasknode.innerHTML = this.getTaskInnerHtml(task);
    
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

  }

  noTask() {

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
      <tr data-identity="${task.id}">
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