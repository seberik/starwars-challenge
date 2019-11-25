import { useReducer, useEffect } from "react";

const CONSTANTS = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

const initialState = {
  loading: false,
  result: undefined,
  error: undefined
};

const requestReducer = (state, action) => {
  switch (action.type) {
    case CONSTANTS.REQUEST:
      return {
        ...state,
        loading: true,
        result: undefined,
        error: undefined
      };
    case CONSTANTS.SUCCESS:
      return {
        ...state,
        loading: false,
        result: action.result,
        error: undefined
      };
    case CONSTANTS.ERROR:
      return {
        ...state,
        loading: false,
        result: undefined,
        error: action.error
      };
    default:
      return state;
  }
};

const request = {
  type: CONSTANTS.REQUEST
};

const requestError = error => ({
  type: CONSTANTS.ERROR,
  error
});

const requestSuccess = result => ({
  type: CONSTANTS.SUCCESS,
  result
});

export function useRequest(promiseCreator, options) {
  const [state, dispatch] = useReducer(requestReducer, initialState);

  useEffect(() => {
    if (!options.skip) {
      dispatch(request);

      promiseCreator(options.variables)
        .then(result => {
          dispatch(requestSuccess(result));
        })
        .catch(error => {
          dispatch(requestError(error));
        });
    }
  }, [options.skip, options.variables]);

  return state;
}
