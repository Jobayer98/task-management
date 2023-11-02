import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

function Header({ setTasks }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/tasks?search=${searchText}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      const notify = () => toast.error(error.response.data.message);
      notify();
      onClose();
    }
  };
  return (
    <div className="py-4 bg-gray-200 px-20">
      <div className="flex justify-between items-center">
        <form onSubmit={handleSearch} className="w-full">
          <input
            className="p-3 rounded w-1/2 mr-3 outline-gray-400"
            type="search"
            placeholder="Search your task"
            aria-label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 px-3 bg-gray-200 border border-gray-400 rounded hover:bg-white transition-all duration-300 ease-in"
          >
            Search
          </button>
        </form>
        <div>
          <button className="p-3 px-3 w-32 bg-gray-200 rounded border border-gray-400 hover:bg-white transition-all duration-300 ease-in">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
