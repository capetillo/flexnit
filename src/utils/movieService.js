import axios from "axios";

export default {
  checkStream
};

function checkStream(name) {
  let title = name.replace(/\s/g, "+").toLowerCase();
  console.log(title);
  return axios.get("api/movies/" + title);
}
