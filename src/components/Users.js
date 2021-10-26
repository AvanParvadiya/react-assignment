import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { useHistory } from "react-router";
import  { Link } from "react-router-dom";
const Users = (props) => {
  const initialUserState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
  };
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getTutorial = (id) => {
    UserService.get(id)
      .then((response) => {
        setCurrentUser(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(history.location.state.id);
  }, [history.location.state.id]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateTutorial = () => {
    UserService.update(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data);
        props.onUpdate(response.data,response.data.id);
        setMessage("The user was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>Update User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="first_name">First name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={currentUser.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={currentUser.last_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          
          <Link to={"/Users"} className="nav-link">{message}</Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Users;
