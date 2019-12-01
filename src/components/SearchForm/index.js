import React from "react";
import SearchField from "../SearchField";
import { Formik, Form } from "formik";

function SearchForm(props) {
  const { onSubmit, loading } = props;

  return (
    <Formik onSubmit={onSubmit} initialValues={{ query: "" }}>
      <Form>
        <SearchField loading={loading} />
      </Form>
    </Formik>
  );
}

export default SearchForm;
