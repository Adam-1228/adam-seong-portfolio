# Portfolio PDF Games Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an 11-page downloadable portfolio PDF with dedicated pages for Three Doors of Fate and 나라먹기, synchronize the website's verified release states, and prove that the deployed PDF matches the committed file.

**Architecture:** Keep the existing split workflow: the ReportLab source and versioned render stay in the non-Git PDF artifact workspace, while the website repository owns the reusable game media, localized web copy, regression tests, and stable public PDF filename. Generate and validate the PDF first, copy the verified bytes into the site repository, then deploy the site and compare the public PDF hash with the committed file.

**Tech Stack:** Python 3.13, ReportLab, Pillow, pypdf, pytest, Poppler, single-file React/Babel, Node.js test runner, Git, GitHub Pages

## Global Constraints

- Site repository: `C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio`.
- PDF artifact workspace: `C:\Users\ADAM\Documents\Codex\project\내 사이트`.
- Planning base: site `main` at `3b14ad8d741f10f257be8c8c6e71d5d47314ac26`, one approved-spec commit ahead of `origin/main`.
- The PDF game section contains exactly `Three Doors of Fate` and `나라먹기 / Nation Eater`.
- Three Doors Korean status is exactly `공개 다운로드 제공 · 정식 스토어/웹 배포 대기`.
- Three Doors English status is exactly `PUBLIC DOWNLOAD · STORE/HOSTED WEB RELEASE PENDING`.
- Nation Eater Korean status is exactly `한국 App Store 출시`.
- Nation Eater English status is exactly `LIVE ON THE KR APP STORE`.
- Nation Eater links only to the verified Korean App Store track `6791886200`; do not imply US or worldwide availability.
- Preserve the site's existing visual identity, bilingual parity, responsive behavior, dark/light themes, reduced motion, and accessible link semantics.
- Do not modify either game repository, rebuild either game, or create a new store listing.
- Use only portfolio-owned media already present under `assets/games/`.
- Keep the public download filename `Adam_AI_Portfolio_final.pdf`.
- Final PDF metadata and footer use `2026.08`, and every page uses ASCII hyphens in generated metadata/footer copy.

---

## File Responsibility Map

### PDF artifact workspace

- Modify `C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py`: generate the 11-page PDF, draw game media and link buttons, update durable copy, metadata, footers, and page numbering.
- Create `C:\Users\ADAM\Documents\Codex\project\내 사이트\tests\test_portfolio_pdf.py`: build and inspect the final PDF contract with pypdf.
- Generate `C:\Users\ADAM\Documents\Codex\project\내 사이트\output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf`: versioned final artifact.
- Generate and later clean `C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs\portfolio-2026-08\`: rendered QA pages and downloaded public verification copy.

### Site repository

- Modify `index.html`: synchronize Korean/English release copy, proof strip, status tones, and Nation Eater App Store CTA.
- Modify `tests/portfolio-games.test.mjs`: replace stale submission-ready expectations with verified current release-state assertions.
- Replace `Adam_AI_Portfolio_final.pdf`: stable public PDF bytes copied from the verified versioned artifact.
- Track this plan at `docs/superpowers/plans/2026-08-05-portfolio-pdf-games-refresh.md`.

---

### Task 1: Synchronize Website Release States with Regression Tests

**Files:**
- Modify: `tests/portfolio-games.test.mjs:29-60`
- Modify: `index.html:249-301`
- Modify: `index.html:480-532`

**Interfaces:**
- Consumes: current `V2_I18N.games` schema and `GameCard` rendering branch.
- Produces: bilingual game items whose status, tone, proof, and links match current public evidence; later browser QA consumes these exact strings and URLs.

- [ ] **Step 1: Replace stale release-state tests with the current contract**

Replace the two release-state tests with:

```js
test('renders exactly two current games with verified release states', () => {
  assert.match(html, /<section id="v2-games"/);
  assert.equal((html.match(/id: 'three-doors-of-fate'/g) || []).length, 2);
  assert.equal((html.match(/id: 'nation-eater'/g) || []).length, 2);
  assert.match(html, /공개 다운로드 제공 · 정식 스토어\/웹 배포 대기/);
  assert.match(html, /PUBLIC DOWNLOAD · STORE\/HOSTED WEB RELEASE PENDING/);
  assert.match(html, /한국 App Store 출시/);
  assert.match(html, /LIVE ON THE KR APP STORE/);
  assert.doesNotMatch(html, /iOS SUBMISSION READY|App Store 준비 중|App Store pending/);
});

test('uses verified public release and Korean App Store links', () => {
  assert.match(html, /https:\/\/github\.com\/Adam-1228\/ThreeDoorsOfFate-Hackathon/);
  assert.match(html, /https:\/\/github\.com\/Adam-1228\/ThreeDoorsOfFate-Hackathon\/releases\/latest/);
  assert.equal(
    (html.match(/https:\/\/apps\.apple\.com\/kr\/app\/%EB%82%98%EB%9D%BC%EB%A8%B9%EA%B8%B0\/id6791886200/g) || []).length,
    2,
  );
  assert.match(html, /label: 'App Store에서 보기'/);
  assert.match(html, /label: 'View on KR App Store'/);
  assert.match(html, /rel="noopener noreferrer"/);
});
```

- [ ] **Step 2: Run the website test and verify that the new contract fails**

Run:

```powershell
node --test tests/portfolio-games.test.mjs
```

Expected: FAIL because `index.html` still contains `PUBLIC RELEASE`, `iOS SUBMISSION READY`, and the disabled App Store CTA.

- [ ] **Step 3: Update the Korean game data**

Apply these exact data changes inside the Korean `games` object:

```js
lead: '공개 다운로드 릴리스와 한국 App Store 출시까지 이어진 두 개의 오리지널 게임을 소개합니다.',
proofs: [
  { value: '2', label: 'Original games' },
  { value: 'WebGL v1.0', label: 'Public download' },
  { value: 'iOS 1.0.3', label: 'KR App Store' },
],
```

For Three Doors of Fate:

```js
status: '공개 다운로드 제공 · 정식 스토어/웹 배포 대기',
statusTone: 'amber',
proof: '공개 GitHub 저장소 · WebGL v1.0.0 다운로드 · 3종 클래스와 10룸 진행',
```

For 나라먹기:

```js
status: '한국 App Store 출시',
statusTone: 'green',
proof: '한국 App Store 1.0.3 · 6단계 성장 · 96종 풍자 뉴스 · 18개 엔딩',
links: [
  { label: 'App Store에서 보기', href: 'https://apps.apple.com/kr/app/%EB%82%98%EB%9D%BC%EB%A8%B9%EA%B8%B0/id6791886200', external: true },
  { label: '지원', href: 'support/' },
  { label: '개인정보', href: 'privacy/' },
],
```

- [ ] **Step 4: Update the English game data**

Apply these exact data changes inside the English `games` object:

```js
lead: 'Two original games carried through a public downloadable release and a verified Korean App Store launch.',
proofs: [
  { value: '2', label: 'Original games' },
  { value: 'WebGL v1.0', label: 'Public download' },
  { value: 'iOS 1.0.3', label: 'KR App Store' },
],
```

For Three Doors of Fate:

```js
status: 'PUBLIC DOWNLOAD · STORE/HOSTED WEB RELEASE PENDING',
statusTone: 'amber',
proof: 'Public GitHub repository · WebGL v1.0.0 download · three classes and ten-room progression',
```

For Nation Eater:

```js
status: 'LIVE ON THE KR APP STORE',
statusTone: 'green',
proof: 'KR App Store 1.0.3 · six progression stages · 96 satirical news stories · 18 endings',
links: [
  { label: 'View on KR App Store', href: 'https://apps.apple.com/kr/app/%EB%82%98%EB%9D%BC%EB%A8%B9%EA%B8%B0/id6791886200', external: true },
  { label: 'Support', href: 'support/en/' },
  { label: 'Privacy', href: 'privacy/en/' },
],
```

- [ ] **Step 5: Run the website regression suite**

Run:

```powershell
node --test tests/portfolio-games.test.mjs
git diff --check
```

Expected: all tests PASS and `git diff --check` returns no output.

- [ ] **Step 6: Commit the website status synchronization**

```powershell
git add -- index.html tests/portfolio-games.test.mjs
git commit -m "feat: sync verified game release states"
```

Expected: the commit contains only `index.html` and `tests/portfolio-games.test.mjs`.

---

### Task 2: Create a Failing PDF Contract Test

**Files:**
- Create: `C:\Users\ADAM\Documents\Codex\project\내 사이트\tests\test_portfolio_pdf.py`
- Test: `C:\Users\ADAM\Documents\Codex\project\내 사이트\tests\test_portfolio_pdf.py`

**Interfaces:**
- Consumes: `scripts.build_portfolio_pdf.build() -> Path`.
- Produces: a repeatable 11-page content, metadata, page-size, and URI acceptance gate for Tasks 3 and 4.

- [ ] **Step 1: Create the PDF contract test**

Create the file with this content:

```python
from __future__ import annotations

import importlib.util
import os
import sys
from pathlib import Path
from types import ModuleType

import pytest
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
BUILDER_PATH = ROOT / "scripts" / "build_portfolio_pdf.py"
EXPECTED_TITLE = "Adam Seong - AI Engineer & Product Builder Portfolio - 2026.08"
EXPECTED_FOOTER = "Adam Seong - AI Engineer & Product Builder - 2026.08"
APP_STORE_URL = "https://apps.apple.com/kr/app/%EB%82%98%EB%9D%BC%EB%A8%B9%EA%B8%B0/id6791886200"


def load_builder() -> ModuleType:
    spec = importlib.util.spec_from_file_location("portfolio_pdf_builder", BUILDER_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load PDF builder: {BUILDER_PATH}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def extract_uris(reader: PdfReader) -> set[str]:
    uris: set[str] = set()
    for page in reader.pages:
        for annotation_ref in page.get("/Annots", []):
            annotation = annotation_ref.get_object()
            action = annotation.get("/A")
            if action and action.get("/S") == "/URI":
                uris.add(str(action["/URI"]))
    return uris


@pytest.fixture(scope="module")
def portfolio_pdf() -> tuple[Path, PdfReader]:
    override = os.environ.get("PORTFOLIO_PDF_UNDER_TEST")
    if override:
        output = Path(override).resolve()
    else:
        builder = load_builder()
        output = builder.build()
    if not output.is_file():
        raise FileNotFoundError(output)
    return output, PdfReader(str(output))


def test_pdf_has_current_identity_and_eleven_a4_pages(portfolio_pdf: tuple[Path, PdfReader]) -> None:
    output, reader = portfolio_pdf
    if not os.environ.get("PORTFOLIO_PDF_UNDER_TEST"):
        assert output.name == "Adam_Seong_AI_Portfolio_2026_08.pdf"
    assert len(reader.pages) == 11
    assert reader.metadata.title == EXPECTED_TITLE
    for page in reader.pages:
        assert float(page.mediabox.width) == pytest.approx(595.276, abs=0.02)
        assert float(page.mediabox.height) == pytest.approx(841.89, abs=0.02)
        assert EXPECTED_FOOTER in (page.extract_text() or "")


def test_pdf_contains_only_the_two_approved_game_pages(portfolio_pdf: tuple[Path, PdfReader]) -> None:
    _, reader = portfolio_pdf
    game_text = "\n".join((reader.pages[index].extract_text() or "") for index in (6, 7))
    assert "Three Doors of Fate" in game_text
    assert "공개 다운로드 제공 · 정식 스토어/웹 배포 대기" in game_text
    assert "나라먹기" in game_text
    assert "한국 App Store 출시" in game_text
    assert "1.0.3" in game_text
    assert "Last One or Nothing" not in game_text
    assert "The Gray Maze" not in game_text
    assert "Unreal Gray Maze" not in game_text


def test_pdf_has_current_public_links_and_no_planning_copy(portfolio_pdf: tuple[Path, PdfReader]) -> None:
    _, reader = portfolio_pdf
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    uris = extract_uris(reader)
    assert {
        "https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon",
        "https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon/releases/latest",
        APP_STORE_URL,
        "https://adam-1228.github.io/adam-seong-portfolio/support/",
        "https://adam-1228.github.io/adam-seong-portfolio/privacy/",
    }.issubset(uris)
    for stale in (
        "앞으로 사이트 첫 화면",
        "사이트에서 단순 프로젝트 카드보다",
        "새 사이트와 PDF에는",
        "사이트에는 대표 스크린샷",
        "다음 사이트 반영 제안",
    ):
        assert stale not in text
```

- [ ] **Step 2: Run the test against the old builder and verify failure**

Run with the bundled Python:

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m pytest tests\test_portfolio_pdf.py -v
```

Expected: FAIL on the old `v4` filename, 10-page count, `Portfolio v2` metadata/footer, missing Nation Eater page, and stale planning copy.

---

### Task 3: Build the 11-Page PDF and Remove Stale Planning Language

**Files:**
- Modify: `C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py:7-18`
- Modify: `C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py:169-178`
- Modify: `C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py:247-630`
- Replace: `C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py:635-723`
- Modify: `C:\Users\ADAM\Documents\Codex\project\내 사이트\scripts\build_portfolio_pdf.py:726-942`
- Test: `C:\Users\ADAM\Documents\Codex\project\내 사이트\tests\test_portfolio_pdf.py`

**Interfaces:**
- Consumes: seven WebP files under the site repository's `assets/games/` tree.
- Produces: `build() -> Path` returning `output/pdf/Adam_Seong_AI_Portfolio_2026_08.pdf`, plus embedded URI annotations consumed by the PDF contract test.

- [ ] **Step 1: Update builder constants and image dependencies**

Add the imports and constants:

```python
from PIL import Image
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
SITE_ROOT = ROOT.parent / "adam-seong-portfolio"
GAME_ASSET_ROOT = SITE_ROOT / "assets" / "games"
OUT = ROOT / "output" / "pdf" / "Adam_Seong_AI_Portfolio_2026_08.pdf"

PAGE_W, PAGE_H = A4
TOTAL_PAGES = 11
FOOTER_IDENTITY = "Adam Seong - AI Engineer & Product Builder - 2026.08"
PDF_TITLE = "Adam Seong - AI Engineer & Product Builder Portfolio - 2026.08"
APP_STORE_URL = "https://apps.apple.com/kr/app/%EB%82%98%EB%9D%BC%EB%A8%B9%EA%B8%B0/id6791886200"
```

Define an explicit asset map immediately below the color constants:

```python
GAME_ASSETS = {
    "three_classes": GAME_ASSET_ROOT / "three-doors-of-fate" / "class-selection.webp",
    "three_doors": GAME_ASSET_ROOT / "three-doors-of-fate" / "door-selection.webp",
    "three_combat": GAME_ASSET_ROOT / "three-doors-of-fate" / "combat.webp",
    "nation_icon": GAME_ASSET_ROOT / "nation-eater" / "app-icon.webp",
    "nation_citizen": GAME_ASSET_ROOT / "nation-eater" / "citizen.webp",
    "nation_crisis": GAME_ASSET_ROOT / "nation-eater" / "crisis-aftermath.webp",
    "nation_world": GAME_ASSET_ROOT / "nation-eater" / "world-chair.webp",
}
```

- [ ] **Step 2: Add explicit media and action-link helpers**

Add these helpers after `draw_links`:

```python
def require_game_assets() -> None:
    missing = [str(path) for path in GAME_ASSETS.values() if not path.is_file()]
    if missing:
        raise FileNotFoundError(f"Missing portfolio game assets: {missing}")


def image_reader_for(path: Path) -> ImageReader:
    try:
        reader = ImageReader(str(path))
        reader.getSize()
        return reader
    except Exception:
        cache_dir = ROOT / "tmp" / "pdfs" / "image-cache"
        cache_dir.mkdir(parents=True, exist_ok=True)
        converted = cache_dir / f"{path.stem}.png"
        try:
            with Image.open(path) as source:
                source.convert("RGB").save(converted, format="PNG")
            reader = ImageReader(str(converted))
            reader.getSize()
            return reader
        except Exception as conversion_error:
            raise RuntimeError(f"Cannot decode portfolio image: {path}") from conversion_error


def draw_image_contain(
    c: canvas.Canvas,
    path: Path,
    x: float,
    y: float,
    w: float,
    h: float,
    *,
    background: colors.Color = colors.HexColor("#111A2B"),
) -> None:
    rect(c, x, y, w, h, background, None, 8)
    image = image_reader_for(path)
    image_w, image_h = image.getSize()
    scale = min(w / image_w, h / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    c.drawImage(
        image,
        x + (w - draw_w) / 2,
        y + (h - draw_h) / 2,
        width=draw_w,
        height=draw_h,
        preserveAspectRatio=True,
        mask="auto",
    )


def draw_action_links(
    c: canvas.Canvas,
    links: Sequence[Link],
    x: float,
    y: float,
    *,
    accent: colors.Color = BLUE,
) -> None:
    cursor_x = x
    for link in links:
        label_w = width(link.label, "Malgun-Bold", 8.2)
        button_w = label_w + 24
        rect(c, cursor_x, y, button_w, 26, WHITE, accent, 6)
        c.setFont("Malgun-Bold", 8.2)
        c.setFillColor(accent)
        c.drawString(cursor_x + 12, y + 8, link.label)
        c.linkURL(link.url, (cursor_x, y, cursor_x + button_w, y + 26), relative=0)
        cursor_x += button_w + 8
```

- [ ] **Step 3: Make the document identity durable**

Change `footer()` to draw `FOOTER_IDENTITY`. Replace the stale copy blocks with these outward-facing strings:

```python
# Page 1 summary
"2026년 8월 기준. AI 자동화 제품의 운영·검증 경험과 두 개의 오리지널 게임을 하나의 제품 포트폴리오로 정리했습니다."

# Page 2 third WHY IT MATTERS bullet
"릴리즈 자산과 검증 기록을 함께 공개해 제품 운영 역량을 증명합니다."

# Page 3 closing box
heading = "제품 신뢰를 만든 배포 원칙"
body = "시장별 운용 로직과 위험 가드를 분리하고, 빌드·릴리즈 자산·SHA256·사이트 배포를 하나의 검증 흐름으로 관리했습니다."

# Page 4 closing box
heading = "안전한 자동화 설계"
body = "리서치와 생성은 에이전트가 반복하지만, 발송 전에는 점수 기반 재작성과 Telegram HITL 승인을 거치도록 설계했습니다."

# Page 6 closing box
heading = "제품 포트폴리오의 폭"
body = "대표 제품과 핵심 사례는 깊게, 추가 자동화 시스템은 역할별로 묶어 운영 경험의 폭과 문제 해결의 깊이를 함께 보여줍니다."

# Page 11 closing box
heading = "Product Portfolio"
body = "AI 자동화 제품, 실서비스 운영 사례, 두 개의 오리지널 게임을 기획부터 검증과 공개까지 연결한 포트폴리오입니다."
```

- [ ] **Step 4: Replace the old prototype page with the Three Doors page**

Delete `page_7_games()` and add `page_7_three_doors()`. Use this exact structure and content:

```python
def page_7_three_doors(c: canvas.Canvas) -> None:
    y = top_title(
        c,
        "Original Game 01",
        "Three Doors of Fate",
        "세 개의 문 뒤에 숨은 위험과 보상을 선택하고 카드, 행운 주사위, 체력, 골드, 빚을 관리해 보스를 돌파하는 한국어 싱글 플레이 덱빌딩 로그라이크.",
    )
    pill(c, 46, y - 10, "공개 다운로드 제공 · 정식 스토어/웹 배포 대기", bg=colors.HexColor("#FFF4DB"), fg=colors.HexColor("#9A5A00"), size=7.2, h=20)
    draw_image_contain(c, GAME_ASSETS["three_classes"], 46, y - 260, PAGE_W - 92, 218)
    draw_image_contain(c, GAME_ASSETS["three_doors"], 46, y - 390, 244, 116)
    draw_image_contain(c, GAME_ASSETS["three_combat"], 305, y - 390, 244, 116)
    metric(c, 46, y - 484, 116, 70, "v1.0.0", "공개 WebGL 다운로드", accent=GREEN)
    metric(c, 174, y - 484, 116, 70, "3", "플레이어 클래스", accent=BLUE)
    metric(c, 302, y - 484, 116, 70, "10", "룸 보스 진행", accent=PURPLE)
    metric(c, 430, y - 484, 119, 70, "Unity 6", "C# · Turn-based", accent=AMBER)
    draw_action_links(
        c,
        [
            Link("GitHub", "https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon"),
            Link("v1.0.0 다운로드", "https://github.com/Adam-1228/ThreeDoorsOfFate-Hackathon/releases/latest"),
        ],
        46,
        y - 530,
    )
    footer(c, 7, "Original Game - Three Doors of Fate")
    c.showPage()
```

During implementation, render this page immediately. If the status pill exceeds the available width, reduce only its font size to no less than `6.6`; do not abbreviate the approved status.

- [ ] **Step 5: Add the Nation Eater page**

Add `page_8_nation_eater()` with this exact structure and content:

```python
def page_8_nation_eater(c: canvas.Canvas) -> None:
    y = top_title(
        c,
        "Original Game 02",
        "나라먹기 / Nation Eater",
        "모든 인물과 국가, 사건이 허구인 정치 풍자 방치형 RPG. 시민에서 세계 의장까지 성장하며 공작의 후폭풍, 96종 풍자 뉴스와 18개 엔딩을 수집합니다.",
    )
    draw_image_contain(c, GAME_ASSETS["nation_icon"], 46, y - 104, 74, 74, background=WHITE)
    pill(c, 136, y - 44, "한국 App Store 출시", bg=colors.HexColor("#E7F8EE"), fg=colors.HexColor("#147A3D"), size=8, h=21)
    c.setFont("Malgun", 8.5)
    c.setFillColor(MUTED)
    c.drawString(136, y - 72, "iOS 1.0.3 · React 19 · Phaser 4 · TypeScript · Capacitor 8")
    phone_w = 142
    phone_h = 307
    phone_y = y - 432
    draw_image_contain(c, GAME_ASSETS["nation_citizen"], 46, phone_y, phone_w, phone_h)
    draw_image_contain(c, GAME_ASSETS["nation_crisis"], 202, phone_y, phone_w, phone_h)
    draw_image_contain(c, GAME_ASSETS["nation_world"], 358, phone_y, phone_w, phone_h)
    metric(c, 46, y - 526, 116, 70, "1.0.3", "한국 App Store", accent=GREEN)
    metric(c, 174, y - 526, 116, 70, "6", "성장 단계", accent=BLUE)
    metric(c, 302, y - 526, 116, 70, "96", "풍자 뉴스", accent=PURPLE)
    metric(c, 430, y - 526, 119, 70, "18", "수집 엔딩", accent=AMBER)
    draw_action_links(
        c,
        [
            Link("한국 App Store", APP_STORE_URL),
            Link("지원", "https://adam-1228.github.io/adam-seong-portfolio/support/"),
            Link("개인정보", "https://adam-1228.github.io/adam-seong-portfolio/privacy/"),
        ],
        46,
        y - 572,
        accent=GREEN,
    )
    c.setFont("Malgun", 7.4)
    c.setFillColor(MUTED)
    c.drawString(46, 48, "본 작품의 인물, 국가, 정당과 사건은 모두 허구이며 실제 대상과 관련이 없습니다.")
    footer(c, 8, "Original Game - Nation Eater")
    c.showPage()
```

- [ ] **Step 6: Renumber the remaining pages and update the build sequence**

Rename functions and footers:

```python
page_7 -> page_9_architecture       # footer page 9
page_8 -> page_10_services          # footer page 10
page_9 -> page_11_stack             # footer page 11
```

Update `build()`:

```python
def build() -> Path:
    register_fonts()
    require_game_assets()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle(PDF_TITLE)
    c.setAuthor("Adam Seong")
    c.setSubject("AI Engineer, Automation Product Builder, Original Games, ADAM Orbit, Portfolio")
    for page in (
        page_1,
        page_2,
        page_3,
        page_4,
        page_5,
        page_6,
        page_7_three_doors,
        page_8_nation_eater,
        page_9_architecture,
        page_10_services,
        page_11_stack,
    ):
        page(c)
    c.save()
    return OUT
```

- [ ] **Step 7: Run the PDF contract test**

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m pytest tests\test_portfolio_pdf.py -v
```

Expected: all PDF contract tests PASS.

---

### Task 4: Render and Visually Verify Every PDF Page

**Files:**
- Verify: `C:\Users\ADAM\Documents\Codex\project\내 사이트\output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf`
- Create temporarily: `C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs\portfolio-2026-08\page-*.png`

**Interfaces:**
- Consumes: Task 3's generated PDF.
- Produces: visually approved bytes and SHA-256 for Task 5.

- [ ] **Step 1: Build the PDF once from a clean process**

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' scripts\build_portfolio_pdf.py
```

Expected: prints the absolute path ending in `Adam_Seong_AI_Portfolio_2026_08.pdf`.

- [ ] **Step 2: Inspect structural metadata with Poppler**

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdfinfo.exe' 'output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf'
```

Expected: `Pages: 11`, A4 page size, title `Adam Seong - AI Engineer & Product Builder Portfolio - 2026.08`, no encryption, and no JavaScript.

- [ ] **Step 3: Render all pages into a dedicated temporary directory**

```powershell
$renderDir = 'C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs\portfolio-2026-08'
New-Item -ItemType Directory -Force -Path $renderDir | Out-Null
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe' -png -r 150 'output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf' "$renderDir\page"
```

Expected: exactly 11 PNG files.

- [ ] **Step 4: Inspect all 11 rendered pages**

Use `view_image` on every `page-*.png`, with original detail for pages 7 and 8. Verify:

- no clipped or overlapping text;
- all Korean glyphs render correctly;
- every footer shows the right section and `N/11` value;
- Three Doors screenshots remain 16:9 without distortion;
- all three Nation Eater phone screens are legible and preserve their portrait ratio;
- the status pills fit without abbreviating approved wording;
- page 11 no longer contains `다음 사이트 반영 제안`.

- [ ] **Step 5: Re-run tests after any visual adjustment**

```powershell
& 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m pytest tests\test_portfolio_pdf.py -v
```

Expected: PASS after the final visual render.

- [ ] **Step 6: Record the verified artifact hash**

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath 'output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf' | Format-List
```

Expected: one SHA-256 value to compare after copying and public deployment.

---

### Task 5: Replace the Stable Site PDF and Run Local Integration QA

**Files:**
- Replace: `Adam_AI_Portfolio_final.pdf`
- Verify: `index.html`
- Verify: `tests/portfolio-games.test.mjs`

**Interfaces:**
- Consumes: Task 4's visually approved versioned PDF bytes.
- Produces: a commit-ready site repository whose download link still targets the stable filename.

- [ ] **Step 1: Confirm the site repository has only intentional committed history**

```powershell
git status --short --branch
git log -3 --oneline
```

Expected: `main` contains the spec and Task 1 status commit; no uncommitted files are present before copying the PDF.

- [ ] **Step 2: Copy the verified PDF bytes to the stable public filename**

```powershell
Copy-Item -LiteralPath 'C:\Users\ADAM\Documents\Codex\project\내 사이트\output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf' -Destination 'C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio\Adam_AI_Portfolio_final.pdf' -Force
```

- [ ] **Step 3: Prove the versioned and stable files are identical**

```powershell
Get-FileHash -Algorithm SHA256 -LiteralPath 'C:\Users\ADAM\Documents\Codex\project\내 사이트\output\pdf\Adam_Seong_AI_Portfolio_2026_08.pdf'
Get-FileHash -Algorithm SHA256 -LiteralPath 'C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio\Adam_AI_Portfolio_final.pdf'
```

Expected: identical SHA-256 values and identical byte sizes.

- [ ] **Step 4: Run static and repository checks**

```powershell
node --test tests/portfolio-games.test.mjs
git diff --check
git status --short
```

Expected: all Node tests PASS; only `Adam_AI_Portfolio_final.pdf` is uncommitted at this point.

- [ ] **Step 5: Run local browser QA**

Start a hidden local server:

```powershell
$python = 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$siteRoot = 'C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio'
$server = Start-Process -FilePath $python -ArgumentList '-m','http.server','4173','--bind','127.0.0.1' -WorkingDirectory $siteRoot -PassThru -WindowStyle Hidden
```

Use browser automation to verify Korean and English at desktop and `390x844`, in light and dark themes:

- both game cards render;
- new status labels are visible;
- Nation Eater App Store CTA is a focusable anchor with the verified KR URL;
- Three Doors GitHub and release links are active;
- seven images decode;
- there is no horizontal overflow;
- the browser console has zero errors;
- the PDF download request returns HTTP 200.

Stop the exact server process after QA:

```powershell
Stop-Process -Id $server.Id
```

- [ ] **Step 6: Commit the stable PDF**

```powershell
git add -- Adam_AI_Portfolio_final.pdf
git commit -m "docs: publish refreshed portfolio PDF"
```

Expected: the commit contains only the stable PDF replacement.

---

### Task 6: Push and Verify GitHub Pages Deployment

**Files:**
- No new source files.
- Download temporarily: `C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs\portfolio-2026-08\public-Adam_AI_Portfolio_final.pdf`

**Interfaces:**
- Consumes: all committed site and PDF changes from Tasks 1-5.
- Produces: verified public HTML, public links, and a public PDF whose bytes match the repository file.

- [ ] **Step 1: Run the final pre-push gate**

```powershell
git status --short --branch
node --test tests/portfolio-games.test.mjs
git diff --check HEAD~2..HEAD
```

Expected: clean worktree, all tests PASS, no whitespace errors, and local `main` ahead of `origin/main` only by the intentional spec/plan/implementation commits.

- [ ] **Step 2: Push main**

```powershell
git push origin main
```

Expected: push succeeds without force and `origin/main` advances to local `HEAD`.

- [ ] **Step 3: Verify the GitHub Pages build**

```powershell
gh run list --workflow pages-build-deployment --limit 5
```

Poll the matching run with `gh run watch <run-id> --exit-status`. Expected: the run completes successfully.

- [ ] **Step 4: Verify public HTML and release links**

Open `https://adam-1228.github.io/adam-seong-portfolio/#v2-games` in a fresh browser context. Confirm:

- Korean and English release labels match the approved wording;
- Nation Eater links to the verified KR App Store page;
- Three Doors links to GitHub and the public v1.0.0 download release;
- the page renders at desktop and `390x844` without console errors or overflow.

- [ ] **Step 5: Download the public PDF and compare SHA-256**

```powershell
$publicPdf = 'C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs\portfolio-2026-08\public-Adam_AI_Portfolio_final.pdf'
$publicUrl = 'https://adam-1228.github.io/adam-seong-portfolio/Adam_AI_Portfolio_final.pdf'
$head = Invoke-WebRequest -Uri $publicUrl -Method Head -UseBasicParsing
if ($head.StatusCode -ne 200 -or $head.Headers['Content-Type'] -notmatch '^application/pdf') {
    throw "Unexpected public PDF response: $($head.StatusCode) $($head.Headers['Content-Type'])"
}
Invoke-WebRequest -Uri $publicUrl -OutFile $publicPdf -UseBasicParsing
Get-FileHash -Algorithm SHA256 -LiteralPath $publicPdf
Get-FileHash -Algorithm SHA256 -LiteralPath 'C:\Users\ADAM\Documents\Codex\project\adam-seong-portfolio\Adam_AI_Portfolio_final.pdf'
```

Expected: HTTP 200, `application/pdf`, and both hashes and byte sizes match exactly.

- [ ] **Step 6: Reopen the public PDF and run the same structural verifier**

```powershell
$env:PORTFOLIO_PDF_UNDER_TEST = $publicPdf
try {
    & 'C:\Users\ADAM\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m pytest 'C:\Users\ADAM\Documents\Codex\project\내 사이트\tests\test_portfolio_pdf.py' -v
} finally {
    Remove-Item Env:PORTFOLIO_PDF_UNDER_TEST -ErrorAction SilentlyContinue
}
```

Expected: the same three PDF contract tests PASS against the downloaded public file, proving 11 pages, current metadata, the approved statuses, version `1.0.3`, and all required URI annotations.

- [ ] **Step 7: Clean temporary QA outputs and report evidence**

Delete only the known temporary directory after confirming its resolved path is inside the artifact workspace:

```powershell
$renderDir = (Resolve-Path -LiteralPath 'C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs\portfolio-2026-08').Path
$allowedRoot = (Resolve-Path -LiteralPath 'C:\Users\ADAM\Documents\Codex\project\내 사이트\tmp\pdfs').Path
if (-not $renderDir.StartsWith($allowedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to remove unexpected path: $renderDir"
}
Remove-Item -LiteralPath $renderDir -Recurse -Force
```

Final report must include:

- final site commit;
- Node and pytest results;
- PDF page count and metadata;
- local/committed/public PDF byte size and SHA-256;
- GitHub Pages run status;
- desktop/mobile and Korean/English browser QA result;
- direct public site, App Store, Three Doors release, and PDF URLs;
- any remaining unverified distribution scope.
