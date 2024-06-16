import React, { useState, useEffect } from 'react';

const CrudComponent = () => {
  const [data, setData] = useState({ orders: [], items: [] });
  
  const [statusFilter, setStatusFilter] = useState('All');

  
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

  
  

  

 
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

 
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
    <div className='bg-[#2a1b3d] h-screen text-center leading-loose '>
     

      <div className='text-gray-300 text-8xl p-[5rem] pb-[3rem]'> Order List</div>
      <div className='text-gray-300 text-2xl p-10 leading-loose'>
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
            //   <button onClick={() => markOrderCompleted(order.id)}>Mark as Completed</button>
              <button onClick={() => markOrderCompleted(order.id)}  className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Mark as Completed
              </span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CrudComponent;
