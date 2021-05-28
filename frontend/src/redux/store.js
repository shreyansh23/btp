import { createStore, applyMiddleware } from "redux";
import { resultReducer } from "./result/resultReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
  resultReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
