import Matter from "matter-js";

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let player = entities.player.body;
  engine.world.gravity.y = 1.65;

  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.applyForce(
        player,
        { x: player.position.x, y: player.position.y },
        { x: 0.0, y: -0.03 }
      );
    });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
