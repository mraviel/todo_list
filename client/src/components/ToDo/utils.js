import axios from "axios";

const fetchToDos = async () => {
    try {
        let response = await axios.get('http://127.0.0.1:5000/api/todos');
        return response
    } catch (e){
        // console.log(e)
        console.log('error');
    }
}

const postNewToDo = async (newToDo) => {
    try{
        const response = await axios.post('http://127.0.0.1:5000/api/todos', newToDo);
        return response
    } catch {
        console.log("error");
    }

}

const deleteToDoGroup = async (groupTitle) => {
    
}

const deleteToDoItem = async (todoID) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:5000/api/todos/${todoID}`)
        return response
    } catch {
        console.log('error')
    }
}

export {fetchToDos, postNewToDo, deleteToDoItem}