import React from "react";

import { googleLogin } from "../../../actions";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import "./GoogleLoginButton.css";
import Spinner from "react-bootstrap/Spinner";

import { googleClientId } from "../../../constants/oauth";

const googleLoginFailure = (res) => {
  console.log(res);
};

const GoogleLoginButton = (props) => {
  return (
    <GoogleLogin
      clientId={googleClientId}
      buttonText="Login"
      render={(renderProps) => (
        <button
          className="google-button btn-block mb-3"
          onClick={renderProps.onClick}
          disabled={props.btnLoading}
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
                alt="google logo"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            )}
          </span>
          <span className="google-button__text">Sign in with Google</span>
        </button>
      )}
      onSuccess={(res) => props.googleLogin(res)}
      onFailure={googleLoginFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

const mapStateToProps = ({ loading: { googleLoading } }) => {
  return { btnLoading: googleLoading };
};

export default connect(mapStateToProps, { googleLogin })(GoogleLoginButton);
