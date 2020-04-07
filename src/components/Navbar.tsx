import React from 'react'
import Avatar from '@material-ui/core/Avatar'

export const Navbar: React.FC = () => (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper white ">
          <a href="#" className="black-text mx1">

            TS Blog
          </a>
          <a className="waves-light  btn white black-text bold ">
            <i className="material-icons left btnDrawer">dehaze</i>
            My subscribers</a>
          <ul className="right hide-on-med-and-down">
            <li><a className="waves-light btn white black-text bold">Create page</a></li>
            <li className="my12">
              <Avatar>H</Avatar>
            </li>
            <li>
              <a className="dropdown-trigger black-text " data-target="dropdown1">
                Profile

                <i className="material-icons right">
                  arrow_drop_down
                </i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
)