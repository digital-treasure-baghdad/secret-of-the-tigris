import { test } from 'node:test';
import assert from 'node:assert/strict';
import { puzzles, normalize } from './puzzles.js';
import { readReward } from './cashu.js';

test('normalizes Arabic orthography and English transliterations', () => {
  assert.equal(normalize('نَهْرُ دِجْلَة!'), normalize(puzzles[0].answers[1]));
  assert.equal(normalize('شارع المُتنبّي'), normalize(puzzles[1].answers[2]));
  assert.equal(normalize('AL-MUSTANSIRIYA'), normalize(puzzles[2].answers[3]));
  assert.notEqual(normalize('الفرات'), normalize('دجلة'));
  assert.equal(readReward('not-a-token'), '');
});
