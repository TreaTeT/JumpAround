import React, { Component } from "react";
import { View, Image } from "react-native";

export default class Wall extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let image = require("./assets/Images/Obstacles/Obstacle_x128.png");

    return (
      <Image
        style={{
          position: "absolute",
          left: x,
          top: y - 10,
          width: width + 10,
          height: height + 10,
        }}
        resizeMode={"stretch"}
        source={image}
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
