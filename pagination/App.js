// https://codesandbox.io/s/pagination-hmrhvc

import { useEffect, useState } from "react";
import "./styles.css";

export default function Pagination() {
  const [data, setData] = useState({});
  const { status, total, products = [] } = data;
  const [currPage, setCurrPage] = useState(1);
  const PER_PAGE_LIMIT = 10;
  const isLoading = status === "loading";
  const pageCount = Math.ceil(total / PER_PAGE_LIMIT);
  const isFirstPage = currPage === 1;
  const isLastPage = currPage === pageCount;

  const getApiData = async (page = 1) => {
    setData((prevData) => ({ ...prevData, status: "loading" }));
    const response = await fetch(
      `https://dummyjson.com/products?limit=${PER_PAGE_LIMIT}&skip=${
        (page - 1) * PER_PAGE_LIMIT
      }&select=title,price`
    );
    const result = await response.json();
    setData((prevData) => ({
      ...prevData,
      ...result,
      status: "success",
      products: [
        ...(prevData?.products ? prevData?.products : []),
        ...result?.products
      ]
    }));
  };

  const handlePageChange = (dir) => {
    const isNextPage = dir === "next";
    const getUpdatedPage = (page) => page + (isNextPage ? 1 : -1);
    const isApiCallNeeded =
      Math.min(total, getUpdatedPage(currPage) * PER_PAGE_LIMIT) >
      products?.length;
    if (isNextPage && isApiCallNeeded) getApiData(getUpdatedPage(currPage));
    setCurrPage((prevPage) => getUpdatedPage(prevPage));
  };

  useEffect(() => {
    getApiData();
  }, []);

  const displayProducts = () => {
    const slicedList = products?.slice(
      (currPage - 1) * PER_PAGE_LIMIT,
      currPage * PER_PAGE_LIMIT
    );
    return slicedList?.map(({ id, title, price }) => (
      <tr key={id}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{price}</td>
      </tr>
    ));
  };

  return (
    <div className="App">
      <h1>Pagination</h1>
      {isLoading ? (
        <div className="loader-outer">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>{displayProducts()}</tbody>
          </table>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={() => handlePageChange("prev")}
              disabled={isFirstPage}
            >
              Prev
            </button>
            <p>{`Page ${currPage} of ${pageCount}`}</p>
            <button
              onClick={() => handlePageChange("next")}
              disabled={isLastPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
