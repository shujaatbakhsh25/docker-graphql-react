import "./Post.css";
import { Mutation } from "react-apollo";
import queries from "../../queries";

import React, { Component } from "react";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: this.props.details,
      binned: this.props.details.binned
    };
  }

  render() {
    return (
      <div className="ui centered card">
        <div className="image">
          <img src={this.state.postData.url} />
        </div>
        <div className="content">
          <p>{this.state.postData.description || "No description available"}</p>
          <br />
          <p>A Photo by: {this.state.postData.posterName || "anonymous"}</p>
          <br />
          <Mutation
            mutation={queries.BIN_IMAGE}
            refetchQueries={[`binnedQuery`]}
            onCompleted={data => {
              if (!data.updateImage) {
                alert("There was an error in updating image!");
              }
            }}
          >
            {binImg => {
              return (
                <button
                  className={
                    this.props.deleteBtn
                      ? "ui red button left"
                      : "ui red button"
                  }
                  onClick={e => {
                    e.preventDefault();
                    binImg({
                      variables: {
                        id: this.state.postData.id,
                        url: this.state.postData.url,
                        description: this.state.postData.description,
                        posterName: this.state.postData.posterName,
                        binned: !this.state.binned,
                        userPosted: this.state.postData.userPosted
                      }
                    });
                    this.setState(state => {
                      return { binned: !state.binned };
                    });
                    return;
                  }}
                >
                  {this.state.binned ? "Remove from bin" : "Add to bin"}
                </button>
              );
            }}
          </Mutation>

          <Mutation
            mutation={queries.DELETE_IMAGE}
            refetchQueries={[`userPostedQuery`]}
            onCompleted={data => {
              if (!data.deleteImage) {
                alert("There was an error in deleting the image!");
              }
            }}
          >
            {(delImg, { data }) => {
              if (this.props.deleteBtn) {
                return (
                  <button
                    className="ui red button right"
                    onClick={e => {
                      e.preventDefault();
                      delImg({
                        variables: {
                          id: this.state.postData.id
                        }
                      });
                    }}
                  >
                    Delete Image
                  </button>
                );
              }
              return null;
            }}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Post;
