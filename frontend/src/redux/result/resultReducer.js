const initialState = {
  results: [],
  loading: false,
  error_msg: "",
};

export const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_RESULTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_RESULTS_SUCCESS":
      return {
        ...state,
        results: action.payload,
        loading: false,
      };
    case "FETCH_RESULTS_FAILURE":
      return {
        ...state,
        loading: false,
        error_msg: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
