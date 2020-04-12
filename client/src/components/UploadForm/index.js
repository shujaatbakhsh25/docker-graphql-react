import React, { Component } from "react";
import { Mutation } from "react-apollo";
import queries from "../../queries";

class UploadForm extends Component {
  render() {
    let url, description, posterName;
    return (
      <Mutation
        mutation={queries.UPLOAD_IMAGE}
        onCompleted={data => {
          if (!data.uploadImage)
            alert("There was an error in uploading the image");
        }}
      >
        {(addImg, { data }) => (
          <form
            className="ui form"
            onSubmit={e => {
              e.preventDefault();
              if (url && url.length > 0) {
                addImg({
                  variables: {
                    url: url,
                    description: description,
                    posterName: posterName
                  }
                });
                alert("Post added successfully");
              } else
                alert("Could not add post, please check if url is supplied");
            }}
          >
            <div className="field">
              <label>URL</label>
              <input
                type="text"
                name="first-name"
                onChange={e => {
                  url = e.target.value;
                }}
              />
            </div>
            <div className="field">
              <label>Description</label>
              <input
                type="text"
                name="last-name"
                onChange={e => {
                  description = e.target.value;
                }}
              />
            </div>
            <div className="field">
              <label>Poster Name</label>
              <input
                type="text"
                name="first-name"
                onChange={e => {
                  posterName = e.target.value;
                }}
              />
            </div>
            <div className="btn-row">
              <div>
                <button type="submit" className="ui red button left">
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}
export default UploadForm;
