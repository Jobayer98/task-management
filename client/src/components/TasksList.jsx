import { useEffect, useState } from "react";
import Task from "./Task";
import Header from "./Header";
import CreateTask from "./CreateTask";
import { axiosInstance } from "../utils/axios";
import Pagination from "./Pagination";
import toast from "react-hot-toast";

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [totalTask, setTotalTasks] = useState(0);
  const [change, setChanged] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    (async () => {
      await axiosInstance
        .get(
          `/tasks?limit=${perPage}&status=${status}&sortBy=${sort}&page=${page}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setTasks(response.data.tasks);
          setTotalTasks(response.data.totalTasks);
        })
        .catch((err) => {
          notify = () => toast.error(err.message);
          notify();
        });
    })();
  }, [change, perPage, sort, page, status]);

  const handleIsChangeTask = () => {
    setChanged(!change);
  };

  if (!tasks.length || !tasks) {
    return (
      <span className="loading loading-spinner text-primary ml-[50%] my-48"></span>
    );
  }

  const content = tasks.map((task) => (
    <Task key={task._id} task={task} isChanged={handleIsChangeTask} />
  ));
  return (
    <>
      <div>
        {showCreateModal && (
          <CreateTask
            isChanged={handleIsChangeTask}
            onClose={() => setShowCreateModal(false)}
          />
        )}
        <Header
          setTasks={setTasks}
          showCreateModal={() => setShowCreateModal(true)}
        />
      </div>

      <div className="flex gap-8 justify-end items-center p-4 border-2 mt-2">
        <div className="text-left">
          <p className="text-lg text-blue-600">Page {page}</p>
        </div>
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
      <Pagination
        perPage={perPage}
        totalTask={totalTask}
        onChangePage={(page) => setPage(page)}
      />
    </>
  );
}

export default TasksList;
