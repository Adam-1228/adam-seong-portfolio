# Games Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add and publicly deploy a bilingual, responsive Games showcase for Three Doors of Fate and 나라먹기 while preserving the portfolio's existing visual identity and evidence boundaries.

**Architecture:** Keep the current single-file React 18/Babel application. Add one bilingual `games` data block and a focused `GameCard` renderer inside `index.html`, serve optimized portfolio-owned media from `assets/games/`, and protect the behavior with a dependency-free Node static contract test plus real-browser verification.

**Tech Stack:** React 18 via CDN, inline Babel/JSX, CSS-in-JS, Node.js built-in test runner, Pillow for one-time image optimization, GitHub Pages.

## Global Constraints

- Work from current `origin/main`; the approved design commit is `a0eb836ddf35e05ef1a5ddaecf48807036c28bbb`.
- Preserve the current AI Engineer / Product Builder identity and navy/blue visual language.
- Add `06 Games` after Projects and renumber Process, Stack, Products, and Contact to `07`–`10` in Korean and English.
- Three Doors of Fate may be labeled `PUBLIC RELEASE`; 나라먹기 must be labeled `iOS SUBMISSION READY`, never released or under active App Store review.
- Game repositories remain read-only. Copy only approved promotional assets into `assets/games/`.
- Do not deploy Nation Eater placeholders or synthetic screenshots.
- The Nation Eater App Store CTA remains a disabled, non-focusable label until a public store URL is directly verified.
- Preserve `/support/`, `/support/en/`, `/privacy/`, and `/privacy/en/`.
- No new runtime framework, package manager, or production dependency.
- Every code behavior change follows a red-green test cycle.

---

### Task 1: Acquire and validate portfolio-owned game media

**Files:**
- Create: `assets/games/three-doors-of-fate/class-selection.webp`
- Create: `assets/games/three-doors-of-fate/door-selection.webp`
- Create: `assets/games/three-doors-of-fate/combat.webp`
- Create: `assets/games/nation-eater/app-icon.webp`
- Create: `assets/games/nation-eater/citizen.webp`
- Create: `assets/games/nation-eater/crisis-aftermath.webp`
- Create: `assets/games/nation-eater/world-chair.webp`

**Interfaces:**
- Consumes: the exact Windows and Mac source paths listed in the approved design.
- Produces: seven optimized WebP files referenced by `games.items[].media` in Task 3.

- [ ] **Step 1: Stage the three Three Doors of Fate source images without modifying the game repository**

Run:

```powershell
$source = 'C:\Users\ADAM\Documents\Codex\project\Three Doors of Fate\ThreeDoorsofFate\docs\screenshots'
$incoming = 'C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio\.asset-staging\three-doors-of-fate'
New-Item -ItemType Directory -Force -Path $incoming | Out-Null
Copy-Item -LiteralPath "$source\class-selection.png","$source\door-selection.png","$source\combat.png" -Destination $incoming
```

Expected: three PNG files in `.asset-staging/three-doors-of-fate`; source Git status remains unchanged.

- [ ] **Step 2: Receive the four Nation Eater source files from the Mac audit paths**

Required staging names:

```text
.asset-staging/nation-eater/AppIcon-512@2x.png
.asset-staging/nation-eater/01-citizen.png
.asset-staging/nation-eater/03-crisis-aftermath.png
.asset-staging/nation-eater/05-world-chair.png
```

Expected: icon is square; each screenshot is exactly `1284×2778`. If the files cannot be transferred, report `BLOCKED` and do not proceed to deployment.

- [ ] **Step 3: Convert source images to deterministic site-owned WebP assets**

Run the bundled Python with this complete inline program:

```powershell
@'
from pathlib import Path
from PIL import Image

root = Path.cwd()
mappings = {
    root / '.asset-staging/three-doors-of-fate/class-selection.png': root / 'assets/games/three-doors-of-fate/class-selection.webp',
    root / '.asset-staging/three-doors-of-fate/door-selection.png': root / 'assets/games/three-doors-of-fate/door-selection.webp',
    root / '.asset-staging/three-doors-of-fate/combat.png': root / 'assets/games/three-doors-of-fate/combat.webp',
    root / '.asset-staging/nation-eater/AppIcon-512@2x.png': root / 'assets/games/nation-eater/app-icon.webp',
    root / '.asset-staging/nation-eater/01-citizen.png': root / 'assets/games/nation-eater/citizen.webp',
    root / '.asset-staging/nation-eater/03-crisis-aftermath.png': root / 'assets/games/nation-eater/crisis-aftermath.webp',
    root / '.asset-staging/nation-eater/05-world-chair.png': root / 'assets/games/nation-eater/world-chair.webp',
}
for source, target in mappings.items():
    if not source.is_file():
        raise FileNotFoundError(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image = image.convert('RGB')
        if 'nation-eater' in target.parts and target.name != 'app-icon.webp':
            image.thumbnail((642, 1389), Image.Resampling.LANCZOS)
        elif target.name == 'app-icon.webp':
            image.thumbnail((512, 512), Image.Resampling.LANCZOS)
        else:
            image.thumbnail((960, 540), Image.Resampling.LANCZOS)
        image.save(target, 'WEBP', quality=84, method=6)
'@ | & 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -
```

Expected: seven WebP images, all non-empty.

- [ ] **Step 4: Validate dimensions, format, hashes, and source-repository immutability**

Run:

```powershell
@'
from pathlib import Path
from PIL import Image

for path in sorted(Path('assets/games').rglob('*.webp')):
    with Image.open(path) as image:
        assert image.format == 'WEBP', path
        assert image.width > 0 and image.height > 0, path
        print(f'{path}: {image.width}x{image.height}')
'@ | & 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -
Get-FileHash assets\games\*\*.webp -Algorithm SHA256
git -C 'C:\Users\ADAM\Documents\Codex\project\Three Doors of Fate\ThreeDoorsofFate' status --short
```

Expected: seven valid WebP rows and unchanged pre-existing Three Doors worktree status.

- [ ] **Step 5: Remove staging files and commit portfolio media only**

Run:

```powershell
Remove-Item -LiteralPath '.asset-staging' -Recurse
git add assets/games
git diff --cached --check
git commit -m "assets: add game showcase media"
```

Expected: one asset-only commit; no `.asset-staging` paths tracked.

---

### Task 2: Add a failing static contract test

**Files:**
- Create: `tests/portfolio-games.test.mjs`

**Interfaces:**
- Consumes: `index.html` and the seven Task 1 media paths.
- Produces: a dependency-free test command that guards navigation, claims, links, media, accessibility hooks, and bilingual parity.

- [ ] **Step 1: Write the static contract test before changing `index.html`**

Create `tests/portfolio-games.test.mjs` with Node's `node:test`, `node:assert/strict`, and `node:fs`. Tests must assert:

```js
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
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\portfolio-games.test.mjs
```

Expected: failures for missing Games navigation and `#v2-games`, proving the test detects the absent feature.

- [ ] **Step 3: Commit the failing test**

```powershell
git add tests/portfolio-games.test.mjs
git commit -m "test: define games showcase contract"
```

---

### Task 3: Implement the bilingual Games showcase

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: `V2_I18N`, `games.items[]`, and the Task 1 media paths.
- Produces: `GameCard({ game, colors })`, `#v2-games`, updated sidebar navigation, and responsive card styles.

- [ ] **Step 1: Add matching Korean and English `games` data**

Add the following object inside `V2_I18N.ko`:

```js
games: {
  kicker: 'PLAYABLE SYSTEMS · ORIGINAL GAMES',
  headline: '선택과 축적이 만드는 두 개의 플레이 시스템.',
  lead: '공개 WebGL 릴리스와 iOS 출시 파이프라인까지 진행한 두 개의 오리지널 게임을 소개합니다.',
  proofs: [
    { value: '2', label: 'Original games' },
    { value: 'WebGL v1.0', label: 'Public release' },
    { value: 'iOS 1.0.1', label: 'Build 3 ready' },
  ],
  items: [
    {
      id: 'three-doors-of-fate',
      title: 'Three Doors of Fate',
      altTitle: '세 개의 운명의 문',
      status: 'PUBLIC RELEASE',
      statusTone: 'green',
      genre: '한국어 싱글 플레이 덱빌딩 로그라이크',
      description: '세 개의 문 뒤에 숨은 위험과 보상을 선택하고, 카드·행운 주사위·빚을 관리해 보스를 돌파합니다.',
      tech: ['Unity 6', 'C#', 'Turn-based', 'WebGL'],
      proof: '공개 GitHub 저장소 · WebGL v1.0.0 릴리스 · 3종 클래스와 10룸 진행',
      mediaMode: 'landscape',
      media: [
        { src: 'assets/games/three-doors-of-fate/class-selection.webp', alt: 'Three Doors of Fate의 세 클래스 선택 화면', width: 960, height: 540 },
        { src: 'assets/games/three-doors-of-fate/door-selection.webp', alt: 'Three Doors of Fate에서 세 개의 문을 선택하는 화면', width: 960, height: 540 },
        { src: 'assets/games/three-doors-of-fate/combat.webp', alt: 'Three Doors of Fate의 카드 전투 화면', width: 960, height: 540 },
      ],
      links: [
        { label: 'GitHub', href: 'https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon', external: true },
        { label: 'WebGL Release', href: 'https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon/releases/latest', external: true },
      ],
    },
    {
      id: 'nation-eater',
      title: '나라먹기',
      altTitle: 'Nation Eater',
      status: 'iOS SUBMISSION READY',
      statusTone: 'amber',
      genre: '허구 정치 풍자 방치형 RPG · 시뮬레이션',
      description: '시민에서 세계 의장까지 성장하며 선택형 공작의 후폭풍, 96종 풍자 뉴스와 18개 엔딩을 수집합니다.',
      tech: ['React 19', 'Phaser 4', 'TypeScript', 'Capacitor 8'],
      proof: 'iOS 1.0.1 build 3 archive · TestFlight 처리 기록 · 실기기 Release QA 문서',
      mediaMode: 'phones',
      icon: { src: 'assets/games/nation-eater/app-icon.webp', alt: '나라먹기 앱 아이콘', width: 512, height: 512 },
      media: [
        { src: 'assets/games/nation-eater/citizen.webp', alt: '나라먹기의 시민 단계 화면', width: 642, height: 1389 },
        { src: 'assets/games/nation-eater/crisis-aftermath.webp', alt: '나라먹기의 공작 후폭풍 화면', width: 642, height: 1389 },
        { src: 'assets/games/nation-eater/world-chair.webp', alt: '나라먹기의 세계 의장 단계 화면', width: 642, height: 1389 },
      ],
      links: [
        { label: 'App Store 준비 중', disabled: true },
        { label: '지원', href: 'support/' },
        { label: '개인정보', href: 'privacy/' },
      ],
    },
  ],
},
```

Add an English object with the same structure and values, changing only user-facing text:

```js
games: {
  kicker: 'PLAYABLE SYSTEMS · ORIGINAL GAMES',
  headline: 'Two playable systems built around choice and accumulation.',
  lead: 'Two original games carried through a public WebGL release and an iOS submission pipeline.',
  proofs: [
    { value: '2', label: 'Original games' },
    { value: 'WebGL v1.0', label: 'Public release' },
    { value: 'iOS 1.0.1', label: 'Build 3 ready' },
  ],
  items: [
    {
      id: 'three-doors-of-fate',
      title: 'Three Doors of Fate',
      altTitle: '세 개의 운명의 문',
      status: 'PUBLIC RELEASE',
      statusTone: 'green',
      genre: 'Korean-first single-player deck-building roguelike',
      description: 'Choose the risk or reward behind three doors, then manage cards, luck dice, health, gold, and debt to defeat each boss.',
      tech: ['Unity 6', 'C#', 'Turn-based', 'WebGL'],
      proof: 'Public GitHub repository · WebGL v1.0.0 release · three classes and ten-room progression',
      mediaMode: 'landscape',
      media: [
        { src: 'assets/games/three-doors-of-fate/class-selection.webp', alt: 'Three character classes in Three Doors of Fate', width: 960, height: 540 },
        { src: 'assets/games/three-doors-of-fate/door-selection.webp', alt: 'Choosing among three doors in Three Doors of Fate', width: 960, height: 540 },
        { src: 'assets/games/three-doors-of-fate/combat.webp', alt: 'Turn-based card combat in Three Doors of Fate', width: 960, height: 540 },
      ],
      links: [
        { label: 'GitHub', href: 'https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon', external: true },
        { label: 'WebGL Release', href: 'https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon/releases/latest', external: true },
      ],
    },
    {
      id: 'nation-eater',
      title: 'Nation Eater',
      altTitle: '나라먹기',
      status: 'iOS SUBMISSION READY',
      statusTone: 'amber',
      genre: 'Fictional political-satire idle RPG · simulation',
      description: 'Rise from ordinary citizen to world chair while collecting the fallout of player-driven schemes, 96 satirical news stories, and 18 endings.',
      tech: ['React 19', 'Phaser 4', 'TypeScript', 'Capacitor 8'],
      proof: 'iOS 1.0.1 build 3 archive · documented TestFlight processing · signed iPhone Release QA record',
      mediaMode: 'phones',
      icon: { src: 'assets/games/nation-eater/app-icon.webp', alt: 'Nation Eater app icon', width: 512, height: 512 },
      media: [
        { src: 'assets/games/nation-eater/citizen.webp', alt: 'Citizen-stage screen in Nation Eater', width: 642, height: 1389 },
        { src: 'assets/games/nation-eater/crisis-aftermath.webp', alt: 'Scheme aftermath screen in Nation Eater', width: 642, height: 1389 },
        { src: 'assets/games/nation-eater/world-chair.webp', alt: 'World-chair stage in Nation Eater', width: 642, height: 1389 },
      ],
      links: [
        { label: 'App Store pending', disabled: true },
        { label: 'Support', href: 'support/en/' },
        { label: 'Privacy', href: 'privacy/en/' },
      ],
    },
  ],
},
```

- [ ] **Step 2: Add `GameCard` and media rendering**

Implement one renderer with:

```jsx
function GameCard({ game, colors }) {
  return (
    <article className="v2-game-card">
      <div className={'v2-game-media ' + (game.mediaMode === 'phones' ? 'v2-game-phones' : '')}>
        {game.icon && <img className="v2-game-icon" src={game.icon.src} alt={game.icon.alt} loading="lazy" width={game.icon.width} height={game.icon.height} />}
        {game.media.map(function(image) {
          return <img key={image.src} src={image.src} alt={image.alt} loading="lazy" width={image.width} height={image.height} />;
        })}
      </div>
      <div className="v2-game-body">
        <span className={'v2-game-status ' + game.statusTone}>{game.status}</span>
        <h3>{game.title}</h3>
        <p className="v2-game-genre">{game.genre}</p>
        <p>{game.description}</p>
        <div className="v2-game-tech">{game.tech.map(function(tag) { return <span key={tag}>{tag}</span>; })}</div>
        <div className="v2-game-proof"><strong>Proof</strong> · {game.proof}</div>
        <div className="v2-game-actions">
          {game.links.map(function(link) {
            return link.disabled
              ? <span key={link.label} className="v2-game-link disabled" aria-disabled="true" tabIndex={-1}>{link.label}</span>
              : <a key={link.label} className="v2-game-link" href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined}>{link.label}</a>;
          })}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Insert `#v2-games` after Projects and update navigation**

Update both navigation arrays with:

```js
{ id: 'projects', num: '05', label: 'Projects' },
{ id: 'games', num: '06', label: 'Games' },
{ id: 'process', num: '07', label: 'Process' },
{ id: 'stack', num: '08', label: 'Stack' },
{ id: 'products', num: '09', label: 'Products' },
{ id: 'contact', num: '10', label: 'Contact' },
```

Immediately after `#v2-projects`, render:

```jsx
<section id="v2-games" style={{ padding: '120px 72px', minHeight: '100vh', borderTop: '1px solid ' + hairline }}>
  <div style={{ fontFamily: '"JetBrains Mono", monospace', color: accent, fontSize: 11, letterSpacing: 2, marginBottom: 24 }}>{t.games.kicker}</div>
  <h2 style={{ fontSize: 'clamp(38px,5vw,72px)', lineHeight: 1.04, letterSpacing: '-0.04em', fontWeight: 500, maxWidth: 900 }}>{t.games.headline}</h2>
  <p style={{ marginTop: 24, maxWidth: 760, color: muted, fontSize: 17, lineHeight: 1.7 }}>{t.games.lead}</p>
  <div className="v2-games-proof">
    {t.games.proofs.map(function(proof) {
      return <div key={proof.label}><strong>{proof.value}</strong><span>{proof.label}</span></div>;
    })}
  </div>
  <div className="v2-games-grid">
    {t.games.items.map(function(game) { return <GameCard key={game.id} game={game} colors={{ fg: fg, muted: muted, hairline: hairline, panel: panel, accent: accent }} />; })}
  </div>
</section>
```

- [ ] **Step 4: Add styles consistent with the existing site**

Add the following classes to the existing `<style>` block, using CSS custom properties assigned on the card if theme-specific colors are needed:

```css
.v2-games-proof { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin:32px 0; }
.v2-games-proof > div { border:1px solid rgba(14,14,12,.14); border-radius:12px; padding:16px; display:grid; gap:5px; }
.v2-games-proof strong { font:600 18px "JetBrains Mono",monospace; }
.v2-games-proof span { font:400 10px "JetBrains Mono",monospace; opacity:.58; }
.v2-games-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px; }
.v2-game-card { border:1px solid var(--game-hairline); border-radius:18px; overflow:hidden; background:var(--game-panel); min-width:0; }
.v2-game-media { height:290px; display:grid; grid-template-columns:2fr 1fr 1fr; gap:6px; padding:10px; background:#111a2b; position:relative; overflow:hidden; }
.v2-game-media > img { width:100%; height:100%; object-fit:cover; border-radius:9px; }
.v2-game-media > img:first-of-type { grid-row:1; }
.v2-game-phones { grid-template-columns:repeat(3,minmax(0,1fr)); align-items:center; padding:18px 62px; background:linear-gradient(145deg,#172f4b,#69374d 55%,#c69139); }
.v2-game-phones > img:not(.v2-game-icon) { object-fit:contain; filter:drop-shadow(0 12px 16px rgba(0,0,0,.28)); }
.v2-game-icon { position:absolute; z-index:2; width:54px !important; height:54px !important; left:16px; top:16px; border-radius:13px !important; box-shadow:0 8px 18px rgba(0,0,0,.25); }
.v2-game-body { padding:22px; }
.v2-game-body h3 { margin:12px 0 4px; font-size:25px; letter-spacing:-.025em; }
.v2-game-status { display:inline-flex; border-radius:999px; padding:6px 9px; font:600 9px "JetBrains Mono",monospace; letter-spacing:.08em; }
.v2-game-status.green { color:#16714b; background:rgba(40,160,100,.12); }
.v2-game-status.amber { color:#8a5b12; background:rgba(222,157,47,.14); }
.v2-game-genre { color:var(--game-accent); font:500 11px "JetBrains Mono",monospace; margin-bottom:14px; }
.v2-game-body > p:not(.v2-game-genre) { color:var(--game-muted); line-height:1.65; min-height:80px; }
.v2-game-tech { display:flex; flex-wrap:wrap; gap:7px; margin:18px 0; }
.v2-game-tech span { border:1px solid var(--game-hairline); border-radius:999px; padding:6px 9px; font:400 9px "JetBrains Mono",monospace; }
.v2-game-proof { border-left:2px solid var(--game-accent); padding:10px 12px; color:var(--game-muted); background:var(--game-panel); font-size:11px; line-height:1.55; }
.v2-game-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:18px; }
.v2-game-link { display:inline-flex; min-height:38px; align-items:center; border-radius:8px; padding:0 13px; color:inherit; border:1px solid var(--game-hairline); text-decoration:none; font:500 10px "JetBrains Mono",monospace; }
.v2-game-link:hover,.v2-game-link:focus-visible { border-color:var(--game-accent); outline:2px solid var(--game-accent); outline-offset:2px; }
.v2-game-link.disabled { color:var(--game-muted); border-style:dashed; cursor:not-allowed; opacity:.72; }
@media (max-width:860px) {
  .v2-games-grid { grid-template-columns:1fr; }
  .v2-games-proof { grid-template-columns:1fr 1fr; }
  .v2-game-media { height:250px; }
  .v2-game-phones { padding:14px 40px; }
}
@media (max-width:640px) {
  .v2-games-proof { grid-template-columns:1fr; }
  .v2-game-media { height:220px; }
  .v2-game-phones { padding:12px 24px; }
  .v2-game-body > p:not(.v2-game-genre) { min-height:0; }
}
@media (prefers-reduced-motion:reduce) {
  .v2-game-card,.v2-game-card * { animation:none !important; transition:none !important; }
}
```

Set the custom properties on `<article>`:

```jsx
style={{ '--game-hairline': colors.hairline, '--game-panel': colors.panel, '--game-muted': colors.muted, '--game-accent': colors.accent }}
```

- [ ] **Step 5: Run the contract test and verify GREEN**

Run:

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\portfolio-games.test.mjs
```

Expected: all four tests pass.

- [ ] **Step 6: Refactor only duplication introduced by this task, rerun tests, and commit**

```powershell
git diff --check
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\portfolio-games.test.mjs
git add index.html
git commit -m "feat: add bilingual games showcase"
```

Expected: clean diff check and four passing contract tests.

---

### Task 4: Verify responsive rendering, accessibility, and public deployment

**Files:**
- Modify if evidence requires a fix: `index.html`
- Create verification artifacts outside the repository or under ignored scratch only.

**Interfaces:**
- Consumes: the complete static site and committed media.
- Produces: fresh local and public evidence for desktop, mobile, bilingual, navigation, links, and deployed asset responses.

- [ ] **Step 1: Run the complete local static gate**

```powershell
git status --short --branch
git diff --check origin/main...HEAD
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\portfolio-games.test.mjs
```

Expected: only intentional ahead commits, clean diff, four passing tests.

- [ ] **Step 2: Serve the repository locally and inspect with a real browser**

Run a local server on an unused loopback port, then inspect:

- Desktop `1440×1000`, Korean and English
- Mobile `390×844`, Korean and English
- Direct `/#v2-games` entry
- Sidebar active-section update
- All seven images render without layout shift
- Nation Eater phone montage remains inside the viewport
- Keyboard focus on real CTAs
- Disabled App Store label is not focusable or clickable
- No console errors

- [ ] **Step 3: Re-run tests after every visual fix and commit the final verification fix, if any**

Expected: each bug gets a failing assertion or reproducible browser check before correction, followed by a passing rerun.

- [ ] **Step 4: Push the exact verified state to `origin/main`**

```powershell
git fetch origin
git status --short --branch
git push origin main
```

Expected: push succeeds without non-fast-forward rejection.

- [ ] **Step 5: Verify GitHub Pages deployment against the pushed commit**

Poll `https://adam-1228.github.io/adam-seong-portfolio/` until the HTML contains `v2-games`, `Three Doors of Fate`, and `Nation Eater`. Then verify HTTP `200` for:

- All seven `/assets/games/...` WebP URLs
- `/support/`
- `/support/en/`
- `/privacy/`
- `/privacy/en/`
- The Three Doors GitHub and latest Release links

Compare the deployed `index.html` SHA-256 with `origin/main:index.html`. Confirm the public page still labels Nation Eater `iOS SUBMISSION READY` and does not claim release.

- [ ] **Step 6: Final clean-state gate**

```powershell
git fetch origin
git status --short --branch
git rev-parse HEAD
git rev-parse origin/main
```

Expected: clean `main`, identical local and remote commit hashes.
