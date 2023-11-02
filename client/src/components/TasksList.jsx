import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";
import Header from "./Header";
import CreateTask from "./CreateTask";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [change, setChanged] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [perPage, setPerPage] = useState(8);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `http://localhost:3000/api/v1/tasks?limit=${perPage}&status=${status}&sortBy=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTasks(response.data.tasks);
        });
    })();
  }, [change, perPage, status, sort]);

  const handleIsChangeTask = () => {
    setChanged(!change);
  };

  const content = tasks.map((task) => (
    <Task key={task._id} task={task} isChanged={handleIsChangeTask} />
  ));
  return (
    <>
      <div>
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
      </div>
      <div className="flex gap-8 justify-end items-center p-4 border-2 mt-2">
        <div>
          <label htmlFor="sort">Sort by created</label>
          <select
            value={sort}
            className="bg-gray-100 rounded outline-none border border-gray-400 ml-2"
            name="sort"
            id=""
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label htmlFor="">Show per page</label>
          <input
            className="bg-gray-100 rounded outline-none border border-gray-400 ml-2 text-center"
            value={perPage}
            type="number"
            min="1"
            max="50"
            onChange={(e) => setPerPage(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="">Status</label>
          <select
            className="bg-gray-100 rounded outline-none border border-gray-400 ml-2"
            value={status}
            name="status"
            id=""
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-8">
        {content}
      </div>
    </>
  );
}

export default TasksList;
