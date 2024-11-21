import React from "react";
import { useRouteError } from "react-router-dom";
import { Error as Err } from "../types";

const Error = () => {
  const error = useRouteError() as Err;
  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.status} - {error.statusText}
      </pre>
    </>
  );
};

export default Error;
