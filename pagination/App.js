import { useEffect, useState } from "react";
import "./styles.css";

export default function Pagination() {
  const [data, setData] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const isFirstPage = currPage === 1;
  const isLastPage = currPage === 10;

  const getApiData = async (page = 1) => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${
        (page - 1) * 10
      }&select=title,price`
    );
    const result = await response.json();
    setData(result?.products);
  };

  const handlePageChange = (dir) => {
    const getUpdatedPage = (page) => page + (dir === "next" ? 1 : -1);
    getApiData(getUpdatedPage(currPage));
    setCurrPage((prevPage) => getUpdatedPage(prevPage));
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Pagination</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ id, title, price }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => handlePageChange("prev")} disabled={isFirstPage}>
          Prev
        </button>
        <p>{`Page ${currPage} of 10`}</p>
        <button onClick={() => handlePageChange("next")} disabled={isLastPage}>
          Next
        </button>
      </div>
    </div>
  );
}
