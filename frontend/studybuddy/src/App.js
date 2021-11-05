import React from "react"
import {Route} from "react-router-dom"

/* Import redux*/
import store from "./redux/redux.js"
import {Provider} from "react-redux"

/* Adding pages/components */
import Landing from "./pages/landing/landing.js";
import Header from "../src/components/header/header.js";
import Profile from "./pages/profile/profile.js";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
      </div>
    </Provider>
  );
}

export default App;
