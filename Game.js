import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from "./Player";
import CONSTANTS from "./CONSTANTS";
import Physics from "./Physics";
import Wall from "./Wall";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let player = Matter.Bodies.rectangle(
      CONSTANTS.MAX_WIDTH / 4,
      CONSTANTS.MAX_HEIGHT / 3,
      50,
      50
    );

    let floor = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT / 2,
      CONSTANTS.MAX_WIDTH - 25,
      CONSTANTS.MAX_HEIGHT,
      50,
      { isStatic: true }
    );

    let ceiling = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT / 2,
      25,
      CONSTANTS.MAX_HEIGHT,
      25,
      { isStatic: true }
    );

    Matter.World.add(world, [player, floor, ceiling]);

    console.log(`player x is ${player.position.x}`);
    console.log(`player y is ${player.position.y}`);

    console.log(`floor x is ${floor.position.x}`);
    console.log(`floor y is ${floor.position.y}`);

    return {
      physics: { engine: engine, world: world },
      player: { body: player, size: [50, 50], color: "red", renderer: Player },
      floor: {
        body: floor,
        size: [CONSTANTS.MAX_HEIGHT, 50],
        color: "green",
        renderer: Wall,
      },
      ceiling: {
        body: ceiling,
        size: [CONSTANTS.MAX_HEIGHT, 50],
        color: "green",
        renderer: Wall,
      },
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          running={this.state.running}
          systems={[Physics]}
          entities={this.entities}
        ></GameEngine>
        <StatusBar hidden={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gameContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
  },
});
