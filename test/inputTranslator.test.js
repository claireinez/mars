const test = require('tape');

const { getGrid, getRobots } = require('../src/inputTranslator.js');

test('getGrid', function(t) {
  t.deepEqual(getGrid('1 2'), { x: 1, y: 2 });
  t.end();
});

test('getRobots', function(t) {
  const inputRobots = [
    '1 1 E',
    'RFRFRFRF',
    '3 2 N',
    'FRRFLLFFRRFLL',
    '0 3 W',
    'LLFFFLFLFL'
  ];
  const outputRobots = [
    {
      position: { x: 0, y: 3, orientation: 'W' },
      instructions: 'LLFFFLFLFL'
    },
    {
      position: { x: 3, y: 2, orientation: 'N' },
      instructions: 'FRRFLLFFRRFLL'
    },
    {
      position: { x: 1, y: 1, orientation: 'E' },
      instructions: 'RFRFRFRF'
    }
  ];
  t.deepEqual(getRobots(inputRobots), outputRobots);
  t.end();
});
