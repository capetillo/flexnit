import axios from "axios";

export default {
  checkStream: input => {
    let title = input.replace(/\s/g, "+").toLowerCase();
    console.log(title);
    return axios.get("api/movies/" + title);
  }
  //getSearch
};

// function checkStream(input) {
//   let title = input.replace(/\s/g, "+").toLowerCase();
//   console.log(title);
//   return axios.get("api/movies/" + title);
// }

// getSearch = query => {
//   let search = query.replace(/\s/g, "+").toLowerCase();
//   console.log(search);

//   return axios.get("/api/movies/" + search);
// };
