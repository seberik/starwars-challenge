import React from "react";
import { Field } from "formik";
import "./index.css";

function SearchField(props) {
  return (
    <div className="search-field">
      <Field type="text" placeholder="Search characters..." name="query" />
    </div>
  );
}

export default SearchField;
