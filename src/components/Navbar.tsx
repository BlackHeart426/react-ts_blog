import React from 'react'
import Avatar from '@material-ui/core/Avatar'

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper white">
      <a href="#" className="brand-logo black-text mx1">
        TS Blog
        </a>
      <ul className="right hide-on-med-and-down">
        <li><a className="waves-light btn white black-text bold">Create page</a></li>
        <li className="my12">
          <Avatar>H</Avatar>
          </li>
        <li>
          <a className="dropdown-trigger black-text " href="#!" data-target="dropdown1">
            Profile
           
            <i className="material-icons right">
              arrow_drop_down
            </i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
)         