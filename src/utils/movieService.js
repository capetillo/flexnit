import axios from "axios";

export default {
  checkStream: name => {
    let title = name.replace(/\s/g, "+").toLowerCase();
    console.log(title);
    return axios.get("api/movies" + title);
  }
};
