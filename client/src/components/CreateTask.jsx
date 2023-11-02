import { useState } from "react";
import { toast } from "react-hot-toast";
import classes from "./Modal.module.css";
import axios from "axios";
import { axiosInstance } from "../utils/axios";

function CreateTask({ onClose, isChanged }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const btnDisable =
    task.title.trim().length > 0 &&
    task.description.trim().length > 0 &&
    task.title &&
    task.description
      ? false
      : true;

  const handleCreateTask = async () => {
    try {
      const response = await axiosInstance.post(`/task`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const notify = () => toast.success("Task created successfully");
        notify();
        onClose();
        isChanged();
      }
    } catch (error) {
      const notify = () => toast.error(error.response.data.message);
      notify();
      onClose();
    }
  };
  return (
    <div onClick={handleClose} className={classes.backdrop}>
      <div className="fixed bg-white py-2 px-6 rounded shadow border w-1/2 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
          <label htmlFor="title" className="text-xl font-medium mb-2 block">
            Title
          </label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="text-xl font-medium mb-2 outline-none p-2 w-full rounded bg-gray-200 "
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block">
            Description
          </label>
          <textarea
            type="text"
            className="outline-none p-2 w-full rounded bg-gray-200 resize-none"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <div className="mt-8 text-right">
          <button
            onClick={handleCreateTask}
            disabled={btnDisable}
            className={`bg-gray-600 ${
              btnDisable && "cursor-not-allowed"
            } hover:bg-gray-700 text-white px-4 py-2 rounded`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
