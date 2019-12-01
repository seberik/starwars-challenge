import React, { useState, useContext, useCallback } from "react";
import SearchForm from "../../components/SearchForm";
import Title from "../../components/Title";
import SearchResult from "../../components/SearchResult";
import { APIContext } from "../../context/api";
import { useRequest } from "../../hooks/request";

import "./index.css";

function Search() {
  const client = useContext(APIContext);
  const [query, setQuery] = useState(undefined);

  const APIQuery = useCallback(() => client.searchPeople(query), [
    client,
    query
  ]);

  const { loading, result, error } = useRequest(APIQuery, {
    skip: !query,
    variables: query
  });

  function onSubmit(values) {
    setQuery(values.query);
  }

  return (
    <div className="container">
      <Title>CHARACTER SEARCH</Title>
      <SearchForm loading={loading} onSubmit={onSubmit}></SearchForm>
      {query && (
        <SearchResult
          loading={loading}
          error={error}
          items={result}
        ></SearchResult>
      )}
    </div>
  );
}

export default Search;
