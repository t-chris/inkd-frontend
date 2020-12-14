import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LoadingButton  from "../LoadingButton/LoadingButton";
import { useAppContext } from "../AppContext";
import { errorLibrary } from "../ErrorLibrary";
import { Auth } from "aws-amplify";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const history = useHistory(); //History from Router.

  const [newUser, setNewUser] = useState(null);
  const { setAuthState } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return ( email.length > 0 && pass.length > 0 && pass === confirmPass );
  }

  function validateConfirmationForm() {
    return verificationCode.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true); //Amplify does most of the work here. We just invoke the commands lol.
    try { //Setting state variable of new user.
        const newUser = await Auth.signUp({
          username: email, //Username and email will be used interchangeably here, like for most instances.
          password: pass,
        });
        setIsLoading(false);
        setNewUser(newUser);
      } catch (e) {
        errorLibrary(e);
        setIsLoading(false);
      }
  }

  async function handleVerificationSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    try { //Check for the verification/confirmation email, then sends the command through Amplify.
        await Auth.confirmSignUp(email, verificationCode);
        await Auth.signIn(email, pass);
    
        setAuthState(true);
        history.push("/"); //to default page
      } catch (e) {
        errorLibrary(e);
        setIsLoading(false);
      }
  }

  function renderVerificationForm() {
    return (
      <form onSubmit={handleVerificationSubmit}>
        <FormGroup controlId="verificationCode" size="lg">
          <ControlLabel>Verification Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={e => setVerificationCode(e.target.value)}
            value={verificationCode}
          />
          <p>Please check your email for the code.</p>
        </FormGroup>
        <LoadingButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoadingButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" size="lg">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="pass" size="lg">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="confirmPass" size="lg">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={e => setConfirmPass(e.target.value)}
            value={confirmPass}
          />
        </FormGroup>
        <LoadingButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoadingButton>
      </form>
    );
  }

  return (
    <div className="Signup"> {/*Whether we get a signup or verification form is dependent on whether the user state exists or not.*/}
      {newUser === null ? renderForm() : renderVerificationForm()} 
    </div>
  );
}