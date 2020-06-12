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
  FlatList,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import Game from "./Game";

import Modal from "react-native-modal";
import Physics from "./Physics";

export default function App() {
  const [TOP10_MODAL_SHOWING, setTOP10_MODAL_SHOWING] = useState(false);
  const [SETTINGS_MODAL_SHOWING, setSETTINGS_MODAL_SHOWING] = useState(false);
  const [CHARACTER_MODAL_SHOWING, setCHARACTER_MODAL_SHOWING] = useState(false);
  const [OBSTACLE_MODAL_SHOWING, setOBSTACLE_MODAL_SHOWING] = useState(false);
  const [BG_MODAL_SHOWING, setBG_MODAL_SHOWING] = useState(false);

  const [gameRunning, setGameRunning] = useState(false);

  //temporary

  //TODO: optimize importing skins
  // characters
  const Ninja = require("./assets/Images/Player/Ninja.png");
  const Knight = require("./assets/Images/Player/Knight.png");
  const Cloudy = require("./assets/Images/Player/Cloudy.png");
  const MaskedDude = require("./assets/Images/Player/MaskedDude.png");
  const Ninja2 = require("./assets/Images/Player/Ninja2.png");
  const Robot = require("./assets/Images/Player/Robot.png");

  // obstacles
  const Obstacle = require("./assets/Images/Obstacles/Obstacle_x128.png");
  const TreeTrunk = require("./assets/Images/Obstacles/Obstacle2_x256.png");
  const Crate = require("./assets/Images/Obstacles/Crate.png");
  const TrafficCone = require("./assets/Images/Obstacles/TrafficCone.png");
  const TrashCan = require("./assets/Images/Obstacles/TrashCan.png");

  // background
  const Background = require("./assets/Images/Background/Bricks-BG.png");

  const [charSkin, setCharSkin] = useState(Knight);
  const [obstacleSkin, setObstacleSkin] = useState(Obstacle);
  const [backgroundSkin, setBackgroundSkin] = useState(Background);

  const [charSkins, setCharSkins] = useState({});
  const [obstacleSkins, setObstacleSkins] = useState({});

  const [money, setMoney] = useState(0);
  // skin prices

  const blueSkinCost = 50;
  const pinkSkinCost = 100;
  const redSkinCost = 150;

  const [top10, setTop10] = new useState([]);

  const axios = require("axios").default;

  const getTop10Scoreboard = () => {
    axios
      .get("http://192.168.1.14:3001/top10")
      .then(function (response) {
        // handle success
        setTop10(response.data);
        const top10Arr = Object.keys(response.data).map(
          (i) => response.data[i]
        );

        top10Arr.sort(function (a, b) {
          return b.score - a.score;
        });

        setTop10(top10Arr.slice(0, 10));
      })
      .catch(function (error) {
        // handle error

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getMoney = () => {
    axios
      .get("http://192.168.1.14:3001/money")
      .then(function (response) {
        // handle success
        setMoney(response.data[1].money);
      })
      .catch(function (error) {
        // handle error

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const saveMoney = (money) => {
    axios
      .post("http://192.168.1.14:3001/money", {
        money: money,
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSkins = () => {
    axios
      .get("http://192.168.1.14:3001/skins")
      .then(function (response) {
        // handle success

        setCharSkins(response.data[1].charSkins);
        setObstacleSkins(response.data[1].obstacleSkins);
      })
      .catch(function (error) {
        // handle error

        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const saveSkins = () => {
    axios
      .post("http://192.168.1.14:3001/skins", {
        charSkins: charSkins,
        obstacleSkins: obstacleSkins,
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // LOCK SCREEN ORIENTATION
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }

    getTop10Scoreboard();
    getMoney();
    setCharSkin(Knight);
    setObstacleSkin(Obstacle);
    getSkins();

    changeScreenOrientation();
  }, []);

  const toggleGame = () => {
    setGameRunning(!gameRunning);
  };

  const Item = ({ name, score }) => {
    return (
      <View style={styles.item}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "left",
          }}
        >
          {`${name} :`}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "100",
            textTransform: "uppercase",
            textAlign: "left",
            paddingLeft: 25,
          }}
        >
          {score}
        </Text>
      </View>
    );
  };

  const payForCharSkin = (skinprice, money, skin, skinName) => {
    if (money >= skinprice) {
      setCharSkin(skin);
      setMoney(money - skinprice);
      setCharSkins({ ...charSkins, [skinName]: true });
      //here i need to call the update method to /skin to set values fot the damn skin true
    } else {
      console.log("mmoney you have " + money);
      console.log("skinprice is " + skinprice);
      console.log("cannot afford this skin");
    }
  };

  const payForObsSkin = (skinprice, money, skin, skinName) => {
    if (money >= skinprice) {
      setObstacleSkin(skin);
      setMoney(money - skinprice);
      setObstacleSkins({ ...obstacleSkins, [skinName]: true });
    } else {
      console.log("mmoney you have " + money);
      console.log("skinprice is " + skinprice);
      console.log("cannot afford this skin");
    }
  };

  // const ownCharSkin = (skinName) => {
  //   if (charSkins[skinName] === true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  if (gameRunning) {
    return (
      <Game
        toggleGame={toggleGame}
        characterSkin={charSkin}
        obstacleSkin={obstacleSkin}
        minScore={top10[9]}
        money={money}
      />
    );
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

          {/*  TOP10 MODAL */}

          <Modal
            isVisible={TOP10_MODAL_SHOWING}
            onBackdropPress={() => {
              setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.settingsMenu}>
                <Text style={styles.scoreboard}>{`TOP 10 SCOREBOARD`}</Text>
                {/* Here handle rendering fo the flatlist*/}
                <FlatList
                  style={styles.flatlist}
                  data={top10}
                  renderItem={({ item }) => (
                    <Item name={item.name} score={item.score} />
                  )}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING);
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
                    >
                      {"Character"}
                    </Text>
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
                      {/* KNIGHT */}
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

                      {/* NINJA */}
                      <TouchableOpacity
                        onPress={() => {
                          if (charSkins.Ninja) {
                            console.log("u already own the skin");
                            setCharSkin(Ninja);
                          } else {
                            payForCharSkin(blueSkinCost, money, Ninja, "Ninja");
                          }
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image source={Ninja} style={styles.charIcon}></Image>
                          <Text style={{ textAlign: "center" }}>
                            {charSkins.Ninja ? "bought" : blueSkinCost}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/* CLOUDY */}
                      <TouchableOpacity
                        onPress={() => {
                          if (charSkins.Cloudy) {
                            console.log("u already own the skin");
                            setCharSkin(Cloudy);
                          } else {
                            payForCharSkin(
                              blueSkinCost,
                              money,
                              Cloudy,
                              "Cloudy"
                            );
                          }
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={Cloudy}
                            style={styles.charIcon}
                          ></Image>
                          <Text style={{ textAlign: "center" }}>
                            {charSkins.Cloudy ? "bought" : blueSkinCost}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/*  MASKED DUDE */}
                      <TouchableOpacity
                        onPress={() => {
                          if (charSkins.MaskedDude) {
                            console.log("u already own the skin");
                            setCharSkin(MaskedDude);
                          } else {
                            payForCharSkin(
                              pinkSkinCost,
                              money,
                              MaskedDude,
                              "MaskedDude"
                            );
                          }
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={MaskedDude}
                            style={styles.charIcon}
                          ></Image>
                          <Text style={{ textAlign: "center" }}>
                            {charSkins.MaskedDude ? "bought" : pinkSkinCost}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/* NINJA 2 */}
                      <TouchableOpacity
                        onPress={() => {
                          if (charSkins.Ninja2) {
                            console.log("u already own the skin");
                            setCharSkin(Ninja2);
                          } else {
                            payForCharSkin(
                              pinkSkinCost,
                              money,
                              Ninja2,
                              "Ninja2"
                            );
                          }
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={Ninja2}
                            style={styles.charIcon}
                          ></Image>
                          <Text style={{ textAlign: "center" }}>
                            {charSkins.Ninja2 ? "bought" : pinkSkinCost}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/* ROBOT */}

                      <TouchableOpacity
                        onPress={() => {
                          if (charSkins.Robot) {
                            console.log("u already own the skin");
                            setCharSkin(Robot);
                          } else {
                            payForCharSkin(redSkinCost, money, Robot, "Robot");
                          }
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image source={Robot} style={styles.charIcon}></Image>
                          <Text style={{ textAlign: "center" }}>
                            {charSkins.Robot ? "bought" : redSkinCost}
                          </Text>
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

                      {/* Tree Trunk*/}
                      <TouchableOpacity
                        onPress={() => {
                          if (obstacleSkins.TreeTrunk) {
                            console.log("already own the skin");
                            setObstacleSkin(TreeTrunk);
                          } else {
                            payForObsSkin(
                              blueSkinCost,
                              money,
                              TreeTrunk,
                              "TreeTrunk"
                            );
                          }
                        }}
                      >
                        <View style={styles.iconContainer}>
                          <Image
                            source={TreeTrunk}
                            style={styles.charIcon}
                          ></Image>
                          <Text style={{ textAlign: "center" }}>
                            {obstacleSkins.TreeTrunk ? "bought" : blueSkinCost}
                          </Text>
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
              <Text>{`${money}`}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING);
                  saveSkins();
                  saveMoney(money);
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
                getMoney();
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
                getTop10Scoreboard();
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
              source={require("./assets/Images/Background/Floor-BG-BIG.png")}
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
  item: {
    padding: 10,
    alignSelf: "flex-start",

    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  flatlist: {
    alignSelf: "center",
  },
  scoreboard: {
    position: "absolute",
    top: 97,
    left: -150,
    color: "red",
    fontSize: 20,
    transform: [{ rotate: "-90deg" }],
    width: 250,
  },
});
