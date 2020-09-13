export default class TaskBox {
	
    constructor(container) {
    	this.container=container
    	this.statuses=null
    	this.onsubmitCallbackArr = []
        this.newStatusCallbackArr = []
    	this.isModalShowing=false;
    }
  
    set allStatuses(statuses) {
        this.statuses=statuses
    }	

	set onsubmitCallback(callback) {
		this.onsubmitCallbackArr.push(callback)
	}
	
	fireOnsubmitCallbackArr(task) {
		  if(this.onsubmitCallbackArr.length) {
			  this.onsubmitCallbackArr.forEach(callback => {
				  callback(task)
			  })
		  }
	  }

	handleOnsubmit() {
		const title = this.container.querySelector("input").value
		const status = this.container.querySelector("select").value
		const task = {
				id: 0,
				title: title,
				status: status,
			}
			
		this.fireOnsubmitCallbackArr(task)
	}

	
	show() {
		if(!this.isModalShowing) {
			const modalcontent=document.createElement("div")
			modalcontent.classList.add('modal-content')
	    	modalcontent.innerHTML = `
		    	<span class="close">&times;</span>
				<form>
					<label for="title">Title:</label><br>
					<input name="title" value="" type="text" size="25" maxlength="80"/><br>
					<label for="status">Status:</label><br>
					<select>
						${this.statuses.map(status => `<option name="status" value="${status}">${status}</option>`)}
					</select>
				</form>
				<p><button type="submit">Add task</button></p>
				`
			modalcontent.querySelector("span").addEventListener('click', this.close.bind(this))
			modalcontent.querySelector("button").addEventListener('click', this.handleOnsubmit.bind(this))
			modalcontent.style.display = "block"
			this.container.appendChild(modalcontent)
			this.isModalShowing=true;
		}
	}
	
    close() {
    	if(this.isModalShowing) {
    		const modalcontent = this.container.querySelector(".modal-content");
        	modalcontent.parentNode.removeChild(modalcontent)
        	this.isModalShowing=false;
    	}
    }
  
  
    
  }