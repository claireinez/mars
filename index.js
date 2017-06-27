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
  let output = [];

  robots.forEach(robot => {
    const { x, y, orientation, isLost } = driveRobot(robot, grid);

    output.push(`${ x } ${ y } ${ orientation }${ isLost ? ' LOST' : '' }`);
  });

  return output;
}

function init(file) {
  instructRobots(file).forEach(output => console.log(output));
}

module.exports = {
  init,
  instructRobots
};
