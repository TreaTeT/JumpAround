import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

export default class Player extends Component {
  render() {
    let width = this.props.size[0];
    let height = this.props.size[1];

    let x = this.props.body.position.x - width / 2;
    let y = this.props.body.position.y - height / 2;
    let image = require("./assets/Images/Player/Knight.png");
    return (
      <Image
        style={{
          position: "absolute",
          left: x,
          top: y - 20,
          width: width + 20,
          height: height + 20,
          //backgroundColor: this.props.color,
        }}
        source={image}
        resizeMode={"stretch"}
      />
      // <View
      //   style={{
      //     position: "absolute",
      //     left: x,
      //     top: y,
      //     width: width,
      //     height: height,
      //     backgroundColor: this.props.color,
      //   }}
      // />
    );
  }
}
