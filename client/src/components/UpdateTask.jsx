import { useState } from "react";
import { toast } from "react-hot-toast";
import classes from "./Modal.module.css";
import axios from "axios";

function UpdateTask({ onClose, task, isChanged }) {
  const [updateTask, setUpdateTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/tasks/${task._id}`,
        updateTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const notify = () => toast.success("Task deleted successfully");
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
      <div className="fixed bg-white py-2 px-6 rounded shadow border w-1/3 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
          <label htmlFor="title" className="text-xl font-medium mb-2 block">
            Title
          </label>
          <input
            type="text"
            value={updateTask.title}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, title: e.target.value })
            }
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
            value={updateTask.description}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, description: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            className="outline-none p-2 border ml-3"
            id=""
            value={updateTask.status}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, status: e.target.value })
            }
          >
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">completed</option>
          </select>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleUpdateTask}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
