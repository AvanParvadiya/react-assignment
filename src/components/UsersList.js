import React, { useState, useEffect, useMemo, useRef } from "react";
import TutorialDataService from "../services/UserService";

const UsersList = (props) => {
  const [users, setusers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const usersRef = useRef();

  usersRef.current = users;

  useEffect(() => {
    retrieveusers();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveusers = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setusers(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveusers();
  };

  const removeAllusers = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then((response) => {
        setusers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTutorial = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    props.history.push("/users/" + id);
  };

  const deleteTutorial = (rowIndex) => {
    console.log(rowIndex);
    const id = usersRef.current[rowIndex].id;

    TutorialDataService.remove(id)
      .then((response) => {
        props.history.push("/users");

        let newusers = [...usersRef.current];
        newusers.splice(rowIndex, 1);

        setusers(newusers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
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
            {console.log(users)}
            {users.map((tableData, rowIndex) => (
              <tr key={rowIndex}>
                <td key={rowIndex}>
                  <img src={tableData.avatar} />
                </td>
                <td>{tableData.first_name}</td>
                <td>{tableData.last_name}</td>
                <td>{tableData.email}</td>
                <td>
                  <div>
                    <span onClick={() => openTutorial(rowIndex)}>
                      <i className="far fa-edit action mr-2"></i>
                    </span>

                    <span onClick={() => deleteTutorial(rowIndex)}>
                      <i className="fas fa-trash action"></i>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllusers}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default UsersList;
