import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3000/api/v1/tasks?limit=8", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTasks(response.data.tasks);
        });
    })();
  }, [isTaskDeleted]);

  const handleIsDeleteTask = () => {
    setIsTaskDeleted(!isTaskDeleted);
  };

  const content = tasks.map((task) => (
    <Task key={task._id} task={task} isDeleted={handleIsDeleteTask} />
  ));
  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-8">
        {content}
      </div>
    </>
  );
}

export default TasksList;
