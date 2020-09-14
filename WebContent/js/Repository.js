export default class Repository {

    constructor() {

    }

    getStatusList = async () => {
        const response = await fetch('../TaskServices/broker/allstatuses')
        if(!response.ok) {
        	throw new Error('Network issues executing request')
        }
        const data = await response.json()
        if(!data.responseStatus) {
        	throw new Error('Response status not ok')
        }
        return data.allstatuses
    }
    
    getTaskList = async () => {
        const response = await fetch('../TaskServices/broker/tasklist')
        if(!response.ok) {
        	throw new Error('Network issues executing request')
        }
        const data = await response.json()
        if(!data.responseStatus) {
        	throw new Error('Response status not ok')
        }
        return data.tasks
    }
    
    deleteTask = async (id) => {
    	const url = `../TaskServices/broker/task/${id}`
		const response = await fetch(url,{method: "DELETE"})
		if(!response.ok) {
        	throw new Error('Network issues executing request')
        }
    	const data = await response.json()
    	if(!data.responseStatus) {
        	throw new Error('Response status not ok')
        }

        return data.id
    }
    
    postTask = async (task) => {
    	const url='../TaskServices/broker/task'
        const response = await fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"title":task.title, "status": task.status})
        })
		if(!response.ok) {
        	throw new Error('Network issues executing request')
        }
    	const data = await response.json()
    	if(!data.responseStatus) {
        	throw new Error('Response status not ok')
        }
        return data.task
    }
    
    updateTask = async (id, status) => {
    	const url=`../TaskServices/broker/task/${id}`
        const response = await fetch(url,{
            method: "PUT",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({'status': status})
        })
    	if(!response.ok) {
        	throw new Error('Network issues executing request')
        }
    	const data = await response.json()
    	if(!data.responseStatus) {
        	throw new Error('Response status not ok')
        }
        return data
    }
    
    
}