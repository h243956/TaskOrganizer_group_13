export default class GuiHandler {
  
  constructor() {
    this.statuses=null
    this.prepareView()
  }

  prepareView() {
    const tasklist = document.querySelector('.tasklist')
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
    const tasktable = document.querySelector(".tasks-table")
    const tasknode = document.createElement("tr");
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
    tasktable.appendChild(tasknode)
  }

  update(task) {

  }

  removeTask(id) {

  }

  noTask() {

  }


  
}