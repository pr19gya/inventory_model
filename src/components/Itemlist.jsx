import React, { useState, useEffect } from 'react';

const CrudComponent = () => {
  const [data, setData] = useState({ orders: [], items: [] });
  const [newItem, setNewItem] = useState({ name: '', stock: '' });
  const [editItem, setEditItem] = useState(null);
 
  
  useEffect(() => {
    const storedData = localStorage.getItem('crudData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && typeof parsedData === 'object') {
          setData(parsedData);
        } else {
          console.error("Stored data is not an object:", parsedData);
        }
      } catch (e) {
        console.error("Error parsing stored data:", e);
      }
    } else {
      fetch('/data.json')
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData && typeof jsonData === 'object') {
            setData(jsonData);
            localStorage.setItem('crudData', JSON.stringify(jsonData));
          } else {
            console.error("Fetched data is not an object:", jsonData);
          }
        })
        .catch((error) => console.error("Error fetching data.json:", error));
    }
  }, []);

 
  const createItem = (item) => {
    const newData = { ...data, items: [...data.items, { ...item, id: Date.now() }] };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

 
  const updateItem = (id, updatedItem) => {
    const newItems = data.items.map((item) => (item.id === id ? updatedItem : item));
    const newData = { ...data, items: newItems };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

 
  const deleteItem = (id) => {
    const newItems = data.items.filter((item) => item.id !== id);
    const newData = { ...data, items: newItems };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

 
  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

 
  const handleItemFormSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateItem(editItem.id, newItem);
      setEditItem(null);
    } else {
      createItem(newItem);
    }
    setNewItem({ name: '', stock: '' });
  };

  
  const startEditingItem = (item) => {
    setNewItem(item);
    setEditItem(item);
  };

  
 
 

  return (
    <div className='bg-[#2a1b3d] h-full  text-center '>
      <div className='text-gray-300 text-8xl p-[5rem] pb-[3rem]'> Item List</div>
      <div className='w-full flex p-10 text-center justify-center'>
      <form onSubmit={handleItemFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleItemInputChange} 
          className='"block m-5 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newItem.stock}
          onChange={handleItemInputChange}
          className='"block m-5 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
        />
        {/* <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button> */}
        <button type="submit" className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-10 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {editItem ? 'Update Item' : 'Add Item'}
            </span>
            </button>
      </form>
      </div>
        <div className='text-gray-300 text-2xl p-2'>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}>
            {item.name} - Stock: {item.stock}
            
            <button onClick={() => startEditingItem(item)}  className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Edit
            </span>
            </button>
            {/* <button onClick={() => deleteItem(item.id)}>Delete</button> */}
            <button onClick={() => deleteItem(item.id)}  className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Delete
            </span>
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>

  );
};

export default CrudComponent;
