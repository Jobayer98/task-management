function Pagination({ perPage, totalTask, onChangePage }) {
  const pages = Math.ceil(totalTask / perPage);
  return (
    <div className="flex justify-center items-center mb-3">
      <div className="join">
        {pages
          ? [...Array(pages)].map((_, index) => (
              <input
                type="button"
                className={`join-item btn btn-sm `}
                key={index}
                value={index + 1}
                onClick={() => onChangePage(index + 1)}
              />
            ))
          : 1}
      </div>
    </div>
  );
}

export default Pagination;
