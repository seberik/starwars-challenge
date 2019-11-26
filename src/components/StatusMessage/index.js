import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node.isRequired
};

const StatusMessage = props => {
  const { children } = props;

  return <div className="list-item">{children}</div>;
};

StatusMessage.propTypes = propTypes;

export default StatusMessage;
