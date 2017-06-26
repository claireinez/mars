function getGrid(grid) {
  const [inputX, inputY] = grid.split(' ');
  const x = parseInt(inputX, 10);
  const y = parseInt(inputY, 10);

  return { x, y };
}

function getRobots(robotInfo) {
  const output = [];

  for (let i = robotInfo.length - 1; i > 0; i -= 2) {
    const instructions = robotInfo[i];
    const [inputX, inputY, orientation] = robotInfo[i - 1].split(' ');
    const x = parseInt(inputX, 10);
    const y = parseInt(inputY, 10);

    output.push({
      position: { x, y, orientation },
      instructions
    });
  }

  return output;
}

module.exports = {
  getGrid,
  getRobots
};
