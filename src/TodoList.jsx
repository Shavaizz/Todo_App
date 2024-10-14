import { useRef } from "react";
import { useState } from "react";

export default function TodoList(){

    const tasksObject = [
        {key:1, title:"Deploy World", done:false}
    ]
    const [userInput, setUserInput] = useState("");
    const [tasks, setTasks] = useState(tasksObject);
    let nextId = useRef(2);
    const taskAppend = ()=>{
        if (userInput.trim() === "")return;
        setTasks([
            ...tasks,{
                id:nextId.current++,
                title:userInput,
                done:false,
            }    
        ]);
    setUserInput("")
    }
    function tasksRemove(taskKey){
        setTasks(
            tasks.filter(t => t.id !== taskKey)
        )
    }
    return(
        <>
        <section className="TodolistwWrapper">
            <input 
                placeholder="Add todo"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
            />
            <div id="buttonsdiv">
                <button 
                id="addButton"
                type="button"
                onClick={taskAppend}
                >
                    Add Task
                </button>
            </div>
        </section>
        <section className="Tasksview">
            <div id="tasklist">
                {tasks.map(task=>{
                    return(
                        <div key={task.key} id="taskInduvidualWrapper">
                            {task.title}
                            <button 
                            id="taskCompleteButton"
                            onClick={()=> tasksRemove(task.id)}
                            >
                                Task Completed
                            </button>
                        </div>
                    )
                })}
            </div>
        </section>

        </>
    )
}