/*----- REACT -----*/
import React from "react";

/*----- DEPENCIES -----*/
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux"; //wrap my App and apply Redux with its store
import thunk from "redux-thunk";
/* Redux Thunk middleware allows you to write action creators
 that return a function instead of an action.
  The thunk can be used to delay the dispatch of an action,
   or to dispatch only if a certain condition is met.
    It incorporates the methods dispatch and getState as parameters.
    */
import throttle from "lodash.throttle";

/*----- COMPONENTS/REDUCER -----*/
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import rootReducer from "./store/reducers/rootReducer";

//SAVING STORE and not fetch it everytime
// https://stackoverflow.com/questions/52161128/react-redux-state-is-lost-at-page-refresh
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const store = createStore(
  rootReducer,
  peristedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
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
