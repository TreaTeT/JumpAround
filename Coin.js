import React, { Component } from "react";
import { Image } from "react-native";

export default class Coin extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    let coin = require("./assets/Images/Coins/Coin_x128.png");
    return (
      // <View
      //   style={{
      //     position: "absolute",
      //     left: x,
      //     top: y,
      //     borderRadius: 50,
      //     width: width,
      //     height: height,
      //     backgroundColor: "yellow",
      //   }}
      // ></View>

      <Image
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height,
          borderRadius: 50,
          //backgroundColor: this.props.color,
        }}
        source={coin}
        resizeMode={"cover"}
      />
    );
  }
}
