import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

export default function Orders() {
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
          <h2> Orders</h2>
        </div>
      </section>
    </main>
  );
}
