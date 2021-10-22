import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="list-group">
      <Link
        to="/dashboard/category"
        className="list-group-item list-group-item-action active"
      >
        Category
      </Link>
      <Link
        to="/dashboard/products"
        className="list-group-item list-group-item-action"
      >
        Products
      </Link>
      <Link
        to="/dashboard/orders"
        className="list-group-item list-group-item-action"
      >
        Orders
      </Link>
      <Link
        to="/dashboard/feedback"
        className="list-group-item list-group-item-action"
      >
        Feedback
      </Link>
    </div>
  );
}
