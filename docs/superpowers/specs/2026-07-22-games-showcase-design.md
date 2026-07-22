# Games Showcase Design

Date: 2026-07-22

Status: Approved visual direction; implementation pending written-spec review

Site: `adam-seong-portfolio`
Design choice: Option B — dedicated Games showcase

## 1. Objective

Add a dedicated, proof-first Games section to the existing portfolio without changing its core identity as an AI Engineer and Product Builder site. The section must present two original games as shipped product work rather than as a generic prototype list:

- **Three Doors of Fate** — a publicly available Unity 6 deck-building roguelike with a WebGL v1.0.0 release.
- **나라먹기 (Nation Eater)** — an iOS political-satire idle RPG whose user-provided Mac audit supports the wording “iOS submission ready,” but not “released.”

The implementation must preserve the site's existing visual language: navy surfaces, blue accents, restrained green/amber status colors, proof-first copy, bilingual Korean/English content, compact monospace labels, and responsive single-column mobile behavior.

## 2. Information Architecture

Insert a new `#v2-games` section immediately after `#v2-projects` and before `#v2-process`.

The sidebar order becomes:

1. Intro
2. About
3. Services
4. Local AI
5. Projects
6. Games
7. Process
8. Stack
9. Products
10. Contact

Both Korean and English navigation arrays must be updated together. Existing anchors and hash scrolling must continue to work.

The existing `P03 Codex Game Prototypes` row in Projects must be replaced or reframed so it does not duplicate the new showcase. The preferred result is a short gateway row named `Original Games` that points conceptually to the detailed Games section, while the showcase owns all game-specific details and links.

## 3. Section Structure

### Header

- Kicker: `PLAYABLE SYSTEMS · ORIGINAL GAMES`
- Korean headline: `선택과 축적이 만드는 두 개의 플레이 시스템.`
- English headline: `Two playable systems built around choice and accumulation.`
- Korean lead: explain that these are product-building cases taken through a public WebGL release and an iOS submission pipeline.
- English lead: equivalent meaning, not a literal awkward translation.

### Proof strip

Show three compact proof items:

- `2` — Original games
- `WebGL v1.0` — Public release
- `iOS 1.0.1` — Build 3 ready

The proof strip must not imply that Nation Eater is publicly released.

Evidence provenance must remain visible in implementation notes: Three Doors of Fate claims were checked directly against the Windows repository and public GitHub release, while Nation Eater claims and source paths come from the read-only Mac audit pasted into this task. The Windows task cannot independently open those Mac files, so transferred assets and their metadata must be reverified after arrival.

### Game cards

Use a two-column desktop grid and a one-column layout at `860px` and below. Both cards share the same component structure:

1. Media panel
2. Title and status badge
3. Genre
4. One-paragraph pitch
5. Technology tags
6. Proof block
7. CTA row

The two media treatments may differ to respect source aspect ratios:

- Three Doors of Fate uses a 16:9 gameplay hero image, with optional supporting thumbnails.
- Nation Eater uses a three-phone composition built from portrait App Store screenshots.

## 4. Verified Content and Claim Boundaries

### Three Doors of Fate

Public title: `Three Doors of Fate`

Korean title: `세 개의 운명의 문`

Status badge: `PUBLIC RELEASE`

Genre: Korean-first single-player deck-building roguelike

Korean copy:

> 세 개의 문 뒤에 숨은 위험과 보상을 선택하고, 카드·행운 주사위·빚을 관리해 보스를 돌파하는 한국어 싱글 플레이 덱빌딩 로그라이크입니다.

English copy:

> A Korean-first single-player deck-building roguelike where each door hides risk or reward, and survival depends on managing cards, luck dice, health, gold, and debt.

Safe proof:

- Public GitHub repository
- Public WebGL v1.0.0 release
- Three playable classes
- Ten-room boss progression and endless record mode

Technology tags:

- Unity 6
- C#
- Turn-based card combat
- WebGL
- Game systems

CTAs:

- `GitHub` → `https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon`
- `WebGL Release` → `https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon/releases/latest`

Do not claim verified macOS or iOS release support for this game.

### 나라먹기 (Nation Eater)

Korean title: `나라먹기`

English title: `Nation Eater`

Status badge: `iOS SUBMISSION READY`

Genre: fictional political-satire idle RPG / simulation

Korean copy:

> 모든 인물과 국가, 사건이 허구인 정치 풍자 방치형 RPG입니다. 시민에서 세계 의장까지 성장하며 선택형 공작의 후폭풍, 96종 풍자 뉴스와 18개 엔딩을 수집합니다.

English copy:

> A fictional political-satire idle RPG that grows from ordinary citizen to world chair, with player-driven schemes, cascading scandals, 96 satirical news stories, and 18 collectible endings.

Safe proof:

- iOS 1.0.1 build 3 archive and upload record
- Locally documented TestFlight processing
- Documented signed iPhone Release QA
- Six progression stages, six characters, twelve power tools, eight scandals, 96 news items, and 18 endings

Technology tags:

- React 19
- Vite 8
- TypeScript
- Zustand
- Phaser 4
- Capacitor 8 iOS

CTAs:

- Disabled visual label: `App Store 준비 중` / `App Store pending`
- Secondary links may point to `/support/` and `/privacy/` but must be visually subordinate to the game pitch.

Do not claim App Store release, active review, a public repository, or a completed in-app-purchase submission until directly verified.

## 5. Asset Ownership and Transfer

Portfolio-owned copies must live under:

```text
assets/games/
├── three-doors-of-fate/
│   ├── class-selection.webp
│   ├── door-selection.webp
│   └── combat.webp
└── nation-eater/
    ├── app-icon.webp
    ├── citizen.webp
    ├── crisis-aftermath.webp
    └── world-chair.webp
```

Source assets:

```text
Windows — Three Doors of Fate
C:\Users\ADAM\Documents\Codex\project\Three Doors of Fate\ThreeDoorsofFate\docs\screenshots\class-selection.png
C:\Users\ADAM\Documents\Codex\project\Three Doors of Fate\ThreeDoorsofFate\docs\screenshots\door-selection.png
C:\Users\ADAM\Documents\Codex\project\Three Doors of Fate\ThreeDoorsofFate\docs\screenshots\combat.png

Mac — Nation Eater
/Users/apple/Documents/game/ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png
/Users/apple/Documents/game/release/app-store/screenshots/ko-KR/01-citizen.png
/Users/apple/Documents/game/release/app-store/screenshots/ko-KR/03-crisis-aftermath.png
/Users/apple/Documents/game/release/app-store/screenshots/ko-KR/05-world-chair.png
```

The game repositories remain read-only during portfolio integration. Assets are copied, resized, cropped only when necessary, and converted to optimized WebP in the portfolio repository. Do not hotlink mutable source files.

Nation Eater assets are currently on the connected Mac but not accessible from this Windows task. Their transfer into the portfolio repository is an explicit implementation dependency; placeholders must not be deployed as final promotional media.

## 6. Component and Data Design

Keep the current single-file React/Babel architecture. Add bilingual `games` content to `V2_I18N`, using one stable schema in both languages:

```js
games: {
  kicker,
  headline,
  lead,
  proofs: [{ value, label }],
  items: [{
    id,
    title,
    altTitle,
    status,
    statusTone,
    genre,
    description,
    tech,
    proof,
    media,
    links
  }]
}
```

Create small rendering helpers only where they reduce duplication, such as `GameCard` and `GameMedia`. Avoid unrelated refactoring of the existing single-file application.

Status tones:

- Green: publicly available release
- Amber: verified submission-ready state that is not publicly released

CTA behavior:

- External links use safe new-tab attributes.
- Disabled App Store CTA is a non-anchor element and must not look clickable.
- Support and privacy links reuse the deployed local paths.

## 7. Responsive and Accessibility Design

- Desktop: two equal-width game cards.
- `860px` and below: one-column cards; preserve the existing `24px` section gutters.
- Nation Eater phone montage must remain legible without horizontal scrolling.
- Use explicit image dimensions or aspect ratios to prevent layout shift.
- Provide meaningful bilingual `alt` text for each image.
- Maintain sufficient foreground/background contrast for green and amber badges.
- Respect `prefers-reduced-motion`; the section must remain fully visible without animation.
- Keyboard focus must be visible on every real CTA.
- The disabled App Store label must expose disabled semantics and not enter the tab order.

## 8. Failure and Fallback Behavior

- If a promotional image fails, retain title, genre, proof, and CTA content without collapsing the card.
- If Nation Eater assets cannot be transferred, stop before production deployment and report the missing dependency; do not ship synthetic or misleading screenshots.
- If the public App Store URL becomes available before implementation completes, replace the disabled CTA only after direct HTTP and store-page verification.
- If local and remote Git state diverge during implementation, stop and reconcile before editing or deployment.

## 9. Verification and Release Gates

Before deployment:

1. Confirm the worktree is based on current `origin/main`.
2. Confirm only portfolio-owned files changed.
3. Validate Korean and English content parity.
4. Verify all local image paths and public CTAs.
5. Check desktop layout and `390px` mobile layout visually.
6. Check sidebar navigation, active-section tracking, and direct `#v2-games` hash entry.
7. Check `prefers-reduced-motion`, keyboard focus, alt text, and disabled CTA semantics.
8. Run `git diff --check`.
9. Serve the site locally and confirm no browser console errors.
10. After push, verify the public HTML, game image responses, GitHub/Release links, `/support/`, and `/privacy/`.

The release is complete only when the public site reflects the committed state and the Nation Eater wording remains fail-closed: submission ready, not released.

## 10. Out of Scope

- Modifying either game project
- Building or rerunning either game
- Creating an App Store listing or IAP product
- Publishing Nation Eater source code
- Changing the portfolio's overall brand away from AI Engineer / Product Builder
- Rebuilding the entire site architecture or introducing a new framework
