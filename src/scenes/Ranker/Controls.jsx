import React from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { getRange } from "../../libs/save";
import "./Controls.css";

export default class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <label>Score Range: </label>

        <Range
          className="range"
          dots
          min={0}
          max={10}
          defaultValue={getRange()}
          allowCross={false}
          tipFormatter={(value) => `${value}%`}
          marks={{
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10,
          }}
          onChange={this.props.setScore}
        />
      </div>
    );
  }
}
