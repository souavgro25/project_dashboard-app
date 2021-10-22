import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router";
export function Nav(props) {
  const [uid, setUid] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token") !== undefined) {
      let token = localStorage.getItem("token");
      let decode = jwt_decode(token);
      setUid(decode.email);
    } else {
      props.history.push("/");
    }
  }, []);
  const signOut = () => {
    if (window.confirm("Do u want to signout")) {
      localStorage.removeItem("token");
      props.history.push("/");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/dashboard">
        AdminPanel
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <p className="nav-link">
              Home <span className="sr-only">(current)</span>
            </p>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/changepassword">
              Change Password
            </Link>
          </li>
          <li className="nav-item">
            <p className="nav-link">Welcome : {uid}</p>
          </li>
          <li className="nav-item">
            <p className="nav-link " onClick={signOut}>
              Logout
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Nav);
