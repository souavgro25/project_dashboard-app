import React, { useState } from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
// import {Link} from 'react-router-dom'
import { editCategory } from "../config/service";
export default function AddCategory(props) {
  const { id } = props.match.params;
  const [state, setState] = useState({
    cname: "",
    imagePath: "",
    errMsg: "",
    msg: "",
  });
  const handler = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const upload = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] });
    }
  };
  const addCat = (event) => {
    event.preventDefault();
    if (state.imagePath === "") {
      setState({ ...state, errMsg: "Please slect a image" });
    } else {
      if (
        state.imagePath.type === "image/jpg" ||
        state.imagePath.type === "image/jpeg" ||
        state.imagePath.type === "image/png"
      ) {
        //when u upload any document we can use FormData
        let formData = new FormData();
        formData.append("cname", state.cname);
        formData.append("attach", state.imagePath);
        editCategory(id, formData).then((res) => {
          console.log(res.data);
          setState({ ...state, msg: res.data.msg });
        });
      } else {
        setState({ ...state, errMsg: "Only supported jpg or png images" });
      }
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
          <h2> EditCategory</h2>
          {state.errMsg !== "" && (
            <div className="alert alert-danger">{state.errMsg}</div>
          )}
          {state.msg !== "" && (
            <div className="alert alert-success">{state.msg}</div>
          )}
          <form onSubmit={addCat}>
            <div className="form-group">
              <label>Cname</label>
              <input
                type="text"
                name="cname"
                class="form-control"
                onChange={handler}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                name="file"
                class="form-control"
                onChange={upload}
              />
            </div>
            <input type="submit" value="Submit" className="btn btn-success" />
          </form>
        </div>
      </section>
    </main>
  );
}
