import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteTask";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
  }, [showModal]);

  const onOpenModal = async (id) => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const content = tasks.map((task) => {
    return (
      <div
        key={task._id}
        className="bg-blue-50 py-4 px-6 rounded shadow border"
      >
        <div className="float-right tooltip" data-tip="update">
          <AiOutlineEdit className="text-xl cursor-pointer ml-3" />
        </div>
        <div
          onClick={() => onOpenModal()}
          className="float-right tooltip"
          data-tip="delete"
        >
          <MdDeleteOutline className="text-xl cursor-pointer " />
        </div>
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
        <div>
          {showModal && <DeleteModal onClose={onCloseModal} id={task._id} />}
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-8">
        {content}
      </div>
    </>
  );
}

export default TasksList;
