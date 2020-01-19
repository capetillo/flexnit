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
            {console.log("RESULTS", props)}
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
