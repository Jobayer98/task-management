import { useState } from "react";
import { toast } from "react-hot-toast";
import classes from "./Modal.module.css";
import axios from "axios";
import { axiosInstance } from "../utils/axios";

function DeleteTask({ onClose, id, isChanged }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`);
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
      <div className="fixed bg-white py-4 px-6 rounded shadow border w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in">
        <h1 className="text-xl font-medium my-3">
          Are your sure to delete this task?
        </h1>
        <div className="flex justify-center ">
          <button
            onClick={handleDeleteTask}
            className="bg-gray-400 px-4 py-1 rounded"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
