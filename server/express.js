const express = require("express");
const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter, matchPath } = require("react-router-dom");

// create express application
const app = express();

// import App component
const { App } = require("../src/App");
const { getUrlPathVariables } = require("./helper");

// import routes
const routes = require("./routes");

// serve static assets
app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, "../dist"))
);

// for any other requests, send `index.html` as a response
app.use("*", async (req, res) => {
  routes.forEach((r) => {
    r.queryParams = req.query;
  });

  // get matched route
  const matchRoute = routes.find((route) => matchPath(req.originalUrl, route));

  // console.log(matchRoute);

  if (!matchRoute?.component) return res.send(<h1>Not Found</h1>);

  // fetch data of the matched component
  let componentData = null;
  if (typeof matchRoute?.component?.fetchData === "function") {
    let path_variables = getUrlPathVariables(matchRoute.path, req.originalUrl);
    let query_params = matchRoute.queryParams;
    componentData = await matchRoute.component?.fetchData(
      path_variables,
      query_params
    );
  }

  // read `index.html` file
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    {
      encoding: "utf8",
    }
  );

  // get HTML string from the `App` component
  let appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl} context={componentData}>
      <App />
    </StaticRouter>
  );
  console.log(
    componentData?.payload?.productDetailsResponse?.dvnWrapperList[0].dvn?.image
      ?.non360Path
  );

  // populate `#app` element with `appHTML`
  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );
  indexHTML = indexHTML.replace(
    /\$OG_TITLE/g,
    componentData?.payload?.productDetailsResponse?.product?.productName ||
      "DolphinsKart"
  );
  indexHTML = indexHTML.replace(/\$OG_DESCRIPTION/g, "About page description");
  indexHTML = indexHTML.replace(
    /\$OG_IMAGE/g,
    componentData?.payload?.productDetailsResponse?.dvnWrapperList[0]?.image
      ?.non360Path
  );
  // console.log(indexHTML);

  // set value of `initial_state` global variable
  indexHTML = indexHTML.replace(
    "var initial_state = null;",
    `var initial_state = ${JSON.stringify(componentData)};`
  );

  // set header and status
  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

// run express server on port 9000
app.listen("9000", () => {
  console.log("Express server started at http://localhost:9000");
});
