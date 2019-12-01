import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const propTypes = {
  children: PropTypes.node.isRequired
};

const ErrorMessage = props => {
  const { children } = props;

  return <div className="error-message">{children}</div>;
};

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
