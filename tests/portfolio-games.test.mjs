import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('adds Games to both bilingual navigation arrays and renumbers later sections', () => {
  assert.equal((html.match(/id: 'games', num: '06', label: 'Games'/g) || []).length, 2);
  for (const expected of [
    "id: 'process', num: '07'",
    "id: 'stack', num: '08'",
    "id: 'products', num: '09'",
    "id: 'contact', num: '10'",
  ]) assert.equal((html.match(new RegExp(expected, 'g')) || []).length, 2, expected);
});

test('renders a dedicated games section with evidence-safe statuses', () => {
  assert.match(html, /<section id="v2-games"/);
  assert.match(html, /PUBLIC RELEASE/);
  assert.match(html, /iOS SUBMISSION READY/);
  assert.doesNotMatch(html, /Nation Eater.{0,120}(RELEASED|APP STORE RELEASE)/s);
});

test('uses verified public links and disabled App Store semantics', () => {
  assert.match(html, /https:\/\/github\.com\/Adam-1228\/ThreeDoorsOfFate-Hackathon/);
  assert.match(html, /https:\/\/github\.com\/Adam-1228\/ThreeDoorsOfFate-Hackathon\/releases\/latest/);
  assert.match(html, /aria-disabled="true"/);
  assert.match(html, /tabIndex=\{-1\}/);
  assert.match(html, /rel="noopener noreferrer"/);
});

test('references all portfolio-owned media with alt text', () => {
  for (const path of [
    'assets/games/three-doors-of-fate/class-selection.webp',
    'assets/games/three-doors-of-fate/door-selection.webp',
    'assets/games/three-doors-of-fate/combat.webp',
    'assets/games/nation-eater/app-icon.webp',
    'assets/games/nation-eater/citizen.webp',
    'assets/games/nation-eater/crisis-aftermath.webp',
    'assets/games/nation-eater/world-chair.webp',
  ]) {
    assert.match(html, new RegExp(path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), path);
  }
  assert.match(html, /alt=\{image\.alt\}/);
});
