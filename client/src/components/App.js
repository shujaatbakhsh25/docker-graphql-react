import React, { Component } from "react";
import "./App.css";
import PostsContainer from "./PostsContainer";

import UploadForm from "./UploadForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <div className="ui text container">
          <Router>
            <div className="ui top fixed menu">
              <div className="item">
                <div className="logo">
                  <img src="icon-binterest.png" />
                  <Link to="/">
                    <div className="text">Binterest</div>
                  </Link>
                </div>
              </div>
              <div className="item">
                <Link to="/my-bin">My Bin</Link>
              </div>
              <div className="item">
                <Link to="/my-posts">My Posts</Link>
              </div>
            </div>
            <Switch>
              <Route
                path="/"
                exact
                component={() => <PostsContainer type="unsplash" />}
              />
              <Route
                path="/my-bin"
                exact
                component={() => <PostsContainer type="binned" />}
              />
              <Route
                path="/my-posts"
                exact
                component={() => <PostsContainer type="user-posted" />}
              />
              <Route path="/new-post" exact component={UploadForm} />
            </Switch>
          </Router>
        </div>
        <div>
          <span className="server-left">Server 4</span>
        </div>
        <div>
          <span className="server-right">Server 4</span>
        </div>
      </div>
    );
  }
}
export default App;
