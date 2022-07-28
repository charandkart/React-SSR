import { Counter } from "./components/counter";
import { Post } from "../src/components/post";
import React from "react";
import { NavLink as Link, Route, Switch } from "react-router-dom";
import { Product } from "../src/components/product";

export const App = () => {
  return (
    <div>
      <div>
        <Link to="/" exact={true}>
          Counter
        </Link>

        <Link to="/post" exact={true}>
          Post
        </Link>
        <Link
          to="/p/Fashion/D013459APG6KA0J/D013459APG6KA0J066?productId=D013459APG6KA0J"
          exact={true}
        >
          Post
        </Link>
      </div>

      <Switch>
        <Route path="/" exact={true} render={Counter} />

        <Route path="/post" exact={true} component={Post} />
        <Route
          path="/p/:c/:productId/:dvnId"
          exact={true}
          component={Product}
        />
      </Switch>
    </div>
  );
};

export default App;
