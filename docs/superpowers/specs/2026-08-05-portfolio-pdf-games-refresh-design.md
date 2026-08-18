# Portfolio PDF Games Refresh Design

Date: 2026-08-05

Status: Approved design; implementation pending written-spec review

Primary site repository: `C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio`

PDF artifact workspace: `C:\Users\ADAM\Documents\Codex\project\내 사이트`

Design choice: 11-page portfolio with one dedicated page per game

## 1. Objective

Refresh the downloadable portfolio PDF and the matching website game status so that both represent the current public evidence. Preserve the portfolio's core identity as an AI Engineer and Product Builder while showing game-development ability as completed product work.

The game section must contain exactly two titles:

- **Three Doors of Fate**
- **나라먹기 / Nation Eater**

The prior PDF-only prototype entries `Last One or Nothing`, `The Gray Maze`, and `Unreal Gray Maze` must be removed from the game section.

## 2. Audience and Positioning

The PDF serves both AI/automation opportunities and game-development opportunities. AI systems remain the primary portfolio narrative; the games provide evidence of product design, gameplay systems, visual presentation, QA, packaging, and release execution.

Do not turn the document into a game-only portfolio. The two game pages belong after `Additional AI Systems` and before `Engineering Appendix`.

## 3. Verified Release Status and Exact Wording

### Three Doors of Fate

Verified public evidence:

- Apple App Store track ID: `6798086296`
- Bundle ID: `com.adam.threedoorsfate`
- Public App Store version: `1.0.4`
- Korean App Store release date: 2026-08-14
- United States App Store release date: 2026-08-16
- Current version release date: 2026-08-17
- Korean App Store URL: `https://apps.apple.com/kr/app/three-doors-of-fate/id6798086296`
- United States App Store URL: `https://apps.apple.com/us/app/three-doors-of-fate/id6798086296`
- Public GitHub repository: `https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon`
- Public GitHub release: `v1.0.0`
- The release is neither draft nor prerelease.
- Four public downloadable assets are available, including the WebGL package.

Required Korean status wording:

`Apple App Store 출시`

Required English status wording:

`LIVE ON THE APP STORE`

The App Store release is the primary status. The public GitHub repository and WebGL download remain secondary proof and links.

### 나라먹기 / Nation Eater

Verified public evidence:

- Korean App Store track ID: `6791886200`
- Bundle ID: `com.nationeater.game`
- Public Korean App Store version: `1.0.3`
- First release date: 2026-07-27
- Current version release date: 2026-08-03
- Public Korean App Store URL: `https://apps.apple.com/kr/app/%EB%82%98%EB%9D%BC%EB%A8%B9%EA%B8%B0/id6791886200`
- United States App Store availability was not verified and must not be implied.

Required Korean status wording:

`한국 App Store 출시`

Required English status wording:

`LIVE ON THE KR APP STORE`

The previous `iOS SUBMISSION READY` and disabled App Store CTA are stale and must be replaced. Do not claim worldwide App Store availability.

## 4. PDF Information Architecture

The refreshed PDF contains 11 A4 pages:

1. Executive Summary
2. Featured Product - ADAM Orbit
3. Case Study 01 - ADAM Orbit
4. Case Study 02 - AI Sales Automation
5. Case Study 03 - Nail Shop Budget + Local AI Growth
6. Additional AI Systems
7. Original Game 01 - Three Doors of Fate
8. Original Game 02 - 나라먹기 / Nation Eater
9. Engineering Appendix
10. Services & Process
11. Stack & Contact

All page numbers, footer labels, PDF metadata, and the total page count must agree.

## 5. Game Page Design

### Page 7 - Three Doors of Fate

Use the existing portfolio visual system: white page, navy text, blue kicker, restrained green/amber proof accents, rounded proof panels, and generous margins.

Content:

- Title and required release-status label
- Korean-first single-player deck-building roguelike description
- Unity 6, C#, turn-based card combat, WebGL, and game-system tags
- Evidence strip for App Store `1.0.4`, three classes, ten-room progression, and the public WebGL download
- Clickable locale-appropriate App Store, GitHub, and release/download links

Media:

- One dominant 16:9 gameplay image
- Two smaller supporting 16:9 screenshots
- Reuse the existing portfolio-owned WebP files under `assets/games/three-doors-of-fate/`

### Page 8 - 나라먹기 / Nation Eater

Content:

- App icon, Korean and English titles, and required Korean App Store status
- Fictional political-satire idle RPG / simulation description
- React 19, Vite 8, TypeScript, Zustand, Phaser 4, and Capacitor 8 iOS tags
- Evidence strip for App Store version `1.0.3`, six progression stages, 96 satirical news items, and 18 endings
- Clickable Korean App Store, support, and privacy links
- A short disclaimer that all people, countries, and events are fictional

Media:

- App icon near the title block
- Three portrait phone screenshots arranged as a legible montage
- Reuse the existing portfolio-owned WebP files under `assets/games/nation-eater/`

The portrait screenshots must remain readable at normal A4 viewing size. No screenshot may be stretched or cropped in a way that removes important UI context.

## 6. Durable Copy Cleanup

Remove self-referential implementation notes and future-tense website TODO copy from the existing PDF, including phrases equivalent to:

- `앞으로 사이트 첫 화면...`
- `사이트에서 ... 확장해야 합니다`
- `새 사이트와 PDF에는...`
- `사이트에는 대표 스크린샷... 추가하면...`
- `다음 사이트 반영 제안`

Replace these with outward-facing portfolio copy that explains product impact, engineering judgment, or verified delivery evidence. The document must read as a finished portfolio, not an internal planning memo.

Update:

- Footer version: `Adam Seong - AI Engineer & Product Builder - 2026.08`
- PDF title metadata: `Adam Seong - AI Engineer & Product Builder Portfolio - 2026.08`
- PDF subject metadata to include original games and current product-building scope
- Stable public download filename: `Adam_AI_Portfolio_final.pdf`
- Versioned artifact filename: `Adam_Seong_AI_Portfolio_2026_08.pdf`

## 7. Website Synchronization

The website must continue to show exactly the same two game cards. Update release-state details that have become stale:

- Three Doors status becomes the bilingual Apple App Store release wording.
- Add the Korean App Store URL to Korean content and the United States App Store URL to English content.
- Keep the GitHub and WebGL release CTAs as secondary active links.
- Nation Eater status becomes the bilingual Korean App Store release wording.
- Replace the disabled App Store label with an active link to track ID `6791886200`.
- Keep support and privacy links.
- Preserve the existing responsive layout, Korean/English parity, light/dark themes, reduced-motion behavior, and accessibility semantics.

Do not add the removed PDF prototypes to the website Games section.

## 8. Source of Truth and Build Flow

The existing ReportLab builder remains in the PDF artifact workspace:

`C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py`

The site repository remains the source of truth for reusable game media and the publicly deployed stable PDF filename.

Build flow:

1. Update the ReportLab builder without changing unrelated PDF sections.
2. Generate the versioned 11-page PDF under `output/pdf/` in the artifact workspace.
3. Reopen the generated PDF and verify metadata, page count, text, annotations, and links.
4. Render all pages to PNG and visually inspect every page.
5. Copy the verified bytes to the site repository as `Adam_AI_Portfolio_final.pdf`.
6. Update the bilingual website release status and tests.
7. Commit and push the site repository.
8. Verify the public site and public PDF after GitHub Pages deployment.

## 9. Failure and Fallback Behavior

- If either locale-specific Three Doors App Store URL or the Korean Nation Eater App Store URL does not return a public store page during final verification, stop deployment and retain the last verified public site state.
- If the US store remains unavailable, keep the `KR App Store` geographic qualifier in English.
- If any image cannot be decoded by ReportLab, convert a working copy in `tmp/pdfs/` without altering the portfolio-owned WebP source.
- If any text clips, overlaps, or becomes illegible, adjust the affected page and re-render all 11 pages.
- If the generated PDF and the repository copy differ by SHA-256, do not deploy.
- If local and remote Git state diverge, stop and reconcile before committing or pushing.

## 10. Verification and Acceptance Criteria

### PDF gates

- Exactly 11 A4 pages
- Correct `2026.08` title metadata and footer on every page
- Page numbering `1/11` through `11/11`
- Only Three Doors of Fate and 나라먹기 / Nation Eater appear in the game section
- Three Doors carries the Apple App Store release status and version `1.0.4`
- Nation Eater carries the Korean App Store release status and version `1.0.3`
- Game screenshots render sharply with no clipping or aspect-ratio distortion
- Both Three Doors App Store links plus GitHub, release, Nation Eater App Store, support, privacy, email, GitHub profile, and portfolio links are clickable
- No stale future website TODO language remains
- Text extraction contains the required status phrases and excludes the removed prototype titles from the game section
- Visual inspection of all pages finds no overlap, clipping, broken glyphs, or inconsistent footer/page numbering

### Website gates

- Existing static tests pass after being updated for the new verified release states
- Three Doors App Store CTAs are accessible real links with the correct locale URL
- Nation Eater App Store CTA is an accessible real link, not a disabled element
- No text claims worldwide App Store availability
- Desktop and 390px mobile layouts have no horizontal overflow
- Korean/English, light/dark, and reduced-motion checks pass
- Browser console has zero errors

### Deployment gates

- Local `main` and `origin/main` agree before and after the intentional commit/push sequence
- GitHub Pages build completes successfully
- Public HTML contains the approved release labels, both Three Doors App Store URLs, and the Nation Eater Korean App Store URL
- Public PDF returns HTTP 200 with `application/pdf`
- Public PDF SHA-256 matches the committed repository PDF exactly
- Public game images and all public CTAs return successful responses

## 11. Out of Scope

- Modifying, rebuilding, or republishing either game
- Modifying the existing Three Doors of Fate App Store listing
- Claiming United States or worldwide App Store availability for Nation Eater
- Adding other game prototypes to the refreshed PDF game section
- Rebuilding the portfolio site architecture or changing its established visual identity
- Changing unrelated project claims without new supporting evidence
