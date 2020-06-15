import React, { Component } from "react"; // CODE 10HP
import {
  StyleSheet,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import Matter, { Constraint } from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from "./Player";
import CONSTANTS from "./CONSTANTS";
import Physics from "./Physics";
import Wall from "./Wall";
import Coin from "./Coin";
import Floor from "./Floor";
import Modal from "react-native-modal";
const axios = require("axios").default;

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      ready: true,
      score: 0,
      charSkin: this.props.characterSkin,
      obsSkin: this.props.obstacleSkin,
      coins: 0,
      minScore: this.props.minScore.score,
      saveScore: false,
      saveScoreModal: false,
      saveScoreUsername: "",
      money: this.props.money,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
    this.saveUser = this.saveUser.bind(this);
    this.saveMoney = this.saveMoney.bind(this);
  }

  //const BG = require("./assets/Images/Background/Bricks-BG.png");
  saveUser = (name, score) => {
    axios
      .post("http://192.168.1.14:3001/top10", {
        name: name,
        score: score,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      saveScoreModal: !this.state.saveScoreModal,
    });

    this.props.toggleGame();
  };

  saveMoney = (coins) => {
    axios
      .post("http://192.168.1.14:3001/money", {
        money: this.props.money + coins,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({
      money: this.state.money + coins,
    });
  };

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
      40,
      40,
      { isStatic: true }
    );
    let obs2 = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT + 500 / 2,
      CONSTANTS.MAX_WIDTH - 75,
      40,
      40,
      { isStatic: true }
    );
    let obs3 = Matter.Bodies.rectangle(
      CONSTANTS.MAX_HEIGHT + 1000 / 2,
      CONSTANTS.MAX_WIDTH - 75,
      40,
      40,
      { isStatic: true }
    );

    const level = [obs1, obs2, obs3];

    let coin = Matter.Bodies.circle(
      CONSTANTS.MAX_HEIGHT - 80,
      CONSTANTS.MAX_WIDTH - 75,
      25,
      { isSensor: true, isStatic: true }
    );

    Matter.World.add(world, [player, floor, obs1, obs2, obs3, coin]);

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

        if (pair.bodyB.isSensor) {
          this.setState({
            coins: this.state.coins + 1,
          });
          console.log("coin was deleted");
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

    return {
      physics: { engine: engine, world: world },
      player: {
        body: player,
        size: [50, 50],
        color: "red",
        renderer: Player,
        skin: this.state.charSkin,
      },
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
        skin: this.state.obsSkin,
      },
      obs2: {
        body: obs2,
        size: [50, 50],
        color: "orange",
        scored: false,
        renderer: Wall,
        skin: this.state.obsSkin,
      },
      obs3: {
        body: obs3,
        size: [50, 50],
        color: "orange",
        scored: false,
        renderer: Wall,
        skin: this.state.obsSkin,
      },

      coin: {
        body: coin,
        size: [35, 35],

        renderer: Coin,
      },
    };
  };

  onEvent = (e) => {
    if (e.type === "game-over") {
      if (this.state.score > this.state.minScore) {
        this.setState({
          saveScore: true,
        });
      }
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
    this.saveMoney(this.state.coins);
    this.setState({
      running: true,
      score: 0,
      saveScore: false,
      coins: 0,
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
          <View>
            <Text style={styles.coins}>{this.state.coins}</Text>
            <Image
              source={require("./assets/Images/Coins/Coin_x128.png")}
              style={{
                height: 25,
                width: 25,
                alignSelf: "flex-end",
                top: 15,
              }}
            ></Image>
          </View>

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
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>

              <View>
                <Button
                  title={`RETRY`}
                  onPress={this.reset}
                  color="#ffffff"
                ></Button>
                <Button
                  title={`MENU`}
                  onPress={() => {
                    this.props.toggleGame();
                    this.saveMoney(this.state.coins);
                  }}
                  color="#ffffff"
                ></Button>

                <Button
                  title={`SAVE SCORE`}
                  disabled={!this.state.saveScore}
                  color="#ffffff"
                  onPress={() => {
                    this.setState({
                      saveScoreModal: !this.state.saveScoreModal,
                    });
                  }}
                ></Button>
              </View>

              <Modal
                isVisible={this.state.saveScoreModal}
                onBackdropPress={() => {
                  this.setState({
                    saveScoreModal: !this.state.saveScoreModal,
                  });
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.settingsMenu}>
                    <View style={styles.saveScoreView}>
                      <Text>{`Enter your name: `}</Text>
                      <TextInput
                        style={{
                          height: 40,
                          width: 150,
                          borderColor: "gray",
                          borderWidth: 1,
                        }}
                        onChangeText={(text) => {
                          this.setState({
                            saveScoreUsername: text,
                          });
                        }}
                        value={this.state.saveScoreUsername}
                      ></TextInput>
                      <Button
                        title={`SAVE`}
                        onPress={() => {
                          this.saveUser(
                            this.state.saveScoreUsername,
                            this.state.score
                          );
                        }}
                        color="#000000"
                      ></Button>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        saveScoreModal: !this.state.saveScoreModal,
                      });
                    }}
                  >
                    <View style={{ paddingTop: 10, paddingRight: 12 }}>
                      <Image
                        source={require("./assets/Images/Menu/X_128.png")}
                        style={{ width: 30, height: 30 }}
                      ></Image>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
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
    position: "absolute",
    alignSelf: "center",
  },
  coins: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    alignSelf: "flex-end",
    top: 15,
    right: 45,
  },
  modalContainer: {
    width: 500,
    height: 273,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  settingsMenu: {
    flex: 1,
    alignItems: "center",
    left: 80,
    flexDirection: "row",
  },
  saveScoreView: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    top: -25,
  },
});
