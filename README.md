# Adam Seong · AI Engineer Portfolio

> 업무 프로세스 자동화 · LLM Agent · 실시간 데이터 파이프라인 · 클라우드 배포
> 데모가 아니라 운영되는 시스템을 만듭니다.

기반 AI 엔지니어 **Adam Seong**의 개인 포트폴리오 사이트입니다.
프레임워크와 빌드 도구 없이 단일 HTML 파일로 구성되어 있습니다.

---

## Stack

| 영역 | 사용 기술 |
| --- | --- |
| Markup / Style | Vanilla HTML5, CSS3 (CSS Variables 기반 라이트/다크 테마) |
| Script | Vanilla JavaScript (ES5 호환, 빌드 불필요) |
| Fonts | Inter Tight, JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages (정적 호스팅이면 어디든 가능) |

프레임워크 의존성 없음. `index.html`을 브라우저로 직접 열어도 동일하게 동작합니다.

---

## AutoTrader 릴리즈 기록

이 저장소는 포트폴리오 사이트와 함께 AutoTrader 배포 파일도 GitHub Releases로 관리합니다.
버전별 업데이트 내역은 [AutoTrader Release History](docs/auto-trader-release-history.md)에서 확인할 수 있습니다.

최신 배포 버전: `v2.0.1`

---

## 설계 원칙

1. **데모가 아니라 운영** — 실제 사용자 환경에서 안정적으로 돌아가는 코드만 남깁니다.
2. **관찰 가능성 우선** — 주석과 구조를 통해 나중에 봐도 의도가 읽히도록 작성합니다.
3. **의존성 최소** — 외부 런타임 없이 브라우저만으로 실행, 정적 호스팅 어디든 올라갑니다.
4. **깜박임 없는 UX** — IntersectionObserver로 active 상태만 토글, 재마운트 없음.

---

## 실행

### 로컬에서 열기

```bash
# 저장소 클론
git clone https://github.com/<your-username>/adam-seong-portfolio.git
cd adam-seong-portfolio

# 브라우저로 바로 열기 (macOS 예시)
open index.html
```

또는 `index.html`을 더블클릭해도 됩니다. 별도의 서버가 필요 없습니다.

### 간이 로컬 서버로 열기 (선택)

파일 절대경로 이슈가 있을 경우:

```bash
# Python 3 내장 서버
python -m http.server 8000
# → http://localhost:8000 접속
```

---

## 배포

### GitHub Pages (추천)

1. 저장소 **Settings** → **Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main` / `/ (root)` → `Save`
4. 1-2분 후 `https://<username>.github.io/<repo>/`에서 공개

### Vercel / Netlify

별도 설정 없이 저장소 연결만으로 즉시 배포됩니다. 빌드 커맨드 불필요.

---

## 파일 구조

```
.
├── index.html                    # 사이트 본문 (CSS/JS 인라인)
├── Adam_AI_Portfolio_final.pdf   # 다운로드용 포트폴리오 PDF
└── README.md                     # 본 파일
```

---

## 섹션 구성

| # | 섹션 | 설명 |
| --- | --- | --- |
| 01 | Intro | 헤드라인 · CTA · 4개 KPI |
| 02 | About | 자기소개 · 프로필 메타 |
| 03 | Services | BPA · LLM · Data · Ops (2×2 카드) |
| 04 | Projects | 현재 운영 중인 프로젝트 4개 |
| 05 | Process | 진단 → 설계 → 구현 → 운영 |
| 06 | Stack | 6개 카테고리 기술 스택 |
| 07 | Contact | CTA · FAQ · 4개 원칙 · PDF 다운로드 |

---

## Contact

- **Email**: [giha1205@gmail.com](mailto:giha1205@gmail.com)
- **Location**: Seongnam, Republic of Korea
- **Availability**: 2026 Q2 · 1–2팀 의뢰 가능

프로젝트 제안이나 협업 문의는 이메일로 부탁드립니다.
첫 답변은 24시간 이내에 드립니다.

---

## License

© 2026 Adam Seong. All rights reserved.

본 포트폴리오의 텍스트, 이미지, 디자인에 대한 저작권은 Adam Seong에게 있습니다.
코드 구조 자체는 학습 목적으로 참고하셔도 좋습니다.
