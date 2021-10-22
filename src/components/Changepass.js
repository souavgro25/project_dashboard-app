import React, { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { changePassword } from "../config/service";
import jwt_decode from "jwt-decode";
export default function Changepass() {
  const [state, setState] = useState({
    op: "",
    np: "",
    cp: "",
    errMsg: "",
    succMsg: "",
  });
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const postData = (event) => {
    event.preventDefault();
    if (state.np === state.cp) {
      let token = localStorage.getItem("token");
      let decode = jwt_decode(token);
      let uid = decode.email;
      let formData = {
        op: state.op,
        np: state.np,
        uid: uid,
      };
      changePassword(formData).then((res) => {
        if (res.data.err === 0) {
          setState({ ...state, succMsg: res.data.msg });
        }
        if (res.data.err === 1) {
          setState({ ...state, errMsg: res.data.msg });
        }
      });
    } else {
      setState({ ...state, errMsg: "New pass and Con Pass is not match" });
    }
  };
  return (
    <main>
      <header>
        <Nav />
      </header>
      <section className="row container">
        <div className="col-sm-4">
          <Sidebar />
        </div>
        <div className="col-sm-8">
          <h2> Change password</h2>
          {state.errMsg !== "" && (
            <div className="alert alert-danger">{state.errMsg}</div>
          )}
          {state.succMsg !== "" && (
            <div className="alert alert-success">{state.succMsg}</div>
          )}
          <form onSubmit={postData}>
            <div className="form-group">
              <label> Old Password</label>
              <input
                type="password"
                name="op"
                className="form-control"
                onChange={handler}
              />
            </div>
            <div className="form-group">
              <label> New Password</label>
              <input
                type="password"
                name="np"
                className="form-control"
                onChange={handler}
              />
            </div>
            <div className="form-group">
              <label> Confirm Password</label>
              <input
                type="password"
                name="cp"
                className="form-control"
                onChange={handler}
              />
            </div>
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
        </div>
      </section>
    </main>
  );
}
