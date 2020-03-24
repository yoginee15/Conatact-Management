import React, { Component } from "react";
import {   BrowserRouter as Router,
  Route, Redirect, Switch } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import Contacts from "./components/contacts";
import NotFound from "./components/notFound/notFound";
import ContactForm from "./components/contacts/contactForm";
import "./App.css";

class App extends Component {
  state = {
    appTitle: { label: "Contact Deatils", path: "/" }
  };


  render() {
    return (
      <React.Fragment>
        <main role="main" className="container">
          <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" to={this.state.appTitle.path}>
                {this.state.appTitle.label}
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav">
                  <NavLink className="nav-item nav-link" to="/movies">
                    Contacts
                  </NavLink>
                </div>
              </div>
              </nav>
              <Switch>
              <Route path="/contacts/:id" component={ContactForm} />
                <Route
                  path="/contacts"
                  render={props => <Contacts {...props} />}
                />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" to="/contacts" component={Contacts} />
                <Redirect to="/not-found" />
              </Switch>
          </Router>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
