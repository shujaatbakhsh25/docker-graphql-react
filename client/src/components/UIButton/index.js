import React, { Component } from "react";
import "./UIButton.css";

class UIButton extends Component {
  render() {
    return (
      <div className="ui-btn">
        <button
          className="ui red button large"
          onClick={e =>
            this.props.clickHandler ? this.props.clickHandler(e) : null
          }
        >
          {this.props.type}
        </button>
      </div>
    );
  }
}

export default UIButton;
