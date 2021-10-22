import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import { editProduct } from "../../config/ProductService";
import { getAllCategory } from "../../config/service";

function Editproduct(props) {
  const { id } = props.match.params;
  const [state, setState] = useState({
    name: "",
    price: "",
    quantity: "",
    features: "",
    imagePath: "",
    category_id: "",
    errMsg: "",
    msg: "",
  });
  const [category, setcategory] = useState([]);
  useEffect(() => {
    getAllCategory().then((res) => {
      if (res.data.err === 0) {
        setcategory(res.data.catdata);
      }
    });
  }, []);
  const handler = (event) => {
    let { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  const upload = (event) => {
    if (event.target.files.length > 0) {
      setState({ ...state, imagePath: event.target.files[0] });
    }
  };
  const addProduct = (event) => {
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
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("price", state.price);
        formData.append("quantity", state.quantity);
        formData.append("features", state.features);
        formData.append("category_id", state.category_id);
        formData.append("attach", state.imagePath);
        editProduct(id, formData).then((res) => {
          console.log(res.data);
          setState({ ...state, msg: res.data.msg });
        });
        console.log(state);
      } else {
        setState({ ...state, errMsg: "Only supported jpg or png images" });
      }
    }
  };
  return (
    <div>
      <div>
        <main>
          <header>
            <Nav />
          </header>
          <section className="row container">
            <div className="col-sm-4">
              <Sidebar />
            </div>
            <div className="col-sm-8">
              <h2> EditProduct</h2>
              {state.errMsg !== "" && (
                <div className="alert alert-danger">{state.errMsg}</div>
              )}
              {state.msg !== "" && (
                <div className="alert alert-success">{state.msg}</div>
              )}
              <form onSubmit={addProduct}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    onChange={handler}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    class="form-control"
                    onChange={handler}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    class="form-control"
                    onChange={handler}
                  />
                </div>
                <div className="form-group">
                  <label>features</label>
                  <input
                    type="text"
                    name="features"
                    class="form-control"
                    onChange={handler}
                  />
                </div>
                <div className="form-group">
                  <label>category</label>
                  <select
                    name="category_id"
                    class="form-select"
                    aria-label="Default select example"
                    onChange={handler}
                  >
                    <option selected>Open this select menu</option>
                    {category.map((cat, index) => (
                      <option key={index} value={cat._id}>
                        {cat.cname}
                      </option>
                    ))}
                  </select>
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
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success"
                />
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Editproduct;
