import React, { useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddUser from "./components/AddUser";
import Users from "./components/Users";

import UsersList from "./components/UsersList";

import UserService from "./services/UserService";
import NoComponenet from "./components/NoComponenet";

function App() {
  const [users, setusers] = useState([]);
  const [filterUsers, setFilter] = useState([]);
  const usersRef = useRef();
  usersRef.current = users;
  useEffect(() => {
    retrieveusers();
  }, []);

  const retrieveusers = () => {
    UserService.getAll()
      .then((response) => {
        setusers(response.data.data);
        setFilter(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchUser = (searchTitle) => {
    setFilter(
      users.filter(
        (user) =>
          user.first_name.toUpperCase().includes(searchTitle.toUpperCase()) ||
          user.last_name.toUpperCase().includes(searchTitle.toUpperCase()) ||
          user.email.toUpperCase().includes(searchTitle.toUpperCase())
      )
    );
  };

  const deleteUser = (rowIndex) => {
    let newusers = [...usersRef.current];
    newusers.splice(rowIndex, 1);
    setusers(newusers);
    setFilter(newusers);
  };

  const addnewUser = (addnewUser) => {
    
    setusers((prvUser) => {
      return [...prvUser, addnewUser];
    });
    setFilter((prvUser) => {
      return [...prvUser, addnewUser];
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          AvanParvadiya
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Users"} className="nav-link">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/Users"]}>
            <UsersList
              users={users}
              filterUsers={filterUsers}
              retrieveusers={retrieveusers}
              searchUser={searchUser}
              deleteUser={deleteUser}
            />
          </Route>
          <Route exact path="/add">
            <AddUser addnewUser={addnewUser} />
          </Route>
          <Route path="/getuser">
            <Users />
          </Route>
          <Route path="*" component={NoComponenet} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
