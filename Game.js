import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Player from "./Player";
import Constants from "./CONSTANTS";
import * as ScreenOrientation from "expo-screen-orientation";

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            running: true,
        };

        this.gameEngine = null;

        this.entities = this.setupWorld();

        async function changeScreenOrientation() {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
            );
        }

        changeScreenOrientation();
    }

    setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;

        let player = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 4,
            Constants.MAX_HEIGHT / 2,
            50,
            50
        );
        console.log("player x is :" + player.position.x);
        Matter.World.add(world, [player]);

        return {
            physics: { engine: engine, world: world },
            player: { body: player, size: [50, 50], color: "red", renderer: Player },
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
                    entities={this.entities}
                ></GameEngine>
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
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
