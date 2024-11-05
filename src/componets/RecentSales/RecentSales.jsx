import React, { useEffect, useState } from 'react'
import './RecentSales.css'
import CardFilter from '../Cards/CardFilter'
import RecentSalesTable from '../RecentSalesTable/RecentSalesTable'
const RecentSales = () => {

    const [items,setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter =>{
        setFilter(filter);
    };

    const fetchData = () => {
        fetch("http://localhost:4000/recentsales")
          .then((res) => res.json())
          .then((data) => {
            setItems(data);
          })
          .catch((e) => console.log(e.message));
      }; 

      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div className='card recent-sales overflow-auto'>
        <CardFilter filterChange={handleFilterChange}/>

        <div className="card-body">
            <h5 className='card-title'>
                Recent Transactions <span>| {filter}</span>
            </h5>
            <RecentSalesTable items={items}/>
        </div>
      
    </div>
  )
}

export default RecentSales
