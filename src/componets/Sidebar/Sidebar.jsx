import React from "react";
import "./Sidebar.css";
import navList from "../../data/navitem";


const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a href="/" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>


        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-journal-text"> </i>
            <span>View Tenders</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"> </i>
                <span>Upload Tender</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="bi bi-circle"> </i>
                <span>Remove Tender</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="bi bi-circle"> </i>
                <span>All Tenders</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#transaction-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-cash"> </i>
            <span>View Tender Status</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="transaction-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"> </i>
                <span>Approved</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="bi bi-circle"> </i>
                <span>Rejected</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="bi bi-circle"> </i>
                <span>Pending</span>
              </a>
            </li>
          </ul>
        </li>
    

        <li className="nav-item">
          <a
            href="#"
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
          >
            <i className="bi bi-eye"></i>
            <span>View Biddings</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="forms-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
                 <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>View All Biddings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Approved Biddings</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>View All Suppliers</span>
              </a>
            </li>

              
          </ul>
        </li>

        <li className="nav-item">
          <a
            href="#"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            className="nav-link collapsed"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Visualization</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>General Tables</span>
              </a>
            </li>

            <li>
              <a href="#">
                <i className="bi bi-circle"></i>
                <span>Data Table</span>
              </a>
            </li>
          </ul>
        </li>

        
      </ul>
    </aside>
  );
};

export default Sidebar;
