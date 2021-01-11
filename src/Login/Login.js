import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoadingButton  from "../LoadingButton/LoadingButton";
import { Auth } from "aws-amplify";
import { useAppContext } from "../AppContext";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory(); //History from Router.

  const { userHasAuthenticated } = useAppContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function validateForm() {
    return email.length > 0 && pass.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //Loading the submit.
    setIsLoading(true);
    try {
      await Auth.signIn(email, pass);
      userHasAuthenticated(true);
      console.log("Logged in with " + email);
      history.push("/"); //to default page
    } catch (ex) {
      alert(ex.message);
    }
  }


    return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="pass" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={pass}
            onChange={e => setPass(e.target.value)}
            type="password"
          />
        </FormGroup>
        <LoadingButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoadingButton>
      </form>
    </div>
  );
 
}