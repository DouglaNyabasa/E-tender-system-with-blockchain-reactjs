import React, { useState } from 'react'
import './Report.css'
import CardFilter from '../Cards/CardFilter'
import ReportCharts from '../ReportCharts/ReportChats';


const Report = () => {
    const [filter, setFilter] = useState("Today");
    const handleFilterChange = (filter) => {
      setFilter(filter);
    };
  return (
    <div className='card'>
      <CardFilter filterChange={handleFilterChange}/>
      <div className="card-body">
        <h5 className='card-title'>
            Report <span>/{filter}</span>
        </h5>
        <ReportCharts/>
      </div>
    </div>
  )
}

export default Report
