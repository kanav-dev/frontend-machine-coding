import { useState } from 'react'

export default function App() {
  const [item, setItem] = useState({
    value: '',
    id: 0,
    isEdit: false,
  });
  const [list, setList] = useState([]);

  const addItem = () => {
    setList(prevItems => [...prevItems, {...item, id: item.id+1}])
    setItem(prevItem => ({ value: '', id: prevItem.id+1}))
  }

  const handleEditInputChange = (e, id) => {
    const updatedList = list.map(listItem => listItem.id === id ? {...listItem, value: e.target.value} : listItem)
    setList(updatedList)
  }

  const editItem = (id) => {
      const updatedList = list.map(listItem => listItem.id === id ? {...listItem, isEdit: !listItem.isEdit} : listItem)
      setList(updatedList)
  }

  const deleteItem = (id) => {
    const filterList = list.filter(({id: itemId}) => itemId !== id)
    setList(filterList)
  }

  const displayList = () => (
      list.map(({value, id, isEdit}) => <div key={id} style={{display: 'flex', gap: 10, alignItems: 'center', height: '50px'}} >
        <div>
      {isEdit ? 
      <input id={id} name={id} onChange={e => handleEditInputChange(e, id)} value={value}/> 
      : <p>{value}</p>
      }
      </div>
      <button onClick={() => editItem(id)}>{isEdit ? 'Save': 'Edit'}</button>
      <button onClick={() => deleteItem(id)}>Delete</button>
      </div>
      )
      )


  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>TODO LIST</h1>
      <div style={{display: 'flex', gap: 10}}>
        <input onChange={e => setItem(prevItem => ({...prevItem, value: e.target.value}) )} value={item.value}/>
        <br/>
        <button onClick={addItem} disabled={!item.value}>Add Item</button>
      </div>
      <br/>
      {displayList()}
      </div>
  );
}
