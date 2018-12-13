import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import "bootstrap";

import Home from "./home.jsx";
import Example1 from "./example1.jsx";
import Example2 from "./example2.jsx";

import "bootstrap/dist/css/bootstrap.min.css";


function Link(props) {
  return (
    <NavLink className="dropdown-item link" to={props.to}>
      {props.header}
    </NavLink>
  );
}

function Dropdown(props) {
  return (
    <ul className="navbar-nav ">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.title}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {props.children}
        </div>
      </li>
    </ul>
  );
}

function Navbar() {
  return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/">
      React Phylotree
    </NavLink>
    <Dropdown title="Examples">
      <Link to="/example1" header="Example 1" />
      <Link to="/example2" header="Example 2" />
    </Dropdown>
  </nav>);
}

function App() {
  return (<BrowserRouter>
    <div>
      <Navbar />
      <div style={{ maxWidth: 1140 }} className="container-fluid">
        <Route exact path="/" component={Home} />
        <Route path="/example1" component={Example1} />
        <Route path="/example2" component={Example2} />
      </div>
    </div>
  </BrowserRouter>);
}

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement("div"))
);

