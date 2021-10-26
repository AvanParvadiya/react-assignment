import React, { useState } from "react";
import TutorialDataService from "../services/UserService";

const AddTutorial = (props) => {
  const initialTutorialState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    job: "",
  };
  const [user, setUser] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      job: user.job,
    };

    TutorialDataService.create(data)
      .then((response) => {
        setUser({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          job: response.data.job,
        });
        props.addnewUser({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          job: response.data.job,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setUser(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">First name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={user.first_name}
              onChange={handleInputChange}
              name="first_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Last name</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={user.last_name}
              onChange={handleInputChange}
              name="last_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Email</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={user.job}
              onChange={handleInputChange}
              name="job"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
