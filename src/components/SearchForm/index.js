import React from "react";
import SearchField from "../SearchField";
import { Formik, Form } from "formik";

function SearchForm(props) {
  const { onSubmit } = props;

  return (
    <Formik onSubmit={onSubmit} initialValues={{ query: "" }}>
      <Form>
        <SearchField />
      </Form>
    </Formik>
  );
}

export default SearchForm;
