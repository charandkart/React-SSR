import { Counter } from "../src/components/counter";
import { Post } from "../src/components/post";
import { Product } from "../src/components/product";

module.exports = [
  {
    path: "/",
    exact: true,
    component: Counter,
  },
  {
    path: "/post",
    exact: true,
    component: Post,
  },
  {
    path: "/p/:category/:productId/:dvnId",
    exact: true,
    component: Product,
  },
];
