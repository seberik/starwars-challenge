import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const propTypes = {
  children: PropTypes.node.isRequired
};

const ListItem = props => {
  const { children, ...attributes } = props;

  return (
    <div {...attributes} className="list-item">
      {children}
    </div>
  );
};

ListItem.propTypes = propTypes;

export default ListItem;
