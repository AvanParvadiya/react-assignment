import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import UserService from "../services/UserService";

const UsersList = (props) => {
  const [searchTitle, setSearchTitle] = useState("");
  const usersRef = useRef();

  usersRef.current = props.users;
  const history = useHistory();
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };


 

  const findByTitle = () => {
    props.searchUser(searchTitle);
  };

  const openUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;
    history.push("/getuser", { id: id });
  };

  const deleteUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    UserService.remove(id)
      .then((response) => {
        if (response.status === 204) props.deleteUser(rowIndex);
        else alert("Some thing went wrong");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by first name / last name / email"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>User profile</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {props.filterUsers.map((tableData, rowIndex) => (
              <tr key={rowIndex}>
                <td key={rowIndex}>
                  <img src={tableData.avatar} alt={tableData.first_name} />
                </td>
                <td>{tableData.first_name}</td>
                <td>{tableData.last_name}</td>
                <td>{tableData.email}</td>
                <td>
                  <div>
                    <span onClick={() => openUser(rowIndex)}>
                      <i className="far fa-edit action mr-2"></i>
                    </span>

                    <span onClick={() => deleteUser(rowIndex)}>
                      <i className="fas fa-trash action"></i>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
