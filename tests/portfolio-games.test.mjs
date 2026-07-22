import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/../g).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) => (
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  ));
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function themeColors(variableName) {
  const pattern = new RegExp(`var ${variableName} = dark \\? '(#[0-9A-Fa-f]{6})' : '(#[0-9A-Fa-f]{6})';`);
  const match = html.match(pattern);
  assert.ok(match, `${variableName} must declare explicit dark and light colors`);
  assert.notEqual(match[1].toLowerCase(), match[2].toLowerCase(), `${variableName} must differ by theme`);
  return { dark: match[1], light: match[2] };
}

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

test('keeps status badges theme-aware and disabled actions inert on hover and focus', () => {
  const tones = {
    green: {
      foreground: themeColors('gameStatusGreenFg'),
      background: themeColors('gameStatusGreenBg'),
    },
    amber: {
      foreground: themeColors('gameStatusAmberFg'),
      background: themeColors('gameStatusAmberBg'),
    },
  };

  for (const [tone, colors] of Object.entries(tones)) {
    assert.match(
      html,
      new RegExp(`\\.v2-game-status\\.${tone} \\{[^}]*color: var\\(--game-status-${tone}-fg\\);[^}]*background: var\\(--game-status-${tone}-bg\\);[^}]*\\}`, 's'),
    );
    assert.match(html, new RegExp(`'--game-status-${tone}-fg': colors\\.status${tone[0].toUpperCase()}${tone.slice(1)}Fg`));
    assert.match(html, new RegExp(`'--game-status-${tone}-bg': colors\\.status${tone[0].toUpperCase()}${tone.slice(1)}Bg`));
    assert.match(html, new RegExp(`status${tone[0].toUpperCase()}${tone.slice(1)}Fg: gameStatus${tone[0].toUpperCase()}${tone.slice(1)}Fg`));
    assert.match(html, new RegExp(`status${tone[0].toUpperCase()}${tone.slice(1)}Bg: gameStatus${tone[0].toUpperCase()}${tone.slice(1)}Bg`));

    for (const theme of ['light', 'dark']) {
      const ratio = contrastRatio(colors.foreground[theme], colors.background[theme]);
      assert.ok(ratio >= 4.5, `${tone} ${theme} contrast ${ratio.toFixed(2)} must be at least 4.5:1`);
    }
  }

  assert.match(
    html,
    /\.v2-game-link:not\(\.disabled\):hover, \.v2-game-link:not\(\.disabled\):focus-visible \{/,
  );
  assert.doesNotMatch(html, /\.v2-game-link:hover|\.v2-game-link:focus-visible/);
});

test('synchronizes the document language with the active portfolio locale', () => {
  assert.match(
    html,
    /React\.useEffect\(function\(\) \{\s*document\.documentElement\.lang = lang === 'en' \? 'en' : 'ko';\s*\}, \[lang\]\);/,
  );
});

test('reframes the P03 project row as an accessible Games showcase gateway', () => {
  assert.doesNotMatch(html, /Codex Game Prototypes/);
  assert.equal(
    (html.match(/id: 'games', code: 'P03', name: 'Original Games'/g) || []).length,
    2,
  );
  assert.equal((html.match(/href: '#v2-games'/g) || []).length, 2);
  assert.match(html, /cta: 'Games 보기 →'/);
  assert.match(html, /cta: 'View Games →'/);
  assert.match(
    html,
    /<a href=\{p\.href\} onClick=\{function\(e\) \{ e\.preventDefault\(\); scrollTo\('games'\); \}\}[^>]*>\{p\.cta\}<\/a>/,
  );
});
