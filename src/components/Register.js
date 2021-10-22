import React, { useState } from "react";
import { register } from "../config/service";
function Register(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    errMsg: "",
  });
  const handler = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const loginData = (event) => {
    event.preventDefault();
    let formData = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    register(formData).then((res) => {
      if (res.data.err === 0) {
        localStorage.setItem("token", res.data.token);
        //redirect
        props.history.push("/dashboard");
      }
      if (res.data.err === 1) {
        setState({ ...state, errMsg: res.data.msg });
      }
    });
  };
  return (
    <div>
      <header className="jumbotron">
        <h1 className="text-center"> Admin Panel</h1>
      </header>
      <section className="container">
        {state.errMsg !== "" && (
          <div className="alert alert-danger">{state.errMsg}</div>
        )}
        <form onSubmit={loginData}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handler}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handler}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handler}
            />
          </div>
          <div className="form-group">
            <input type="checkbox" name="check" />
            <label>Remember Me</label>
          </div>
          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </section>
    </div>
  );
}

export default Register;
