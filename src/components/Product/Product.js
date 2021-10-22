import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import Sidebar from "../Sidebar";
import { MAIN } from "../../config/URL";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllProducts, delProduct } from "../../config/ProductService";
function Product() {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      if (res.data.err === 0) {
        setproduct(res.data.Productdata);
      }
    });
  }, []);

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        delProduct(id).then((res) => {
          if (res.data.err == 0) {
            Swal.fire(res.data.msg);
            getAllProducts().then((res) => {
              if (res.data.err == 0) {
                setproduct(res.data.Productdata);
              }
            });
          } else {
            Swal.fire(res.data.msg);
          }
        });
      }
    });
  };
  return (
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
            <h2>Products</h2>
            <table className="table ">
              <tr>
                <td colspan={5}>
                  <Link
                    to="/dashboard/addproduct/"
                    className="btn bg-success text-white "
                  >
                    Add Products
                  </Link>
                </td>
              </tr>
              {product.length > 0 ? (
                <tr>
                  <th className="px-2">S.no</th>
                  <th className="px-2">Name</th>
                  <th className="px-2">Price</th>
                  <th className="px-2">Quantity</th>
                  <th className="px-2">Features</th>
                  <th className="px-2">Image</th>
                  <th className="px-2">Created At</th>

                  <th className="px-2">Action</th>
                </tr>
              ) : (
                ""
              )}
              {product.map((product, index) => (
                <tr>
                  <td className="text-center px-2">{index + 1}</td>
                  <td className="text-center px-2">{product.name}</td>
                  <td className="text-center px-2">{product.price}</td>
                  <td className="text-center px-2">{product.quantity}</td>
                  <td className="text-center px-2">{product.feature}</td>
                  <td>
                    <img
                      alt=""
                      src={`${MAIN}${product.image}`}
                      className="px-2"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="text-center px-2">{product.created_at}</td>
                  <td className="d-flex">
                    <Link to={`/dashboard/editproduct/${product._id}`}>
                      <p className="btn bg-primary text-white me-2">Edit</p>
                    </Link>
                    <p>
                      <p
                        onClick={() => deleteProduct(product._id)}
                        className="btn bg-danger text-white"
                      >
                        Delete
                      </p>
                    </p>{" "}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Product;
