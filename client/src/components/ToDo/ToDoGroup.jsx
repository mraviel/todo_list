import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import {fetchToDos, postNewToDo} from './utils';
import { Form, Col, Row, Button, Badge } from 'react-bootstrap';

export default function ToDoGroup({groupTitle}){
    const [todos, setToDos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const setToDosEffect = async () => {
            const response = await fetchToDos();
            let groupToDos = response.data.filter(groupDoTO => groupDoTO.group === groupTitle)
            setToDos(groupToDos)
            groupToDos.forEach(group => console.log(group));

        }
        setToDosEffect();
    }, [])

    const handleKeyDown = async (event, todo_title, group_title) => {
        if (event.key === 'Enter') {
          console.log('Enter key pressed');
          const todo = {'group': group_title, 'todo': todo_title, 'isChecked': false};
          await postNewToDo(todo)
         
          // Handle refreshing the todos               
          const response = await fetchToDos();
          const groupToDos = response.data.filter(groupDoTO => groupDoTO.group === groupTitle);
          setToDos(groupToDos); 
          setInputValue(''); // Clear the input field after submission
        }
      };

    return (
        <div className="ToDoGroup">
            <Row>
                <h2 style={{color: "white"}}>{groupTitle}</h2>
                <Button variant="outline-danger">Delete Group</Button>
            </Row>
            {todos.map(todo => (
                <ToDoItem 
                    id={todo._id}
                    key={todo._id} // Use a unique key for each item
                    group={todo.group}
                    todoTitle={todo.todo} // Assuming 'todo' contains the title
                    isChecked={todo.isChecked}
                    description={todo.description} // Add this if it exists in your todo object
                />
            ))}

            {}
            <div className="addNewToDo-container">
                <input type="text" 
                    className="addNewToDo-input" 
                    placeholder=" " 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {handleKeyDown(e, inputValue, groupTitle)}}
                />
                <label className="addNewToDo-label">New</label>
            </div>

        </div>
    )
}