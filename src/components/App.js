import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";

import Home from "./Home";
import Register from "./auth/Register";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import CookieConsent from "react-cookie-consent";

import DiaryHome from "./Diary/DiaryHome";
import ModalRoot from "../ModalRoot";
import { connect } from "react-redux";
import { hideModal } from "../actions";
import "react-toastify/dist/ReactToastify.css";

import "../template.css";

const App = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Router history={history}>
          <Route path="/" exact component={Home} />
          <Route path="/diary" exact component={DiaryHome} />
          <Route path="/register" exact component={Register} />
        </Router>
      </div>
      <ModalRoot hideModal={props.hideModal} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <CookieConsent
        location="bottom"
        buttonText="Sure"
        cookieName="cookiesAllowed"
        style={{
          background: "rgba(0, 0, 0, 0.51)",
          fontSize: "1rem",
          fontWeight: "300",
        }}
        buttonStyle={{ color: "#4e503b", fontSize: "1rem" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </React.Fragment>
  );
};

export default connect(null, { hideModal })(App);
