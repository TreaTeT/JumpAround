import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
  Text,
  StatusBar,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import Game from "./Game";

import Modal from "react-native-modal";

export default function App() {
  const [TOP10_MODAL_SHOWING, setTOP10_MODAL_SHOWING] = useState(false);
  const [SETTINGS_MODAL_SHOWING, setSETTINGS_MODAL_SHOWING] = useState(false);
  const [CHARACTER_MODAL_SHOWING, setCHARACTER_MODAL_SHOWING] = useState(false);
  const [OBSTACLE_MODAL_SHOWING, setOBSTACLE_MODAL_SHOWING] = useState(false);
  const [BG_MODAL_SHOWING, setBG_MODAL_SHOWING] = useState(false);

  const [gameRunning, setGameRunning] = useState(false);

  //temporary
  const Ninja = require("./assets/Images/Player/Ninja.png");
  const Knight = require("./assets/Images/Player/Knight.png");
  const Obstacle = require("./assets/Images/Obstacles/Obstacle_x128.png");
  const TreeTrunk = require("./assets/Images/Obstacles/Obstacle2_x256.png");
  const Background = require("./assets/Images/Background/Bricks-BG.png");

  const [charSkin, setCharSkin] = useState(Knight);
  const [obstacleSkin, setObstacleSkin] = useState(Obstacle);
  const [backgroundSkin, setBackgroundSkin] = useState(Background);

  useEffect(() => {
    // LOCK SCREEN ORIENTATION
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
    changeScreenOrientation();
  }, []);

  if (gameRunning) {
    return <Game />;
  } else {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground
          source={require("./assets/Images/Background/Bricks-BG.png")}
          style={styles.background}
        >
          {/* HEADER */}

          <View style={styles.container}>
            <Image
              source={require("./assets/Images/Menu/JumpAround-Header.png")}
              style={styles.header}
            ></Image>
          </View>

          {/* TOP10 MODAL */}

          {/* 
        <Modal
          isVisible={TOP10_MODAL_SHOWING}
          onBackdropPress={() => {
            setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING);
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <Button
              title="CLOSE"
              onPress={() => {
                setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING);
              }}
            />
          </View>
        </Modal> 
        */}

          {/* CHARCTER SKIN MODAL */}

          {/* SETTINGS MODAL */}

          <Modal
            isVisible={SETTINGS_MODAL_SHOWING}
            onBackdropPress={() => {
              setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING);
            }}
          >
            {/*  CHARACTER SKIN PICK MODAL AND ICON */}
            <View style={styles.modalContainer}>
              <View style={styles.settingsMenu}>
                <TouchableOpacity
                  onPress={() => {
                    setCHARACTER_MODAL_SHOWING(!CHARACTER_MODAL_SHOWING);
                  }}
                >
                  <View style={styles.iconContainer}>
                    <Image
                      source={charSkin}
                      style={styles.settingsCharIcon}
                    ></Image>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >{`Character`}</Text>
                  </View>
                </TouchableOpacity>

                <Modal
                  isVisible={CHARACTER_MODAL_SHOWING}
                  onBackdropPress={() => {
                    setCHARACTER_MODAL_SHOWING(!CHARACTER_MODAL_SHOWING);
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.iconsMenu}>
                      <TouchableOpacity
                        onPress={() => {
                          setCharSkin(Ninja);
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={require("./assets/Images/Player/Ninja.png")}
                            style={styles.charIcon}
                          ></Image>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setCharSkin(Knight);
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={require("./assets/Images/Player/Knight.png")}
                            style={styles.charIcon}
                          ></Image>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setCHARACTER_MODAL_SHOWING(!CHARACTER_MODAL_SHOWING);
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

                {/*  OBSTACLE SKIN PICK MODAL AND ICON */}

                <TouchableOpacity
                  onPress={() =>
                    setOBSTACLE_MODAL_SHOWING(!OBSTACLE_MODAL_SHOWING)
                  }
                >
                  <View style={styles.iconContainer}>
                    <Image
                      source={obstacleSkin}
                      style={styles.settingsCharIcon}
                    ></Image>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >{`Obstacle`}</Text>
                  </View>
                </TouchableOpacity>

                <Modal
                  isVisible={OBSTACLE_MODAL_SHOWING}
                  onBackdropPress={() => {
                    setOBSTACLE_MODAL_SHOWING(!OBSTACLE_MODAL_SHOWING);
                  }}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.iconsMenu}>
                      <TouchableOpacity
                        onPress={() => {
                          setObstacleSkin(TreeTrunk);
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={require("./assets/Images/Obstacles/Obstacle2_x256.png")}
                            style={styles.charIcon}
                          ></Image>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setObstacleSkin(Obstacle);
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={require("./assets/Images/Obstacles/Obstacle_x128.png")}
                            style={styles.charIcon}
                          ></Image>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        setOBSTACLE_MODAL_SHOWING(!OBSTACLE_MODAL_SHOWING);
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

                {/* BACKGROUND SKIN PICK MODAL AND ICON */}

                <TouchableOpacity>
                  <View style={styles.iconContainer}>
                    <Image
                      source={backgroundSkin}
                      style={styles.settingsCharIcon}
                    ></Image>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >{`Backdrop`}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING);
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

          {/* MENU */}

          <View style={styles.menu}>
            {/* SETTINGS  ICON*/}

            <TouchableOpacity
              onPress={() => {
                setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING);
              }}
            >
              <Image
                source={require("./assets/Images/Menu/Settings_x128.png")}
                style={styles.icon}
              ></Image>
            </TouchableOpacity>

            {/* PLAY ICON */}

            <TouchableOpacity
              onPress={() => {
                setGameRunning(!gameRunning);
              }}
            >
              <Image
                source={require("./assets/Images/Menu/Play_x128.png")}
                style={styles.playIcon}
              ></Image>
            </TouchableOpacity>

            {/* TOP 10 ICON*/}

            <TouchableOpacity
              onPress={() => {
                setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING);
              }}
            >
              <Image
                source={require("./assets/Images/Menu/Top10_x128.png")}
                style={styles.icon}
              ></Image>
            </TouchableOpacity>
          </View>

          {/* PLAYER */}

          <View style={styles.container}>
            <Image source={charSkin} style={styles.character}></Image>
          </View>

          {/* COIN */}

          <View style={styles.container}>
            <Image
              source={require("./assets/Images/Coins/Coin_x128.png")}
              style={styles.coin}
            ></Image>
          </View>

          {/* OBSTACLE */}

          <View style={styles.container}>
            <Image source={obstacleSkin} style={styles.obstacle}></Image>
          </View>

          {/* FLOOR */}

          <View style={styles.container}>
            <Image
              source={require("./assets/Images/Background/Floor-BG.png")}
              style={styles.floor}
            ></Image>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  background: {
    flex: 1,
    resizeMode: "cover",
  },
  menu: {
    flex: 1,
    alignSelf: "center",
    paddingTop: 25,
    flexDirection: "row",
    bottom: 0,
    paddingBottom: 0,
  },

  icon: {
    width: 70,
    height: 70,
  },
  playIcon: {
    width: 90,
    height: 90,
  },
  header: {
    width: 450,
    height: 100,
    alignSelf: "center",
  },
  character: {
    width: 90,
    height: 90,
    top: 40,
    left: 40,
  },
  coin: {
    width: 50,
    height: 50,
    left: 450,
    top: 10,
  },
  obstacle: {
    width: 85,
    height: 85,
    bottom: 55,
    left: 250,
  },
  floor: {
    width: 600,
    height: 170,
    bottom: 20,
  },
  top10: {
    flex: 1,
  },
  modalContainer: {
    width: 500,
    height: 273,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  charIcon: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  iconsMenu: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  iconContainer: {
    padding: 10,
  },
  settingsCharIcon: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  settingsMenu: {
    flex: 1,
    alignItems: "center",
    left: 80,
    flexDirection: "row",
  },
});
