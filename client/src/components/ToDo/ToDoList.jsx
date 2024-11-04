
import { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {fetchToDos, postNewToDo} from './utils';

import ToDoGroup from "./ToDoGroup";

// Function to chunk array into smaller arrays of specified size
const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };


export default function ToDoList(){
    
    const [groups, setGroups] = useState([]); 
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        const setGroupEffect = async () => {
            const response = await fetchToDos();
            let groups = new Set(response.data.map(todo => todo.group));
            
            setGroups([...groups])
        }
        setGroupEffect();
    }, [groups]);

    const addNewToDo = async (ToDo) => {
        await postNewToDo(ToDo)
    }

    const groupChunks = chunkArray(groups, 3);
    return (
        <Container className='MainPage'>
            <Row>
                <Col>
                    <input type="text" 
                    placeholder="Group Name"
                    onChange={(e) => {setGroupName(e.target.value)}}/>

                    <button onClick={async () => {
                        await addNewToDo({"group": groupName, "todo": "New ToDO","isChecked": false})}}>Create New Group</button>
                </Col>
            </Row>
            {groupChunks.map((groupChunk, index) => (
                <Row key={index}>
                {groupChunk.map((group, idx) => (
                    <Col key={idx}>
                    <ToDoGroup groupTitle={group} />
                    </Col>
                ))}
                </Row>
            ))}
      </Container>
    )
}