import { useState } from "react";
import {fetchToDos, postNewToDo, deleteToDoItem} from './utils';

const onToDoItemClick = async (todoID) => {
    await deleteToDoItem(todoID);
}

export default function ToDoItem({id, todoTitle, isChecked, description=""}) {
    return (
        <label id={id} className="ToDoItem">
            <input type="checkbox" 
            value="dasd"
            onChange={() => {onToDoItemClick(id)}}/> {todoTitle} {isChecked} {description}
        </label>
    );
}