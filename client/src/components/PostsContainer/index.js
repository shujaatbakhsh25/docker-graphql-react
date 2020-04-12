import React, { Component } from "react";
import { Query } from "react-apollo";
import Post from "../Post";

import queries from "../../queries";
import UIButton from "../UIButton";
import { Link } from "react-router-dom";

class PostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1
    };
  }
  createList = (data, delBtn) => {
    return data.map((item, idx) => {
      return <Post details={item} key={idx} deleteBtn={delBtn} />;
    });
  };
  render() {
    if (this.props.type === "unsplash") {
      return (
        <div>
          <Query
            query={queries.GET_UNSPLASH_IMAGES}
            variables={{ pageNum: this.state.pageNum }}
            fetchPolicy={"cache-and-network"}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <h4>Loading....</h4>;
              }
              if (data) {
                return this.createList(data.unsplashImages);
              }
            }}
          </Query>

          <UIButton
            type="Load More"
            clickHandler={e => {
              e.preventDefault();
              this.setState(state => {
                return { pageNum: state.pageNum + 1 };
              });
            }}
          />
        </div>
      );
    }
    if (this.props.type === "binned") {
      return (
        <Query
          query={queries.GET_BINNED_IMAGES}
          fetchPolicy={"cache-and-network"}
        >
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading....</h4>;
            if (data) {
              return this.createList(data.binnedImages);
            }
          }}
        </Query>
      );
    }
    if (this.props.type === "user-posted") {
      return (
        <Query
          query={queries.GET_USER_POSTED_IMAGES}
          fetchPolicy={"cache-and-network"}
        >
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading....</h4>;
            if (data) {
              return (
                <div>
                  <Link to="/new-post">
                    <UIButton type="Upload a Post" />
                  </Link>
                  {this.createList(data.userPostedImages, true)}
                </div>
              );
            }
          }}
        </Query>
      );
    }
  }
}
export default PostsContainer;
