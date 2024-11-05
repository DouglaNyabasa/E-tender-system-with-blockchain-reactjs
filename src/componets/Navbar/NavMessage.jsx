import React from 'react'

const NavMessage = () => {
  return (
   <li className='nav-item dropdown'>
    <a href="#" className='nav-link nav-icon' data-bs-toggle='dropdown'>
        <i className='bi bi-chat-left-text'></i>
        <span className='badge bg-success badge-number '>5</span>
    </a>
    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notification">
        <li className="dropdown-header">
          You have 4 new messages
          <a href="#">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-warning"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Random text</p>
            <p>30 min. ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="notification-item">
          <i className="bi bi-x-circle text-danger"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Random text</p>
            <p>30 min. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        <li className="notification-item">
          <i className="bi bi-info-circle text-primary"></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Random text</p>
            <p>30 min. ago</p>
          </div>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
          <a href="#">Show all notification</a>
        </li>
      </ul>
   </li>
  )
}

export default NavMessage
