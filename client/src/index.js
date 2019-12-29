//! This is the entry point of my React application,
//! this is the place where I've the store and make it accessible to all components.

/*----- REACT -----*/
import React from "react";

/*----- DEPENDECIES -----*/
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux"; //wrap my App and apply Redux with its store
import thunk from "redux-thunk"; // Middleware
/*
With a basic Redux store, you can only do simple synchronous updates by dispatching an action. 
Middleware extend the stores abilities,
and let you write asynchronous (async) logic 
(eg. fetching information from external sources) that interacts with the store. 

Redux Thunk middleware allows you to write action creators
that return a function instead of an action.
The thunk can be used to delay the dispatch of an action,
or to dispatch only if a certain condition is met.
It incorporates the methods dispatch and getState as parameters.
*/

// import throttle from "lodash.throttle";

/*----- COMPONENTS/REDUCER -----*/
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import rootReducer from "./store/reducers/rootReducer";

/*
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

*/
//* The store is just an object that houses and tracks the state of our application.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//console.log("token", localStorage.getItem("token"));

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
//? cannot active serviceWorker (setting to "register") because create issues with HTTP auth

//* Add To Homescreen (not working because serviceWorker is unactive)
var deferredPrompt;

window.addEventListener("beforeinstallprompt", function(e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  showAddToHomeScreen();
});

function showAddToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt");

  a2hsBtn.style.display = "block";

  a2hsBtn.addEventListener("click", addToHomeScreen);
}

function addToHomeScreen() {
  var a2hsBtn = document.querySelector(".ad2hs-prompt"); // hide our user interface that shows our A2HS button
  a2hsBtn.style.display = "none"; // Show the prompt
  deferredPrompt.prompt(); // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(function(choiceResult) {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }

    deferredPrompt = null;
  });
}
