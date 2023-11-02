import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";

function Task({ task, isChanged }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const onClose = () => {
    setShowDeleteModal(false);
    setShowUpdateModal(false);
  };

  return (
    <div className="bg-gray-100 py-4 px-6 rounded shadow border hover:bg-gray-300 transition-all duration-500 ease-in-out">
      <div
        onClick={() => setShowUpdateModal(true)}
        className="float-right tooltip"
        data-tip="update"
      >
        <AiOutlineEdit className="text-xl cursor-pointer ml-3" />
      </div>
      <div
        onClick={() => setShowDeleteModal(true)}
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
        {showDeleteModal && (
          <DeleteTask onClose={onClose} id={task._id} isChanged={isChanged} />
        )}
        {showUpdateModal && (
          <UpdateTask onClose={onClose} task={task} isChanged={isChanged} />
        )}
      </div>
    </div>
  );
}

export default Task;
