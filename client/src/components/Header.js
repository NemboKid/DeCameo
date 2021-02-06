import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation, BrowserRouter as Link, Route, NavLink } from 'react-router-dom';
import { render } from "react-dom";
import logo from "./../img/svg/green/default-monochrome.svg";

const Header = (props) => {
    const history = useHistory();

    return (
        <header className="header-scrolled">
          <div className="header-outer">
            <div className="header-inner">
              <a href="/">
                <img src={logo}/>
              </a>
              <nav>
                <ul>
                  <li>
                    <NavLink
                      exact
                      to="/"
                      activeClassName="nav-link-active"
                      className="nav-link">Home</NavLink>
                    <NavLink
                      exact
                      to="/about"
                      activeClassName="nav-link-active"
                      className="nav-link">About</NavLink>
                    <NavLink
                      exact
                      to="/video"
                      activeClassName="nav-link-active"
                      className="nav-link">Video</NavLink>
                    <NavLink
                      exact
                      to="/register"
                      activeClassName="nav-link-active"
                      className="nav-link nav-login">Register</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
    );
}
export default Header;
