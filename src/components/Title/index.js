import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const propTypes = {
  children: PropTypes.node.isRequired
};

const Title = props => {
  const { children } = props;

  return (
    <div className="page-title">
      <h1>{children}</h1>
    </div>
  );
};

Title.propTypes = propTypes;

export default Title;
