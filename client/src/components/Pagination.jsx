import React from "react";

function Pagination() {
  return (
    <div className="flex justify-center items-center mb-3">
      <div className="join">
        <button className="join-item btn btn-sm">1</button>
        <button className="join-item btn btn-sm btn-active">2</button>
        <button className="join-item btn btn-sm">3</button>
        <button className="join-item btn btn-sm">4</button>
      </div>
    </div>
  );
}

export default Pagination;
