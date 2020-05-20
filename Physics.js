import Matter from "matter-js";
import CONSTANTS from "./CONSTANTS";

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  let player = entities.player.body;
  engine.world.gravity.y = 1.1;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      // Matter.Body.applyForce(
      //   player,
      //   { x: player.position.x, y: player.position.y },
      //   { x: 0.0, y: -0.03 }
      // );

      Matter.Body.setVelocity(player, { x: 0, y: -28 });
    });

  for (let i = 1; i <= 3; i++) {
    if (
      entities["obs" + i].body.position.x < player.position.x &&
      !entities["obs" + i].scored
    ) {
      entities["obs" + i].scored = true;
      dispatch({ type: "score" });
    }
    if (entities["obs" + i].body.position.x <= -1 * (50 / 2)) {
      Matter.Body.setPosition(entities["obs" + i].body, {
        x: CONSTANTS.MAX_HEIGHT * 1.5 - 50 / 2,
        y: entities["obs" + i].body.position.y,
      });
      entities["obs" + i].scored = false;
    } else {
      Matter.Body.translate(entities["obs" + i].body, { x: -4, y: 0 });
      // Matter.Body.translate(entities["coin"].body, { x: -3, y: 0 });
    }
  }

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
