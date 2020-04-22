import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity, Button, Text } from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";

import Modal from 'react-native-modal';

export default function App() {


  useEffect(() => {

    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }

    changeScreenOrientation();

  }, []);



  const [TOP10_MODAL_SHOWING, setTOP10_MODAL_SHOWING] = useState(false);
  const [SETTINGS_MODAL_SHOWING, setSETTINGS_MODAL_SHOWING] = useState(false);




  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/Images/Background/Bricks-BG.png")} style={styles.background}>

        {/* HEADER */}

        <View style={styles.container}>
          <Image source={require("./assets/Images/Menu/JumpAround-Header.png")} style={styles.header}></Image>
        </View>


        { /* TOP10 MODAL */}

        <Modal isVisible={TOP10_MODAL_SHOWING} onBackdropPress={() => { setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING) }}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
            <Button title="CLOSE" onPress={() => { setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING) }} />
          </View>
        </Modal>

        { /* SETTINGS MODAL */}

        <Modal isVisible={SETTINGS_MODAL_SHOWING} onBackdropPress={() => { setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING) }} >


          <View style={styles.settingsModal}>



            <View style={styles.container}>
              <Image source={require("./assets/Images/Player/Character2_x128.png")} style={styles.charIcon}></Image>
            </View>
            <View style={styles.container}>
              <Image source={require("./assets/Images/Player/MainChar_x256.png")} style={styles.charIcon}></Image>
            </View>
          </View>

          <Button title="CLOSE" onPress={() => { setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING) }} />

        </Modal>


        {/* MENU */}

        <View style={styles.menu}>
          {/* SETTINGS */}
          <TouchableOpacity onPress={() => { setSETTINGS_MODAL_SHOWING(!SETTINGS_MODAL_SHOWING) }}>
            <Image source={require("./assets/Images/Menu/Settings_x128.png")} style={styles.icon}></Image>
          </TouchableOpacity>
          {/* PLAY */}
          <TouchableOpacity >
            <Image source={require("./assets/Images/Menu/Play_x128.png")} style={styles.playIcon}></Image>
          </TouchableOpacity>


          {/* TOP 10 */}


          <TouchableOpacity onPress={() => { setTOP10_MODAL_SHOWING(!TOP10_MODAL_SHOWING) }}>
            <Image source={require("./assets/Images/Menu/Top10_x128.png")} style={styles.icon}></Image>
          </TouchableOpacity>


        </View>

        {/* PLAYER */}

        <View style={styles.container}>
          <Image source={require("./assets/Images/Player/MainChar_x256.png")} style={styles.character}></Image>
        </View>
        {/* COIN */}

        <View style={styles.container} >
          <Image source={require("./assets/Images/Coins/Coin_x128.png")} style={styles.coin}></Image>
        </View>
        {/* OBSTACLE */}

        <View style={styles.container} >
          <Image source={require("./assets/Images/Obstacles/Obstacle_x128.png")} style={styles.obstacle}></Image>
        </View>


        { /* FLOOR */}
        <View style={styles.container} >
          <Image source={require("./assets/Images/Background/Floor-BG.png")} style={styles.floor}></Image>
        </View>




      </ImageBackground>
    </View >
  );
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
  settingsModal: {
    width: 500,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row"
  },
  charIcon: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,


  }
});
