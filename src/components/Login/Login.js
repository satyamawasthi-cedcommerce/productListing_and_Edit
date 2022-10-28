import { Button, Card, InlineError, TextField } from "@shopify/polaris";
import React, { useState } from "react";
import { connect } from "react-redux";
import { validate } from "../../redux/Action";
import classes from "./Login.module.css";
function Login(props) {
  const [userCredentials, setUserCredentials] = useState({
    sellerName: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [authorizationError, setAuthorizationError] = useState("");
  const validateUser = () => {
    var validate = {};

    if (userCredentials.sellerName === "")
      validate.sellerNameError = "Sellername either empty or Invalid";
    if (userCredentials.username === "")
      validate.userNameError = "Username either empty or Invalid";

    if (userCredentials.password === "")
      validate.passwordError = "Password either empty or Invalid";

    setError({ ...validate });

    if (
      userCredentials.sellerName !== "" &&
      userCredentials.username !== "" &&
      userCredentials.password !== ""
    ) {
      fetch(
        `https://fbapi.sellernext.com/user/login?username=${userCredentials.username}&&password=${userCredentials.password}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
          },
        }
      )
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData);
          if (actualData.success) {
            sessionStorage.setItem(
              "userCredentials",
              JSON.stringify({
                username: userCredentials.username,
                sellerName: userCredentials.sellerName,
                token: actualData.data.token,
              })
            );
            props.validate();
          } else {
            setAuthorizationError("Either Username or Password are Ivalid");
          }
        }, []);
    }
  };
  return (
    // login component JSX
    <>
      <div className={classes.loginCardContainer}>
        <Card title="Login Pannel" sectioned>
          <InlineError message={authorizationError} fieldID="myFieldID" />
          {/* textfield to store seller's name */}
          <TextField
            type="text"
            label="Enter Seller Name"
            autoComplete="off"
            placeholder="Enter Seller Name"
            onChange={(value) =>
              setUserCredentials({
                ...userCredentials,
                sellerName: value,
              })
            }
            value={userCredentials.sellerName}
            requiredIndicator
            error={error.sellerNameError}
          />
          <br />
          {/* textfield to accept userName */}
          <TextField
            label="UserName"
            autoComplete="off"
            placeholder="Enter User Name"
            value={userCredentials.username}
            requiredIndicator
            onChange={(value) =>
              setUserCredentials({
                ...userCredentials,
                username: value,
              })
            }
            error={error.userNameError}
          />
          <br />
          {/* textField to accept password */}
          <TextField
            type="password"
            label="Password"
            autoComplete="off"
            placeholder="Enter User Name"
            value={userCredentials.password}
            requiredIndicator
            onChange={(value) => {
              setUserCredentials({
                ...userCredentials,
                password: value,
              });
            }}
            error={error.passwordError}
          />
          <br />
          <Button primary onClick={validateUser}>
            Login
          </Button>
        </Card>
      </div>
    </>
  );
}
// redux integration
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};
// this function is passed as second argument to connect
const mapDispatchToProps = (dispatch) => {
  return {
    validate: (value) => dispatch(validate(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
