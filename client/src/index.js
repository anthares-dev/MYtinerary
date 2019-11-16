import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux"; //wrap my App and apply Redux with its store
import thunk from "redux-thunk";
/* Redux Thunk middleware allows you to write action creators
 that return a function instead of an action.
  The thunk can be used to delay the dispatch of an action,
   or to dispatch only if a certain condition is met.
    It incorporates the methods dispatch and getState as parameters.
    */
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
