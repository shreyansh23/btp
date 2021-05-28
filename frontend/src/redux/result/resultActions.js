import axios from "axios";

export const fetchResultsRequest = () => {
  return {
    type: "FETCH_RESULTS_REQUEST",
  };
};

export const fetchResultsSuccess = (results) => {
  return {
    type: "FETCH_RESULTS_SUCCESS",
    payload: results,
  };
};

export const fetchResultsFailure = (error) => {
  return {
    type: "FETCH_RESULTS_FAILURE",
    payload: error,
  };
};

export const setLoading = (value) => {
  return {
    type: "SET_LOADING",
    payload: value,
  };
};

export const fetchResults = () => {
  return (dispatch) => {
    dispatch(fetchResultsRequest());
    axios
      .get("http://localhost:8000/result/")
      .then((response) => {
        dispatch(fetchResultsSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchResultsFailure(error.message));
      });
  };
};
