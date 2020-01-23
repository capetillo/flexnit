import axios from "axios";

export default {
  checkStream,
  addToList,
  deleteFromList,
  displayList
};

function checkStream(input) {
  let title = input.replace(/\s/g, "+").toLowerCase();
  return axios.get("api/movies/" + title);
}

function addToList(user, movie) {
  return axios.post("api/watchlists/" + user, movie);
}

function deleteFromList(user, movie) {
  return axios.delete("api/watchlists/" + user + "/" + movie);
}

function displayList(user) {
  return axios.get("api/watchlists/" + user);
}
