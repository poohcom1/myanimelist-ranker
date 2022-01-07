import React from "react";
import { Ranker } from "./scenes";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUser, saveUser } from "./libs/save";
import Home from "./scenes/Home/Home";

const SEARCH_DELAY = 500; //ms

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getUser() ?? "",
    };

    this.searchTimeout = null;
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    clearTimeout(this.searchTimeout);

    saveUser(user);

    this.searchTimeout = setTimeout(
      () => this.setState({ user }),
      SEARCH_DELAY
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Header setUser={this.setUser} user={this.state.user} />
        <div className="main">
          {this.state.user !== "" ? (
            <Routes>
              <Route
                path="/myanimelist-ranker"
                element={<Ranker user={this.state.user} />}
              />
              <Route path="/three-by-three" />
            </Routes>
          ) : (
            <Home setUser={this.setUser} />
          )}
        </div>
        <Footer />
      </BrowserRouter>
    );
  }
}
