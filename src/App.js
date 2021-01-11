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
    userHasAuthenticated(false);
    console.log("auth is " + isAuthenticated);
    history.push("/login");
  }
  
  //Storing login from the topdown.
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  //Loading session cookies.
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No user logged in.') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
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
              {isAuthenticated ? (
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
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}


