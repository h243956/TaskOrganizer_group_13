export default class GuiHandler {
  
  constructor() {
    this.statuses=null
    this.mainnode=null
    this.prepareView()
  }

  prepareView() {
    const tasklist = document.querySelector('.tasklist')
    const mainnode = document.createElement("table");
    mainnode.innerHTML = `
      <thead>
        <tr>
          <th>Task</th>
          <th colspan="3">Status</th>
        </tr>
      </thead>
    `;
    tasklist.appendChild(mainnode)
    this.mainnode=mainnode;
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
    const tasknode = document.createElement("tbody");
    tasknode.setAttribute('data-key', task.id);
    tasknode.innerHTML = `
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
    this.mainnode.appendChild(tasknode)
	  
  }

  update(task) {

  }

  removeTask(id) {

  }

  noTask() {

  }


  
}