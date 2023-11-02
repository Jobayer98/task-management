import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";
import Header from "./Header";
import CreateTask from "./CreateTask";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [change, setChanged] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
  }, [change]);

  const handleIsChangeTask = () => {
    setChanged(!change);
  };

  const content = tasks.map((task) => (
    <Task key={task._id} task={task} isChanged={handleIsChangeTask} />
  ));
  return (
    <>
      {showCreateModal && (
        <CreateTask
          setChanged={setChanged}
          onClose={() => setShowCreateModal(false)}
        />
      )}
      <Header
        setTasks={setTasks}
        showCreateModal={() => setShowCreateModal(true)}
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-8">
        {content}
      </div>
    </>
  );
}

export default TasksList;
