import React, { useEffect, useState } from 'react'

const TopBidings = () => {

    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter =>{
        setFilter(filter);
    };

    
    const fetchData = () => {
        fetch("http://localhost:4000/topselling")
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
    <div className='card top-se'>
      
    </div>
  )
}

export default TopBidings
