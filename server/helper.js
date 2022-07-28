function getUrlPathVariables(route, url) {
  const cleaned_url = url.split("?");
  cleaned_url.join("?");
  // console.log();
  let obj = {};
  let value = "";
  route?.split("/").forEach((dir, index) => {
    if (dir && dir[0] === ":") value = dir.substring(1);
    obj[String(index)] = value;
  });
  let obj_value = {};
  url?.split("/").forEach((dir, index) => {
    if (obj[String(index)] !== (undefined || null || ""))
      if (index === url.split("/").length - 1)
        obj_value[obj[String(index)]] = dir?.split("?")[0];
      else obj_value[obj[String(index)]] = dir;
  });
  return obj_value;
}

export { getUrlPathVariables };
