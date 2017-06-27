const fs = require('fs');

const { getGrid, getRobots } = require('./src/inputTranslator.js');
const { driveRobot } = require('./src/driver.js');

function instructRobots(file) {
  const input = fs.readFileSync(file, 'utf-8');

  if (!input) {
    throw new Error('Please provide some instructions in `instructions.txt`');
  }

  const instructionsArray = input.split('\n').filter(instruction => !!instruction);
  const [inputGrid, ...inputRobots] = instructionsArray;
  const grid = getGrid(inputGrid);
  const robots = getRobots(inputRobots);

  robots.forEach(robot => {
    const { x, y, orientation, isLost } = driveRobot(robot, grid);

    console.log(`${ x } ${ y } ${ orientation }${ isLost ? ' LOST' : '' }`);
  });
}

module.exports = {
  init: instructRobots
};
