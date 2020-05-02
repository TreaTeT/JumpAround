import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class Player extends Component {
  render() {
    let width = this.props.size[0];
    let height = this.props.size[1];

    let x = this.props.body.position.x - width / 2;
    let y = this.props.body.position.y - height / 2;

    return (
      <View
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color,
        }}
      />
    );
  }
}
