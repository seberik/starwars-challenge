import React, { useReducer, useContext } from "react";
import SearchForm from "../../components/SearchForm";
import SearchResult from "../../components/SearchResult";
import { APIContext } from "../../context/api";
import Movies from "../../components/Movies";
import { useRequest } from "../../hooks/request";

import "./index.css";

const defaultState = {
  query: undefined,
  person: undefined,
  items: undefined,
  loading: false,
  error: false,
  selectedPerson: undefined
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_PERSON":
      return {
        ...state,
        selectedPerson: action.person
      };
    case "SEARCH_REQUEST":
      return {
        ...defaultState,
        query: action.query
      };
    default:
      return state;
  }
};

function Search() {
  const client = useContext(APIContext);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const { loading, result, error } = useRequest(
    query => client.searchPeople(query),
    {
      skip: !state.query,
      variables: state.query
    }
  );

  function search(values) {
    dispatch({ type: "SEARCH_REQUEST", query: values.query });
  }

  function onListItemClick(person) {
    dispatch({ type: "SELECT_PERSON", person });
  }

  function onListItemSelect(key, person) {
    if (key === "Enter") {
      dispatch({ type: "SELECT_PERSON", person });
    }
  }

  return (
    <>
      <div className="container">
        <h1>Character search</h1>
        <SearchForm onSubmit={search}></SearchForm>
        {!state.selectedPerson && state.query && (
          <SearchResult
            loading={loading}
            error={error}
            onClick={onListItemClick}
            onKeyPress={onListItemSelect}
            items={result}
          ></SearchResult>
        )}
        {state.selectedPerson && (
          <Movies person={state.selectedPerson}></Movies>
        )}
      </div>
    </>
  );
}

export default Search;
