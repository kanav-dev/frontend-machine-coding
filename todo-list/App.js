// https://codesandbox.io/s/todo-list-tkxsjx?file=/src/App.js

import { useState } from "react";

export default function TodoList() {
  const [item, setItem] = useState({
    value: "",
    id: 0,
    isEdit: false,
    isDone: false
  });
  const [list, setList] = useState([]);

  const addItem = () => {
    setList((prevItems) => [
      ...prevItems,
      { ...item, id: new Date().getTime() }
    ]);
    setItem((prevItem) => ({ ...prevItem, value: "" }));
  };

  const updateList = (id, key, value) => {
    const updatedList = list.map((listItem) =>
      listItem.id === id
        ? { ...listItem, [key]: key === "value" ? value : !listItem[key] }
        : listItem
    );
    setList(updatedList);
  };

  const deleteItem = (id) => {
    const filterList = list.filter(({ id: itemId }) => itemId !== id);
    setList(filterList);
  };

  const displayList = () =>
    list.map(({ value, id, isEdit, isDone }) => (
      <div
        key={id}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "50px"
        }}
      >
        <div>
          {isEdit ? (
            <input
              onChange={(e) => updateList(id, "value", e.target.value)}
              value={value}
            />
          ) : (
            <p
              title="Click to mark complete/incomplete"
              onClick={() => updateList(id, "isDone")}
              style={{
                cursor: "pointer",
                ...(isDone && { textDecoration: "line-through" })
              }}
            >
              {value}
            </p>
          )}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => updateList(id, "isEdit")} disabled={!value}>
            {isEdit ? "Save" : "Edit"}
          </button>
          <button onClick={() => deleteItem(id)}>Delete</button>
        </div>
      </div>
    ));

  return (
    <div style={{ margin: "auto", width: "75%" }}>
      <h1>TODO LIST</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <input
          onChange={(e) =>
            setItem((prevItem) => ({ ...prevItem, value: e.target.value }))
          }
          value={item.value}
          style={{ flexBasis: "70%" }}
        />
        <button onClick={addItem} disabled={!item.value}>
          Add Item
        </button>
      </div>
      <br />
      {displayList()}
    </div>
  );
}
