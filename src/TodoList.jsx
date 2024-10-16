import { useState, useRef } from "react";

export default function TodoList() {
  const tasksObject = [{ id: 1, title: "Deploy World", done: false }];
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState(tasksObject);
  const [editId, setEditId] = useState(null); // Track which task is being edited
  let nextId = useRef(2);

  const taskAppend = () => {
    if (userInput.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: nextId.current++,
        title: userInput,
        done: false,
      },
    ]);
    setUserInput("");
  };

  function tasksRemove(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  const handleEdit = (task) => {
    setEditId(task.id);
    setUserInput(task.title);
  };

  const saveEdit = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: userInput } : task
      )
    );
    setEditId(null);
    setUserInput("");
  };

  return (
    <>
      <div className="wrapperall">
        <section className="TodolistWrapper">
          <input
            placeholder="Add todo"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <div id="buttonsdiv">
            <button id="addButton" type="button" onClick={taskAppend}>
              Add Task
            </button>
          </div>
        </section>
        <section className="Tasksview">
          <div id="tasklist">
            {tasks.map((task) => (
              <div key={task.id} id="taskIndividualWrapper">
                {editId === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button onClick={() => saveEdit(task.id)}>Save</button>
                  </div>
                ) : (
                  <div>
                    {task.title}
                    <button
                      id="taskCompleteButton"
                      onClick={() => tasksRemove(task.id)}
                    >
                      Task Completed
                    </button>
                    <button
                      id="taskBeingEditedButton"
                      onClick={() => handleEdit(task)}
                    >
                      Edit Task
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
