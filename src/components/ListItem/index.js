import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./index.css";

const propTypes = {
  children: PropTypes.node.isRequired
};

const ListItem = props => {
  const { children, noMargin, selected, ...attributes } = props;

  return (
    <div
      {...attributes}
      className={classnames(
        "list-item",
        noMargin && "no-margin",
        selected && "selected"
      )}
    >
      {children}
    </div>
  );
};

ListItem.propTypes = propTypes;

export default ListItem;
