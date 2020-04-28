import Matter from "matter-js";
import { exp } from "react-native-reanimated";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let player = entities.player.body;

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
