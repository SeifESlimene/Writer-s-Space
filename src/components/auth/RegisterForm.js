import React from "react";
import { Field, reduxForm } from "redux-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import "./Form.css";
import asyncValidate from "./asyncValidation";
import { connect } from "react-redux";

class RegisterForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <Alert variant="danger">
          <div className="header">{error}</div>
        </Alert>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    let inputName = input.name;
    let classes = meta.touched && meta.invalid ? "error" : "";
    let type = "text";
    if (inputName === "password" || inputName === "password2") {
      type = "password";
    } else if (inputName === "email") {
      type = "email";
    }
    return (
      <Form.Group
        controlId={type}
        className={meta.asyncValidating ? "async-validating" : ""}
      >
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          autoComplete="off"
          placeholder={`${type === "text" ? "username" : type}`}
          className={classes}
          {...input}
        />
        {meta.asyncValidating ? <Spinner animation="border" size="sm" /> : null}
        {this.renderError(meta)}
      </Form.Group>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="username"
          component={this.renderInput}
          label="Enter username"
        />
        <Field
          name="email"
          type="email"
          component={this.renderInput}
          label="Enter email"
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Enter password"
        />
        <Field
          name="password2"
          type="password2"
          component={this.renderInput}
          label="Confirm password"
        />
        <ButtonGroup aria-label="Basic example">
          <Button type="submit" varient="primary">
            {this.props.loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Register"
            )}
          </Button>
          <Button
            variant="danger"
            disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.reset}
          >
            Clear
          </Button>
        </ButtonGroup>
      </Form>
    );
  }
}

const validate = ({ username, email, password, password2 }) => {
  const errors = {};
  if (!username || username.trim() === "") {
    errors.username = "You must enter a username";
  }
  if (!email) {
    errors.email = "You must enter a email";
  }
  if (!password2 || password2.trim() === "") {
    errors.password2 = "You must enter confirmed password";
  }
  if (!password || password.trim() === "") {
    errors.password = "You must enter a password";
  }
  if (password && password.length < 8) {
    errors.password = "Password must be greater than 8.";
  }
  if (password !== password2) {
    errors.password = "Passwords must match";
  }
  return errors;
};

// const warn = (values) => {
//   const warnings = {};
//   if (values.password && values.password.length < 8) {
//     warnings.password = "password is less than 8";
//   }
//   return warnings;
// };

const mapStateToProps = ({ loading: { registerLoading } }) => {
  return { loading: registerLoading };
};

export default connect(
  mapStateToProps,
  {}
)(
  reduxForm({
    form: "registerForm",
    validate: validate,
    asyncValidate,
    asyncBlurFields: ["username", "email"],
    // warn: warn,
  })(RegisterForm)
);
