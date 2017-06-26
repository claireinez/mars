const fs = require('fs');

const { getGrid, getRobots } = require('./src/inputTranslator.js');

function instructRobots(file) {
  const input = fs.readFileSync(file, 'utf-8');

  if (!input) {
    throw new Error('Please provide some instructions in `instructions.txt`');
  }

  const instructionsArray = input.split('\n').filter(instruction => !!instruction);
  const [inputGrid, ...inputRobots] = instructionsArray;
  const grid = getGrid(inputGrid);
  const robots = getRobots(inputRobots);

  console.log(grid);
  console.log(robots);
}

module.exports = {
  init: instructRobots
};
