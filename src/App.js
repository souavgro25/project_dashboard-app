import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Feedback from "./components/Feedback";
import Login from "./components/Login";
import Changepass from "./components/Changepass";
import Category from "./components/Category";
import Orders from "./components/Orders";
import Products from "./components/Product/Product";
import AddCategory from "./components/AddCategory";
import Register from "./components/Register";
import Editcategory from "./components/Editcategory";
import Addproduct from "./components/Product/Addproduct";
import Editproduct from "./components/Product/Editproduct";
function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route
            path="/dashboard/changepassword"
            exact
            component={Changepass}
          />
          <Route path="/dashboard/category" exact component={Category} />
          <Route path="/dashboard/products" exact component={Products} />
          <Route path="/dashboard/addproduct" exact component={Addproduct} />
          <Route
            path="/dashboard/editproduct/:id"
            exact
            component={Editproduct}
          />
          <Route path="/dashboard/orders" exact component={Orders} />
          <Route path="/dashboard/feedback" exact component={Feedback} />
          <Route
            path="/dashboard/editcategory/:id"
            exact
            component={Editcategory}
          />
          <Route path="/dashboard/addcategory" exact component={AddCategory} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
