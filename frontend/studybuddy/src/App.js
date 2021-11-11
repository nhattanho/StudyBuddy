/* =======================================================================*/
/* This is a driven for Application
* @author NhatHo
/* =======================================================================*/

import React from "react"
import {Route} from "react-router-dom"

/* Import redux*/
import store from "./redux/redux.js"
import {Provider} from "react-redux"

/* Adding pages/components */
import Landing from "./pages/landing/landing.js";
import RequestPopupPage from "./pages/requestPopup/RequestPopupPage.js";
import Register from "./pages/register/register.js";
import Home from "./pages/home/home.js";
import Header from "../src/components/header/header.js";
import SendingRequest from "./pages/sendingRequest/sendingRequest.js";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/requestpopup" component={RequestPopupPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/sendingRequest" component={SendingRequest} />
      </div>
    </Provider>
  );
}

export default App;
