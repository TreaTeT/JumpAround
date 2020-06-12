import React, { Component } from "react";
import { View, Image } from "react-native";

export default class Floor extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let floor = require("./assets/Images/Background/Floor-BG.png");
    return (
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

      <Image
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          //backgroundColor: this.props.color,
        }}
        source={floor}
        resizeMode={"repeat"}
      />
    );
  }
}
