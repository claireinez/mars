const {
  GRID_ORIGIN,
  FACING_NORTH,
  FACING_SOUTH,
  FACING_EAST,
  FACING_WEST
} = require('./constants.js');

let lostPositions = [];

function driveRobot(robot, gridLimit) {
  let position = robot.position;

  robot.instructions.split('').forEach(
    instruction => {
      position = updateRobotPosition(position, instruction, gridLimit, lostPositions);

      const { x, y, orientation, isLost } = position;

      if (isLost && !lostPositions.includes(`${ x }${ y }`)) {
        lostPositions.push(`${ x }${ y }${ orientation }`);
      }
    }
  );

  return position;
}

function turnLeft(orientation) {
  const directions = {
    [FACING_NORTH]: FACING_WEST,
    [FACING_SOUTH]: FACING_EAST,
    [FACING_EAST]: FACING_NORTH,
    [FACING_WEST]: FACING_SOUTH
  };

  return directions[orientation];
}

function turnRight(orientation) {
  const directions = {
    [FACING_NORTH]: FACING_EAST,
    [FACING_SOUTH]: FACING_WEST,
    [FACING_EAST]: FACING_SOUTH,
    [FACING_WEST]: FACING_NORTH
  };

  return directions[orientation];
}

function moveForward(position, gridLimit, lostPositions) {
  const { x, y, orientation } = position;

  if (lostPositions.includes(`${ x }${ y }${ orientation }`)) return position;

  switch(orientation) {
    case FACING_NORTH:
      if (y < gridLimit.y) {
        return Object.assign({}, position, { y: y + 1 });
      }
      return Object.assign({}, position, { isLost: true });
    case FACING_SOUTH:
      if (y > GRID_ORIGIN.y) {
        return Object.assign({}, position, { y: y - 1 });
      }
      return Object.assign({}, position, { isLost: true });
    case FACING_EAST:
      if (x < gridLimit.x) {
        return Object.assign({}, position, { x: x + 1 });
      }
      return Object.assign({}, position, { isLost: true });
    case FACING_WEST:
      if (x > GRID_ORIGIN.x) {
        return Object.assign({}, position, { x: x - 1 });
      }
      return Object.assign({}, position, { isLost: true });
  }
}

function updateRobotPosition(position, instruction, gridLimit, lostPositions) {
  if (position.isLost) return position;

  switch(instruction) {
    case 'L':
      return Object.assign({}, position, { orientation: turnLeft(position.orientation) });
    case 'R':
      return Object.assign({}, position, { orientation: turnRight(position.orientation) });
    case 'F':
      return moveForward(position, gridLimit, lostPositions);
    default:
      throw new Error(`${ instruction } is not a valid instruction.`);
  }
}

module.exports = {
  driveRobot,
  turnLeft,
  turnRight,
  moveForward,
  updateRobotPosition
};
