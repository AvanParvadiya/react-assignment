import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { useHistory } from "react-router";

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
  // props.match.params.id, props.history.location.pathname
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  

  const updateTutorial = () => {
    UserService.update(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    UserService.remove(currentUser.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/users");
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

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
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
