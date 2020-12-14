import React from "react";
import { useState } from "react";
import Routes from "./Routes";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./AppContext";

import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { errorLibrary } from "./ErrorLibrary";
import "./App.css";

export default function App() {

  const history = useHistory();

  async function handleLogout() {
    await Auth.signOut(); //Clears the login cookies.
    setAuthState(false);
    history.push("/login");
  }
  
  //Storing login from the topdown.
  const [getLoadingAuthState, setLoadingAuthState] = useState(true);
  const [getAuthState, setAuthState] = useState(false);

  //Loading session cookies.
  useEffect(() => {
    onLoading();
  }, []);
  
  async function onLoading() { //load whether the user is authenticated via Amplify
    try {
      await Auth.currentSession();
      console.log("Already logged in!")
      setAuthState(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        errorLibrary(e);
      }
    }
  
    setLoadingAuthState(false); 
  }

  return (
    !getLoadingAuthState && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Ink'd
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {getAuthState ? (
                <NavItem onClick={handleLogout}>Logout</NavItem>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ getAuthState, setAuthState }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}


