# 포트폴리오 코드 설명 (면접 대비용)

> "왜 이렇게 짜여졌는지" 초보자도 이해할 수 있게 정리한 문서입니다.

---

## 1. 전체 구조: Next.js App Router

**Q: 이 프로젝트는 어떤 프레임워크를 쓰나요?**  
**A:** Next.js 16의 **App Router**를 사용합니다.

- `app/` 폴더 안에 `layout.tsx`, `page.tsx`가 있으면 **App Router** 방식입니다.
- `layout.tsx`는 **모든 페이지에 공통으로 적용**되는 레이아웃(헤더, 폰트, 메타데이터 등)을 담당합니다.
- `page.tsx`는 **해당 경로(/)의 실제 화면 내용**을 담당합니다.
- 파일 기반 라우팅이라 `app/about/page.tsx`를 만들면 `/about` 경로가 자동으로 생깁니다.

**왜 Next.js인가?**
- React 기반이면서 SEO, 이미지 최적화, 폰트 최적화, 배포(Vercel)가 잘 맞춰져 있어서 **싱글 페이지 포트폴리오**에 적합합니다.

---

## 2. layout.tsx — "왜 여기엔 'use client'가 없나요?"

**Q: layout에는 "use client"가 없는데 page에는 있는 이유는?**  
**A:** Next.js는 기본적으로 **서버에서 먼저 HTML을 그립니다(SSR)**.  
`layout.tsx`는 **서버 컴포넌트**로 두고, **폰트·메타데이터**처럼 한 번만 설정하면 되는 것은 서버에서 처리하는 게 유리합니다.

- **서버 컴포넌트 (layout.tsx)**  
  - 브라우저에서 JavaScript가 없어도 HTML이 만들어짐.  
  - `next/font`로 폰트를 불러오면 **빌드 시점에 폰트 파일을 받아와서** 우리 도메인에서 서빙합니다. (Google 서버에 매 요청마다 가지 않음 → 빠르고 프라이버시에 유리)
- **클라이언트 컴포넌트 (page.tsx)**  
  - 마우스 위치, 스크롤, 애니메이션처럼 **브라우저에서만 알 수 있는 값**을 쓰기 때문에 `"use client"`를 넣었습니다.

**폰트 설정을 보면:**
```ts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",  // 폰트 로딩이 늦어져도 텍스트는 먼저 보이게
  preload: true,        // 중요한 폰트는 미리 로드
});
```
- `variable`: CSS 변수 이름. Tailwind(`globals.css`)에서 `--font-geist-sans`로 쓰입니다.
- `display: "optional"`: 폰트가 늦게 오면 시스템 폰트로 먼저 보여 주고, 나중에 폰트가 오면 바뀝니다. **레이아웃이 깨지지 않게** 하려고 씁니다.
- `preload: true`: 뷰포트에 들어오기 전에 미리 받아와서 **폰트 깜빡임(FOUT)**을 줄입니다.

**정리:**  
layout = 서버에서 한 번만 처리해도 되는 공통 껍데기 → `"use client"` 없음.  
page = 마우스/스크롤/애니메이션 사용 → `"use client"` 필요.

---

## 3. page.tsx — "use client"와 데이터/UI 분리

**Q: 맨 위에 "use client"가 있는 이유는?**  
**A:** 이 페이지에서는 다음을 사용합니다.

- **useState, useEffect** (React 훅)
- **useRef** (DOM 참조, 스크롤 등)
- **useMousePosition** (마우스 좌표)
- **useScroll, useTransform** (Framer Motion)
- **window, document** (브라우저 API)

이것들은 **브라우저(클라이언트)에서만** 동작합니다.  
Next.js는 기본이 서버 컴포넌트라서, 이런 코드를 쓰는 파일에는 반드시 **파일 최상단에 `"use client"`**를 적어 "이건 클라이언트에서 실행되는 컴포넌트다"라고 알려줘야 합니다.

**Q: 데이터(experiences, projects)를 왜 컴포넌트 밖에 두었나요?**  
**A:**  
- **재렌더링과 무관**: 이 데이터는 마우스/스크롤이 바뀔 때마다 바뀌지 않습니다.  
- **컴포넌트 밖(상수)**에 두면 **Portfolio 컴포넌트가 리렌더될 때마다 다시 생성되지 않습니다.**  
- 나중에 CMS나 API에서 가져오도록 바꿀 때는 `useState`/`useEffect`나 서버 컴포넌트에서 fetch해서 props로 넘기는 식으로 바꾸면 됩니다.

**면접에서 말할 수 있는 포인트:**  
"데이터는 상수로 분리해서 불필요한 재생성을 막고, 나중에 API로 교체하기도 쉽게 했습니다."

---

## 4. 커스텀 훅: useMousePosition

**파일:** `app/hooks/useMousePosition.ts`

**Q: 마우스 위치를 왜 훅으로 뺐나요?**  
**A:**  
- **재사용**: 스포트라이트, 프로필 사진 틸트, SelfIntroCard 글로우 등 **여러 곳**에서 같은 마우스 좌표가 필요합니다.  
- **한 곳에서만 이벤트 등록**: 훅 안에서 `window.addEventListener("mousemove", ...)`를 한 번만 쓰고, 그 값을 구독하는 컴포넌트들이 **같은 좌표**를 공유합니다.  
- **정리(cleanup)**: `useEffect`의 return에서 `removeEventListener`를 해서, 컴포넌트가 사라질 때 리스너를 제거합니다. 그렇지 않으면 메모리 누수와 불필요한 연산이 생깁니다.

**코드 흐름:**
1. `useState({ x: 0, y: 0 })` → 마우스 좌표 저장.
2. `useEffect` 안에서 `mousemove` 리스너 등록 → `e.clientX`, `e.clientY`로 state 갱신.
3. return에서 `removeEventListener` → **unmount 시 리스너 제거**.

**면접에서:**  
"마우스 위치는 여러 컴포넌트에서 쓰이니까 커스텀 훅으로 분리했고, useEffect cleanup으로 이벤트 리스너를 제거해 메모리 누수를 방지했습니다."

---

## 5. Framer Motion을 쓰는 이유

**Q: CSS 애니메이션 말고 왜 Framer Motion을 썼나요?**  
**A:**  
- **선언적**: "처음엔 opacity 0, 나중엔 1"을 `initial` / `animate`로 표현하기 쉽습니다.  
- **스크롤 연동**: `useScroll`, `useTransform`으로 **스크롤 진행도**를 0~1로 받아서, 그걸 다른 값(예: y 위치, 투명도)으로 변환해 **파라랙스** 같은 효과를 만들 수 있습니다.  
- **성능**: 내부적으로 requestAnimationFrame과 GPU 가속을 활용해, 복잡한 애니메이션도 부드럽게 처리하는 데 유리합니다.

**예시 1 — 스크롤 파라랙스 (배경 "BUILD" 텍스트):**
```ts
const { scrollYProgress } = useScroll();
const bgTextY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
// 스크롤이 0% → 50% 구간일 때, y를 0 → 80px 로 매핑
```
→ 스크롤할수록 배경 글자가 살짝 아래로 움직이는 느낌.

**예시 2 — 화면에 들어올 때만 애니메이션 (Experience, Projects):**
```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
>
```
- `whileInView`: 뷰포트에 들어왔을 때만 애니메이션 재생.  
- `viewport={{ once: true }}`: 한 번만 재생하고 다시 스크롤해도 반복하지 않음. **과한 애니메이션과 연산을 줄이기 위함**입니다.

**면접에서:**  
"스크롤 기반 파라랙스와 뷰포트 진입 시 한 번만 재생하는 애니메이션을 Framer Motion으로 구현했고, once로 불필요한 반복 연산을 줄였습니다."

---

## 6. SelfIntroCard — 커서 근접 시 글로우

**Q: 카드에 마우스를 가까이 대면 빛나는 효과는 어떻게 만든 건가요?**  
**A:**  
1. **거리 계산**: 카드의 `getBoundingClientRect()`로 **중심 좌표**를 구하고, 마우스 위치와의 **거리**를 `Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2)` 로 계산합니다.  
2. **글로우 강도**: 거리가 가까울수록 숫자를 크게 하려고 `glow = Math.max(0, 1 - dist / 200)` 처럼 했습니다. 200px 안이면 글로우가 보이고, 멀어질수록 0에 가깝게 만든 것입니다.  
3. **스타일 적용**: `boxShadow`, `borderColor`, 하이라이트 원의 `opacity`를 `glow` 값에 비례하게 넣었습니다.  
4. **하이라이트 원 위치**: 마우스 위치를 카드 기준 좌표로 바꿔서(`mouseX - rect.left` 등) 카드 안에서만 그라디언트 원이 움직이도록 했습니다.

**왜 useRef를 쓰나요?**  
- `getBoundingClientRect()`는 **DOM 요소**가 있어야 합니다.  
- `ref={cardRef}`로 해당 div를 지정하고, `cardRef.current.getBoundingClientRect()`로 위치·크기를 읽습니다.

**면접에서:**  
"카드 중심과 마우스 거리를 구해서, 가까울수록 glow 값을 키우고 boxShadow와 하이라이트 원에 반영했습니다. DOM 위치는 useRef로 참조해 getBoundingClientRect로 구했습니다."

---

## 7. MarqueeScroller — 무한 스크롤 텍스트

**Q: 스킬이 왼쪽으로 계속 흐르는 건 어떻게 구현했나요?**  
**A:**  
1. **두 번 이어 붙이기**: `const duplicatedItems = [...items, ...items]`  
   - 원본 배열을 두 번 이어 붙여서, 화면에서 끊김 없이 반복되게 했습니다.  
2. **x를 -50%만큼 이동**:  
   - 전체 너비가 "원본 두 배"이므로, 정확히 **절반(-50%)**만 이동하면 처음 모양과 똑같아집니다.  
   - `animate={{ x: "-50%" }}` + `repeat: Infinity`, `ease: "linear"` 로 **끊김 없는 무한 루프**를 만든 것입니다.  
3. **overflow-hidden**: 부모에서 넘치는 부분을 잘라서, 한 줄이 끝없이 이어져 보이게 했습니다.

**면접에서:**  
"배열을 두 번 이어 붙이고, x를 -50%만큼 무한 반복 이동시켜서 끊김 없는 마키 효과를 만들었습니다."

---

## 8. 프로필 사진 3D 틸트

**Q: 프로필 사진이 마우스에 따라 기울어지는 건 어떻게 했나요?**  
**A:**  
1. **화면 중심을 0으로 하는 비율**:  
   - `(mousePosition.x - windowSize.w / 2) / (windowSize.w / 2)`  
   - 화면 왼쪽 끝 = -1, 오른쪽 끝 = 1, 가운데 = 0.  
2. **각도로 변환**:  
   - `photoTiltY = (x 비율) * 8` → 마우스가 오른쪽에 있으면 오른쪽으로 최대 8도 기울임.  
   - `photoTiltX = (y 비율) * -8` → 마우스가 아래에 있으면 위쪽으로 기울이도록 부호를 반대로 했습니다.  
3. **CSS 3D**:  
   - `transform: perspective(1000px) rotateX(...) rotateY(...)`  
   - `transformStyle: "preserve-3d"` 로 자식까지 3D 공간으로 유지합니다.

**면접에서:**  
"마우스 위치를 화면 크기로 정규화해서 -1~1 비율로 만들고, 그 비율에 8도 정도를 곱해 rotateX, rotateY에 넣었습니다. perspective와 preserve-3d로 3D 느낌을 냈습니다."

---

## 9. 고정 스포트라이트 (커서 따라다니는 빛)

**Q: 화면 전체에 마우스 따라다니는 보라색 원은?**  
**A:**  
- `position: fixed`로 **뷰포트 기준 고정**.  
- `left: mousePosition.x - 300`, `top: mousePosition.y - 300`  
  - 원 크기가 600x600이므로, 중심이 마우스에 오도록 -300으로 보정했습니다.  
- `pointer-events-none`: 클릭이 통과해서 뒤의 버튼·링크를 그대로 누를 수 있게 했습니다.  
- `z-0`: 콘텐츠는 `z-10` 등으로 더 위에 두어서, 스포트라이트는 **배경 레이어**로만 쓰입니다.

---

## 10. Tailwind와 디자인 선택

**Q: 스타일은 왜 Tailwind로 했나요?**  
**A:**  
- **일관된 간격/색상**: `p-4`, `gap-12`, `text-purple-400` 처럼 숫자와 색이 체계적으로 정리됩니다.  
- **반응형**: `md:flex-row`, `md:text-6xl` 처럼 breakpoint별 클래스만 붙이면 됩니다.  
- **번들 크기**: 사용한 클래스만 최종 CSS에 포함되는 방식이라, 사용하지 않는 스타일은 제거됩니다.

**Glassmorphism (유리 같은 카드):**  
- `bg-white/5`, `backdrop-blur-sm`, `border border-white/10`  
- 반투명 배경 + 블러 + 얇은 테두리로 "뒤가 비치는 유리" 느낌을 냈습니다.

**색/분위기:**  
- 배경 `#0a0a0f`, 보라/파랑 계열 포인트 컬러로 **다크 테마**를 맞췄습니다.

---

## 11. 성능/접근성 관련

- **viewport once**: 스크롤 애니메이션은 한 번만 재생해 불필요한 재연산을 줄였습니다.  
- **pointer-events-none**: 장식용 레이어는 클릭을 막지 않도록 했습니다.  
- **이미지**: 현재는 외부 URL을 쓰고 있고, 실제 서비스에서는 Next.js `<Image>`로 교체하면 크기 최적화·lazy load를 받을 수 있습니다.

---

## 12. 면접에서 자주 나올 수 있는 질문 요약

| 질문 | 짧은 답변 |
|------|-----------|
| "use client"가 뭐고 왜 썼나요? | 브라우저 전용 훅(useState, useEffect, 마우스/스크롤)을 쓰기 때문에 클라이언트 컴포넌트로 표시했습니다. |
| layout과 page 역할 차이는? | layout은 서버 컴포넌트로 공통 레이아웃·폰트·메타, page는 이 경로의 실제 UI(클라이언트)입니다. |
| useMousePosition을 훅으로 뺀 이유? | 재사용과 이벤트 리스너를 한 곳에서 관리하고, cleanup으로 메모리 누수를 막기 위해서입니다. |
| Framer Motion을 쓴 이유? | 스크롤 연동(useScroll, useTransform)과 선언적 애니메이션, 뷰포트 진입 시 한 번만 재생(once)을 쉽게 하려고입니다. |
| 카드 글로우 효과 원리? | 카드 중심과 마우스 거리를 구해, 가까울수록 glow 값을 키워 boxShadow와 하이라이트에 반영했습니다. |
| 무한 마키 원리? | 배열을 두 번 이어 붙이고, x를 -50%만큼 무한 반복 이동시켜 끊김 없이 보이게 했습니다. |

---

이 문서를 **CODE_EXPLANATION.md**로 저장해 두었습니다. 면접 전에 한 번씩 훑어보면 "왜 이렇게 짜여졌는지" 말로 설명하기 수월해질 거예요.
