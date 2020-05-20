import React, { Component } from "react"; // CODE 10HP
import {
  StyleSheet,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import Matter, { Constraint } from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from "./Player";
import CONSTANTS from "./CONSTANTS";
import Physics from "./Physics";
import Wall from "./Wall";
import Coin from "./Coin";
import Floor from "./Floor";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      ready: true,
      score: 0,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
  }
  //const BG = require("./assets/Images/Background/Bricks-BG.png");

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let player = Matter.Bodies.rectangle(
      CONSTANTS.MAX_WIDTH / 4 - 20,
      CONSTANTS.MAX_HEIGHT / 3,
      50,
      50,
      { frictionAir: 0.05 }
    );

    let floor = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT / 2,
      CONSTANTS.MAX_WIDTH - 25,
      CONSTANTS.MAX_HEIGHT,
      50,
      { isStatic: true }
    );

    // let ceiling = Matter.Bodies.rectangle(
    //   CONSTANTS.MAX_HEIGHT / 2,
    //   25,
    //   CONSTANTS.MAX_HEIGHT,
    //   25,
    //   { isStatic: true }
    // );

    // TODO: obs i can make them like 10 in a row and then just loop them to go round and round
    // TODO: Coins -> technically i can just make obs that is a coin
    let obs1 = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT - 50 / 2,
      CONSTANTS.MAX_WIDTH - 75,
      50,
      50,
      { isStatic: true }
    );
    let obs2 = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT + 500 / 2,
      CONSTANTS.MAX_WIDTH - 75,
      50,
      50,
      { isStatic: true }
    );
    let obs3 = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT + 1000 / 2,
      CONSTANTS.MAX_WIDTH - 75,
      50,
      50,
      { isStatic: true }
    );

    const level = [obs1, obs2, obs3];

    let coin = Matter.Bodies.circle(
      CONSTANTS.MAX_HEIGHT - 80,
      CONSTANTS.MAX_WIDTH - 100,
      25,
      { isStatic: true }
    );

    Matter.World.add(world, [player, floor, obs1, obs2, obs3]);

    Matter.Events.on(engine, "collisionStart", (event) => {
      // for (let i = 0; i < pairs.length; i++) {
      //   console.log("////////////////////////////////////////////");
      //   console.log(pairs[i]);
      // }

      let pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];

        for (let i = 0; i < level.length; i++) {
          if (pair.bodyA === player && pair.bodyB === level[i]) {
            this.gameEngine.dispatch({ type: "game-over" });
          }
        }

        // TODO: sem hocikedy sa dotkne mince tak ju collectne

        // if (pair.bodyA === player && pair.bodyB === level[i]) {
        //   this.gameEngine.dispatch({ type: "game-over" });
        // }

        // if (pair.bodyA === player && pair.bodyB === level[i]) {
        //   this.gameEngine.dispatch({ type: "game-over" });
        // }

        // TODO: make te playe jump only after he lands  -> disable double and multi jumping
        // if (pair.bodyA === player && pair.bodyB === floor) {
        //   console.log("player landed");
        // }
      }
    });

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
        renderer: Floor,
      },

      obs1: {
        body: obs1,
        size: [50, 50],
        color: "orange",
        scored: false,
        renderer: Wall,
      },
      obs2: {
        body: obs2,
        size: [50, 50],
        color: "orange",
        scored: false,
        renderer: Wall,
      },
      obs3: {
        body: obs3,
        size: [50, 50],
        color: "orange",
        scored: false,
        renderer: Wall,
      },

      // coin: {
      //   body: coin,
      //   size: [50, 50],
      //   renderer: Coin,
      // },
    };
  };

  onEvent = (e) => {
    if (e.type === "game-over") {
      this.setState({
        running: false,
      });
    } else if (e.type === "score") {
      this.setState({
        score: this.state.score + 1,
      });
    }
  };

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/Images/Background/Bricks-BG.png")}
          style={styles.background}
        >
          <Text style={styles.score}>{this.state.score}</Text>
          <GameEngine
            ref={(ref) => {
              this.gameEngine = ref;
            }}
            style={styles.gameContainer}
            running={this.state.running}
            systems={[Physics]}
            entities={this.entities}
            onEvent={this.onEvent}
          ></GameEngine>

          {/* GAME OVER SCREEN */}
          {!this.state.running && (
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={this.reset}
            >
              <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>Game Over</Text>
              </View>
            </TouchableOpacity>
          )}
          <StatusBar hidden={true} />
        </ImageBackground>
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
  gameOverText: {
    color: "white",
    fontSize: 48,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  score: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
});
