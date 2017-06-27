const test = require('tape');

const {
  turnLeft,
  turnRight,
  moveForward,
  updateRobotPosition,
  driveRobot
} = require('../src/driver.js');

const {
  FACING_NORTH,
  FACING_SOUTH,
  FACING_EAST,
  FACING_WEST
} = require('../src/constants.js');

test('turnLeft', function(t) {
  t.equal(turnLeft(FACING_NORTH), FACING_WEST, 'should turn N --> W');
  t.equal(turnLeft(FACING_SOUTH), FACING_EAST, 'should turn S --> E');
  t.equal(turnLeft(FACING_EAST), FACING_NORTH, 'should turn E --> N');
  t.equal(turnLeft(FACING_WEST), FACING_SOUTH, 'should turn W --> S');
  t.end();
});

test('turnRight', function(t) {
  t.equal(turnRight(FACING_NORTH), FACING_EAST, 'should turn N --> E');
  t.equal(turnRight(FACING_SOUTH), FACING_WEST, 'should turn S --> W');
  t.equal(turnRight(FACING_EAST), FACING_SOUTH, 'should turn E --> S');
  t.equal(turnRight(FACING_WEST), FACING_NORTH, 'should turn W --> N');
  t.end();
});

test('moveForward', function(t) {
  t.deepEqual(
    moveForward(
      { x: 1, y: 1, orientation: 'N' },
      { x: 5, y: 3 }
    ),
    { x: 1, y: 2, orientation: 'N' },
    'should move North'
  );
  t.deepEqual(
    moveForward(
      { x: 1, y: 3, orientation: 'N' },
      { x: 5, y: 3 }
    ),
    { x: 1, y: 3, orientation: 'N', isLost: true },
    'should be lost moving North'
  );
  t.deepEqual(
    moveForward(
      { x: 1, y: 1, orientation: 'S' },
      { x: 5, y: 3 }
    ),
    { x: 1, y: 0, orientation: 'S' },
    'should move South'
  );
  t.deepEqual(
    moveForward(
      { x: 1, y: 0, orientation: 'S' },
      { x: 5, y: 3 }
    ),
    { x: 1, y: 0, orientation: 'S', isLost: true },
    'should be lost moving South'
  );
  t.deepEqual(
    moveForward(
      { x: 1, y: 1, orientation: 'E' },
      { x: 5, y: 3 }
    ),
    { x: 2, y: 1, orientation: 'E' },
    'should move East'
  );
  t.deepEqual(
    moveForward(
      { x: 5, y: 0, orientation: 'E' },
      { x: 5, y: 3 }
    ),
    { x: 5, y: 0, orientation: 'E', isLost: true },
    'should be lost moving East'
  );
  t.deepEqual(
    moveForward(
      { x: 1, y: 1, orientation: 'W' },
      { x: 5, y: 3 }
    ),
    { x:0, y: 1, orientation: 'W' },
    'should move West'
  );
  t.deepEqual(
    moveForward(
      { x: 0, y: 0, orientation: 'W' },
      { x: 5, y: 3 }
    ),
    { x: 0, y: 0, orientation: 'W', isLost: true },
    'should be lost moving West'
  );
  t.end();
});

test('updateRobotPosition', function(t) {
  t.deepEqual(
    updateRobotPosition(
      { x: 0, y: 3, orientation: 'E' },
      'L',
      { x: 5, y: 5 }
    ),
    { x: 0, y: 3, orientation: 'N' },
    'should turn left'
  );
  t.deepEqual(
    updateRobotPosition(
      { x: 0, y: 3, orientation: 'E' },
      'R',
      { x: 5, y: 5 }
    ),
    { x: 0, y: 3, orientation: 'S' },
    'should turn right'
  );
  t.deepEqual(
    updateRobotPosition(
      { x: 0, y: 3, orientation: 'E' },
      'F',
      { x: 5, y: 5 }
    ),
    { x: 1, y: 3, orientation: 'E' },
    'should move forward'
  );
  t.deepEqual(
    updateRobotPosition(
      { x: 5, y: 3, orientation: 'E', isLost: true },
      'F',
      { x: 5, y: 5 }
    ),
    { x: 5, y: 3, orientation: 'E', isLost: true },
    'should not change position if lost'
  );
  t.end();
});

test('driveRobot', function(t) {
  t.deepEqual(
    driveRobot(
      {
        position: { x: 1, y: 1, orientation: 'E' },
        instructions: 'RFRFRFRF'
      },
      { x: 5, y: 3 }
    ),
    { x: 1, y: 1, orientation: 'E' },
    'should follow instructions'
  );
  t.deepEqual(
    driveRobot(
      {
        position: { x: 3, y: 2, orientation: 'N' },
        instructions: 'FRRFLLFFRRFLL'
      },
      { x: 5, y: 3 }
    ),
    { x: 3, y: 3, orientation: 'N', isLost: true },
    'should get lost'
  );
  t.end();
});
