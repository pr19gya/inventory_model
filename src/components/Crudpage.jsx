import React, { useState, useEffect } from 'react';

const CrudComponent = () => {
  const [data, setData] = useState({ orders: [], items: [] });
  const [newItem, setNewItem] = useState({ name: '', stock: '' });
  const [editItem, setEditItem] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Load data from JSON file or localStorage
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

  // Create new item
  const createItem = (item) => {
    const newData = { ...data, items: [...data.items, { ...item, id: Date.now() }] };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

  // Update item
  const updateItem = (id, updatedItem) => {
    const newItems = data.items.map((item) => (item.id === id ? updatedItem : item));
    const newData = { ...data, items: newItems };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

  // Delete item
  const deleteItem = (id) => {
    const newItems = data.items.filter((item) => item.id !== id);
    const newData = { ...data, items: newItems };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

  // Handle item form input change
  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Handle item form submit
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

  // Start editing an item
  const startEditingItem = (item) => {
    setNewItem(item);
    setEditItem(item);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter orders based on status
  const filteredOrders = statusFilter === 'All' ? data.orders : data.orders.filter(order => order.status === statusFilter);

  // Mark order as completed
  const markOrderCompleted = (id) => {
    const updatedOrders = data.orders.map(order =>
      order.id === id ? { ...order, status: 'Completed' } : order
    );
    const newData = { ...data, orders: updatedOrders };
    setData(newData);
    localStorage.setItem('crudData', JSON.stringify(newData));
  };

  return (
    <div>
      <h1>CRUD Operations for Items</h1>
      <form onSubmit={handleItemFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleItemInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={newItem.stock}
          onChange={handleItemInputChange}
        />
        <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button>
      </form>

      <ul>
        {data.items.map((item) => (
          <li key={item.id}>
            {item.name} - Stock: {item.stock}
            <button onClick={() => startEditingItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h1>Order Details</h1>
      <label htmlFor="statusFilter">Filter by Status:</label>
      <select id="statusFilter" value={statusFilter} onChange={handleStatusFilterChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            {order.customer} - Status: {order.status}
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            {order.status === 'Pending' && (
              <button onClick={() => markOrderCompleted(order.id)}>Mark as Completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudComponent;
