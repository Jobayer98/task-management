import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:3000/api/v1/get-tasks?limit=10", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTasks(response.data.tasks);
        });
    })();
  }, []);

  const content = tasks.map((task) => {
    return (
      <div
        key={task._id}
        className="bg-blue-50 py-4 px-6 rounded shadow border"
      >
        <h1 className="text-xl font-medium mb-2">{task.title}</h1>
        <p>{task.description}</p>
        <p
          className={`mt-4 border inline-block px-2 pt-1 pb-2 rounded ${
            task.status === "completed"
              ? "bg-green-500 text-white"
              : task.status === "in-progress"
              ? "bg-yellow-500 text-white"
              : "bg-red-400 text-white"
          }`}
        >
          {task.status}
        </p>
      </div>
    );
  });
  return (
    <>
      <div>{showModal && <Modal />}</div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-8">
        {content}
      </div>
    </>
  );
}

export default TasksList;
