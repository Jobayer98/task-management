import { useState } from "react";
import classes from "./Modal.module.css";

function Modal() {
  return (
    <div className={classes.backdrop}>
      <div className="fixed bg-white py-4 px-6 rounded shadow border w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button className="fixed top-2 right-4 bg-gray-200 p-2 rounded">
          Save
        </button>
        <h1 className="text-xl font-medium my-3">Task title</h1>
        <p className="my-2">Task description</p>
        <p>task status</p>
      </div>
    </div>
  );
}

export default Modal;
