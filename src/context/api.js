import React from "react";
import PropTypes from "prop-types";
import APIClient from "../api/client";

export const APIContext = React.createContext();

const propTypes = {
  children: PropTypes.node.isRequired
};

const client = new APIClient({
  baseURL: "https://swapi.co/api"
});

const APIContextProvider = ({ children }) => (
  <APIContext.Provider value={client}>{children}</APIContext.Provider>
);

APIContextProvider.propTypes = propTypes;

export default APIContextProvider;
