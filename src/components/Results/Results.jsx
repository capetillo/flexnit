import React from "react";

const Results = props => {
  return (
    <div>
      {props.error && <small>Please enter a valid movie.</small>}
      {props.loading && <div>Loading...</div>}
      {props.responseObj.status_code === 200 ? (
        <div>
          <p>
            <strong>{props.responseObj.results.picture}</strong>
          </p>
          <p>
            {console.log("RESULTS", props.responseObj)}
            {props.responseObj.results[0].name}{" "}
            {props.responseObj.results[0].name.locations.display_name}{" "}
            {props.responseObj.results.name.locations.url}
          </p>
        </div>
      ) : null}
    </div>
  );
};
export default Results;

// if (response.results.length != 0) {
//   for (i = 0; i < response.results.length; i++) {
//     if (response.results[i].name == data.Title) {
//       for (j = 0; j < response.results[i].locations.length; j++) {
//         if (j == response.results[i].locations.length - 1) {
//           tempSources += response.results[i].locations[j].display_name;
//         } else {
//           tempSources += response.results[i].locations[j].display_name + ", ";
//         }
//       }
//       sources.textContent = "Available for streaming on: " + tempSources;
//     }
//   }
// }
