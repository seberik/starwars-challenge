import React from "react";
import { Field } from "formik";
import Button from "../Button";
import "./index.css";

function SearchField(props) {
  const { loading } = props;
  return (
    <div className="search-field">
      <Field type="text" placeholder="Search characters..." name="query" />
      <Button loading={loading}>Search</Button>
    </div>
  );
}

export default SearchField;
