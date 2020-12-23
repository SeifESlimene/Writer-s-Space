import React from "react";

import { facebookLogin } from "../../../actions";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { connect } from "react-redux";
import "./GoogleLoginButton.css";
import Spinner from "react-bootstrap/Spinner";

const FacebookLoginButton = (props) => {
  return (
    <FacebookLogin
      appId="3375293559265744"
      fields="name,email,picture"
      disableMobileRedirect={true}
      redirectUri="https://laughing-bose-a55b10.netlify.app"
      isMobile={false}
      render={(renderProps) => (
        <button
          className="google-button btn-block"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <span className="google-button__icon">
            {props.btnLoading ? (
              <Spinner
                style={{ display: "block" }}
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <img
                alt="fb logo"
                src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Facebook_circle_pictogram.svg"
              />
            )}
          </span>
          <span className="google-button__text">Sign in with Facebook</span>
        </button>
      )}
      callback={(res) => props.facebookLogin(res)}
    />
  );
};

const mapStateToProps = ({ loading: { facebookLoading } }) => {
  return { btnLoading: facebookLoading };
};

export default connect(mapStateToProps, { facebookLogin })(FacebookLoginButton);