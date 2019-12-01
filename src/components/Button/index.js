import React from "react";
import PropTypes from "prop-types";
import loader from "../../loader.svg";
import "./index.css";

const propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  loading: false,
  children: undefined
};

const Button = props => {
  const { loading, children } = props;

  return (
    <button className="button">
      {loading && <img height="18" src={loader} alt="loading"></img>}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
